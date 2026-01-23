import React, { useEffect, useState } from 'react';

interface AnimatedLogoProps {
    className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '' }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`animated-logo-wrapper ${className}`}>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

          @keyframes expandPillNav {
            0% { width: 30px; opacity: 0; }
            100% { width: 180px; opacity: 1; }
          }

          @keyframes slideUpRevealNav {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
            </style>

            <div
                className="logo-pill-nav"
                style={{
                    animation: isAnimated ? 'expandPillNav 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
                    opacity: isAnimated ? 1 : 0,
                }}
            >
                <div className="logo-text-overflow-nav">
                    <h1
                        className="logo-main-text-nav"
                        style={{
                            animation: isAnimated ? 'slideUpRevealNav 0.5s ease-out 0.3s forwards' : 'none',
                            opacity: 0,
                        }}
                    >
                        TECTONIC
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default AnimatedLogo;
