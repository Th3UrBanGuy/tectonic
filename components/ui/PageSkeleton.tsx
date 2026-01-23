import React from 'react';

const PageSkeleton = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 pt-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto animate-pulse">

                {/* Hero Section Placeholder */}
                <div className="flex flex-col items-center text-center space-y-8 mb-20">
                    {/* Badge Placeholder */}
                    <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-full mb-4"></div>

                    {/* Title Placeholder */}
                    <div className="space-y-4 w-full flex flex-col items-center">
                        <div className="h-12 sm:h-16 w-3/4 md:w-2/3 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                        <div className="h-12 sm:h-16 w-1/2 md:w-1/3 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    </div>

                    {/* Description Placeholder */}
                    <div className="space-y-3 w-full max-w-2xl mt-6">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mx-auto"></div>
                    </div>

                    {/* Buttons Placeholder */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <div className="h-14 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        <div className="h-14 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    </div>
                </div>

                {/* Grid/Content Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col space-y-4">
                            <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageSkeleton;
