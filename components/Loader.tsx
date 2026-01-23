import React, { useEffect, useState } from 'react';

const Loader = () => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="logo-loader-container">
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Montserrat:wght@700&display=swap');

          @keyframes expandPill {
            0% { width: 50px; opacity: 0; transform: scaleX(0.8); }
            60% { width: 350px; opacity: 1; transform: scaleX(1.05); }
            100% { width: 330px; opacity: 1; transform: scaleX(1); }
          }

          @keyframes slideUpReveal {
            0% { transform: translateY(110%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          @keyframes fadeInDrop {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes subtlePulse {
            0% { box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
            50% { box-shadow: 0 8px 25px rgba(0,0,0,0.35); }
            100% { box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
          }

          /* Dark mode pulse */
          @keyframes subtlePulseDark {
            0% { box-shadow: 0 5px 15px rgba(255,255,255,0.2); }
            50% { box-shadow: 0 8px 25px rgba(255,255,255,0.35); }
            100% { box-shadow: 0 5px 15px rgba(255,255,255,0.2); }
          }
        `}
            </style>

            <div className="logo-pill-container" style={{
                animation: isAnimated
                    ? 'expandPill 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, subtlePulse 3s ease-in-out 1s infinite'
                    : 'none',
                opacity: isAnimated ? 1 : 0,
            }}>
                <div className="logo-text-overflow">
                    <h1 className="logo-main-text" style={{
                        animation: isAnimated ? 'slideUpReveal 0.6s ease-out 0.4s forwards' : 'none',
                        opacity: 0,
                    }}>
                        TECTONIC
                    </h1>
                </div>
            </div>

            <div className="logo-subtext-container">
                <h2 className="logo-subtext" style={{
                    animation: isAnimated ? 'fadeInDrop 0.8s ease-out 0.7s forwards' : 'none',
                    opacity: 0,
                }}>
                    FOUNDATION OF FUTURE
                </h2>
            </div>
        </div>
    );
};

export default Loader;
