import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Maintenance from '../pages/Maintenance';
import SystemOffline from '../pages/SystemOffline';

interface Props {
    children: React.ReactNode;
}

const SystemStatusWrapper: React.FC<Props> = ({ children }) => {
    const [status, setStatus] = useState<'live' | 'maintenance' | 'off' | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStatus = async () => {
        try {
            // Add timestamp to prevent caching
            const response = await fetch(`https://api.npoint.io/c953da24175393154ada/status?t=${new Date().getTime()}`);
            const data = await response.json();

            // Robustly handle string or object response
            let statusValue = '';
            if (typeof data === 'string') {
                statusValue = data;
            } else if (typeof data === 'object' && data !== null && data.status) {
                statusValue = data.status;
            }

            // Normalize to lower case just in case
            return statusValue.toLowerCase();
        } catch (error) {
            console.error("System status check failed:", error);
            // In case of error (e.g. network issue), we might want to fallback to 'off' or keep previous
            // For initial load, if we can't reach the status server, 'off' or 'live' is a design choice.
            // safely defaulting to 'off' if it completely fails to ensure we don't show a broken app.
            return 'off';
        }
    };

    useEffect(() => {
        const init = async () => {
            // Run fetch and minimum timer in parallel
            // We wait for at least 2000ms (Loader animation time) OR the fetch, whichever is longer.
            // This ensures the loader does not flash if fetch is super fast, 
            // and keeps the "nice" UX while doing work in background.
            const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
            const statusPromise = fetchStatus();

            const [_, resultStatus] = await Promise.all([minLoadTime, statusPromise]);

            // Validate result status
            if (['live', 'maintenance', 'off'].includes(resultStatus)) {
                setStatus(resultStatus as any);
            } else {
                // Fallback if API returns weird data
                setStatus('live');
            }

            setLoading(false);
        };

        init();

        // Polling every 30 seconds
        const intervalId = setInterval(async () => {
            const resultStatus = await fetchStatus();
            if (['live', 'maintenance', 'off'].includes(resultStatus)) {
                setStatus(resultStatus as any);
            }
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (status === 'maintenance') {
        return <Maintenance />;
    }

    if (status === 'off') {
        return <SystemOffline />;
    }

    // Default: Render the app (Live)
    return <>{children}</>;
};

export default SystemStatusWrapper;
