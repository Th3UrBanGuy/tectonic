import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedLogoProps {
    onAnimationComplete?: () => void;
    theme?: 'light' | 'dark';
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
    onAnimationComplete,
    theme = 'dark'
}) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    // Auto-complete after animation finishes
    useEffect(() => {
        if (isAnimated && onAnimationComplete) {
            const timer = setTimeout(() => {
                onAnimationComplete();
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isAnimated, onAnimationComplete]);

    const activeColors = theme === 'light' ? {
        bg: '#f0f2f5',
        pillBg: '#000000',
        mainText: '#FFFFFF',
        subText: '#000000'
    } : {
        bg: '#0a0a0a',
        pillBg: '#FFFFFF',
        mainText: '#000000',
        subText: '#FFFFFF'
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen w-screen fixed top-0 left-0 z-[9999] transition-colors duration-300"
            style={{ backgroundColor: activeColors.bg }}
        >
            <div className="flex flex-col items-center justify-center p-5">
                {/* Pill Container */}
                <motion.div
                    initial={{ width: 50, opacity: 0, scaleX: 0.8 }}
                    animate={{
                        width: [50, 250, 240], // Expansion sequence for mobile
                        opacity: 1,
                        scaleX: [0.8, 1.05, 1],
                        transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
                    }}
                    className="rounded-full py-2.5 px-0 flex items-center justify-center overflow-hidden shadow-lg"
                    style={{
                        backgroundColor: activeColors.pillBg,
                        // Note: Media query based width override needs handle carefully in framer-motion or CSS
                    }}
                >
                    {/* Desktop width adjustment via CSS module or simple conditional logic if width is critical. 
                       Here assuming responsive behavior handled by internal content or additional layout constraints. 
                       For strict pixel match with old CSS, we'd need useMediaQuery or similar, but simplified here. */}

                    <div className="overflow-hidden px-5">
                        <motion.h1
                            initial={{ y: "110%", opacity: 0 }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                transition: { delay: 0.4, duration: 0.6, ease: "easeOut" }
                            }}
                            className="font-black text-[clamp(24px,6vw,42px)] m-0 tracking-[clamp(1px,0.5vw,3px)] uppercase leading-none"
                            style={{
                                fontFamily: '"Orbitron", sans-serif',
                                color: activeColors.mainText
                            }}
                        >
                            TECTONIC
                        </motion.h1>
                    </div>
                </motion.div>

                {/* Subtext */}
                <div className="mt-2 overflow-hidden">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.7, duration: 0.8, ease: "easeOut" }
                        }}
                        className="font-bold text-[clamp(10px,2.5vw,15px)] m-0 uppercase tracking-[clamp(0.3px,0.1vw,0.5px)]"
                        style={{
                            fontFamily: '"Montserrat", sans-serif',
                            color: activeColors.subText
                        }}
                    >
                        FOUNDATION OF FUTURE
                    </motion.h2>
                </div>
            </div>
        </div>
    );
};

export default AnimatedLogo;
