import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles, ChevronDown, LayoutGrid, Zap, Sun, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProjectGallery from '@/components/ProjectGallery';
import Footer from '@/components/Footer';
import { useViewTransitionNavigate } from '@/hooks/useViewTransitionNavigate';
import { useMagnetic } from '@/hooks/useMagnetic';

const Projects = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const navigate = useViewTransitionNavigate();
  const finalCta = useMagnetic<HTMLButtonElement>();

  // Scroll effect for header glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Commercial UPS Installation - Dental Clinic",
      category: "ups",
      description: "Complete UPS backup solution for Dental Clinic",
      images: [
        '/prj/ups/u1.jpg',
        '/prj/ups/u2.jpg',
        '/prj/ups/u3.jpg'
      ],
      location: "Dr. Nopain Dental, Kadugodi Bangalore",
      year: "2025"
    },
    {
      id: 2,
      title: "Residential Solar Installation",
      category: "solar",
      description: "5KW solar panel installation with battery backup system",
      images: [
        '/prj/solar/s1.jpg',
        '/prj/solar/s2.jpg',
        '/prj/solar/s3.jpg'
      ],
      location: "Ramamurthy Nagar, Bangalore",
      year: "2024"
    },
    {
      id: 4,
      title: "Commercial UPS Installation - Dental Clinic",
      category: "ups",
      description: "High-capacity UPS system with battery bank for Dental Clinic",
      images: [
        '/prj/ups/u6.jpg',
        '/prj/ups/u7.jpg'
      ],
      location: "Narsapura, Karnataka",
      year: "2024"
    },
    {
      id: 5,
      title: "Solar Water Heater",
      category: "solar",
      description: "Solar-powered Water Heater",
      images: [
        '/prj/solar/s4.jpg',
      ],
      location: "Narsapura, Karnataka",
      year: "2024"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: LayoutGrid },
    { id: 'ups', name: 'UPS Systems', icon: Zap },
    { id: 'solar', name: 'Solar Solutions', icon: Sun },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header with Glassmorphism */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isHeaderScrolled
            ? 'bg-primary-dark/80 backdrop-blur-xl shadow-2xl border-b border-white/10'
            : 'bg-primary-dark shadow-lg'
        }`}
        style={{ viewTransitionName: 'site-header' } as React.CSSProperties}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-cyan-600 rounded-lg flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <span className={`text-primary-light font-bold transition-all ${isHeaderScrolled ? 'text-lg' : 'text-xl'}`}>PLT</span>
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-primary-light">
                  PowerLink Technologies
                </h1>
                <p className="text-sm text-primary-light flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Our Projects Gallery
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-primary-light hover:text-accent-blue font-medium transition-all duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink to="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }} className="text-primary-light hover:text-accent-blue font-medium transition-all duration-300 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink to="/projects" className="text-accent-blue font-medium relative">
                Projects
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-blue"></span>
              </NavLink>
            </nav>

            <button 
              className="md:hidden p-2 text-primary-light hover:bg-white/10 rounded-lg transition-all duration-300 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu with Slide Animation */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="border-t border-primary-light/20">
              <nav className="flex flex-col space-y-4 pt-4">
                <NavLink to="/" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); navigate('/'); }} className="text-primary-light hover:text-accent-blue font-medium hover:translate-x-2 transition-all duration-300">
                  Home
                </NavLink>
                <NavLink to="/about" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); navigate('/about'); }} className="text-primary-light hover:text-accent-blue font-medium hover:translate-x-2 transition-all duration-300">
                  About
                </NavLink>
                <NavLink to="/projects" className="text-accent-blue font-medium hover:translate-x-2 transition-all duration-300">
                  Projects
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Gradient */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-teal-100/50 to-cyan-100/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(174,72%,38%,0.1),transparent_50%)]"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/10 text-accent-blue rounded-full text-sm font-semibold border border-accent-blue/20">
              <Sparkles className="w-4 h-4" />
              Powering Excellence Since 2008
            </span>
          </div>

          <h2 className="font-display text-6xl font-bold text-primary-dark mb-6 leading-tight">
            Our <span className="text-accent-blue inline-block">Project Gallery</span>
          </h2>
          
          <p className="text-xl text-primary-dark/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore our completed projects across UPS systems, solar installations, and CCTV surveillance solutions. 
            Each project showcases our commitment to quality and customer satisfaction.
          </p>

          <ChevronDown className="mx-auto w-8 h-8 text-accent-blue animate-bounce mt-8" />
        </div>
      </section>

      {/* Category Filter with Modern Pills */}
      <section className="px-4 mb-12 bg-transparent relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-dark to-teal-900 text-primary-light shadow-2xl scale-105 border-2 border-accent-blue/30'
                    : 'bg-white/80 backdrop-blur-sm text-primary-dark hover:bg-gradient-to-r hover:from-accent-blue hover:to-cyan-600 hover:text-primary-light border-2 border-primary-dark/10 hover:border-accent-blue/30'
                }`}
              >
                <category.icon className="mr-2 w-5 h-5" />
                {category.name}
                {selectedCategory === category.id && (
                  <span className="ml-2 inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid with Stagger Animation */}
      <section className="px-4 pb-20 bg-transparent relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`group relative overflow-hidden border-2 bg-white/70 backdrop-blur-sm
                  transition-all duration-500 hover:shadow-2xl hover:shadow-accent-blue/20 
                  ${hoveredProject === project.id ? 'scale-[1.03] -translate-y-2 border-accent-blue/40' : 'border-gray-200/50'}
                  animate-fade-in-up cursor-pointer`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 via-transparent to-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <ProjectGallery images={project.images} title={project.title} />
                
                <CardContent className="p-6 relative">
                  <div className="mb-4">
                    <span className={`text-xs font-bold text-white px-4 py-1.5 rounded-full shadow-md transform group-hover:scale-110 transition-all duration-300 inline-block ${
                      project.category === 'ups' ? 'bg-gradient-to-r from-primary-dark to-slate-700' :
                      project.category === 'solar' ? 'bg-gradient-to-r from-accent-amber to-orange-600' :
                      'bg-gradient-to-r from-primary-dark to-teal-900'
                    }`}>
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-primary-dark mb-3 group-hover:text-accent-blue transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-primary-dark/70 mb-5 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-4 mt-4">
                    <span className="flex items-center text-primary-dark/60 group-hover:text-accent-blue transition-colors duration-300">
                      <MapPin className="mr-1 w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{project.location}</span>
                    </span>
                    <span className="font-bold text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                      {project.year}
                    </span>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent-blue/20 group-hover:border-accent-blue/60 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent-blue/20 group-hover:border-accent-blue/60 transition-colors duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-primary-dark/20">
              <LayoutGrid className="w-14 h-14 mx-auto mb-4 text-primary-dark/30" />
              <p className="text-2xl font-semibold text-primary-dark/60 mb-2">No projects found</p>
              <p className="text-lg text-primary-dark/40">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="relative py-24 px-4 overflow-hidden bg-solar-section">

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <Sparkles className="w-12 h-12 text-accent-blue" />
          </div>

          <h2 className="font-display text-5xl font-bold mb-6 text-primary-light leading-tight">
            Ready to Start Your Project?
          </h2>
          
          <p className="text-xl mb-10 max-w-2xl mx-auto text-primary-light/90 leading-relaxed">
            Join our growing list of satisfied customers. Contact us today for a free consultation 
            and quote for your power solution needs.
          </p>
          
          <Button
            ref={finalCta.ref}
            onMouseMove={finalCta.onMouseMove}
            onMouseLeave={finalCta.onMouseLeave}
            size="lg"
            className="executive-gradient text-primary-light font-bold px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-accent-blue/50 transition-all duration-300 group"
            onClick={() => {
              const message = "Hi! I'd like to discuss a new project with PowerLink Technologies.";
              const whatsappUrl = `https://wa.me/919901893191?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            <MessageCircle className="mr-2 w-5 h-5" />
            Get Free Consultation
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>

          <p className="mt-6 text-primary-light/60 text-sm">
            Response within 24 hours • 100% free consultation
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Projects;
