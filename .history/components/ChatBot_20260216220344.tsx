
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Volume2, VolumeX, Activity, Terminal, BrainCircuit, Monitor } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

// --- Audio Decoding Helper ---
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

// --- Talking Head Visualization Component ---
const TalkingHead: React.FC<{ isTalking: boolean, isThinking: boolean, amplitude: number }> = ({ isTalking, isThinking, amplitude }) => {
  return (
    <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
      {/* Outer Neural Pulse */}
      <motion.div 
        animate={{ 
          scale: isThinking ? [1, 1.2, 1] : isTalking ? (1 + amplitude * 0.5) : 1,
          opacity: isThinking || isTalking ? 0.3 : 0.1
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
        
        {/* Mouth Assembly (Talking Animation) */}
        <motion.rect 
          x="75" y="140" 
          width="50" 
          height={isTalking ? (4 + amplitude * 25) : 4} 
          rx="2" 
          fill="#3b82f6" 
          animate={{
            fill: isTalking ? ["#3b82f6", "#a855f7", "#3b82f6"] : "#3b82f6"
          }}
          transition={{ duration: 0.1, repeat: Infinity }}
        />
        <rect x="75" y="140" width="50" height="4" rx="2" fill="#3b82f6" fillOpacity="0.4" />
        <path d="M40,100 L20,100 M160,100 L180,100 M100,20 L100,10" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
      </svg>
      
      {/* Waveform Visualization Overlay */}
      {isTalking && (
        <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-1 h-8 items-end">
           {[...Array(8)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ height: [4, (Math.random() * 20 + 5), 4] }}
               transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.05 }}
               className="w-1 bg-blue-400 rounded-full"
             />
           ))}
        </div>
      )}
    </div>
  );
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: 'Operational sequence initialized. I am QIntelligence, your technical architecture liaison. How can I assist with your enterprise modernization today?' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const botWindowRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!botWindowRef.current) return;
    const rect = botWindowRef.current.getBoundingClientRect();
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
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking, isTalking]);

  useEffect(() => {
    let animationFrame: number;
    const analyze = () => {
      if (analyserRef.current && isTalking) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const val = (dataArray[i] - 128) / 128;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / dataArray.length);
        setAmplitude(rms * 3.5);
      } else {
        setAmplitude(0);
      }
      animationFrame = requestAnimationFrame(analyze);
    };
    analyze();
    return () => cancelAnimationFrame(animationFrame);
  }, [isTalking]);

  const handleSend = async () => {
    if (!input.trim() || isThinking || isTalking) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Step 1: Generate Text Response with standard model
      const textResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ 
          parts: [{ 
            text: `You are QIntelligence, the highly advanced AI spokesperson for QIntellect Technologies. 
            Services: AI, ERP, IoT, EDI, Web Architecture. 
            User asks: ${userMessage}. 
            Provide a professional, concise technical response.` 
          }] 
        }]
      });
      
      const botText = textResponse.text || "Architecture nominal. Synchronizing protocols.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
      setIsThinking(false);

      // Step 2: Generate Audio from the resulting text
      if (!isMuted) {
        const audioResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-preview-tts',
          contents: [{ 
            parts: [{ text: botText }] 
          }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' }
              }
            }
          },
        });
        
        const base64Audio = audioResponse.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        if (base64Audio) {
          await playBotAudio(base64Audio);
        }
      }
    } catch (error) {
      console.error(error);
      setIsThinking(false);
      setMessages(prev => [...prev, { role: 'bot', text: "Logic interrupt. Re-establishing link..." }]);
    }
  };

  const playBotAudio = async (base64: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    const audioData = decodeBase64(base64);
    const audioBuffer = await decodeAudioData(audioData, ctx);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    if (analyserRef.current) {
      source.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
    } else {
      source.connect(ctx.destination);
    }
    setIsTalking(true);
    source.start(0);
    source.onended = () => {
      setIsTalking(false);
      setAmplitude(0);
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={botWindowRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="mb-6 w-96 md:w-[450px] h-[700px] flex flex-col rounded-2xl shadow-4xl overflow-hidden bg-slate-900 border border-slate-800 text-white"
          >
            {/* Header / Visualization */}
            <div className="bg-slate-900 p-8 border-b border-white/5 relative overflow-hidden" style={{ transform: "translateZ(30px)" }}>
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-sm">QINTELLIGENCE AI</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isTalking ? 'bg-green-400 animate-pulse' : 'bg-blue-400'} shadow-sm`} />
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">Link: Sovereign_Logic</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <TalkingHead isTalking={isTalking} isThinking={isThinking} amplitude={amplitude} />
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-950/50" style={{ transform: "translateZ(10px)" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-[85%] space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${msg.role === 'user' ? 'bg-blue-600 border-blue-500' : 'bg-slate-900 border-slate-700'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none shadow-xl'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Processing_Logic...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-8 bg-slate-900 border-t border-white/5 flex flex-col space-y-4" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center space-x-2 text-slate-500 mb-1">
                 <Terminal className="w-3 h-3" />
                 <span className="text-[10px] font-mono uppercase tracking-widest">Secure_Protocol_Input</span>
              </div>
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Direct query to sovereign core..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-xs font-mono text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={isThinking || isTalking}
                  className="bg-blue-600 text-white px-6 rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-5 h-5" />
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
        className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-[0_20px_50px_-10px_rgba(37,99,235,0.6)] hover:bg-blue-700 transition-all z-50 relative group"
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
              <X className="w-10 h-10" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <MessageCircle className="w-10 h-10" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-50 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
