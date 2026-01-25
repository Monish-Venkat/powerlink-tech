import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary-dark/95 to-secondary/30 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div 
        className="absolute w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl transition-transform duration-300"
        style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`, top: '10%', right: '10%' }}
      />
      <div 
        className="absolute w-80 h-80 bg-secondary/20 rounded-full blur-3xl transition-transform duration-300"
        style={{ transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`, bottom: '10%', left: '10%' }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-gentle-float"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: `rgba(97, 218, 251, ${Math.random() * 0.4 + 0.1})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${Math.random() * 3 + 3}s`,
          }}
        />
      ))}

      <div className="text-center relative z-10 px-4 max-w-lg">
        {/* Animated 404 */}
        <div 
          className="relative mb-8 transition-transform duration-300"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        >
          <h1 className="text-[150px] md:text-[200px] font-black gradient-text leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-16 h-16 md:w-24 md:h-24 text-accent-blue/30 animate-subtle-pulse" />
          </div>
        </div>

        {/* Glass Card Content */}
        <div className="glass-card neon-border p-8 rounded-2xl backdrop-blur-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-light mb-4">
            Oops! Power Outage
          </h2>
          <p className="text-primary-light/70 mb-6 leading-relaxed">
            The page you're looking for seems to have lost power. Don't worry, our UPS systems are on standby!
          </p>
          
          <div className="text-sm text-primary-light/50 mb-6 px-4 py-2 bg-white/5 rounded-lg">
            <code className="font-mono">Route: {location.pathname}</code>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="executive-gradient text-primary-light hover-scale font-semibold px-6 py-3 rounded-xl professional-shadow group"
              onClick={() => navigate('/')}
            >
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Back to Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-primary-light px-6 py-3 rounded-xl hover-scale font-semibold"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[
            { label: 'Products', href: '/#products' },
            { label: 'About Us', href: '/about' },
            { label: 'Projects', href: '/projects' },
          ].map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-primary-light/60 hover:text-accent-blue transition-colors text-sm font-medium px-3 py-1 rounded-full hover:bg-accent-blue/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnptLTE4IDE4aDZ2LTZoLTZ2NnptNiAwdjZoNnYtNmgtNnptLTYtNnYtNmgtNnY2aDZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTAtNmgtNnY2aDZ2LTZ6bTAgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default NotFound;
