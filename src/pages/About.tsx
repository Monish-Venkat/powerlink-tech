import { NavLink } from 'react-router-dom';
import { Menu, X, Award, Users, Clock, Shield, Zap, ShieldCheck, UsersRound, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Scroll reveal hook
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Timeline Component
const TimelineItem = ({ date, title, description, icon: Icon }: {
  date: string;
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`group flex items-start space-x-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-50px]'}`}>
      <div className="w-4 h-4 mt-2 bg-gradient-to-r from-accent-blue to-secondary rounded-full flex-shrink-0 ring-4 ring-accent-blue/20 group-hover:scale-125 transition-all duration-300" />
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className="w-5 h-5 text-accent-blue animate-subtle-pulse" />
          <span className="font-semibold text-sm text-accent-blue">{date}</span>
        </div>
        <h4 className="text-xl font-bold text-primary-dark group-hover:text-accent-blue transition-colors mb-2">
          {title}
        </h4>
        <p className="text-primary-dark/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Stats Counter
const StatsCounter = ({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2500;
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

  return (
    <div ref={ref} className="text-center group hover-scale">
      <div className="text-4xl md:text-5xl font-black mb-2 gradient-text">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-lg text-primary-dark/80 group-hover:text-accent-blue transition-colors">
        {label}
      </div>
    </div>
  );
};

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerShrunk, setHeaderShrunk] = useState(false);

  // Header shrink effect
  useEffect(() => {
    const handleScroll = () => setHeaderShrunk(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal hooks
  const heroReveal = useScrollReveal();
  const storyReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const missionReveal = useScrollReveal();
  const valuesReveal = useScrollReveal();
  const timelineReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to learn more about PowerLink Technologies services and get a quote.";
    const whatsappUrl = `https://wa.me/919901893191?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Enhanced Header */}
      <header className={`bg-primary-dark shadow-lg sticky top-0 z-50 transition-all duration-300 ${headerShrunk ? 'py-1 shadow-xl' : 'py-0'}`}>
        <div className="container mx-auto px-4">
          <div className={`flex justify-between items-center transition-all duration-300 ${headerShrunk ? 'py-2' : 'py-4'}`}>
            <div 
              className="flex items-center space-x-3 group cursor-pointer hover-scale" 
              onClick={scrollToTop}
            >
              <div className={`bg-accent-blue rounded-lg flex items-center justify-center transition-all duration-300 subtle-glow ${headerShrunk ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <span className={`text-primary-light font-bold transition-all ${headerShrunk ? 'text-lg' : 'text-xl'}`}>PLT</span>
              </div>
              <div>
                <h1 className={`font-bold text-primary-light group-hover:text-accent-blue transition-colors font-display ${headerShrunk ? 'text-xl' : 'text-2xl'}`}>
                  PowerLink Technologies
                </h1>
                <p className={`text-primary-light transition-all ${headerShrunk ? 'text-xs' : 'text-sm'}`}>
                  Founded by Venkatesan K - Since 2008
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About', active: true },
                { to: '/projects', label: 'Projects' },
              ].map((item, i) => (
                <NavLink
                  key={i}
                  to={item.to}
                  className={`font-medium px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden group hover-scale ${
                    item.active 
                      ? 'text-accent-blue bg-accent-blue/10 shadow-md' 
                      : 'text-primary-light hover:text-accent-blue hover:bg-accent-blue/5'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-accent-blue/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-lg" />
                </NavLink>
              ))}
            </nav>

            <button 
              className="md:hidden p-3 text-primary-light hover:bg-accent-blue/20 rounded-xl transition-all duration-300 hover-scale active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <nav className="py-4 border-t border-primary-light/20 flex flex-col space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About', active: true },
                { to: '/projects', label: 'Projects' },
              ].map((item, i) => (
                <NavLink
                  key={i}
                  to={item.to}
                  className={`font-medium px-6 py-3 rounded-xl transition-all hover-scale ${item.active ? 'text-accent-blue bg-accent-blue/10' : 'text-primary-light hover:text-accent-blue hover:bg-accent-blue/10'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={heroReveal.ref}
        className="py-28 px-4 bg-gradient-to-br from-primary-light via-primary-light/90 to-accent-blue/10 relative overflow-hidden"
      >
        <div className={`container mx-auto text-center relative z-10 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-blue/10 to-secondary/10 border border-accent-blue/20 backdrop-blur-sm mb-8 animate-subtle-pulse hover-scale">
            <Sparkles className="w-5 h-5 text-accent-blue" />
            <span className="font-semibold text-lg text-accent-blue">Trusted Since 2008</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-lg">
            About{' '}
            <span className="gradient-text inline-block animate-gentle-float">PowerLink Technologies</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-dark/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Established in 2008 by visionary entrepreneur <strong className="text-accent-blue">Venkatesan K</strong>, we've been at the forefront of{' '}
            <span className="gradient-text">power solutions</span> and security systems for over 15 years, serving 1000+ satisfied customers across Bangalore.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="executive-gradient text-primary-light hover-scale font-semibold px-10 py-6 rounded-2xl professional-shadow group relative overflow-hidden shadow-2xl"
              onClick={handleWhatsAppContact}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-accent-blue/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-primary-light px-10 py-6 rounded-2xl hover-scale font-semibold shadow-lg"
              onClick={() => window.location.href = '/Projects.tsx'}
            >
              View Our Projects
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent-blue/10 rounded-2xl blur-xl animate-gentle-float" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-gentle-float" style={{ animationDelay: '1s' }} />
      </section>

      {/* Company Story with Timeline */}
      <section 
        ref={storyReveal.ref}
        className="py-24 px-4 bg-gradient-to-b from-white to-primary-light/50"
      >
        <div className={`container mx-auto transition-all duration-1000 ${storyReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black mb-4 text-primary-dark">
                Our Journey{' '}
                <span className="gradient-text">Timeline</span>
              </h3>
              <p className="text-xl text-primary-dark/70 max-w-2xl mx-auto">
                From humble beginnings to Bangalore's trusted power solutions partner
              </p>
            </div>

            {/* Timeline */}
            <div className="relative max-w-3xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue to-secondary rounded-full" />

              <div className="space-y-12">
                <TimelineItem
                  date="2008"
                  title="Foundation Year"
                  description="Founded by Venkatesan K with a vision to provide reliable power backup solutions to Bangalore homes and businesses. Started with UPS systems and tubular batteries."
                  icon={Zap}
                />
                <TimelineItem
                  date="2012"
                  title="Expansion Phase"
                  description="Expanded into automotive batteries and inverter combinations. Established service network across Bangalore. First 1000+ customers milestone."
                  icon={UsersRound}
                />
                <TimelineItem
                  date="2018"
                  title="Security Solutions"
                  description="Entered CCTV security systems market with Hikvision partnership. Began comprehensive power + security solution packages."
                  icon={ShieldCheck}
                />
                <TimelineItem
                  date="2023"
                  title="Solar Revolution"
                  description="Launched complete solar energy division with Luminous partnership. First 10KW commercial solar installations completed."
                  icon={Shield}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsReveal.ref}
        className="py-24 px-4 bg-primary-dark text-primary-light relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnptLTE4IDE4aDZ2LTZoLTZ2NnptNiAwdjZoNnYtNmgtNnptLTYtNnYtNmgtNnY2aDZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTAtNmgtNnY2aDZ2LTZ6bTAgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className={`container mx-auto relative z-10 transition-all duration-1000 ${statsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <StatsCounter target={18} suffix="+" label="Years Experience" />
            <StatsCounter target={1500} suffix="+" label="Happy Customers" />
            <StatsCounter target={500} suffix="+" label="Projects Completed" />
            <StatsCounter target={247} suffix="" label="Support Hours" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section 
        ref={missionReveal.ref}
        className="py-24 px-4 bg-white"
      >
        <div className={`container mx-auto transition-all duration-1000 ${missionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
            <Card className="glass-card hover-subtle-glow border-none professional-shadow">
              <CardContent className="p-10">
                <div className="w-16 h-16 executive-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Zap className="w-8 h-8 text-primary-light" />
                </div>
                <h3 className="text-3xl font-black mb-6 gradient-text">Our Mission</h3>
                <p className="text-xl text-primary-dark/80 leading-relaxed">
                  To provide innovative, reliable, and cost-effective power solutions that ensure uninterrupted power supply and enhanced security for our customers while contributing to a sustainable future through renewable energy solutions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover-subtle-glow border-none professional-shadow">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="w-8 h-8 text-primary-light" />
                </div>
                <h3 className="text-3xl font-black mb-6 gradient-text">Our Vision</h3>
                <p className="text-xl text-primary-dark/80 leading-relaxed">
                  To be the leading provider of comprehensive power and security solutions in South India, recognized for our commitment to quality, innovation, and customer satisfaction while promoting sustainable energy practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section 
        ref={valuesReveal.ref}
        className="py-24 px-4 bg-primary-dark text-primary-light relative overflow-hidden"
      >
        <div className={`container mx-auto text-center transition-all duration-1000 ${valuesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h3 className="text-4xl md:text-5xl font-black mb-16 text-primary-white">
            Our Core <span className="gradient-text">Values</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'Committed to delivering the highest quality products and services that exceed customer expectations.',
                color: 'from-accent-blue to-blue-500'
              },
              {
                icon: ShieldCheck,
                title: 'Reliability',
                description: 'Building long-term relationships through consistent, dependable service and support.',
                color: 'from-emerald-500 to-green-500'
              },
              {
                icon: UsersRound,
                title: 'Customer Focus',
                description: 'Understanding and addressing unique customer needs with personalized solutions and dedicated support.',
                color: 'from-orange-500 to-red-500'
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="group hover-scale cursor-default"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-24 h-24 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                  <value.icon className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-2xl font-black mb-4 text-primary-white group-hover:text-accent-blue transition-colors">
                  {value.title}
                </h4>
                <p className="text-lg text-primary-dark/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaReveal.ref}
        className="py-20 px-4 bg-solar-section relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-secondary/5 to-primary-dark/20" />
        <div className="container mx-auto relative z-10 text-center transition-all duration-1000">
          <div className={`transition-all duration-1000 ${ctaReveal.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-primary-light drop-shadow-lg">
              Ready to Power Your{' '}
              <span className="gradient-text animate-gentle-float">Future?</span>
            </h3>
            <p className="text-xl md:text-2xl text-primary-light/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Contact us today to discuss your power and security needs with our expert team. 
              Free consultation and site assessment included.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="executive-gradient text-primary-light hover-scale font-black text-lg px-12 py-8 rounded-2xl professional-shadow shadow-2xl group bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-700"
                onClick={handleWhatsAppContact}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Free Quote
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-3 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-primary-light px-12 py-8 rounded-2xl hover-scale font-semibold text-lg shadow-xl"
                onClick={() => window.location.href = '/projects'}
              >
                View Our Projects
              </Button>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default About;
