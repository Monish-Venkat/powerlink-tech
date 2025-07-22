import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProjectGallery from '@/components/ProjectGallery';

const Projects = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Commercial UPS Installation - Dental Clinic",
      category: "ups",
      description: "Complete UPS backup solution for Dental Clinic",
      images: [
        'src/prj/ups/u1.jpg',
        'src/prj/ups/u2.jpg',
        'src/prj/ups/u3.jpg'
      ],
      location: "Dr. Nopain Dental,Kadugodi Bangalore",
      year: "2025"
    },
    {
      id: 2,
      title: "Residential Solar Installation",
      category: "solar",
      description: "5KW solar panel installation with battery backup system",
      images: [
        'src/prj/solar/s1.jpg',
        'src/prj/solar/s2.jpg',
        'src/prj/solar/s3.jpg',
        
        
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
        "src/prj/ups/u6.jpg",
        "src/prj/ups/u7.jpg"
      ],
      location: "Narsapura,Karnataka",
      year: "2024"
    },
    {
      id: 5,
      title: "Solar Water Heater",
      category: "solar",
      description: "Solar-powered Water Heater",
      images: [
        'src/prj/solar/s4.jpg',
        'src/prj/solar/s5.jpg'
      ],
      location: "Narsapura,Karnataka",
      year: "2024"
    }

  ];

  const categories = [
    { id: 'all', name: 'All Projects', color: 'bg-primary-dark' },
    { id: 'ups', name: 'UPS Systems', color: 'bg-ups-section' },
    { id: 'solar', name: 'Solar Solutions', color: 'bg-solar-section' },
   // {     id: 'cctv', name: 'CCTV Cameras', color: 'bg-cctv-section' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
                <p className="text-sm text-primary-light/80">Our Projects Gallery</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" className="text-primary-light hover:text-accent-blue font-medium transition-colors">Home</NavLink>
              <NavLink to="/about" className="text-primary-light hover:text-accent-blue font-medium transition-colors">About</NavLink>
              <NavLink to="/projects" className="text-accent-blue font-medium">Projects</NavLink>
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
                <NavLink to="/about" className="text-primary-light hover:text-accent-blue font-medium">About</NavLink>
                <NavLink to="/projects" className="text-accent-blue font-medium">Projects</NavLink>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary-light via-primary-light to-accent-blue/10">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-primary-dark mb-6">
            Our <span className="text-accent-blue">Project Gallery</span>
          </h2>
          <p className="text-xl text-primary-dark/80 mb-8 max-w-3xl mx-auto">
            Explore our completed projects across UPS systems, solar installations, and CCTV surveillance solutions. 
            Each project showcases our commitment to quality and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-8 bg-primary-light">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-dark text-primary-light shadow-lg scale-105'
                    : 'bg-white text-primary-dark hover:bg-accent-blue hover:text-primary-light border border-primary-dark/20'
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-16 bg-primary-light">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden border-2 border-accent-blue/20">
                <ProjectGallery images={project.images} title={project.title} />
                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className={`text-sm font-medium text-white px-3 py-1 rounded-full ${
                      project.category === 'ups' ? 'bg-primary-dark' :
                      project.category === 'solar' ? 'bg-accent-blue' :
                      'bg-primary-dark'
                    }`}>
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-accent-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-primary-dark/70 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-primary-dark/60">
                    <span className="flex items-center">
                      📍 {project.location}
                    </span>
                    <span className="font-medium">{project.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-primary-dark/60">No projects found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-dark text-primary-light">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-light/80">
            Join our growing list of satisfied customers. Contact us today for a free consultation 
            and quote for your power solution needs.
          </p>
          <Button 
            size="lg" 
            className="bg-accent-blue text-primary-light hover:bg-accent-blue/90 font-semibold px-8 py-4"
            onClick={() => {
              const message = "Hi! I'd like to discuss a new project with PowerLink Technologies.";
              const whatsappUrl = `https://wa.me/919901893191?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            Get Free Consultation
          </Button>
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
          <p className="text-primary-light/60">&copy; 2024 Power Link Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Projects;
