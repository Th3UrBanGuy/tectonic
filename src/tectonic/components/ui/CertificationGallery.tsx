"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, ChevronLeft, ChevronRight, ShieldCheck, Trophy, BadgeCheck, FileCheck } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  link: string;
  category: string;
  orderIndex: number;
  isActive: boolean;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  certification: ShieldCheck,
  award: Trophy,
  license: BadgeCheck,
  completion: FileCheck,
};

const CATEGORY_COLORS: Record<string, string> = {
  certification: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400',
  award: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  license: 'from-emerald-500/10 to-green-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  completion: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
};

const CertificationGallery: React.FC<{ items: GalleryItem[] }> = ({ items }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const activeItems = items.filter((item) => item.isActive !== false);

  if (activeItems.length === 0) return null;

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevItem = () => setLightboxIdx((prev) => (prev !== null ? (prev - 1 + activeItems.length) % activeItems.length : null));
  const nextItem = () => setLightboxIdx((prev) => (prev !== null ? (prev + 1) % activeItems.length : null));

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeItems.map((item, idx) => {
          const Icon = CATEGORY_ICONS[item.category] || Award;
          const colorClass = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.certification;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.05 }}
              className="group relative bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-brand-300/50 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-100/20 dark:hover:shadow-brand-500/5"
            >
              {/* Image Preview */}
              {item.imageUrl ? (
                <div
                  className="relative h-44 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(idx)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
                      Click to view
                    </span>
                  </div>
                </div>
              ) : (
                <div className={`h-44 bg-gradient-to-br ${colorClass.split(' ').slice(0, 2).join(' ')} flex items-center justify-center`}>
                  <Icon size={48} className={`${colorClass.split(' ')[2]} opacity-40`} />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-gradient-to-r ${colorClass}`}>
                    <Icon size={10} />
                    {item.category}
                  </span>
                  {item.date && (
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{item.date}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">
                  {item.title}
                </h3>

                {/* Issuer */}
                {item.issuer && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">{item.issuer}</p>
                )}

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 mb-3">{item.description}</p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  {item.imageUrl && (
                    <button
                      onClick={() => openLightbox(idx)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      View Certificate
                    </button>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors ml-auto"
                    >
                      <ExternalLink size={11} /> Verify
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && activeItems[lightboxIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              {/* Nav Arrows */}
              {activeItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevItem(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextItem(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Image */}
              {activeItems[lightboxIdx].imageUrl && (
                <div className="relative h-[60vh] bg-slate-100 dark:bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeItems[lightboxIdx].imageUrl}
                    alt={activeItems[lightboxIdx].title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Info Bar */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {activeItems[lightboxIdx].title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                      {activeItems[lightboxIdx].issuer && (
                        <span className="font-mono">{activeItems[lightboxIdx].issuer}</span>
                      )}
                      {activeItems[lightboxIdx].date && (
                        <span className="font-mono">{activeItems[lightboxIdx].date}</span>
                      )}
                    </div>
                    {activeItems[lightboxIdx].description && (
                      <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">{activeItems[lightboxIdx].description}</p>
                    )}
                  </div>
                  {activeItems[lightboxIdx].link && (
                    <a
                      href={activeItems[lightboxIdx].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors flex-shrink-0"
                    >
                      <ExternalLink size={14} /> Verify Online
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificationGallery;
