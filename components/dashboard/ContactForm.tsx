import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('sent'), 1500);
        setTimeout(() => setStatus('idle'), 4000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
        >
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl rotate-3 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                    <MessageSquare className="text-white transform -rotate-3" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">INITIALIZE COMMUNICATION</h2>
                <p className="text-slate-400">Secure channel to administration. All messages are encrypted.</p>
            </div>

            {status === 'sent' ? (
                <div className="text-center py-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400"
                    >
                        <Send size={40} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">TRANSMISSION COMPLETE</h3>
                    <p className="text-slate-400 mt-2">Your message has been securely logged.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-mono text-cyan-500/60 mb-2">IDENTITY</label>
                            <input type="text" placeholder="John Doe" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-cyan-500/60 mb-2">DESIGNATION</label>
                            <input type="text" placeholder="Senior Analyst" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-cyan-500/60 mb-2">SUBJECT</label>
                        <input type="text" placeholder="Access Request" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-cyan-500/60 mb-2">MESSAGE PAYLOAD</label>
                        <textarea rows={5} placeholder="Enter your query parameters..." className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors resize-none" />
                    </div>

                    <button
                        disabled={status === 'sending'}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
                    >
                        {status === 'sending' ? (
                            <>SENDING PACKETS...</>
                        ) : (
                            <>
                                <Send size={18} />
                                TRANSMIT MESSAGE
                            </>
                        )}
                    </button>
                </form>
            )}
        </motion.div>
    );
};

export default ContactForm;
