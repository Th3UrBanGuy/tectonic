import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('techtonic-theme') as Theme;
        if (savedTheme) {
            setThemeState(savedTheme);
            updateDocumentClass(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setThemeState('dark');
            updateDocumentClass('dark');
        }
    }, []);

    const updateDocumentClass = (newTheme: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        updateDocumentClass(newTheme);
        localStorage.setItem('techtonic-theme', newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
