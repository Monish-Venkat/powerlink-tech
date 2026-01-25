import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowLeft, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProjectGallery from '@/components/ProjectGallery';

const Projects = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
    { id: 'all', name: 'All Projects', color: 'bg-primary-dark', icon: '🔌' },
    { id: 'ups', name: 'UPS Systems', color: 'bg-ups-section', icon: '⚡' },
    { id: 'solar', name: 'Solar Solutions', color: 'bg-solar-section', icon: '☀️' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header with Glassmorphism */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isHeaderScrolled 
          ? 'bg-primary-dark/80 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-primary-dark shadow-lg'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-blue-600 rounded-lg flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <span className={`text-primary-light font-bold transition-all ${isHeaderScrolled ? 'text-lg' : 'text-xl'}`}>PLT</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-light bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  PowerLink Technologies
                </h1>
                <p className="text-sm text-primary-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  Our Projects Gallery
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" className="text-primary-light hover:text-accent-blue font-medium transition-all duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink to="/about" className="text-primary-light hover:text-accent-blue font-medium transition-all duration-300 relative group">
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
                <NavLink to="/" className="text-primary-light hover:text-accent-blue font-medium hover:translate-x-2 transition-all duration-300">
                  Home
                </NavLink>
                <NavLink to="/about" className="text-primary-light hover:text-accent-blue font-medium hover:translate-x-2 transition-all duration-300">
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
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-blue-100/50 to-indigo-100/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6 animate-bounce">
            <span className="px-4 py-2 bg-accent-blue/10 text-accent-blue rounded-full text-sm font-semibold border border-accent-blue/20">
              ✨ Powering Excellence Since 2008
            </span>
          </div>
          
          <h2 className="text-6xl font-bold text-primary-dark mb-6 leading-tight">
            Our <span className="gradient-text inline-block animate-gentle-float">Project Gallery</span>
            
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
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-dark to-blue-900 text-primary-light shadow-2xl scale-105 border-2 border-accent-blue/30'
                    : 'bg-white/80 backdrop-blur-sm text-primary-dark hover:bg-gradient-to-r hover:from-accent-blue hover:to-blue-600 hover:text-primary-light border-2 border-primary-dark/10 hover:border-accent-blue/30'
                }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
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
                <div className={`absolute inset-0 bg-gradient-to-br from-accent-blue/0 via-transparent to-indigo-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <ProjectGallery images={project.images} title={project.title} />
                
                <CardContent className="p-6 relative">
                  <div className="mb-4">
                    <span className={`text-xs font-bold text-white px-4 py-1.5 rounded-full shadow-md transform group-hover:scale-110 transition-all duration-300 inline-block ${
                      project.category === 'ups' ? 'bg-gradient-to-r from-primary-dark to-gray-800' :
                      project.category === 'solar' ? 'bg-gradient-to-r from-accent-blue to-blue-600' :
                      'bg-gradient-to-r from-primary-dark to-blue-900'
                    }`}>
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-accent-blue transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-primary-dark/70 mb-5 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-4 mt-4">
                    <span className="flex items-center text-primary-dark/60 group-hover:text-accent-blue transition-colors duration-300">
                      <span className="mr-1">📍</span>
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
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-2xl font-semibold text-primary-dark/60 mb-2">No projects found</p>
              <p className="text-lg text-primary-dark/40">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <Sparkles className="w-12 h-12 text-accent-blue animate-pulse" />
          </div>
          
          <h2 className="text-5xl font-bold mb-6 text-primary-dark leading-tight">
            Ready to Start Your Project?
          </h2>
          
          <p className="text-xl mb-10 max-w-2xl mx-auto text-primary-light/90 leading-relaxed">
            Join our growing list of satisfied customers. Contact us today for a free consultation 
            and quote for your power solution needs.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-accent-blue via-blue-500 to-indigo-500 text-primary-light hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 font-bold px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-accent-blue/50 transform hover:scale-105 active:scale-95 transition-all duration-300 group"
            onClick={() => {
              const message = "Hi! I'd like to discuss a new project with PowerLink Technologies.";
              const whatsappUrl = `https://wa.me/919901893191?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            <span className="mr-2">💬</span>
            Get Free Consultation
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>

          <p className="mt-6 text-primary-light/60 text-sm">
            ⚡ Response within 24 hours • 🔒 100% Free Consultation
          </p>
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
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Projects;
