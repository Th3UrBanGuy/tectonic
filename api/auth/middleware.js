import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_in_production';

/**
 * Verify JWT token from request headers
 * @param {Request} req - The incoming request
 * @returns {object|null} - Decoded user data or null if invalid
 */
export function verifyToken(req) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        const decoded = jwt.verify(token, JWT_SECRET);

        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
}

/**
 * Middleware wrapper for protected API routes
 * @param {Function} handler - The API handler function
 * @returns {Function} - Protected handler
 */
export function withAuth(handler) {
    return async (req, res) => {
        const user = verifyToken(req);

        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Valid authentication token required'
            });
        }

        // Attach user to request
        req.user = user;

        return handler(req, res);
    };
}

/**
 * Check if user has admin role
 */
export function isAdmin(user) {
    return user && user.role === 'admin';
}

/**
 * Middleware for admin-only routes
 */
export function withAdminAuth(handler) {
    return async (req, res) => {
        const user = verifyToken(req);

        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Valid authentication token required'
            });
        }

        if (!isAdmin(user)) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Admin access required'
            });
        }

        req.user = user;
        return handler(req, res);
    };
}
