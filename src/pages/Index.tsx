import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Zap, Shield, Sun, ChevronDown, Sparkles, ArrowRight,
  Award, Users, Clock, Wrench, ClipboardCheck, Headphones, ShieldCheck, Quote, Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import CircuitHero from '@/components/CircuitHero';
import { useViewTransitionNavigate } from '@/hooks/useViewTransitionNavigate';
import { useMagnetic } from '@/hooks/useMagnetic';

// Intersection Observer Hook for scroll animations
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // Generous bottom margin so content reveals before it scrolls into view —
      // fast scrolling or nav jumps never land on a blank section
      { threshold: 0, rootMargin: '0px 0px 300px 0px' }
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

// Section heading — icon fused inline with the heading, not a separate label above it
const SectionHeading = ({
  icon: Icon,
  title,
  description,
  tone = 'blue',
  dark = false,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  tone?: 'blue' | 'amber';
  dark?: boolean;
}) => (
  <div className="text-center mb-14">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto mb-4 ${tone === 'amber' ? 'bg-accent-amber/10' : 'bg-accent-blue/10'}`}>
      <Icon className={`w-6 h-6 ${tone === 'amber' ? 'text-accent-amber' : 'text-accent-blue'}`} />
    </div>
    <h2 className={`font-display text-3xl md:text-4xl font-bold mb-5 ${dark ? 'text-white' : 'text-primary-dark'}`}>
      {title}
    </h2>
    {description && (
      <p className={`text-lg max-w-2xl mx-auto ${dark ? 'text-white/70' : 'text-primary-dark/60'}`}>
        {description}
      </p>
    )}
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
  const transitionNavigate = useViewTransitionNavigate();
  const heroCta = useMagnetic<HTMLButtonElement>();
  const videoCta = useMagnetic<HTMLButtonElement>();

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
  const servicesReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-primary-light">
      <ScrollProgress />
      
      {/* Enhanced Header with shrink effect */}
      <header
        className={`bg-primary-dark shadow-md sticky top-0 z-50 transition-all duration-300 ${headerShrunk ? 'py-1' : 'py-0'}`}
        style={{ viewTransitionName: 'site-header' } as React.CSSProperties}
      >
        <div className="container mx-auto px-4">
          <div className={`flex justify-between items-center transition-all duration-300 ${headerShrunk ? 'py-2' : 'py-3'}`}>
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className={`bg-accent-blue rounded-md flex items-center justify-center transition-all duration-300 subtle-glow ${headerShrunk ? 'w-8 h-8' : 'w-10 h-10'}`}>
                <span className={`text-primary-light font-bold transition-all ${headerShrunk ? 'text-sm' : 'text-xl'}`}>PLT</span>
              </div>
              <div>
                <h1 className={`font-display font-bold text-primary-light group-hover:text-accent-blue transition-colors ${headerShrunk ? 'text-lg' : 'text-xl'}`}>
                  PowerLink Technologies
                </h1>
                <p className="text-primary-light text-xs transition-all">
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
                    onClick={(e) => { e.preventDefault(); transitionNavigate(item.to); }}
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
                    onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); transitionNavigate(item.to); }}
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

      {/* Hero Section — one authored entrance: badge, headline, copy, and CTAs cascade in sequence */}
      <section
        ref={heroReveal.ref}
        className="py-28 px-4 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-secondary/40 relative overflow-hidden min-h-[90vh] flex items-center"
      >
        <div className="container mx-auto text-center relative z-10">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-amber/10 border border-accent-amber/30 mb-7 transition-all duration-700 ease-confident ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Sparkles className="w-4 h-4 text-accent-amber" />
            <span className="text-sm font-medium text-accent-amber">Trusted Since 2008 • 1500+ Customers</span>
          </div>

          <h2
            className={`font-display text-5xl md:text-7xl font-bold text-primary-light mb-6 leading-[1.05] transition-all duration-700 ease-confident ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: heroReveal.isVisible ? '90ms' : '0ms' }}
          >
            Power Solutions for{' '}
            <span className="gradient-text-warm inline-block">Every Need</span>
          </h2>

          <p
            className={`text-lg md:text-xl text-primary-light/80 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ease-confident ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: heroReveal.isVisible ? '180ms' : '0ms' }}
          >
            Reliable power backup and security solutions. We specialize in high-quality{' '}
            <strong className="text-accent-blue">UPS systems</strong>, batteries,{' '}
            <strong className="text-accent-blue">CCTV surveillance</strong>, and{' '}
            <strong className="text-accent-blue">solar energy products</strong> — partnering
            with top brands like Luminous, Exide, and Hikvision.
          </p>

          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ease-confident ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: heroReveal.isVisible ? '270ms' : '0ms' }}
          >
            <Button
              ref={heroCta.ref}
              onMouseMove={heroCta.onMouseMove}
              onMouseLeave={heroCta.onMouseLeave}
              size="lg"
              className="executive-gradient text-primary-light font-semibold px-8 py-6 rounded-xl professional-shadow group relative overflow-hidden"
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

        {/* Living Circuit — animated circuit-trace canvas, the hero's one authored visual moment */}
        <CircuitHero />

        {/* Gradient Orbs — drift apart on scroll where supported (animation-timeline: scroll()), static otherwise */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl hero-orb-1" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl hero-orb-2" />
      </section>

      {/* Brands Strip */}
      <section className="py-10 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-primary-dark/40 mb-6">
            Authorized dealer for leading brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3">
            {['Luminous', 'Exide', 'Amaron', 'LIVGUARD', 'Microtek', 'Hikvision'].map((brand) => (
              <span
                key={brand}
                className="text-lg md:text-xl font-bold text-primary-dark/30 hover:text-accent-blue transition-colors cursor-default select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* UPS & Inverters Section */}
      <section
        id="products"
        ref={upsReveal.ref}
        className="py-24 px-4 bg-primary-light relative overflow-hidden"
      >
        <div className={`container mx-auto relative z-10 transition-all duration-500 ${upsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <SectionHeading
            icon={Zap}
            title="UPS, Inverters & Batteries"
            description="Reliable power backup solutions from trusted brands to keep your home and business running smoothly."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upsProducts.map((product, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 hover:-translate-y-2 ${upsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <ProductCard
                  product={product}
                  onBuyClick={() => handleWhatsAppRedirect(product.name)}
                />
              </div>
            ))}
          </div>

          {/* Featured Product Video */}
          <div className="mt-16 max-w-5xl mx-auto">
            <Card className="bg-white border border-accent-blue/20 overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                <div className="relative bg-primary-dark">
                  <video
                    src="/videos/microtek-lithium-ups.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full max-h-[420px] object-contain"
                  >
                    Your browser does not support video playback.
                  </video>
                </div>
                <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent-amber mb-3">
                    <Sparkles className="w-4 h-4" />
                    Featured Product
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                    Microtek UPS with Inbuilt Lithium Battery
                  </h3>
                  <p className="text-primary-dark/60 leading-relaxed mb-6">
                    The latest generation of power backup — a compact, wall-mountable UPS with the
                    lithium battery built in. No separate battery, no maintenance, no acid, and a
                    much smaller footprint than a traditional inverter-battery setup.
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {[
                      'Inbuilt lithium battery — zero maintenance',
                      'Compact & wall-mountable design',
                      'Faster charging than tubular batteries',
                      'Longer service life, no water top-ups',
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-3 text-primary-dark/75">
                        <Zap className="w-4 h-4 mt-1 flex-shrink-0 text-accent-blue" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    ref={videoCta.ref}
                    onMouseMove={videoCta.onMouseMove}
                    onMouseLeave={videoCta.onMouseLeave}
                    onClick={() => handleWhatsAppRedirect('Microtek UPS with Inbuilt Lithium Battery')}
                    className="executive-gradient text-primary-light font-semibold h-12 px-8 rounded-xl shadow-md w-full sm:w-auto self-start"
                  >
                    Enquire on WhatsApp
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CCTV Section */}
      <section
        ref={cctvReveal.ref}
        className="py-24 px-4 bg-solar-section relative overflow-hidden"
      >
        <div className={`container mx-auto relative z-10 transition-all duration-500 ${cctvReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <SectionHeading
            icon={Shield}
            title="CCTV Security Systems"
            description="Advanced security solutions with Hikvision technology to protect what matters most to you."
            dark
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cctvProducts.map((product, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 hover:-translate-y-2 ${cctvReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
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
        className="py-24 px-4 bg-gradient-to-b from-white to-amber-50/50 relative overflow-hidden"
      >
        <div className={`container mx-auto relative z-10 transition-all duration-500 ${solarReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <SectionHeading
            icon={Sun}
            title="Solar Solutions"
            description="Harness the power of the sun with our premium Luminous solar panels and inverters for sustainable energy."
            tone="amber"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solarProducts.map((product, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 hover:-translate-y-2 ${solarReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
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

      {/* Services Section */}
      <section ref={servicesReveal.ref} className="py-20 px-4 bg-primary-light">
        <div className="container mx-auto">
          <SectionHeading
            icon={Wrench}
            title="Complete Service, End to End"
            description="We don't just sell products — we assess, install, and maintain your systems for their entire life."
          />

          {/* Connected process flow, not a grid of identical cards — this is a sequence */}
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent-blue/10 via-accent-blue/40 to-accent-blue/10" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
              {[
                {
                  icon: ClipboardCheck,
                  title: 'Free Site Assessment',
                  description: 'We visit your home or business, study your power needs, and recommend the right capacity — no charges, no obligation.',
                },
                {
                  icon: Wrench,
                  title: 'Professional Installation',
                  description: 'Certified technicians install every UPS, solar and CCTV system safely, neatly, and up to code.',
                },
                {
                  icon: ShieldCheck,
                  title: 'AMC & Maintenance',
                  description: 'Annual maintenance contracts, battery health checks and preventive servicing to keep systems running.',
                },
                {
                  icon: Headphones,
                  title: '24/7 Support',
                  description: "Power failures don't keep office hours. Call or WhatsApp us any time and we'll get you back online.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className={`relative flex gap-5 lg:flex-col lg:gap-0 lg:text-center group transition-all duration-500 ${servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {index < 3 && (
                    <div className="lg:hidden absolute left-8 top-16 w-0.5 bg-accent-blue/20" style={{ height: 'calc(100% + 1.5rem)' }} />
                  )}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-white border-2 border-accent-blue/30 flex items-center justify-center shadow-lg flex-shrink-0 lg:mx-auto transition-transform duration-300 group-hover:scale-110">
                    <service.icon className="w-7 h-7 text-accent-blue" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full executive-gradient text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </span>
                  </div>
                  <div className="lg:mt-5">
                    <h3 className="font-display text-lg font-bold text-primary-dark mb-2">{service.title}</h3>
                    <p className="text-sm text-primary-dark/60 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Animated Counters */}
      <section
        ref={aboutReveal.ref}
        className="py-20 px-4 bg-gradient-to-b from-primary-light via-white to-accent-blue/5 text-primary-dark"
      >
        <div className={`container mx-auto text-center transition-all duration-500 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-primary-dark">
            About <span className="text-accent-blue">PowerLink Technologies</span>
          </h2>
          <p className="text-primary-dark/70 mb-12 max-w-2xl mx-auto">
            Your trusted partner for comprehensive power and security solutions in Bangalore.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: 18, suffix: '+', label: 'Years of Experience', icon: Award },
              { value: 1500, suffix: '+', label: 'Happy Customers', icon: Users },
              { value: 24, suffix: '/7', label: 'Support Available', icon: Clock },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-white border border-border shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl executive-gradient flex items-center justify-center shadow-lg">
                    <stat.icon className="w-7 h-7 text-primary-light" />
                  </div>
                  <div className="font-display text-4xl md:text-5xl font-bold mb-2 text-accent-blue">
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

      {/* Testimonials Section */}
      <section ref={testimonialsReveal.ref} className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <SectionHeading icon={Quote} title="What Our Customers Say" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: 'PowerLink installed a complete UPS backup for our clinic. Dental equipment can\'t afford power cuts — we haven\'t had a single interruption since.',
                name: 'Dental Clinic',
                detail: 'Kadugodi, Bangalore',
              },
              {
                quote: 'The 5KW solar installation on our home was done neatly and on schedule. Our electricity bills have dropped noticeably every month.',
                name: 'Residential Customer',
                detail: 'Ramamurthy Nagar, Bangalore',
              },
              {
                quote: 'Quick response, honest advice on battery capacity, and they still follow up for servicing. Rare to find this kind of after-sales support.',
                name: 'Business Owner',
                detail: 'Narsapura, Karnataka',
              },
            ].map((t, index) => (
              <Card
                key={index}
                className={`bg-primary-light border border-border elevation-soft transition-all duration-500 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-amber text-accent-amber" />
                    ))}
                  </div>
                  <p className="text-primary-dark/75 leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-primary-dark">{t.name}</p>
                    <p className="text-sm text-primary-dark/50">{t.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-primary-light">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading icon={Headphones} title="Frequently Asked Questions" />

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: 'What size UPS or inverter do I need for my home?',
                a: 'It depends on the load you want to back up — fans, lights, TV, refrigerator, etc. As a rough guide, a typical 2–3 BHK home runs comfortably on 900VA–1500VA with a 150Ah battery. We do a free site assessment to calculate exactly what you need, so you never overpay for capacity.',
              },
              {
                q: 'Is installation included in the price?',
                a: 'Yes. Every UPS, battery, solar and CCTV system we sell is installed by our own certified technicians, and installation is included in the quoted price. We also help with wiring, mounting and safe earthing.',
              },
              {
                q: 'What warranty do your products carry?',
                a: 'All products carry the official manufacturer warranty — typically 2–3 years on UPS systems, up to 60 months on batteries, and 25 years performance warranty on solar panels. We handle the warranty claim process for you.',
              },
              {
                q: 'Do you service systems you didn\'t install?',
                a: 'Yes. We repair and maintain existing UPS, inverter, battery and CCTV setups regardless of where you bought them, and we offer annual maintenance contracts for ongoing care.',
              },
              {
                q: 'How much can I save with solar?',
                a: 'A typical residential rooftop system offsets 70–90% of your electricity bill, and most installations pay for themselves in 4–6 years. Government subsidies may also apply — we\'ll guide you through the eligibility and paperwork.',
              },
              {
                q: 'How quickly can you respond to a breakdown?',
                a: 'For customers in Bangalore we aim for same-day service, and our phone and WhatsApp support is available 24/7. Call +91 99018 93191 any time.',
              },
            ].map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-white border border-border rounded-xl px-6 data-[state=open]:border-accent-blue/40"
              >
                <AccordionTrigger className="text-left font-semibold text-primary-dark hover:text-accent-blue hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-primary-dark/65 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactReveal.ref}
        className="py-24 px-4 bg-solar-section relative overflow-hidden"
      >
        <div className={`container mx-auto relative z-10 transition-all duration-500 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-primary-light">
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
                color: 'from-accent-blue to-cyan-600'
              },
              {
                icon: Mail,
                title: 'Email',
                value: 'info@powerlinktechnologies.in',
                action: 'Tap to send email',
                href: `mailto:info@powerlinktechnologies.in?subject=${encodeURIComponent('Inquiry from Website')}&body=${encodeURIComponent('Hello PowerLink Technologies,\n\nI am interested in your products and services.\n\nThank you.')}`,
                color: 'from-slate-500 to-slate-600'
              },
              {
                icon: MapPin,
                title: 'Location',
                value: 'Bangalore, Karnataka',
                action: 'Tap to view on map',
                href: 'https://maps.app.goo.gl/GAfCcJqLZTutJvi48',
                external: true,
                color: 'from-accent-amber to-orange-600'
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="bg-white/5 border border-white/15 hover:border-accent-blue/50 hover:bg-white/10 rounded-2xl group block hover-scale cursor-pointer transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary-light group-hover:text-accent-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-primary-light/70 text-sm mb-2">{item.value}</p>
                  <p className="text-primary-light text-sm font-semibold flex items-center justify-center gap-1">
                    {item.action}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </p>
                </CardContent>
              </a>
            ))}
          </div>
        </div>

        {/* Background Pattern */}
      </section>

      {/* Footer */}
      <Footer />

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default Index;
