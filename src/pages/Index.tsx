import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Zap, Shield, Sun, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';

// Intersection Observer Hook for scroll animations
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Floating Particles Component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-gentle-float"
        style={{
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          background: `rgba(97, 218, 251, ${Math.random() * 0.3 + 0.1})`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${Math.random() * 3 + 4}s`,
        }}
      />
    ))}
  </div>
);

// Scroll Progress Indicator
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
      <div
        className="h-full executive-gradient transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [headerShrunk, setHeaderShrunk] = useState(false);

  // Scroll event for header shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setHeaderShrunk(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section visibility tracking
  useEffect(() => {
    const sections = ['products', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const upsProducts = [
    { name: 'Luminous UPS Systems', brand: 'Luminous', category: 'UPS & Inverters', image: 'https://www.olivepower.in/wp-content/uploads/2016/06/Luminous-Inverter-1050150AH-battery-Combo.jpg', features: ['Pure Sine Wave', '2 Year Warranty', 'Smart Charging'] },
    { name: 'Microtech UPS Systems', brand: 'Microtech', category: 'UPS & Inverters', image: 'https://m.media-amazon.com/images/I/316tPZLosFL._SY300_SX300_QL70_FMwebp_.jpg', features: ['High Efficiency', 'LCD Display', 'Overload Protection'] },
    { name: 'Exide UPS Systems', brand: 'Exide', category: 'UPS & Inverters', image: 'https://batteryexpertsindia.in/wp-content/uploads/2022/04/Exide-850VA-12V-Inverter-UPS.jpg', features: ['Fast Charging', 'Low Maintenance', 'Digital Display'] },
    { name: 'Amaze UPS Systems', brand: 'Amaze', category: 'UPS & Inverters', image: 'https://m.media-amazon.com/images/I/418JLapCJaL._SY300_SX300_QL70_FMwebp_.jpg', features: ['Combo Pack', 'Value for Money', 'Reliable'] },
    { name: 'Amaron Batteries', brand: 'Amaron', category: 'Batteries', image: 'https://5.imimg.com/data5/RF/MH/XC/SELLER-91586022/amron-1000x1000.jpg', features: ['Long Life', 'Zero Maintenance', 'Pro Rata Warranty'] },
    { name: 'LIVGUARD Batteries', brand: 'LIVGUARD', category: 'Batteries', image: 'https://static1.industrybuying.com/products/electrical/stabilizers-inverters-ups-and-batteries/inverter-battery/ELE.INV.425980140_1709025511198.webp', features: ['AI Technology', '60 Month Warranty', 'Fast Charge'] },
  ];

  const cctvProducts = [
    { name: 'Hikvision CCTV Cameras', brand: 'Hikvision', category: 'CCTV Security', image: 'https://duocall.co.uk/wp-content/uploads/hikvision-cctv-and-security-2.png', features: ['4K Resolution', 'Night Vision', 'Motion Detection'] },
    { name: 'Hikvision NVR Systems', brand: 'Hikvision', category: 'CCTV Security', image: 'https://cpimg.tistatic.com/09109793/b/4/Hikvision-16-Channel-NVR.jpg', features: ['8 Channel', 'Remote Access', '4TB Storage'] },
    { name: 'Hikvision DVR Systems', brand: 'Hikvision', category: 'CCTV Security', image: 'https://5.imimg.com/data5/SELLER/Default/2021/3/QY/FV/EY/23495999/hikvision-hd-series-ds-7a04hqhi-k1-1080p-2mp-4-channel-mini-turbo-dvr-white--500x500.jpg', features: ['HD Recording', 'Mobile View', 'Easy Setup'] },
  ];

  const solarProducts = [
    { name: 'Luminous Solar Panels', brand: 'Luminous', category: 'Solar Solutions', image: 'https://m.media-amazon.com/images/I/510tdXusMcL.jpg', features: ['High Efficiency', '25 Year Warranty', 'Monocrystalline'] },
    { name: 'Luminous Solar Inverters', brand: 'Luminous', category: 'Solar Solutions', image: 'https://solutions.luminousindia.com/static/edge/public/styles/webp_image/azblob/2026-05/8ba4a4d8-6ad5-4f23-81fd-4386478566f0.jpg.webp?itok=ODxaNR4R', features: ['MPPT Technology', 'WiFi Enabled', 'Smart Grid'] },
    { name: 'Luminous Solar Batteries', brand: 'Luminous', category: 'Solar Solutions', image: 'https://5.imimg.com/data5/SELLER/Default/2021/3/QP/CS/DR/65602637/luminous-solar-battery-12v-20ah-lpt-1220h-1000x1000.png', features: ['Deep Cycle', 'C10 Rated', 'Tubular Technology'] },
  ];

  const handleWhatsAppRedirect = (productName: string) => {
    const message = `Hi! I'm interested in ${productName}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/919901893191?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Scroll reveal hooks for sections
  const heroReveal = useScrollReveal();
  const upsReveal = useScrollReveal();
  const cctvReveal = useScrollReveal();
  const solarReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-primary-light">
      <ScrollProgress />
      
      {/* Enhanced Header with shrink effect */}
      <header className={`bg-primary-dark shadow-md sticky top-0 z-50 transition-all duration-300 ${headerShrunk ? 'py-1' : 'py-0'}`}>
        <div className="container mx-auto px-4">
          <div className={`flex justify-between items-center transition-all duration-300 ${headerShrunk ? 'py-2' : 'py-3'}`}>
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className={`bg-accent-blue rounded-md flex items-center justify-center transition-all duration-300 subtle-glow ${headerShrunk ? 'w-8 h-8' : 'w-10 h-10'}`}>
                <span className={`text-primary-light font-bold transition-all ${headerShrunk ? 'text-sm' : 'text-xl'}`}>PLT</span>
              </div>
              <div>
                <h1 className={`font-bold text-primary-light group-hover:text-accent-blue transition-colors ${headerShrunk ? 'text-lg' : 'text-xl'}`}>
                  PowerLink Technologies
                </h1>
                <p className={`text-primary-light transition-all ${headerShrunk ? 'text-[10px]' : 'text-xs'}`}>
                  Founded by Venkatesan K - Since 2008
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {[
                { to: '/', label: 'Home', isActive: true },
                { to: '/about', label: 'About' },
                { to: '/projects', label: 'Projects' },
                { href: '#products', label: 'Products' },
                { href: '#contact', label: 'Contact' },
              ].map((item, i) => (
                item.to ? (
                  <NavLink 
                    key={i}
                    to={item.to} 
                    className={`font-medium px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden group ${item.isActive ? 'text-accent-blue bg-accent-blue/10' : 'text-primary-light hover:text-accent-blue hover:bg-accent-blue/5'}`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 bg-accent-blue/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </NavLink>
                ) : (
                  <button 
                    key={i}
                    onClick={() => scrollToSection(item.href!.slice(1))}
                    className={`font-medium px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden group text-primary-light hover:text-accent-blue hover:bg-accent-blue/5 ${activeSection === item.href?.slice(1) ? 'text-accent-blue' : ''}`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 bg-accent-blue/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </button>
                )
              ))}
            </nav>

            <button 
              className="md:hidden p-2 text-primary-light hover:bg-accent-blue/20 rounded-lg transition-all duration-300 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-3 rotate-45' : 'top-1'}`} />
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-3 -rotate-45' : 'top-5'}`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu with slide animation */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <nav className="py-4 border-t border-primary-light/20 flex flex-col space-y-1">
              {[
                { to: '/', label: 'Home', isActive: true },
                { to: '/about', label: 'About' },
                { to: '/projects', label: 'Projects' },
                { href: '#products', label: 'Products' },
                { href: '#contact', label: 'Contact' },
              ].map((item, i) => (
                item.to ? (
                  <NavLink 
                    key={i}
                    to={item.to} 
                    className={`font-medium px-4 py-3 rounded-lg transition-all ${item.isActive ? 'text-accent-blue bg-accent-blue/10' : 'text-primary-light hover:text-accent-blue hover:bg-accent-blue/10'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <button 
                    key={i}
                    onClick={() => scrollToSection(item.href!.slice(1))}
                    className="text-left font-medium px-4 py-3 rounded-lg transition-all text-primary-light hover:text-accent-blue hover:bg-accent-blue/10"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with enhanced animations */}
      <section 
        ref={heroReveal.ref}
        className="py-24 px-4 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-secondary/40 relative overflow-hidden min-h-[90vh] flex items-center"
      >
        <FloatingParticles />
        
        <div className={`container mx-auto text-center relative z-10 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/30 mb-6 animate-subtle-pulse">
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span className="text-sm font-medium text-accent-blue">Trusted Since 2008</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-primary-dark mb-6 drop-shadow-lg leading-tight">
            Power Solutions for{' '}
            <span className="gradient-text inline-block animate-gentle-float">Every Need</span>
          </h2>
          
          <p className="text-lg md:text-xl text-primary-light/85 mb-10 max-w-3xl mx-auto leading-relaxed">
            Power Link Technologies delivers reliable power backup and security solutions. 
            We specialize in high-quality <strong className="text-accent-blue">UPS systems</strong>, batteries, 
            <strong className="text-accent-blue"> CCTV surveillance</strong>, and 
            <strong className="text-accent-blue"> solar energy products</strong>—partnering with 
            top brands like Luminous, Exide, and Hikvision.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="executive-gradient text-primary-light hover-scale font-semibold px-8 py-6 rounded-xl professional-shadow group relative overflow-hidden"
              onClick={() => scrollToSection('products')}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-primary-light px-8 py-6 rounded-xl hover-scale font-semibold transition-all duration-300"
              onClick={() => handleWhatsAppRedirect('General Inquiry')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={() => scrollToSection('products')}
            className="animate-bounce text-primary-light/60 hover:text-accent-blue transition-colors"
            aria-label="Scroll to products"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnptLTE4IDE4aDZ2LTZoLTZ2NnptNiAwdjZoNnYtNmgtNnptLTYtNnYtNmgtNnY2aDZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTAtNmgtNnY2aDZ2LTZ6bTAgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </section>

      {/* UPS & Inverters Section */}
      <section 
        id="products" 
        ref={upsReveal.ref}
        className="py-20 px-4 bg-solar-section relative overflow-hidden"
      >
        <div className={`container mx-auto relative z-10 transition-all duration-1000 ${upsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Zap className="w-8 h-8 text-accent-blue animate-subtle-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">UPS & Inverters</h2>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Reliable power backup solutions from trusted brands to keep your home and business running smoothly.
            </p>
            <div className="futuristic-divider w-32 mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upsProducts.map((product, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-500 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard 
                  product={product} 
                  onBuyClick={() => handleWhatsAppRedirect(product.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CCTV Section */}
      <section 
        ref={cctvReveal.ref}
        className="py-24 px-4 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-secondary/40 relative overflow-hidden min-h-[90vh] flex items-center"
      >
        <div className={`container mx-auto relative z-10 transition-all duration-1000 ${cctvReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-primary-light animate-subtle-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-dark">CCTV Security Systems</h2>
            </div>
            <p className="text-lg text-dark/80 max-w-2xl mx-auto">
              Advanced security solutions with Hikvision technology to protect what matters most to you.
            </p>
            <div className="futuristic-divider w-32 mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cctvProducts.map((product, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-500 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard 
                  product={product} 
                  onBuyClick={() => handleWhatsAppRedirect(product.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solar Solutions Section */}
      <section 
        ref={solarReveal.ref}
        className="py-20 px-4 bg-solar-section relative overflow-hidden"
      >
        <div className={`container mx-auto relative z-10 transition-all duration-1000 ${solarReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Sun className="w-8 h-8 text-primary-light animate-subtle-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Solar Solutions</h2>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Harness the power of the sun with our premium Luminous solar panels and inverters for sustainable energy.
            </p>
            <div className="futuristic-divider w-32 mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solarProducts.map((product, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-500 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard 
                  product={product} 
                  onBuyClick={() => handleWhatsAppRedirect(product.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Animated Counters */}
      <section 
        ref={aboutReveal.ref}
        className="py-20 px-4 bg-gradient-to-b from-primary-light via-white to-accent-blue/5 text-primary-dark"
      >
        <div className={`container mx-auto text-center transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-dark">
            About <span className="gradient-text">PowerLink Technologies</span>
          </h2>
          <p className="text-primary-dark/70 mb-12 max-w-2xl mx-auto">
            Your trusted partner for comprehensive power and security solutions in Bangalore.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: 15, suffix: '+', label: 'Years of Experience', icon: '🏆' },
              { value: 1000, suffix: '+', label: 'Happy Customers', icon: '😊' },
              { value: 24, suffix: '/7', label: 'Support Available', icon: '🛠️' },
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="glass-card hover-subtle-glow border-none group cursor-default"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg text-primary-dark/80 group-hover:text-accent-blue transition-colors">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactReveal.ref}
        className="py-20 px-4 bg-solar-section relative overflow-hidden"
      >
        <div className={`container mx-auto relative z-10 transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-light">
            Get in Touch
          </h2>
          <p className="text-center text-primary-light/70 mb-12 max-w-xl mx-auto">
            Ready to power your future? Contact us through any of the channels below.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                icon: Phone, 
                title: 'Phone', 
                value: '+91 99018 93191', 
                action: 'Tap to call',
                href: 'tel:+919901893191',
                color: 'from-green-400 to-emerald-500'
              },
              { 
                icon: Mail, 
                title: 'Email', 
                value: 'info@powerlinktechnologies.com', 
                action: 'Tap to send email',
                href: `mailto:info@powerlinktechnologies.com?subject=${encodeURIComponent('Inquiry from Website')}&body=${encodeURIComponent('Hello PowerLink Technologies,\n\nI am interested in your products and services.\n\nThank you.')}`,
                color: 'from-blue-400 to-cyan-500'
              },
              { 
                icon: MapPin, 
                title: 'Location', 
                value: 'Bangalore, Karnataka', 
                action: 'Tap to view on map',
                href: 'https://maps.app.goo.gl/GAfCcJqLZTutJvi48',
                external: true,
                color: 'from-orange-400 to-red-500'
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="glass-card neon-border group block hover-scale cursor-pointer transition-all duration-500"
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary-light group-hover:text-accent-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-primary-light/70 text-sm mb-2">{item.value}</p>
                  <p className="text-accent-dark text-sm font-medium flex items-center justify-center gap-1">
                    {item.action}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </p>
                </CardContent>
              </a>
            ))}
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnptLTE4IDE4aDZ2LTZoLTZ2NnptNiAwdjZoNnYtNmgtNnptLTYtNnYtNmgtNnY2aDZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTAtNmgtNnY2aDZ2LTZ6bTAgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-primary-light py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 executive-gradient rounded-xl flex items-center justify-center subtle-glow group-hover:scale-110 transition-transform">
              <span className="text-primary-light font-bold text-xl">PLT</span>
            </div>
            <span className="text-2xl font-bold group-hover:text-accent-blue transition-colors">Power Link Technologies</span>
          </div>
          <p className="text-primary-dark/80 mb-4">Founded by Venkatesan K • Serving since 2008</p>
          <div className="futuristic-divider w-48 mx-auto mb-4" />
          <p className="text-primary-light/60">&copy; 2026 Power Link Technologies. All rights reserved.</p>
        </div>
      </footer>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default Index;
