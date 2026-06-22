/**
 * Skeleton screen components — shown while DB content is loading.
 * Mimics the layout of the actual page so the transition feels instant.
 */

import React from 'react';
import { motion } from 'framer-motion';

// Animated shimmer effect
const shimmer = 'animate-pulse';

// Skeleton block
const Block = ({ className = '' }: { className?: string }) => (
    <div className={`${shimmer} bg-slate-200 dark:bg-white/5 rounded-lg ${className}`} />
);

// Home page skeleton
export const HomeSkeleton = () => (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
        {/* Hero */}
        <div className="h-screen flex items-center justify-center pt-24">
            <div className="text-center max-w-3xl mx-auto px-6 space-y-6">
                <Block className="h-16 w-64 mx-auto" />
                <Block className="h-6 w-96 mx-auto" />
                <Block className="h-12 w-48 mx-auto rounded-full" />
            </div>
        </div>
        {/* Cards grid */}
        <div className="py-24 max-w-7xl mx-auto px-6">
            <Block className="h-8 w-48 mx-auto mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <Block key={i} className="h-40 w-full" />
                ))}
            </div>
        </div>
        {/* Projects */}
        <div className="py-24 max-w-7xl mx-auto px-6">
            <Block className="h-10 w-64 mx-auto mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <Block key={i} className="h-64 w-full" />
                ))}
            </div>
        </div>
    </div>
);

// Wings page skeleton
export const WingsSkeleton = () => (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 px-4 sm:px-6 bg-slate-50 dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Tabs */}
            <div className="flex gap-2 pb-4">
                <Block className="h-10 w-32" />
                <Block className="h-10 w-32" />
            </div>
            {/* Hero card */}
            <Block className="h-48 w-full" />
            {/* Content grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <Block key={i} className="h-32 w-full" />)}
            </div>
        </div>
    </div>
);

// Company page skeleton
export const CompanySkeleton = () => (
    <div className="min-h-screen pt-24 pb-24 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-4">
                <Block className="h-4 w-48 mx-auto" />
                <Block className="h-12 w-80 mx-auto" />
                <Block className="h-24 w-full max-w-2xl mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <Block key={i} className="h-20 w-full" />)}
            </div>
            <Block className="h-48 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => <Block key={i} className="h-64 w-full" />)}
            </div>
        </div>
    </div>
);

// Portfolio page skeleton
export const PortfolioSkeleton = () => (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-slate-50 dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 space-y-4">
                <Block className="h-4 w-24 mx-auto" />
                <Block className="h-10 w-48 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="space-y-3">
                        <Block className="h-40 w-full" />
                        <Block className="h-4 w-3/4" />
                        <Block className="h-3 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Contact page skeleton
export const ContactSkeleton = () => (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 bg-slate-50 dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                <Block className="h-12 w-48" />
                <Block className="h-6 w-full" />
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 items-start">
                        <Block className="h-12 w-12 rounded-lg" />
                        <div className="space-y-2 flex-1">
                            <Block className="h-4 w-32" />
                            <Block className="h-3 w-48" />
                        </div>
                    </div>
                ))}
            </div>
            <Block className="h-96 w-full rounded-3xl" />
        </div>
    </div>
);

// Generic page skeleton
export const PageSkeleton = () => (
    <div className="min-h-screen pt-20 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
            <Block className="h-10 w-64" />
            <Block className="h-4 w-full" />
            <Block className="h-4 w-3/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[1, 2, 3].map(i => <Block key={i} className="h-48 w-full" />)}
            </div>
        </div>
    </div>
);
