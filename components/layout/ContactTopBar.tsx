import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../ContentContext';

const ContactTopBar: React.FC = () => {
    const { contactConfig, siteSettings } = useContent();
    const { contact } = contactConfig;

    if (!contact.email && !contact.phone) return null;

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[60] h-10 flex items-center justify-center bg-slate-900/95 dark:bg-[#050505]/90 backdrop-blur-md contact-top-bar shadow-sm"
        >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/5 to-brand-500/0 pointer-events-none" />

            <div className="max-w-7xl w-full mx-auto px-6 flex justify-between items-center text-[10px] sm:text-xs font-mono font-medium tracking-widest text-slate-400">

                {/* Left Side: Phone */}
                {contact.phone ? (
                    <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-2 hover:text-brand-400 transition-colors duration-300 group py-1"
                    >
                        <Phone size={14} className="text-brand-600 group-hover:text-brand-400 transition-colors" />
                        <span className="hidden sm:inline group-hover:underline decoration-brand-500/50 underline-offset-4">{contact.phone}</span>
                        <span className="sm:hidden font-bold text-brand-500">CALL</span>
                    </a>
                ) : <div></div>}

                {/* Right Side: Email */}
                {contact.email && (
                    <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2 hover:text-brand-400 transition-colors duration-300 group py-1"
                    >
                        <span className="hidden sm:inline group-hover:underline decoration-brand-500/50 underline-offset-4">{contact.email}</span>
                        <span className="sm:hidden font-bold text-brand-500">EMAIL</span>
                        <Mail size={14} className="text-brand-600 group-hover:text-brand-400 transition-colors" />
                    </a>
                )}
            </div>
        </motion.div>
    );
};

export default ContactTopBar;
