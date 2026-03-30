import express from "express";
import { createServer as createViteServer } from "vite";
import { OAuth2Client } from "google-auth-library";
import session from "cookie-session";
import Redis from "ioredis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants from the app (hardcoded here to avoid complex imports in server)
const getAdminWhitelist = () => {
    const emails = process.env.ADMIN_EMAILS || "";
    const envEmails = emails.split(",").map(e => e.trim()).filter(e => e !== "");
    // Fallback to hardcoded list if env var is empty
    if (envEmails.length === 0) {
        return [
            "leftsidedstudios@gmail.com"
        ];
    }
    return envEmails;
};

async function startServer() {
    const app = express();
    const PORT = 3000;

    // Trust proxy for correct req.protocol behind nginx
    app.set('trust proxy', 1);

    const getRedis = () => {
        const password = process.env.REDIS_PASSWORD;
        if (!password) throw new Error("REDIS_PASSWORD is missing");
        const REDIS_URL = `redis://default:${encodeURIComponent(password)}@redis-18662.c8.us-east-1-4.ec2.cloud.redislabs.com:18662`;
        return new Redis(REDIS_URL);
    };

    app.use(express.json({ limit: '10mb' }));
    app.use((session as any)({
        name: 'lss_session',
        keys: [process.env.SESSION_SECRET || 'lss-secret-key'],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: true,
        sameSite: 'none',
        proxy: true
    }));

    const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    const getRedirectUri = (req: express.Request) => {
        // Prefer APP_URL if set, otherwise use request headers
        const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
        return `${baseUrl.replace(/\/$/, '')}/api/auth/callback`;
    };

    // --- Auth Routes ---

    app.get("/api/auth/url", (req, res) => {
        const redirectUri = getRedirectUri(req);
        const url = client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
            redirect_uri: redirectUri
        });
        res.json({ url });
    });

    app.get("/api/auth/callback", async (req, res) => {
        const { code } = req.query;
        const redirectUri = getRedirectUri(req);
        
        console.log(`Auth Callback - Protocol: ${req.protocol}, Host: ${req.get('host')}`);
        
        try {
            const { tokens } = await client.getToken({
                code: code as string,
                redirect_uri: redirectUri
            });
            
            const ticket = await client.verifyIdToken({
                idToken: tokens.id_token!,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            
            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new Error("Invalid token payload");
            }

            console.log(`Authenticating user: ${payload.email}`);

            const adminWhitelist = getAdminWhitelist();
            if (!adminWhitelist.includes(payload.email)) {
                console.warn(`Unauthorized login attempt: ${payload.email}`);
                return res.status(403).send(`
                    <html>
                        <body>
                            <script>
                                if (window.opener) {
                                    window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: 'Unauthorized email' }, '*');
                                }
                                setTimeout(() => window.close(), 100);
                            </script>
                        </body>
                    </html>
                `);
            }

            // Set user in session
            req.session!.user = {
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            };

            res.send(`
                <html>
                    <body>
                        <script>
                            if (window.opener) {
                                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                            }
                            setTimeout(() => window.close(), 100);
                        </script>
                    </body>
                </html>
            `);
        } catch (error) {
            console.error("OAuth Callback Error:", error);
            res.status(500).send("Authentication failed");
        }
    });

    app.get("/api/auth/me", (req, res) => {
        console.log("Session check for /api/auth/me:", req.session?.user);
        res.json({ user: req.session?.user || null });
    });

    app.post("/api/auth/logout", (req, res) => {
        req.session = null;
        res.json({ success: true });
    });

    // --- DB Routes ---

    app.get("/api/db", async (req, res) => {
        const redis = getRedis();
        try {
            const keyType = await redis.type('constants');
            let rawData: any = null;

            if (keyType === 'none') {
                return res.status(404).json({ error: "Key 'constants' not found" });
            }

            if (keyType === 'ReJSON-RL' || keyType.toLowerCase() === 'json') {
                rawData = await redis.call('JSON.GET', 'constants', '$');
            } else if (keyType === 'string') {
                rawData = await redis.get('constants');
            } else if (keyType === 'hash') {
                const hashData = await redis.hgetall('constants');
                rawData = hashData.database_template || Object.values(hashData)[0];
            }

            let parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].about) {
                parsed = parsed[0];
            }

            res.json(parsed);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        } finally {
            await redis.quit();
        }
    });

    app.post("/api/db", async (req, res) => {
        if (!(req.session as any).user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const redis = getRedis();
        try {
            const newData = req.body;
            // We'll store it as a string to be safe across different Redis versions
            await redis.set('constants', JSON.stringify(newData));
            res.json({ success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        } finally {
            await redis.quit();
        }
    });

    // --- Vite Middleware ---

    if (process.env.NODE_ENV !== "production") {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    } else {
        app.use(express.static(path.join(__dirname, "dist")));
        app.get("*all", (req, res) => {
            res.sendFile(path.join(__dirname, "dist", "index.html"));
        });
    }

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
