import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/tectonic/lib/router';
import { useContent } from '../components/ContentContext';

// Extracted Components
const ThreeDBackground = React.lazy(() => import('../components/home/ThreeDBackground'));
import HeroTitle from '../components/home/HeroTitle';
import CyberpunkButton from '../components/ui/CyberpunkButton';
import WingsFeatureSection from '../components/ui/WingsFeatureSection';
import FeaturedProjectCard from '../components/ui/FeaturedProjectCard';
import WhatWeDeliver from '../components/home/WhatWeDeliver';
import { HomeSkeleton } from '../components/ui/Skeleton';

const Home = () => {
  const { projects, homeContent, contentLoaded } = useContent();

  if (!contentLoaded) return <HomeSkeleton />;

  // Use DB content if available, fall back to static
  const content = homeContent || {};
  const displayProjects = projects.length > 0 ? projects : [];

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500 pt-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Light mode gradient blobs */}
          <div className="absolute inset-0 dark:hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/30 to-blue-300/30 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-[100px]"></div>
            <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-full blur-[100px]"></div>
          </div>

          <div className="hidden dark:block absolute inset-0">
            <React.Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
              <ThreeDBackground key="home-3d-bg" />
            </React.Suspense>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] -z-10 pointer-events-none dark:block hidden"
          />

          <HeroTitle />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-2xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 font-light"
          >
            {content?.hero?.description || 'Architecting tomorrow\'s infrastructure.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CyberpunkButton to="/wings">
              {content?.hero?.buttons?.primary || 'EXPLORE ECOSYSTEM'} <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </CyberpunkButton>
          </motion.div>
        </div>
      </section>

      {/* What We Deliver Section */}
      < WhatWeDeliver />

      {/* Ecosystem Grid */}
      < section className="py-24 bg-slate-50 dark:bg-dark-bg relative z-10 border-t border-slate-200 dark:border-gray-900 transition-colors duration-500" >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-slate-900 dark:text-white">{content?.wings?.title || 'OUR WINGS'}</h2>
            <div className="w-24 h-1 bg-brand-600 mx-auto"></div>
          </div>

          <WingsFeatureSection />
        </div>
      </section >

      {/* Project Details Section */}
      < section className="py-24 border-t border-slate-200 dark:border-gray-900 bg-white dark:bg-[#050505] relative overflow-hidden" >
        {/* Background Pattern */}
        < div className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}>
        </div >

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-mono font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent"
            >
              {content?.projects?.title || 'FEATURED PROJECTS'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
            >
              {content?.projects?.description || 'Real-world solutions delivering measurable impact'}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.slice(0, 3).map((project, index) => (
              <FeaturedProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* View All Projects Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-orange-500/10 hover:from-cyan-500/20 hover:via-purple-500/20 hover:to-orange-500/20 border border-slate-200/60 dark:border-gray-700/50 backdrop-blur-xl text-slate-900 dark:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <span>{content?.projects?.viewAll || 'View All Projects'}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section >
    </>
  );
};

export default Home;
