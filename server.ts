import express from "express";
import { createServer as createViteServer } from "vite";
import Redis from "ioredis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
    const app = express();
    const PORT = 3000;

    const getRedis = () => {
        const password = process.env.REDIS_PASSWORD;
        if (!password) throw new Error("REDIS_PASSWORD is missing");
        const REDIS_URL = `redis://default:${encodeURIComponent(password)}@redis-18662.c8.us-east-1-4.ec2.cloud.redislabs.com:18662`;
        return new Redis(REDIS_URL);
    };

    app.use(express.json({ limit: '10mb' }));

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
