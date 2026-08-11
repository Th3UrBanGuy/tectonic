import React from 'react';

interface TectonicLogoProps {
    compact?: boolean;
}

const TectonicLogo: React.FC<TectonicLogoProps> = ({ compact = false }) => {
    if (compact) {
        return (
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-500/25">
                <span className="text-white text-sm font-black">T</span>
            </div>
        );
    }

    return (
        <div className="tectonic-logo-container">
            <div className="tectonic-pill">
                <span className="tectonic-main-text">TECTONIC</span>
            </div>
            <div className="tectonic-subtext-container">
                <span className="tectonic-subtext">FOUNDATION OF FUTURE</span>
            </div>
        </div>
    );
};

export default TectonicLogo;
