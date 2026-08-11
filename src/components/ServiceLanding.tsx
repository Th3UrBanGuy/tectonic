"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Cpu,
  ChevronRight,
} from "lucide-react";

interface ServiceLandingProps {
  industry: {
    name: string;
    slug: string;
    description: string;
  };
  servicePage: {
    title: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    bodyContent: string;
    features: string[];
    techStack: string[];
    ctaText: string;
    ctaLink: string;
  };
}

export default function ServiceLanding({
  industry,
  servicePage,
}: ServiceLandingProps) {
  return (
    <article className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-purple-50/30 dark:from-brand-950/20 dark:to-purple-950/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-gray-500 mb-8">
            <Link
              href="/"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link
              href={`/${industry.slug}`}
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              {industry.name}
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-slate-900 dark:text-white font-bold" aria-current="page">
              {servicePage.heroTitle}
            </span>
          </nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6"
          >
            <Cpu size={14} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
            <span className="text-xs font-mono text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              {industry.name}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            {servicePage.heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-600 dark:text-brand-400 font-mono mb-4"
          >
            {servicePage.heroSubtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl mb-10 leading-relaxed"
          >
            {servicePage.heroDescription}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href={servicePage.ctaLink}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              {servicePage.ctaText}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Body Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              {servicePage.bodyContent}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      {servicePage.features && servicePage.features.length > 0 && (
        <section className="py-20 px-6 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center"
            >
              What We Deliver
            </motion.h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
              {servicePage.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-500/50 transition-all duration-300"
                >
                  <CheckCircle
                    size={20}
                    className="text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-slate-700 dark:text-gray-300 font-medium">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {servicePage.techStack && servicePage.techStack.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Technology Stack
            </motion.h2>
            <ul className="flex flex-wrap justify-center gap-3 list-none p-0">
              {servicePage.techStack.map((tech, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-mono text-slate-700 dark:text-gray-300 hover:border-brand-500/50 transition-colors"
                >
                  {tech}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-brand-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your {industry.name} Operations?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Let&apos;s discuss how Techtonic can build the software solutions
            your business needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-700 rounded-xl font-bold hover:bg-slate-100 transition-all duration-300 hover:scale-105 group"
            >
              Start a Conversation
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
