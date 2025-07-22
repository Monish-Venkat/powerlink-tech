
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm PowerLink's AI assistant. How can I help you today?", isBot: true, timestamp: new Date().toLocaleTimeString() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "UPS Systems",
    "Batteries", 
    "CCTV Cameras",
    "Solar Solutions",
    "Installation Services",
    "Technical Support"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('ups') || input.includes('inverter')) {
      return "We offer premium UPS systems from Luminous, Microtech, Exide, and Amaze. Our UPS solutions range from 600VA to 10KVA, perfect for homes and businesses. Would you like specific capacity recommendations or pricing details?";
    } else if (input.includes('battery') || input.includes('batteries')) {
      return "We stock high-quality batteries from Amaron and LIVGUARD. Our battery range includes tubular, gel, and lithium options. What's your power backup requirement? I can suggest the best battery for your needs.";
    } else if (input.includes('cctv') || input.includes('camera') || input.includes('security')) {
      return "Our Hikvision CCTV solutions include IP cameras, DVR/NVR systems, and complete surveillance packages. We offer 2MP to 8MP cameras with night vision, motion detection, and mobile monitoring. Need a security assessment?";
    } else if (input.includes('solar') || input.includes('panel')) {
      return "Our Luminous solar solutions include panels, inverters, and complete grid-tie systems. We design custom solar installations from 1KW to 100KW. Interested in solar savings calculation or site assessment?";
    } else if (input.includes('price') || input.includes('cost') || input.includes('quote')) {
      return "I'd be happy to provide pricing! Our rates are competitive and we offer installation services. For accurate quotes, please share your requirements or contact us directly. Would you like me to connect you with our sales team?";
    } else if (input.includes('installation') || input.includes('service')) {
      return "We provide professional installation services across Bangalore with 15+ years of experience. Our certified technicians ensure proper setup and provide warranty support. When would you like to schedule an installation?";
    } else if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return "Hello! Great to hear from you. I'm here to help with all your power solution needs. Are you looking for UPS systems, batteries, CCTV cameras, or solar solutions?";
    } else if (input.includes('thank') || input.includes('thanks')) {
      return "You're most welcome! I'm always here to help. Feel free to ask about any of our products or services. Is there anything else you'd like to know?";
    } else if (input.includes('capacity') || input.includes('recommend')) {
      return "For capacity recommendations, I'd need to know: 1) What devices you want to backup, 2) How long you need backup power, 3) Your budget range. Based on this, I can suggest the perfect UPS system. What's your specific requirement?";
    } else if (input.includes('warranty') || input.includes('support')) {
      return "All our products come with manufacturer warranty - UPS systems: 2-3 years, Batteries: 18-60 months depending on type, CCTV: 2-3 years, Solar: 10-25 years. We also provide comprehensive after-sales support. Need specific warranty details?";
    } else {
      return "That's a great question! Our team specializes in power solutions including UPS systems, batteries, CCTV cameras, and solar installations. For detailed technical assistance, I can connect you directly with our experts via WhatsApp. What specific product interests you most?";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { 
      text: inputMessage, 
      isBot: false, 
      timestamp: new Date().toLocaleTimeString() 
    };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay and generate response
    setTimeout(() => {
      const botResponse = generateBotResponse(currentInput);
      const botMessage = { 
        text: botResponse, 
        isBot: true, 
        timestamp: new Date().toLocaleTimeString() 
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    const userMessage = { 
      text: reply, 
      isBot: false, 
      timestamp: new Date().toLocaleTimeString() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(reply);
      const botMessage = { 
        text: botResponse, 
        isBot: true, 
        timestamp: new Date().toLocaleTimeString() 
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleWhatsAppRedirect = () => {
    const message = "Hi! I need assistance with PowerLink Technologies products.";
    const whatsappUrl = `https://wa.me/919901893191?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button - Cleaner Design */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full clean-gradient shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${isOpen ? 'hidden' : 'flex'} animate-subtle-pulse`}
      >
        <MessageCircle className="w-7 h-7 text-primary-light" />
      </Button>

      {/* Chat Window - Cleaner Styling */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col border border-accent-blue/30 bg-white professional-shadow">
          <CardHeader className="clean-gradient text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">PowerLink AI</h3>
                  <p className="text-sm opacity-90 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Online now
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-accent-blue' : 'bg-primary-dark'}`}>
                      {message.isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm shadow-sm transition-all hover:shadow-md ${
                        message.isBot
                          ? 'bg-white border border-gray-200 text-gray-800'
                          : 'clean-gradient text-white'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70 ${message.isBot ? 'text-gray-500' : 'text-white/70'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent-blue">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 p-3 rounded-lg text-sm shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs hover:bg-accent-blue/10 hover:border-accent-blue transition-colors clean-border"
                  >
                    {reply}
                  </Button>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="sm"
                  className="clean-gradient hover-scale"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={handleWhatsAppRedirect}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-sm hover-scale"
                size="sm"
              >
                Continue on WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
