import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Loader2, ShieldAlert } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function SecurityAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Salom! Men NetHunter Uzbekistan xavfsizlik yordamchisiman. Sizga qanday yordam bera olaman?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "Siz NetHunter Uzbekistan hamjamiyati uchun xavfsizlik bo'yicha mutaxassis yordamchisiz. Foydalanuvchilarga Kali NetHunter, penetratsion testlar va axborot xavfsizligi bo'yicha o'zbek tilida yordam bering. Javoblaringiz aniq, professional va xavfsizlik qoidalariga mos bo'lishi kerak. Noqonuniy harakatlarga undamang.",
        },
      });

      const aiText = response.text || "Kechirasiz, javob olishda xatolik yuz berdi.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-cyber-card border border-cyber-border rounded-xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-cyber-border bg-cyber-bg/50 flex items-center gap-3">
        <div className="p-2 bg-cyber-accent/10 rounded-lg">
          <ShieldAlert className="w-5 h-5 text-cyber-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-sm tracking-tight text-white">Security AI Assistant</h3>
          <p className="text-[10px] text-cyber-accent uppercase tracking-widest font-mono">Online / Encrypted</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-cyber-accent text-black font-medium rounded-tr-none' 
                  : 'bg-cyber-bg border border-cyber-border text-white rounded-tl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1 opacity-60">
                  {msg.role === 'ai' ? <Bot size={12} /> : <User size={12} />}
                  <span className="text-[10px] uppercase font-mono tracking-tighter">
                    {msg.role === 'ai' ? 'System' : 'Operator'}
                  </span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-cyber-bg border border-cyber-border p-3 rounded-2xl rounded-tl-none">
              <Loader2 className="w-4 h-4 animate-spin text-cyber-accent" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-cyber-border bg-cyber-bg/30">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Xavfsizlik bo'yicha savol bering..."
            className="w-full bg-cyber-bg border border-cyber-border rounded-full py-3 pl-5 pr-14 text-sm focus:outline-none focus:border-cyber-accent transition-colors placeholder:text-cyber-text-dim"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-cyber-accent text-black rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
