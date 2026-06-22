import React, { useState, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: () => void;
    nextButtonText?: string;
    backButtonText?: string;
}

export default function Stepper({
    children,
    initialStep = 1,
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    nextButtonText = 'Continue',
    backButtonText = 'Back',
    ...rest
}: StepperProps) {
    const [currentStep, setCurrentStep] = useState<number>(initialStep);
    const [direction, setDirection] = useState<number>(0);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isCompleted = currentStep > totalSteps;
    const isLastStep = currentStep === totalSteps;

    const updateStep = (newStep: number) => {
        setCurrentStep(newStep);
        if (newStep > totalSteps) {
            onFinalStepCompleted();
        } else {
            onStepChange(newStep);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (!isLastStep) {
            setDirection(1);
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        setDirection(1);
        updateStep(totalSteps + 1);
    };

    return (
        <div className="w-full" {...rest}>
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    {stepsArray.map((_, index) => {
                        const stepNumber = index + 1;
                        const isActive = currentStep === stepNumber;
                        const isComplete = currentStep > stepNumber;

                        return (
                            <React.Fragment key={stepNumber}>
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        animate={{
                                            scale: isActive ? 1.1 : 1,
                                            backgroundColor: isComplete ? '#10b981' : isActive ? '#8b5cf6' : '#e5e7eb'
                                        }}
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg relative z-10"
                                    >
                                        {isComplete ? (
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                <motion.path
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        ) : (
                                            <span className={isActive ? 'text-white' : 'text-slate-600'}>{stepNumber}</span>
                                        )}
                                    </motion.div>
                                    <span className="text-xs mt-2 font-medium text-slate-600 dark:text-gray-400 hidden sm:block">
                                        Step {stepNumber}
                                    </span>
                                </div>

                                {index < totalSteps - 1 && (
                                    <div className="flex-1 h-1 mx-2 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-purple-500 to-green-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: currentStep > stepNumber ? '100%' : '0%' }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <StepContentWrapper
                isCompleted={isCompleted}
                currentStep={currentStep}
                direction={direction}
            >
                {stepsArray[currentStep - 1]}
            </StepContentWrapper>

            {/* Navigation Buttons */}
            {!isCompleted && (
                <div className="flex items-center justify-between mt-8 gap-4">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-0 disabled:pointer-events-none text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800"
                    >
                        ← {backButtonText}
                    </button>

                    <button
                        onClick={isLastStep ? handleComplete : handleNext}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                    >
                        {isLastStep ? 'Submit →' : `${nextButtonText} →`}
                    </button>
                </div>
            )}
        </div>
    );
}

interface StepContentWrapperProps {
    isCompleted: boolean;
    currentStep: number;
    direction: number;
    children: ReactNode;
}

function StepContentWrapper({
    isCompleted,
    currentStep,
    direction,
    children
}: StepContentWrapperProps) {
    const [parentHeight, setParentHeight] = useState<number>(0);

    return (
        <motion.div
            style={{ position: 'relative', overflow: 'hidden', minHeight: parentHeight }}
            animate={{ height: isCompleted ? 0 : parentHeight }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!isCompleted && (
                    <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
                        {children}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface SlideTransitionProps {
    children: ReactNode;
    direction: number;
    onHeightReady: (height: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            // Use requestAnimationFrame to ensure DOM is fully rendered
            requestAnimationFrame(() => {
                if (containerRef.current) {
                    const height = containerRef.current.scrollHeight;
                    onHeightReady(height);
                }
            });
        }
    }, [children, onHeightReady]);

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
        >
            {children}
        </motion.div>
    );
}

const stepVariants: Variants = {
    enter: (dir: number) => ({
        x: dir >= 0 ? '100%' : '-100%',
        opacity: 0
    }),
    center: {
        x: '0%',
        opacity: 1
    },
    exit: (dir: number) => ({
        x: dir >= 0 ? '-100%' : '100%',
        opacity: 0
    })
};

interface StepProps {
    children: ReactNode;
}

export function Step({ children }: StepProps) {
    return <div className="py-6">{children}</div>;
}
