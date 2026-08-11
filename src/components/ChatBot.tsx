import { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageCircle, X, Send, Bot, Phone, Zap, Shield, Sun,
  TrendingUp, Clock, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: string;
  type?: 'text' | 'quick-reply' | 'contact';
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! Welcome to PowerLink Technologies. Ask me about UPS systems, batteries, solar or CCTV — or tap a quick option below.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplyActive, setQuickReplyActive] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced quick replies with icons
  const quickReplies = [
    { text: "UPS Systems", icon: Zap, category: "ups" },
    { text: "Solar Solutions", icon: Sun, category: "solar" },
    { text: "CCTV Security", icon: Shield, category: "cctv" },
    { text: "Get Quote", icon: TrendingUp, category: "quote" },
    { text: "Installation", icon: Clock, category: "install" },
    { text: "Support", icon: Users, category: "support" },
  ];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Typing animation
  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    if (isTyping) {
      typingInterval = setInterval(() => {
        // Typing animation handled purely in CSS now
      }, 300);
    }
    return () => {
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [isTyping]);

  const generateBotResponse = useCallback((userInput: string): Message => {
    const input = userInput.toLowerCase().trim();
    
    // Enhanced responses with product recommendations
    if (input.includes('ups') || input.includes('inverter')) {
      return {
        text: "UPS Systems — premium brands we carry:\n\n• Luminous (Pure Sine Wave, 2-3yr warranty)\n• Microtek (LCD Display, Overload Protection)\n• Exide (Fast Charging, Digital)\n• Amaron (High Efficiency)\n\nWhat capacity do you need? (600VA - 50KVA)",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('battery') || input.includes('batteries')) {
      return {
        text: "Battery options:\n\n• Amaron Quanta (Zero Maintenance, Pro Rata)\n• LIVGUARD (AI Tech, 60 Month Warranty)\n• Tubular C10 (Deep Cycle, Long Life)\n\nHow much backup time do you need? We can calculate the right AH capacity for you.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('cctv') || input.includes('camera') || input.includes('security')) {
      return {
        text: "Hikvision CCTV systems:\n\n• 4K IP Cameras (Night Vision)\n• NVR/DVR with remote access\n• AI Motion Detection\n• Mobile App Viewing\n\nWhat area do you want covered? We offer a free site assessment.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('solar') || input.includes('panel')) {
      return {
        text: "Luminous Solar solutions:\n\n• Monocrystalline Panels (25yr warranty)\n• Hybrid MPPT Inverters\n• Battery Storage\n• Smart Grid Compatible\n\nTell us your monthly electricity bill and we'll estimate your savings.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('price') || input.includes('cost') || input.includes('quote')) {
      return {
        text: "We offer competitive pricing with installation included:\n\n• Instant quote on WhatsApp\n• Free site assessment\n• Installation included in price\n\nTap the button below to get your quote.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'contact'
      };
    } else if (input.includes('install') || input.includes('installation')) {
      return {
        text: "Professional installation, always included:\n\n• 18+ years of experience\n• Certified technicians\n• 1-year service warranty\n• Same-day scheduling\n\nWhen would you like a site visit?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return {
        text: "Hello! How can we help you today?\n\n• UPS & Inverters\n• Batteries\n• CCTV Security\n• Solar Solutions\n\nPick a topic below or type your question.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'quick-reply'
      };
    } else if (input.includes('thank') || input.includes('thanks')) {
      return {
        text: "You're welcome! Anything else we can help with?\n\n• Tap a quick option below\n• WhatsApp us for an instant quote\n• Ask about warranties or servicing",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'quick-reply'
      };
    } else {
      return {
        text: "We specialize in:\n\n• Complete UPS Solutions\n• Battery Systems\n• Hikvision CCTV\n• Luminous Solar\n\nFor a quick quote, tap the WhatsApp button below — or pick a topic to learn more.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'quick-reply'
      };
    }
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { 
      text: inputMessage, 
      isBot: false, 
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(currentInput);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setQuickReplyActive(botResponse.type === 'quick-reply');
    }, 1200 + Math.random() * 800);
  }, [inputMessage, generateBotResponse]);

  const handleQuickReply = useCallback((reply: string) => {
    const userMessage: Message = { 
      text: reply, 
      isBot: false, 
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setQuickReplyActive(false);

    setTimeout(() => {
      const botResponse = generateBotResponse(reply);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  }, [generateBotResponse]);

  const handleWhatsAppRedirect = useCallback(() => {
    const lastUserMessage = messages[messages.length - 1];
    const message = lastUserMessage?.isBot === false 
      ? `Hi! Continuing chat: ${lastUserMessage.text}`
      : "Hi! Need assistance with PowerLink products/services.";
    
    window.open(`https://wa.me/919901893191?text=${encodeURIComponent(message)}`, '_blank');
    setIsOpen(false);
  }, [messages]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Auto-close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.chatbot-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-2xl clean-gradient shadow-2xl active:scale-[0.97] transition-all duration-300 z-50 hover:scale-105 group"
        aria-label="Open ChatBot"
      >
        <div className="relative p-1">
          <MessageCircle className="w-8 h-8 text-primary-light group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white shadow-lg" />
        </div>
      </Button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="chatbot-container fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] z-50 flex flex-col bg-white shadow-2xl rounded-3xl overflow-hidden professional-shadow animate-slide-up">
          
          {/* Header */}
          <div className="executive-gradient text-primary-light px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold leading-tight truncate">PowerLink Assistant</p>
                <p className="text-xs opacity-90 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block flex-shrink-0 animate-subtle-pulse" />
                  Online • Replies instantly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleWhatsAppRedirect}
                aria-label="Open WhatsApp"
                className="text-primary-light hover:bg-white/20 w-9 h-9 p-0 rounded-xl"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-primary-light hover:bg-white/20 w-9 h-9 p-0 rounded-xl"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-slate-50/70 via-white to-accent-blue/5">
            {messages.map((message, index) => (
              <div
                key={`${message.isBot}-${index}`}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] px-4 py-3 shadow-sm ${
                  message.isBot
                    ? 'bg-white border border-accent-blue/15 text-primary-dark rounded-2xl rounded-bl-md'
                    : 'executive-gradient text-primary-light rounded-2xl rounded-br-md'
                }`}>
                  {message.type === 'quick-reply' ? (
                    <div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap mb-3">{message.text}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-accent-blue/15">
                        {quickReplies.slice(0, 3).map((reply, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickReply(reply.text)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-accent-blue/30 text-accent-blue bg-accent-blue/5 hover:bg-accent-blue hover:text-white transition-colors duration-200"
                          >
                            <reply.icon className="w-3.5 h-3.5" />
                            {reply.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : message.type === 'contact' ? (
                    <div className="space-y-2.5">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <Button
                        onClick={handleWhatsAppRedirect}
                        className="w-full !bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold h-10 rounded-xl shadow-md transition-all duration-300 text-sm"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp Quote
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  )}

                  <div className={`text-xs mt-1.5 opacity-60 text-right ${
                    message.isBot ? 'text-primary-dark/60' : 'text-primary-light/70'
                  }`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-accent-blue/15 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-accent-blue/70 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent-blue/70 rounded-full animate-bounce" style={{animationDelay: '0.15s'}} />
                    <div className="w-2 h-2 bg-accent-blue/70 rounded-full animate-bounce" style={{animationDelay: '0.3s'}} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 pt-3 border-t border-accent-blue/10 bg-white">
            {/* Quick Replies Row */}
            {quickReplyActive && (
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.text)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-accent-blue/30 text-accent-blue bg-accent-blue/5 hover:bg-accent-blue hover:text-white transition-colors duration-200"
                  >
                    <reply.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

            {/* Message Input */}
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about UPS, solar, CCTV, quotes..."
                className="flex-1 h-11 px-4 text-sm bg-primary-light border border-primary-dark/15 focus:border-accent-blue focus-visible:ring-1 focus-visible:ring-accent-blue/40 rounded-xl placeholder:text-primary-dark/40"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Send message"
                className={`w-11 h-11 p-0 rounded-xl flex-shrink-0 transition-all duration-300 ${
                  inputMessage.trim()
                    ? 'clean-gradient text-primary-light shadow-md'
                    : 'bg-primary-dark/10 text-primary-dark/30 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* WhatsApp CTA */}
            <Button
              onClick={handleWhatsAppRedirect}
              className="w-full mt-3 !bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2.5 h-11 rounded-xl shadow-md transition-all duration-300 text-sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Continue on WhatsApp
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
