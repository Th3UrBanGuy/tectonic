"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

interface IndustryPageProps {
  industry: {
    name: string;
    slug: string;
    description: string;
  };
  servicePages: {
    slug: string;
    title: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    ctaLink: string;
  }[];
}

export default function IndustryPageClient({
  industry,
  servicePages,
}: IndustryPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-500">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-purple-50/30 dark:from-brand-950/20 dark:to-purple-950/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-gray-500 mb-8">
            <Link
              href="/"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-900 dark:text-white font-bold">
              {industry.name}
            </span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            {industry.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl leading-relaxed"
          >
            {industry.description}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            Solutions for {industry.name}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePages.map((sp, index) => (
              <motion.div
                key={sp.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={sp.ctaLink}
                  className="block h-full p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-500/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {sp.heroTitle}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {sp.heroDescription}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-mono font-bold text-brand-600 dark:text-brand-400">
                    Learn More
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
