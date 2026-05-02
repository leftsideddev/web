
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { db as initialDb, BACKEND_URL } from './constants';
import { DB, Game, BlogPost } from './types';

// --- DATABASE CONTEXT ---
interface DatabaseContextType {
    data: DB; // Filtered for listings/search
    allData: DB; // Unfiltered for direct links
    isSynced: boolean;
    syncWithCloud: () => Promise<void>;
}

export const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) throw new Error("useDatabase must be used within a DatabaseProvider");
    return context;
};

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rawDb, setRawDb] = useState<DB>(() => {
        const saved = localStorage.getItem('lss_database');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (!parsed.version || parsed.version < (initialDb.version || 0)) {
                console.log("Database version mismatch. Resetting to initial database.");
                return initialDb;
            }
            return parsed;
        }
        return initialDb;
    });

    const [isSynced, setIsSynced] = useState(false);

    const isPublic = (item: { isPublic?: boolean }) => {
        return item.isPublic !== false;
    };

    const sortByDate = (a: { date: string }, b: { date: string }) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (isNaN(dateA) || isNaN(dateB)) return 0;
        return dateB - dateA;
    };

    const data = useMemo(() => {
        const filtered = {
            ...rawDb,
            games: rawDb.games.filter(g => isPublic(g)),
            blogPosts: rawDb.blogPosts.filter(b => isPublic(b)).sort(sortByDate),
            news: rawDb.news.filter(n => isPublic(n)).sort(sortByDate),
            partners: rawDb.partners.filter(p => isPublic(p)),
            subsidiaries: rawDb.subsidiaries.filter(s => isPublic(s)).map(s => ({
                ...s,
                games: s.games.filter(g => isPublic(g)),
                series: s.series?.filter(ser => isPublic(ser))
            }))
        };
        return filtered;
    }, [rawDb]);

    useEffect(() => {
        localStorage.setItem('lss_database', JSON.stringify(rawDb));
    }, [rawDb]);

    useEffect(() => {
        syncWithCloud();
    }, []);

    const syncWithCloud = async () => {
        try {
            const response = await fetch(BACKEND_URL);
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.log("Cloud sync skipped: Backend function not found.");
                setIsSynced(false);
                return;
            }

            const result = await response.json();
            if (response.ok) {
                if (result && typeof result === 'object' && result.about) {
                    // Version check: If cloud version is older than local initialDb version, 
                    // we might want to keep the local one or at least warn.
                    const cloudVersion = result.version || 0;
                    const localVersion = initialDb.version || 0;
                    if (cloudVersion < localVersion) {
                        console.log(`Cloud database version (${cloudVersion}) is older than local version (${localVersion}). Keeping local data.`);
                        return;
                    }
                    setRawDb(result);
                    setIsSynced(true);
                    console.log("Database successfully synced from Cloud.");
                } else {
                    console.warn("Cloud data received but format is invalid.", result);
                    setIsSynced(false);
                }
            } else {
                console.error("Cloud Sync Rejected:", result.error || "Unknown error");
                setIsSynced(false);
            }
        } catch (e) {
            console.warn("Cloud sync network failure, using local state.");
            setIsSynced(false);
        }
    };

    return (
        <DatabaseContext.Provider value={{ data, allData: rawDb, isSynced, syncWithCloud }}>
            {children}
        </DatabaseContext.Provider>
    );
};

// --- THEME CONTEXT ---
interface ThemeContextType {
    isDarkMode: boolean;
    isHighContrast: boolean;
    toggleTheme: () => void;
    toggleHighContrast: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ 
    isDarkMode: true, 
    isHighContrast: false, 
    toggleTheme: () => {}, 
    toggleHighContrast: () => {} 
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    const [isHighContrast, setIsHighContrast] = useState(() => {
        const saved = localStorage.getItem('high-contrast');
        return saved === 'true';
    });

    useEffect(() => {
        document.body.classList.toggle('light-mode', !isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        document.body.classList.toggle('high-contrast', isHighContrast);
        localStorage.setItem('high-contrast', String(isHighContrast));
    }, [isHighContrast]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);
    const toggleHighContrast = () => setIsHighContrast(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, isHighContrast, toggleTheme, toggleHighContrast }}>
            {children}
        </ThemeContext.Provider>
    );
};
