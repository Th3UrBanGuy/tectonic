import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, ArrowLeft, Paperclip, MoreVertical, Phone, Video, Check, CheckCheck } from 'lucide-react';

const initialUsers = [
    { id: 1, name: 'Alice Chen', status: 'online', lastMsg: 'Project update?', avatar: 'A', time: '10:42 AM', unread: 2 },
    { id: 2, name: 'Bob Smith', status: 'offline', lastMsg: 'See you tomorrow.', avatar: 'B', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Charlie Kim', status: 'online', lastMsg: 'Deploying now.', avatar: 'C', time: '9:15 AM', unread: 1 },
    { id: 4, name: 'Diana Prince', status: 'busy', lastMsg: 'In a meeting.', avatar: 'D', time: 'Monday', unread: 0 },
    { id: 5, name: 'Ethan Hunt', status: 'online', lastMsg: 'Mission accepted.', avatar: 'E', time: '8:30 AM', unread: 3 },
];

const mockMessages: Record<number, any[]> = {
    1: [
        { id: 1, text: 'Hey, how is the dashboard coming along?', sender: 'Alice', time: '10:00 AM', isMe: false, read: true },
        { id: 2, text: 'Almost done, just adding the final polish.', sender: 'Me', time: '10:05 AM', isMe: true, read: true },
        { id: 3, text: 'Great! Let me know when it is live.', sender: 'Alice', time: '10:06 AM', isMe: false, read: true },
    ],
    2: [],
    3: [
        { id: 1, text: 'Starting deployment process', sender: 'Charlie', time: '9:10 AM', isMe: false, read: true },
        { id: 2, text: 'Good luck!', sender: 'Me', time: '9:12 AM', isMe: true, read: true },
    ],
    4: [],
    5: []
};

const ChatSystem = () => {
    const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(mockMessages);
    const [users] = useState(initialUsers);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, selectedUser, isTyping]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedUser) return;

        const newMsg = {
            id: Date.now(),
            text: message,
            sender: 'Me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
            read: false
        };

        setMessages((prev: any) => ({
            ...prev,
            [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg]
        }));
        setMessage('');

        setTimeout(() => setIsTyping(true), 800);
        setTimeout(() => {
            setIsTyping(false);
            const replyMsg = {
                id: Date.now() + 1,
                text: "That sounds excellent. Keep up the good work!",
                sender: selectedUser.name,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: false,
                read: true
            };
            setMessages((prev: any) => ({
                ...prev,
                [selectedUser.id]: [...(prev[selectedUser.id] || []), replyMsg]
            }));
        }, 2500);
    };

    return (
        <div className="w-full h-[600px] md:h-[calc(100vh-250px)] flex bg-slate-50 dark:bg-black rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/[0.05] shadow-2xl">

            {/* Contacts Sidebar */}
            <div className={`w-full md:w-80 flex flex-col bg-white dark:bg-slate-950/50 backdrop-blur-xl border-r border-slate-200/50 dark:border-white/[0.05] ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="p-5 border-b border-slate-200/50 dark:border-white/[0.05]">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Contacts List */}
                <div className="flex-1 overflow-y-auto">
                    {users.map((user) => (
                        <motion.div
                            key={user.id}
                            whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.03)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center gap-3 p-4 cursor-pointer transition-all border-b border-slate-100/50 dark:border-white/[0.03] ${selectedUser?.id === user.id
                                ? 'bg-brand-50 dark:bg-brand-500/10 border-l-2 border-l-brand-500'
                                : 'border-l-2 border-l-transparent hover:border-l-slate-300 dark:hover:border-l-white/10'
                                }`}
                        >
                            <div className="relative">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20">
                                    {user.avatar}
                                </div>
                                {user.status === 'online' && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 shadow-sm" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between mb-1">
                                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">{user.name}</h3>
                                    <span className="text-xs text-slate-500 dark:text-slate-500 ml-2 flex-shrink-0">{user.time}</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{user.lastMsg}</p>
                                    {user.unread > 0 && (
                                        <span className="min-w-[18px] h-[18px] px-1.5 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                                            {user.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`flex-1 flex flex-col bg-white dark:bg-slate-950 ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/50 dark:border-white/[0.05] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedUser(null)}
                                    className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    <ArrowLeft size={20} />
                                </motion.button>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20">
                                    {selectedUser.avatar}
                                </div>
                                <div>
                                    <h2 className="font-semibold text-slate-900 dark:text-white text-sm">{selectedUser.name}</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
                                        {selectedUser.status === 'online' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />}
                                        {selectedUser.status === 'online' ? 'Active now' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                                >
                                    <Phone size={18} />
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                                >
                                    <Video size={18} />
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                                >
                                    <MoreVertical size={18} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-5 bg-slate-50/50 dark:bg-black"
                        >
                            <div className="space-y-3">
                                <AnimatePresence initial={false}>
                                    {(messages[selectedUser.id] || []).map((msg: any, index: number) => {
                                        const showAvatar = index === 0 || messages[selectedUser.id][index - 1]?.isMe !== msg.isMe;
                                        return (
                                            <motion.div
                                                key={msg.id}
                                                layout
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                className={`flex items-end gap-2 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                                            >
                                                {!msg.isMe && (
                                                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                                                        {selectedUser.avatar}
                                                    </div>
                                                )}
                                                <div className={`group flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[70%] sm:max-w-[55%]`}>
                                                    <div className={`px-4 py-2.5 rounded-2xl shadow-sm ${msg.isMe
                                                        ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white rounded-br-sm'
                                                        : 'bg-white dark:bg-white/[0.05] text-slate-900 dark:text-white rounded-bl-sm border border-slate-200/50 dark:border-white/[0.08]'
                                                        }`}>
                                                        <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 mt-1 px-1">
                                                        <span className="text-[10px] text-slate-500 dark:text-slate-600">
                                                            {msg.time}
                                                        </span>
                                                        {msg.isMe && (
                                                            <span className="text-slate-500 dark:text-slate-600">
                                                                {msg.read ? <CheckCheck size={12} /> : <Check size={12} />}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-end gap-2"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                            {selectedUser.avatar}
                                        </div>
                                        <div className="px-4 py-3 bg-white dark:bg-white/[0.05] rounded-2xl rounded-bl-sm border border-slate-200/50 dark:border-white/[0.08] flex gap-1">
                                            <motion.div
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                className="w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full"
                                            />
                                            <motion.div
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                className="w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full"
                                            />
                                            <motion.div
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                className="w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 border-t border-slate-200/50 dark:border-white/[0.05] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 flex items-center gap-2 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-brand-500/30 focus-within:border-brand-500/50 transition-all">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-transparent border-0 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none"
                                    />
                                    {!message.trim() && (
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            type="button"
                                            className="text-slate-500 dark:text-slate-600 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                                        >
                                            <Paperclip size={18} />
                                        </motion.button>
                                    )}
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={!message.trim()}
                                    className={`p-3 rounded-xl transition-all shadow-lg ${message.trim()
                                        ? 'bg-gradient-to-br from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-brand-500/30'
                                        : 'bg-slate-200 dark:bg-white/[0.05] text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                                        }`}
                                >
                                    <Send size={18} />
                                </motion.button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="hidden md:flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600">
                        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-white/[0.03] flex items-center justify-center mb-4 border border-slate-200 dark:border-white/[0.05]">
                            <Send size={36} className="text-slate-300 dark:text-slate-700" />
                        </div>
                        <p className="text-base font-medium text-slate-600 dark:text-slate-500">Select a conversation</p>
                        <p className="text-sm text-slate-500 dark:text-slate-600 mt-1">Choose from your existing messages</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSystem;
