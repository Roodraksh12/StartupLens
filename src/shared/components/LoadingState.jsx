import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingState() {
  const messages = [
    "Analyzing your idea...", 
    "Scanning the market...", 
    "Identifying competitors...", 
    "Calculating scores...", 
    "Building your GTM plan...", 
    "Almost done..."
  ];
  
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 flex flex-col items-center">
      <div className="relative flex justify-center items-center h-32 w-32 mb-8">
        <motion.div 
          className="absolute inset-0 rounded-full border-t-2 border-indigo-500 border-r-2 border-r-transparent opacity-60"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-2 rounded-full border-b-2 border-cyan-400 border-l-2 border-l-transparent opacity-80"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="bg-gradient-to-br from-indigo-500 to-cyan-400 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white font-bold text-xl">AI</span>
        </motion.div>
      </div>
      
      <div className="h-8 mb-12">
        <motion.p 
          key={msgIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-heading font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300"
        >
          {messages[msgIndex]}
        </motion.p>
      </div>

      <div className="w-full space-y-6 opacity-40 pointer-events-none">
        <div className="glass-card p-8 h-48 animate-pulse flex flex-col justify-between">
          <div className="w-1/3 h-8 bg-white/10 rounded-lg"></div>
          <div className="space-y-3">
            <div className="w-full h-4 bg-white/5 rounded"></div>
            <div className="w-5/6 h-4 bg-white/5 rounded"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-6 h-64 animate-pulse flex flex-col gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 self-center mb-4"></div>
              <div className="w-3/4 h-6 bg-white/10 rounded mx-auto"></div>
              <div className="w-full h-20 bg-white/5 rounded mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
