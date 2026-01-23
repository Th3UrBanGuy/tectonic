import React from 'react';

const TectonicLogo = () => {
    return (
        <div className="tectonic-logo-container">
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Montserrat:wght@700&display=swap');
        `}
            </style>

            {/* Pill Container */}
            <div className="tectonic-pill">
                <h1 className="tectonic-main-text">TECTONIC</h1>
            </div>

            {/* Subtext */}
            <div className="tectonic-subtext-container">
                <h2 className="tectonic-subtext">FOUNDATION OF FUTURE</h2>
            </div>
        </div>
    );
};

export default TectonicLogo;
