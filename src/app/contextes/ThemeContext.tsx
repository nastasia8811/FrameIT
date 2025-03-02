"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from "react";
import { getThemeColors, Theme } from "@/app/theme";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    colors: ReturnType<typeof getThemeColors>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");
    const [isClient, setIsClient] = useState(false); // Используем для отслеживания рендеринга на клиенте

    useEffect(() => {
        // Это выполнится только на клиенте
        setIsClient(true);

        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const colors = getThemeColors(theme);

    useEffect(() => {
        if (isClient) { // Теперь стиль меняется только на клиенте
            document.documentElement.style.background = colors.background;
            document.documentElement.style.color = colors.text;
            localStorage.setItem("theme", theme);
        }
    }, [theme, colors, isClient]);

    const toggleTheme = useCallback(() => {
        setTheme((prevMode) => (prevMode === "light" ? "dark" : "light"));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
