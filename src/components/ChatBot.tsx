import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MessageCircle, X, Send, Bot, User, Phone, Zap, Shield, Sun, Sparkles,
  ThumbsUp, TrendingUp, Award, Clock, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      text: "🚀 Welcome to PowerLink AI! I'm your 24/7 power solutions assistant.", 
      isBot: true, 
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplyActive, setQuickReplyActive] = useState(false);
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
        text: "⚡ **UPS Systems** - Premium brands:\n\n• Luminous (Pure Sine Wave, 2-3yr warranty)\n• Microtek (LCD Display, Overload Protection)\n• Exide (Fast Charging, Digital)\n• Amaron (High Efficiency)\n\nWhat capacity do you need? (600VA-50KVA)",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('battery') || input.includes('batteries')) {
      return {
        text: "🔋 **Battery Options**:\n\n• Amaron Quanta (Zero Maintenance, Pro Rata)\n• LIVGUARD (AI Tech, 60 Month Warranty)\n• Tubular C10 (Deep Cycle, Long Life)\n\nLoad backup time? I can calculate AH requirement.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('cctv') || input.includes('camera') || input.includes('security')) {
      return {
        text: "🛡️ **Hikvision CCTV**:\n\n• 4K IP Cameras (Night Vision)\n• 32CH NVR w/ Cloud\n• AI Motion Detection\n• Mobile App View\n\nArea size? Need site assessment?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('solar') || input.includes('panel')) {
      return {
        text: "☀️ **Luminous Solar**:\n\n• Monocrystalline Panels (25yr warranty)\n• Hybrid MPPT Inverters\n• Lithium Battery Storage\n• Smart Grid Compatible\n\nDaily kWh needs? Free solar calculator!",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('price') || input.includes('cost') || input.includes('quote')) {
      return {
        text: "💰 **Competitive Pricing + Installation**\n\n📞 Get instant WhatsApp quote\n✅ Free site assessment\n🎁 Installation included\n\nTap WhatsApp button below 👇",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'contact'
      };
    } else if (input.includes('install') || input.includes('installation')) {
      return {
        text: "🔧 **Professional Installation**:\n\n✅ 15+ years experience\n✅ Certified technicians\n✅ 1-year service warranty\n✅ Same-day scheduling\n\nWhen's good for site visit?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'text'
      };
    } else if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return {
        text: "👋 Hello! Ready to power up?\n\n⚡ UPS & Inverters\n🔋 Batteries\n🛡️ CCTV Security\n☀️ Solar Solutions\n\nWhat's your power challenge?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'quick-reply'
      };
    } else if (input.includes('thank') || input.includes('thanks')) {
      return {
        text: "🙏 You're welcome!\n\n⭐ Quick actions:\n• Tap quick replies above\n• WhatsApp for instant quote\n• Ask about warranties\n\nAnything else? 😊",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'quick-reply'
      };
    } else {
      return {
        text: "🤖 Great question! We specialize in:\n\n⚡ Complete UPS Solutions\n🔋 Battery Systems\n🛡️ Hikvision CCTV\n☀️ Luminous Solar\n\n**Quick quote?** Tap WhatsApp 👇\n**Product info?** Try quick replies",
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
        className="fixed bottom-8 right-8 w-20 h-20 rounded-3xl clean-gradient shadow-2xl hover:shadow-3xl active:scale-[0.97] transition-all duration-300 z-50 animate-subtle-pulse hover:rotate-12 group"
        aria-label="Open ChatBot"
      >
        <div className="relative p-1">
          <MessageCircle className="w-10 h-10 text-primary-light group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white animate-ping" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full shadow-lg" />
        </div>
      </Button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="chatbot-container fixed bottom-8 right-8 w-104 h-[600px] z-50 flex flex-col shadow-2xl rounded-3xl overflow-hidden professional-shadow animate-in slide-in-from-bottom-4 duration-500">
          
          {/* Header */}
          <CardHeader className="executive-gradient text-primary-light p-6 rounded-t-3xl border-b border-accent-blue/30 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl">
                  <Bot className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-xl font-black">PowerLink AI</CardTitle>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <p className="text-sm opacity-90">Online • 24/7 Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleWhatsAppRedirect}
                  className="bg-white/20 hover:bg-white/30 text-primary-light border border-white/30 hover-scale font-bold"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-light hover:bg-white/30 hover-scale w-10 h-10 p-0 rounded-2xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-accent-blue/10 rounded-2xl blur-xl animate-gentle-float" />
          </CardHeader>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-br from-slate-50/70 via-white to-accent-blue/5 backdrop-blur-sm">
            {messages.map((message, index) => (
              <div
                key={`${message.isBot}-${index}`}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] p-5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl group ${
                  message.isBot
                    ? 'bg-white/80 backdrop-blur-xl border border-accent-blue/20 rounded-2xl'
                    : 'glass-card neon-border text-primary-light'
                }`}>
                  <div className={`mb-2 flex items-center gap-2 ${
                    message.isBot ? 'text-primary-dark' : 'text-primary-light'
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-5 h-5 text-accent-blue" />
                    ) : (
                      <User className="w-5 h-5 text-primary-light" />
                    )}
                    <span className="font-semibold text-sm opacity-90">
                      {message.isBot ? 'PowerLink AI' : 'You'}
                    </span>
                  </div>
                  
                  {message.type === 'text' ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  ) : message.type === 'quick-reply' ? (
                    <div className="space-y-2">
                      <p className="text-sm leading-relaxed mb-4">{message.text}</p>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-accent-blue/20">
                        {quickReplies.slice(0, 3).map((reply, i) => (
                          <Button
                            key={i}
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickReply(reply.text)}
                            className="hover:bg-accent-blue/20 hover:border-accent-blue/50 border-accent-blue/30 text-xs font-medium px-4 py-2 h-auto rounded-xl transition-all duration-200 hover-scale-sm flex items-center gap-2"
                          >
                            <reply.icon className="w-4 h-4" />
                            {reply.text}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : message.type === 'contact' && (
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <Button
                        onClick={handleWhatsAppRedirect}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale group"
                      >
                        <Phone className="w-5 h-5 mr-2 group-hover:translate-y-[-1px] transition-transform" />
                        WhatsApp Quote
                      </Button>
                    </div>
                  )}

                  <div className={`text-xs mt-3 opacity-60 flex items-center justify-end gap-1 ${
                    message.isBot ? 'text-primary-dark/60' : 'text-primary-light/70'
                  }`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 backdrop-blur-xl border border-accent-blue/20 rounded-2xl p-5 shadow-lg max-w-[85%]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-accent-blue/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-3 h-3 bg-accent-blue rounded-full animate-bounce" />
                      <div className="w-3 h-3 bg-accent-blue rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                      <div className="w-3 h-3 bg-accent-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 pt-4 border-t border-accent-blue/10 bg-gradient-to-t from-white to-accent-blue/5">
            {/* Quick Replies Row */}
            {quickReplyActive && (
              <div className="flex flex-wrap gap-2 mb-4 p-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-accent-blue/20">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="ghost"
                    onClick={() => handleQuickReply(reply.text)}
                    className="hover:bg-accent-blue/20 hover:border-accent-blue hover:text-accent-blue border-accent-blue/30 bg-white/60 backdrop-blur-sm text-sm font-semibold px-4 py-2.5 h-auto rounded-xl transition-all duration-300 hover-scale-sm flex items-center gap-2 shadow-sm border"
                  >
                    <reply.icon className="w-4 h-4 flex-shrink-0 opacity-80" />
                    {reply.text}
                  </Button>
                ))}
              </div>
            )}

            {/* Message Input */}
            <div className="flex items-end gap-3">
              <Input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about UPS, solar, CCTV, quotes..."
                className="flex-1 h-14 px-5 py-4 text-lg bg-white/70 backdrop-blur-xl border-2 border-primary-dark/20 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 rounded-2xl placeholder-primary-dark/50 shadow-inner transition-all duration-300 hover:shadow-md hover:border-accent-blue/50"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`w-14 h-14 p-0 rounded-2xl hover-scale transition-all duration-300 shadow-lg ${
                  inputMessage.trim() 
                    ? 'clean-gradient hover:shadow-xl text-primary-light' 
                    : 'bg-primary-dark/50 text-primary-light/60 cursor-not-allowed'
                }`}
              >
                <Send className={`w-6 h-6 transition-transform ${inputMessage.trim() ? 'group-hover:rotate-12' : ''}`} />
              </Button>
            </div>

            {/* WhatsApp CTA */}
            <Button
              onClick={handleWhatsAppRedirect}
              className="w-full mt-4 !bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl hover-scale transition-all duration-500 text-lg"
            >
              <Phone className="w-6 h-6 mr-3" />
              Continue on WhatsApp (Recommended)
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
