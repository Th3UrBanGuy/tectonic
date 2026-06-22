import React, { useEffect } from 'react';
import { useSearchParams } from '@/tectonic/lib/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../components/ContentContext';
import WingHeroCard from '../components/ui/WingHeroCard';
import CapabilityCard from '../components/ui/CapabilityCard';
import TechStackGrid from '../components/ui/TechStackGrid';
import TimelineCard from '../components/ui/TimelineCard';
import AchievementCard from '../components/ui/AchievementCard';
import MissionCard from '../components/ui/MissionCard';
import { WingsSkeleton } from '../components/ui/Skeleton';

const Wings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wings, contentLoaded } = useContent();
  const allWings = wings;
  const activeWingId = searchParams.get('id') || allWings[0]?.id || 'software';
  const activeWing = allWings.find(w => w.id === activeWingId) || allWings[0] || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeWingId]);

  if (!contentLoaded) return <WingsSkeleton />;

  if (!activeWing) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-12 px-4 sm:px-6 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Check if this wing has team data
  const hasTeamData = activeWing.teamName && activeWing.teamLogo;

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 px-4 sm:px-6 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-12 border-b border-slate-200 dark:border-gray-800 pb-4 scrollbar-hide">
          {allWings.map((wing) => (
            <button
              key={wing.id}
              onClick={() => setSearchParams({ id: wing.id })}
              className={`flex-shrink-0 px-6 py-3 rounded-t-xl font-mono text-sm transition-all duration-300 whitespace-nowrap ${activeWingId === wing.id
                ? 'bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-b-2 border-purple-500 shadow-lg'
                : 'text-slate-500 hover:text-slate-800 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-900/50'
                }`}
            >
              {wing.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeWing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-16"
          >
            {hasTeamData ? (
              // MODERN TEAM LAYOUT
              <>
                {/* Hero Section */}
                <WingHeroCard
                  teamName={activeWing.teamName!}
                  teamLogo={activeWing.teamLogo!}
                  teamSubtitle={activeWing.teamSubtitle}
                  achievementsCount={activeWing.teamAchievements?.length || 0}
                  techCount={activeWing.techStack.length}
                  milestonesCount={activeWing.teamTimeline?.length || 0}
                />

                {/* Mission Statement */}
                {activeWing.teamPurpose && (
                  <MissionCard mission={activeWing.teamPurpose} />
                )}

                {/* Core Capabilities */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                    Core Capabilities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeWing.features.map((feature, index) => (
                      <CapabilityCard key={index} title={feature} index={index} />
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <TechStackGrid technologies={activeWing.techStack} />

                {/* Timeline & Achievements Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Timeline */}
                  {activeWing.teamTimeline && activeWing.teamTimeline.length > 0 && (
                    <TimelineCard timeline={activeWing.teamTimeline} />
                  )}

                  {/* Achievements */}
                  {activeWing.teamAchievements && activeWing.teamAchievements.length > 0 && (
                    <AchievementCard achievements={activeWing.teamAchievements} />
                  )}
                </div>
              </>
            ) : (
              // FALLBACK FOR NON-TEAM WINGS (if any exist)
              <div className="text-center py-20">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  {activeWing.name}
                </h2>
                <p className="text-xl text-slate-600 dark:text-gray-400">
                  {activeWing.description}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wings;