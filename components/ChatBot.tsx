"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Terminal, BrainCircuit } from 'lucide-react';

// --- Talking Head Visualization Component ---
const TalkingHead: React.FC<{ isThinking: boolean }> = ({ isThinking }) => {
  return (
    <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto flex items-center justify-center">
      {/* Outer Neural Pulse */}
      <motion.div
        animate={{
          scale: isThinking ? [1, 1.2, 1] : 1,
          opacity: isThinking ? 0.3 : 0.1
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-blue-500 blur-2xl"
      />

      {/* Robot Face SVG */}
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">
        <defs>
          <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <path d="M50,40 Q100,20 150,40 L160,130 Q160,170 100,180 Q40,170 40,130 Z" fill="url(#headGrad)" stroke="#3b82f6" strokeWidth="2" />

        {/* Eyes */}
        <g>
          <circle cx="70" cy="85" r="8" fill={isThinking ? "#3b82f6" : "#60a5fa"}>
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="130" cy="85" r="8" fill={isThinking ? "#3b82f6" : "#60a5fa"}>
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="85" r="12" fill="#3b82f6" fillOpacity="0.2" />
          <circle cx="130" cy="85" r="12" fill="#3b82f6" fillOpacity="0.2" />
        </g>

        {/* Mouth Assembly (Static/Pulsing) */}
        <motion.rect
          x="75" y="140"
          width="50"
          height="4"
          rx="2"
          fill="#3b82f6"
          animate={{
            fill: isThinking ? ["#3b82f6", "#a855f7", "#3b82f6"] : "#3b82f6"
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <rect x="75" y="140" width="50" height="4" rx="2" fill="#3b82f6" fillOpacity="0.4" />
        <path d="M40,100 L20,100 M160,100 L180,100 M100,20 L100,10" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
      </svg>
    </div>
  );
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: 'Operational sequence initialized. I am QIntelligence, your technical architecture liaison. How can I assist with your enterprise modernization today?' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isReasoning, setIsReasoning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const botWindowRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 3D Tilt Values — desktop only
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !botWindowRef.current) return;
    const rect = botWindowRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsThinking(true);

    try {
      setIsReasoning(true);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      setIsReasoning(false);

      if (!response.ok) throw new Error('Failed to communicate with sovereign core.');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.text || "Architecture nominal. Synchronizing protocols." }]);
      setIsThinking(false);
    } catch (error) {
      console.error(error);
      setIsReasoning(false);
      setIsThinking(false);
      setMessages(prev => [...prev, { role: 'bot', text: "Logic interrupt. Re-establishing link..." }]);
    }
  };

  // On mobile: pin to all 4 edges for a sheet-like appearance
  // On desktop: pin to bottom-right corner as a floating widget
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={botWindowRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={isMobile
              ? { height: 'calc(100svh - 7rem)' }
              : { height: '700px', rotateX, rotateY, transformStyle: 'preserve-3d' } as React.CSSProperties
            }
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="mb-4 md:mb-6 w-[calc(100vw-2rem)] sm:w-96 md:w-[450px] flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-slate-900 border border-slate-800 text-white"
          >
            {/* Header / Visualization */}
            <div className="bg-slate-900 px-5 py-4 md:p-8 border-b border-white/5 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              <div className="flex justify-between items-center mb-3 md:mb-6 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 flex-shrink-0">
                    <BrainCircuit className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-sm">QINTELLIGENCE AI</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] text-slate-400 uppercase font-mono tracking-widest">Link: Sovereign_Logic</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors flex-shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <TalkingHead isThinking={isThinking} />
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 p-4 md:p-8 overflow-y-auto space-y-4 md:space-y-6 bg-slate-950/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-[90%] gap-2 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${msg.role === 'user' ? 'bg-blue-600 border-blue-500' : 'bg-slate-900 border-slate-700'}`}>
                      {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                    <div className={`p-3 md:p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none shadow-xl'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className={`w-1.5 h-1.5 ${isReasoning ? 'bg-purple-500' : 'bg-blue-500'} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
                      <div className={`w-1.5 h-1.5 ${isReasoning ? 'bg-purple-500' : 'bg-blue-500'} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                      <div className={`w-1.5 h-1.5 ${isReasoning ? 'bg-purple-500' : 'bg-blue-500'} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      {isReasoning ? 'Consulting_Sovereign_Core...' : 'Processing_Logic...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-3 md:p-6 bg-slate-900 border-t border-white/5 flex-shrink-0">
              <div className="flex items-center space-x-1.5 text-slate-500 mb-2">
                <Terminal className="w-3 h-3 flex-shrink-0" />
                <span className="text-[9px] font-mono uppercase tracking-widest truncate">Secure_Protocol_Input</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Direct query to sovereign core..."
                  className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs font-mono text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
                <button
                  onClick={handleSend}
                  disabled={isThinking}
                  className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20 flex-shrink-0 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-[0_20px_50px_-10px_rgba(37,99,235,0.6)] hover:bg-blue-700 transition-all z-50 relative group"
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
              <X className="w-7 h-7 md:w-10 md:h-10" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <MessageCircle className="w-7 h-7 md:w-10 md:h-10" />
              <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-4 border-slate-50 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
