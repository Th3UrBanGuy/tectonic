import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion';
import {
  FlaskConical, ArrowRight,
  Layers, Zap, Cloud, Cpu, Network, Bot,
  Lock, Calendar, Activity, CheckCircle2,
  Code, Server, Database, Smartphone, Globe, Shield, Sparkles, Rocket, Star
} from 'lucide-react';
import { useContent } from '../components/ContentContext';
import Loader from '../components/Loader';

// Icon mapping
const iconMap: Record<string, any> = {
  Layers, Zap, Cloud, Cpu, Network, Bot, Code, Server, Database,
  Smartphone, Globe, Shield, FlaskConical
};

const Innovation = () => {
  const { innovationContent, techStack, roadmap, isLoading } = useContent();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading || !innovationContent.hero) {
    return <Loader />;
  }

  const INNOVATION_CONTENT = innovationContent;
  const INNOVATION_TECH_STACK = techStack;
  const INNOVATION_ROADMAP = roadmap;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-[#050505] relative overflow-hidden">
      {/* Enhanced Animated Background with Multiple Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/15 dark:bg-orange-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1.4, 1.1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center relative"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 rounded-full border border-purple-300 dark:border-purple-700/50 mb-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-mono text-purple-700 dark:text-purple-300 uppercase tracking-wider relative z-10">{INNOVATION_CONTENT.hero.badge}</span>
          </motion.div>

          {/* Animated Title with Gradient */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 relative"
          >
            <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-orange-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {INNOVATION_CONTENT.hero.title}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            {INNOVATION_CONTENT.hero.description}
          </motion.p>


        </motion.div>

        {/* Tech Stack - Enhanced 3D Magnetic Cards */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              {INNOVATION_CONTENT.sections.techStack.title}
            </h2>
            <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-300 dark:border-green-700/50">
              <span className="text-sm font-mono text-green-700 dark:text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {INNOVATION_CONTENT.sections.techStack.badge}
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            {techStack.map((tech, i) => {
              const IconComponent = iconMap[tech.iconName] || Code;
              return <EnhancedMagneticTechCard key={i} tech={tech} icon={IconComponent} index={i} />;
            })}
          </div>
        </div>

        {/* Roadmap - Enhanced Holographic Cards */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              {INNOVATION_CONTENT.sections.roadmap.title}
            </h2>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((item, i) => (
              <EnhancedHolographicCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Stats - Enhanced Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INNOVATION_CONTENT.stats.map((stat, i) => {
            const Icon = iconMap[stat.iconName] || Activity;
            return (
              <EnhancedStatCard
                key={i}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                unit={stat.unit}
                status={stat.status}
                icon={Icon}
                color={stat.color}
                index={i}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          to { transform: translateX(200%); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/30 dark:bg-purple-400/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced 3D Magnetic Tech Card
const EnhancedMagneticTechCard = ({ tech, icon: Icon, index }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.innerWidth < 768) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-40 cursor-pointer"
    >
      {/* Multi-layer Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color.replace('text-', 'from-')}/30 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110`} />
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tl ${tech.color.replace('text-', 'from-')}/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Card */}
      <div className="relative h-full p-5 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-2 border-slate-200 dark:border-gray-700 group-hover:border-slate-300 dark:group-hover:border-gray-600 shadow-xl group-hover:shadow-2xl transition-all duration-500"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Animated Shine Effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
            animate={isHovered ? { x: ["-100%", "200%"] } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        {/* Particle Effect on Hover */}
        {isHovered && (
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Star className={`w-4 h-4 ${tech.color}`} />
          </motion.div>
        )}

        <div className="relative flex flex-col justify-between h-full">
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color.replace('text-', 'from-')}/20 ${tech.color.replace('text-', 'to-')}/10 flex items-center justify-center ${tech.color} shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon size={24} />
          </motion.div>

          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
              {tech.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-gray-400 font-mono">{tech.version}</span>
              <motion.div
                className={`w-2 h-2 rounded-full ${tech.color.replace('text-', 'bg-')}`}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Holographic Roadmap Card
const EnhancedHolographicCard = ({ item, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.03, y: -8, rotateX: 5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gradient Background with Animation */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${item.colorTheme}`}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
        animate={isHovered ? { backgroundPosition: ["0px 0px", "20px 20px"] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Sparkles */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ x: Math.random() * 100 + "%", y: "100%", opacity: 0 }}
              animate={{ y: "-20%", opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </>
      )}

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        <div>
          <motion.div
            className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs font-mono text-white uppercase">{item.quarter}</span>
          </motion.div>

          <motion.h3
            className="text-2xl font-black text-white mb-3 leading-tight"
            animate={isHovered ? { x: [0, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {item.title}
          </motion.h3>
          <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
        </div>

        {item.progress > 0 && (
          <div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2 backdrop-blur-sm">
              <motion.div
                className="h-full bg-white rounded-full shadow-lg shadow-white/50"
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs text-white/70 font-mono">{item.progress}% Complete</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced Animated Stat Card
const EnhancedStatCard = ({ label, value, change, unit, status, icon: Icon, color, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const colorMap = {
    purple: { gradient: 'from-purple-500 to-indigo-500', glow: 'purple-500' },
    cyan: { gradient: 'from-cyan-500 to-blue-500', glow: 'cyan-500' },
    green: { gradient: 'from-green-500 to-emerald-500', glow: 'green-500' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative p-6 rounded-2xl bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* Animated Gradient Glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colorMap[color as keyof typeof colorMap].gradient}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={isHovered ? { x: ["-100%", "200%"] } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wide font-semibold">{label}</div>
          <div className="flex items-baseline gap-2">
            <motion.span
              className="text-4xl font-black text-slate-900 dark:text-white"
              animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.span>
            {change && <span className="text-sm text-green-600 dark:text-green-400 font-bold">{change}</span>}
            {unit && <span className="text-sm text-slate-500 dark:text-gray-400">{unit}</span>}
            {status && <span className="text-xs text-green-600 dark:text-green-400 font-bold uppercase">{status}</span>}
          </div>
        </div>

        <motion.div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[color as keyof typeof colorMap].gradient} flex items-center justify-center shadow-lg`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="text-white" size={28} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Innovation;