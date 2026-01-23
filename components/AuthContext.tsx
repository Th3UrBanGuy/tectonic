import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/auth';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // Check authentication on mount
    const refreshAuth = useCallback(async () => {
        setIsLoading(true);
        try {
            const state = authService.getAuthState();

            if (state.isAuthenticated && state.token) {
                // Verify token is still valid
                const isValid = await authService.verifyToken();

                if (isValid) {
                    setIsAuthenticated(true);
                    setUser(state.user);
                } else {
                    // Token expired or invalid
                    authService.logout();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Auth refresh error:', error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshAuth();
    }, [refreshAuth]);

    const login = async (email: string, password: string) => {
        try {
            const result = await authService.login(email, password);

            if (result) {
                setIsAuthenticated(true);
                setUser(result.user);
                return { success: true };
            }

            return { success: false, error: 'Login failed' };
        } catch (error: any) {
            return { success: false, error: error.message || 'Login failed' };
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            user,
            login,
            logout,
            refreshAuth,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
