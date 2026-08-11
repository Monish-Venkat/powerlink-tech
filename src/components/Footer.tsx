import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react';
import { useViewTransitionNavigate } from '@/hooks/useViewTransitionNavigate';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-xl bg-primary-dark/80 backdrop-blur-sm border border-accent-blue/30 text-primary-light shadow-lg hover:bg-accent-blue hover:border-accent-blue transition-all duration-300 flex items-center justify-center animate-fade-in"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

const Footer = () => {
  const navigate = useViewTransitionNavigate();
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Projects', to: '/projects' },
  ];

  const products = [
    'UPS & Inverters',
    'Inverter Batteries',
    'CCTV Security Systems',
    'Solar Panels & Inverters',
    'Solar Water Heaters',
  ];

  return (
    <>
      <BackToTop />
      <footer className="bg-primary-black text-primary-light px-4 pt-16 pb-8 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-11 h-11 executive-gradient rounded-xl flex items-center justify-center">
                  <span className="text-primary-light font-bold text-lg">PLT</span>
                </div>
                <span className="font-display text-lg font-bold leading-tight">PowerLink<br />Technologies</span>
              </div>
              <p className="text-primary-light/60 text-sm leading-relaxed">
                Reliable power backup, solar energy and security solutions for homes
                and businesses across Bangalore. Founded by Venkatesan K in 2008.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-primary-light mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={(e) => { e.preventDefault(); navigate(link.to); }}
                      className="text-primary-light/60 hover:text-accent-blue transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="/#products" className="text-primary-light/60 hover:text-accent-blue transition-colors text-sm">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="text-primary-light/60 hover:text-accent-blue transition-colors text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold text-primary-light mb-4">What We Offer</h4>
              <ul className="space-y-2.5">
                {products.map((p) => (
                  <li key={p} className="text-primary-light/60 text-sm">{p}</li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-primary-light mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:+919901893191" className="flex items-start gap-3 text-primary-light/60 hover:text-accent-blue transition-colors">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-blue" />
                    +91 99018 93191
                  </a>
                </li>
                <li>
                  <a href="mailto:info@powerlinktechnologies.in" className="flex items-start gap-3 text-primary-light/60 hover:text-accent-blue transition-colors break-all">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-blue" />
                    info@powerlinktechnologies.in
                  </a>
                </li>
                <li className="flex items-start gap-3 text-primary-light/60">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-blue" />
                  Bangalore, Karnataka
                </li>
                <li className="flex items-start gap-3 text-primary-light/60">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-blue" />
                  Mon – Sat, 9:00 AM – 7:00 PM
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-light/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-primary-light/50 text-sm">
              &copy; {new Date().getFullYear()} PowerLink Technologies. All rights reserved.
            </p>
            <p className="text-primary-light/50 text-sm">
              Founded by Venkatesan K &bull; Serving Bangalore since 2008
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
