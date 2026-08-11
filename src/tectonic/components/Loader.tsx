"use client";
import React, { useEffect, useState } from 'react';

const Loader = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 100),   // pill expands
            setTimeout(() => setPhase(2), 500),   // text reveals
            setTimeout(() => setPhase(3), 800),   // subtext drops
            setTimeout(() => setPhase(4), 1200),  // accent line appears
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="logo-loader-container">
            <style>
                {`
                    @keyframes expandPill {
                        0% { width: 50px; opacity: 0; transform: scaleX(0.8); }
                        50% { width: 360px; opacity: 1; transform: scaleX(1.03); }
                        75% { width: 335px; transform: scaleX(0.99); }
                        100% { width: 340px; opacity: 1; transform: scaleX(1); }
                    }

                    @keyframes slideUpReveal {
                        0% { transform: translateY(110%); opacity: 0; }
                        60% { transform: translateY(-5%); opacity: 1; }
                        100% { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes fadeInDrop {
                        0% { opacity: 0; transform: translateY(-15px); letter-spacing: 2px; }
                        60% { transform: translateY(2px); }
                        100% { opacity: 1; transform: translateY(0); letter-spacing: 0.5px; }
                    }

                    @keyframes subtlePulse {
                        0% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 0 rgba(20,184,166,0); }
                        50% { box-shadow: 0 6px 20px rgba(0,0,0,0.25), 0 0 30px 2px rgba(20,184,166,0.08); }
                        100% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 0 rgba(20,184,166,0); }
                    }

                    @keyframes subtlePulseDark {
                        0% { box-shadow: 0 4px 12px rgba(255,255,255,0.08), 0 0 0 0 rgba(20,184,166,0); }
                        50% { box-shadow: 0 6px 20px rgba(255,255,255,0.15), 0 0 30px 2px rgba(20,184,166,0.12); }
                        100% { box-shadow: 0 4px 12px rgba(255,255,255,0.08), 0 0 0 0 rgba(20,184,166,0); }
                    }

                    @keyframes accentFade {
                        0% { opacity: 0; transform: scaleX(0); }
                        100% { opacity: 1; transform: scaleX(1); }
                    }
                `}
            </style>

            {/* Pill */}
            <div className="logo-pill-container" style={{
                animation: phase >= 1
                    ? `expandPill 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards, ${document.documentElement.classList.contains('dark') ? 'subtlePulseDark' : 'subtlePulse'} 3s ease-in-out 1.5s infinite`
                    : 'none',
                opacity: phase >= 1 ? 1 : 0,
            }}>
                <div className="logo-text-overflow">
                    <span className="logo-main-text" style={{
                        animation: phase >= 2 ? 'slideUpReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'none',
                        opacity: 0,
                    }}>
                        TECTONIC
                    </span>
                </div>
            </div>

            {/* Subtext */}
            <div className="logo-subtext-container">
                <span className="logo-subtext" style={{
                    animation: phase >= 3 ? 'fadeInDrop 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'none',
                    opacity: 0,
                }}>
                    FOUNDATION OF FUTURE
                </span>
            </div>

            {/* Accent line under subtext */}
            <div style={{
                marginTop: '10px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #14b8a6, transparent)',
                animation: phase >= 4 ? 'accentFade 0.6s ease-out forwards' : 'none',
                opacity: 0,
                transform: 'scaleX(0)',
                width: '80px',
            }} />
        </div>
    );
};

export default Loader;
