/**
 * Authentication Service
 * Handles login, logout, token management, and session persistence
 */

// Storage keys
const TOKEN_KEY = 'techtonic_auth_token';
const USER_KEY = 'techtonic_auth_user';

export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    expiresIn: string;
    user: User;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string): Promise<LoginResponse | null> {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        const data: LoginResponse = await response.json();

        // Store credentials
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

/**
 * Logout and clear stored credentials
 */
export function logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

/**
 * Get current authentication state
 */
export function getAuthState(): AuthState {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);

    if (!token || !userStr) {
        return { isAuthenticated: false, user: null, token: null };
    }

    try {
        const user = JSON.parse(userStr);
        return { isAuthenticated: true, user, token };
    } catch {
        return { isAuthenticated: false, user: null, token: null };
    }
}

/**
 * Get stored token
 */
export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get stored user
 */
export function getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return !!getToken();
}

/**
 * Verify token with server
 */
export async function verifyToken(): Promise<boolean> {
    const token = getToken();
    if (!token) return false;

    try {
        const response = await fetch('/api/auth/verify', {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            // Token invalid or expired, clear storage
            logout();
            return false;
        }

        const data = await response.json();
        return data.valid === true;
    } catch (error) {
        console.error('Token verification error:', error);
        return false;
    }
}

/**
 * Make authenticated API request
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    // If unauthorized, clear credentials
    if (response.status === 401) {
        logout();
    }

    return response;
}

/**
 * User management functions (admin only)
 */
export const userManagement = {
    async getAll(): Promise<User[]> {
        const response = await authFetch('/api/auth/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    async create(email: string, password: string, name: string, role: string = 'admin'): Promise<User> {
        const response = await authFetch('/api/auth/users', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, role }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create user');
        }
        const data = await response.json();
        return data.user;
    },

    async update(id: number, updates: Partial<{ email: string; password: string; name: string; role: string }>): Promise<User> {
        const response = await authFetch('/api/auth/users', {
            method: 'PUT',
            body: JSON.stringify({ id, ...updates }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update user');
        }
        const data = await response.json();
        return data.user;
    },

    async delete(id: number): Promise<void> {
        const response = await authFetch('/api/auth/users', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete user');
        }
    },
};

export default {
    login,
    logout,
    getAuthState,
    getToken,
    getUser,
    isAuthenticated,
    verifyToken,
    authFetch,
    userManagement,
};
