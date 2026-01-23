import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { motion } from 'framer-motion';
import { Loader2, Lock } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

/**
 * Wrapper component for protected routes
 * Redirects to login if not authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-bg">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <Loader2 className="w-12 h-12 text-brand-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 font-mono text-sm">Verifying access...</p>
                </motion.div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check admin requirement
    if (requireAdmin && user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-bg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-8 bg-gray-900/50 rounded-xl border border-red-500/30"
                >
                    <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
                    <p className="text-gray-400">Admin privileges required.</p>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
