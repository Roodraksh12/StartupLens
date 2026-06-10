import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReportChat({ results }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]); // Close means remove chat
  };

  const handleMinimize = () => {
    setIsOpen(false); // Just hide, keep chat
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = { role: 'user', content: inputValue.trim() };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          resultsContext: results
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages([...newMessages, { role: 'model', content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: 'model', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.2 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600/80 backdrop-blur-md border border-white/20 text-white rounded-full shadow-[0_8px_32px_0_rgba(79,70,229,0.37)] flex items-center justify-center z-50 transition-colors hover:bg-indigo-600"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ transformOrigin: "calc(100% - 28px) calc(100% - 28px)" }}
            className="fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[500px] max-h-[80vh] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200/50"
          >
            {/* Header */}
            <div className="bg-indigo-600/90 backdrop-blur-md text-white px-4 py-3 flex justify-between items-center shrink-0 border-b border-indigo-500">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">Ask the VC</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleMinimize}
                  className="text-indigo-200 hover:text-white transition-colors p-1 rounded-md hover:bg-indigo-700/50"
                  title="Minimize"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleClose}
                  className="text-indigo-200 hover:text-white transition-colors p-1 rounded-md hover:bg-indigo-700/50"
                  title="Close & Clear Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.length === 0 && (
                <div className="text-center text-slate-500 text-sm mt-4">
                  <p>Have doubts about the report?</p>
                  <p className="mt-1">Ask me anything!</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-sm' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.content.split('\\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm px-4 py-2 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span className="text-xs text-slate-500">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <div className="flex gap-2 items-end bg-slate-100 rounded-xl p-1 pr-2 border border-transparent focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="flex-1 max-h-32 min-h-[40px] bg-transparent resize-none outline-none text-sm py-2 px-3 text-slate-800"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors mb-0.5"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
