import { NavLink } from 'react-router-dom';
import { Menu, X, Award, Users, Clock, Shield } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Header */}
      <header className="bg-primary-dark shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                <span className="text-primary-light font-bold text-xl">PLT</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-light">PowerLink Technologies</h1>
                <p className="text-sm text-primary-light/80">Founded by Venkatesan K - Since 2008</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" className="text-primary-light hover:text-accent-blue font-medium transition-colors">Home</NavLink>
              <NavLink to="/about" className="text-accent-blue font-medium">About</NavLink>
              <NavLink to="/projects" className="text-primary-light hover:text-accent-blue font-medium transition-colors">Projects</NavLink>
            </nav>

            <button 
              className="md:hidden p-2 text-primary-light"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary-light/20">
              <nav className="flex flex-col space-y-4">
                <NavLink to="/" className="text-primary-light hover:text-accent-blue font-medium">Home</NavLink>
                <NavLink to="/about" className="text-accent-blue font-medium">About</NavLink>
                <NavLink to="/projects" className="text-primary-light hover:text-accent-blue font-medium">Projects</NavLink>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-primary-dark bg-gradient-to-br from-primary-light via-primary-light to-accent-blue/10">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            About <span className="text-accent-blue">Power Link Technologies</span>
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Established in 2008 by visionary entrepreneur Venkatesan K, PowerLink Technologies has been at the forefront of power solutions and security systems for over 15 years.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-primary-dark mb-6">Our Story</h3>
              <p className="text-primary-dark/70 mb-6 leading-relaxed">
                Founded with a vision to provide reliable power solutions to homes and businesses across Chennai, PowerLink Technologies began its journey in 2008. Under the leadership of Venkatesan K, we started as a small enterprise focusing on UPS systems and batteries.
              </p>
              <p className="text-primary-dark/70 mb-6 leading-relaxed">
                Over the years, we have expanded our expertise to include CCTV security systems and solar energy solutions, always staying ahead of technological advancements and customer needs.
              </p>
              <p className="text-primary-dark/70 leading-relaxed">
                Today, we are proud to be Bangalore's trusted partner for comprehensive power and security solutions, serving over 1000+ satisfied customers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6 border-2 border-accent-blue/20">
                <CardContent className="p-0">
                  <Award className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h4 className="font-semibold text-primary-dark mb-2">Quality Assured</h4>
                  <p className="text-sm text-primary-dark/70">Premium brands and certified products</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 border-2 border-accent-blue/20">
                <CardContent className="p-0">
                  <Users className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h4 className="font-semibold text-primary-dark mb-2">Expert Team</h4>
                  <p className="text-sm text-primary-dark/70">Skilled technicians and support staff</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 border-2 border-accent-blue/20">
                <CardContent className="p-0">
                  <Clock className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h4 className="font-semibold text-primary-dark mb-2">15+ Years</h4>
                  <p className="text-sm text-primary-dark/70">Experience in the industry</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 border-2 border-accent-blue/20">
                <CardContent className="p-0">
                  <Shield className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h4 className="font-semibold text-primary-dark mb-2">Reliable Service</h4>
                  <p className="text-sm text-primary-dark/70">24/7 customer support</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-primary-dark text-primary-light">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-primary-light/10 backdrop-blur-sm border-accent-blue/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-accent-blue">Our Mission</h3>
                <p className="leading-relaxed text-primary-light">
                  To provide innovative, reliable, and cost-effective power solutions that ensure uninterrupted power supply and enhanced security for our customers while contributing to a sustainable future through renewable energy solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary-light/10 backdrop-blur-sm border-accent-blue/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-accent-blue">Our Vision</h3>
                <p className="leading-relaxed text-primary-light">
                  To be the leading provider of comprehensive power and security solutions in South India, recognized for our commitment to quality, innovation, and customer satisfaction while promoting sustainable energy practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-primary-light">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-primary-dark mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent-blue" />
              </div>
              <h4 className="text-xl font-semibold text-primary-dark mb-3">Excellence</h4>
              <p className="text-primary-dark/70">Committed to delivering the highest quality products and services that exceed customer expectations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent-blue" />
              </div>
              <h4 className="text-xl font-semibold text-primary-dark mb-3">Reliability</h4>
              <p className="text-primary-dark/70">Building long-term relationships through consistent, dependable service and support.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-blue" />
              </div>
              <h4 className="text-xl font-semibold text-primary-dark mb-3">Customer Focus</h4>
              <p className="text-primary-dark/70">Understanding and addressing unique customer needs with personalized solutions and dedicated support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-dark text-primary-light">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Power Your Future?</h3>
          <p className="text-xl text-primary-light/80 mb-8">
            Contact us today to discuss your power and security needs with our expert team.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="bg-accent-blue text-primary-light hover:bg-accent-blue/90"
              onClick={() => {
                const message = "Hi! I'd like to know more about PowerLink Technologies services.";
                const whatsappUrl = `https://wa.me/919901893191?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Contact Us
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-primary-light"
              onClick={() => window.location.href = '/projects'}
            >
              View Our Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-primary-light py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
              <span className="text-primary-light font-bold">PLT</span>
            </div>
            <span className="text-xl font-bold">Power Link Technologies</span>
          </div>
          <p className="text-primary-light/80 mb-4">Founded by Venkatesan K • Serving since 2008</p>
          <p className="text-primary-light/60">&copy; 2024 PowerLink Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
