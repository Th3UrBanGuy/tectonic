import React, { useState, useEffect } from 'react';
import Maintenance from '../pages/Maintenance';
import SystemOffline from '../pages/SystemOffline';

interface Props {
    children: React.ReactNode;
}

/**
 * SystemStatusWrapper — non-blocking, uses cached content data.
 *
 * Instead of making a separate API call, reads the system status from
 * localStorage cache (set by ContentContext's batch fetch).
 * No additional network requests — zero overhead.
 */
const SystemStatusWrapper: React.FC<Props> = ({ children }) => {
    const [status, setStatus] = useState<'live' | 'maintenance' | 'off'>('live');

    useEffect(() => {
        let mounted = true;

        const checkStatus = () => {
            try {
                const cached = localStorage.getItem('techtonic_all_content');
                if (!cached || !mounted) return;
                const data = JSON.parse(cached);
                const statusValue = String(data.systemStatus || 'live').toLowerCase();
                if (['live', 'maintenance', 'off'].includes(statusValue)) {
                    setStatus(statusValue as any);
                }
            } catch {
                // Ignore — app stays 'live'
            }
        };

        // Check once after mount (non-blocking)
        const timer = setTimeout(checkStatus, 1000);

        // Re-check when localStorage changes (e.g., after ContentContext fetches)
        window.addEventListener('storage', checkStatus);

        return () => {
            mounted = false;
            clearTimeout(timer);
            window.removeEventListener('storage', checkStatus);
        };
    }, []);

    if (status === 'maintenance') return <Maintenance />;
    if (status === 'off') return <SystemOffline />;
    return <>{children}</>;
};

export default SystemStatusWrapper;
