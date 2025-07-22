// Index.tsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Zap, Shield, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const upsProducts = [
    { name: 'Luminous UPS Systems', brand: 'Luminous', category: 'UPS & Inverters', image: 'https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e999e8b4-514a-4600-83e3-b5c9401fce8e_Eco%20Watt%20Neo%20700%20inverter-1.png' },
    { name: 'Microtech UPS Systems', brand: 'Microtech', category: 'UPS & Inverters', image: 'https://m.media-amazon.com/images/I/316tPZLosFL._SY300_SX300_QL70_FMwebp_.jpg' },
    { name: 'Exide UPS Systems', brand: 'Exide', category: 'UPS & Inverters', image: 'https://batteryexpertsindia.in/wp-content/uploads/2022/04/Exide-850VA-12V-Inverter-UPS.jpg' },
    { name: 'Amaze UPS Systems', brand: 'Amaze', category: 'UPS & Inverters', image: 'https://www.olivepower.in/wp-content/uploads/2019/04/amaze-combo.webp' },
    { name: 'Amaron Batteries', brand: 'Amaron', category: 'Batteries', image: 'https://5.imimg.com/data5/RF/MH/XC/SELLER-91586022/amron-1000x1000.jpg' },
    { name: 'LIVGUARD Batteries', brand: 'LIVGUARD', category: 'Batteries', image: 'https://static1.industrybuying.com/products/electrical/stabilizers-inverters-ups-and-batteries/inverter-battery/ELE.INV.425980140_1709025511198.webp' },
  ];

  const cctvProducts = [
    { name: 'Hikvision CCTV Cameras', brand: 'Hikvision', category: 'CCTV Security', image: 'https://duocall.co.uk/wp-content/uploads/hikvision-cctv-and-security-2.png' },
    { name: 'Hikvision NVR Systems', brand: 'Hikvision', category: 'CCTV Security', image: 'https://www.hikvisionindia.com/storage/app/uploads/public/61f/79c/62c/61f79c62c45a7977436214.jpg' },
    { name: 'Hikvision DVR Systems', brand: 'Hikvision', category: 'CCTV Security', image: 'https://5.imimg.com/data5/SELLER/Default/2021/3/QY/FV/EY/23495999/hikvision-hd-series-ds-7a04hqhi-k1-1080p-2mp-4-channel-mini-turbo-dvr-white--500x500.jpg' },
  ];

  const solarProducts = [
    { name: 'Luminous Solar Panels', brand: 'Luminous', category: 'Solar Solutions', image: 'https://thekarostartup.com/wp-content/uploads/2024/03/Luminous-Power-Technologies-Inaugurates-Solar-Panel-Factory-in-Uttarakhand.jpg' },
    { name: 'Luminous Solar Inverters', brand: 'Luminous', category: 'Solar Solutions', image: 'https://solarmartindia.com/wp-content/uploads/2025/03/Untitled-design-57.png' },
    { name: 'Luminous Solar Batteries', brand: 'Luminous', category: 'Solar Solutions', image: 'https://5.imimg.com/data5/SELLER/Default/2021/3/QP/CS/DR/65602637/luminous-solar-battery-12v-20ah-lpt-1220h-1000x1000.png' },
  ];

  const handleWhatsAppRedirect = (productName: string) => {
    const message = `Hi! I'm interested in ${productName}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/919901893191?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const emailLink = `mailto:info@powerlinktechnologies.com?subject=${encodeURIComponent('Inquiry from Website - PowerLink Technologies')}&body=${encodeURIComponent(
    `Hello PowerLink Technologies,\n\nI am interested in your products and services. Please provide more information about:\n\n- UPS & Inverters\n- CCTV Security Systems\n- Solar Solutions\n- Batteries\n\nThank you.`
  )}`;

  return (
    <div className="min-h-screen bg-primary-light">
      {/* [Header, Hero, Product Sections - All unchanged] */}

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-[hsl(260,50%,30%)] via-[hsl(260,50%,30%)] to-[hsl(260,50%,30%)] relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary-light">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Phone Card */}
            <a href="tel:+919901893191" className="block w-full">
              <Card className="neon-border text-center hover:shadow-lg transition-shadow hover-scale cursor-pointer">
                <CardContent className="p-6">
                  <Phone className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-primary-dark">Phone</h3>
                  <p className="text-primary-dark/70">+91 99018 93191</p>
                  <p className="text-accent-blue text-sm mt-2">Tap to call</p>
                </CardContent>
              </Card>
            </a>

            {/* Email Card */}
            <a href={emailLink} className="block w-full">
              <Card className="neon-border text-center hover:shadow-lg transition-shadow hover-scale cursor-pointer">
                <CardContent className="p-6">
                  <Mail className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-primary-dark">Email</h3>
                  <p className="text-primary-dark/70">info@powerlinktechnologies.com</p>
                  <p className="text-accent-blue text-sm mt-2">Tap to send email</p>
                </CardContent>
              </Card>
            </a>

            {/* Location Card */}
            <a href="https://maps.app.goo.gl/GAfCcJqLZTutJvi48" target="_blank" rel="noopener noreferrer" className="block w-full">
              <Card className="neon-border text-center hover:shadow-lg transition-shadow hover-scale cursor-pointer">
                <CardContent className="p-6">
                  <MapPin className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-primary-dark">Location</h3>
                  <p className="text-primary-dark/70">Bangalore, Karnataka</p>
                  <p className="text-accent-blue text-sm mt-2">Tap to view on map</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>

        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnptLTE4IDE4aDZ2LTZoLTZ2NnptNiAwdjZoNnYtNmgtNnptLTYtNnYtNmgtNnY2aDZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTYgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6bTAtNmgtNnY2aDZ2LTZ6bTAgMGg2di02aC02djZ6bTYgMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </section>

      {/* Footer & ChatBot (Unchanged) */}
      <footer className="bg-primary-light text-primary-dark py-8 px-4 border-t border-accent-blue/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-primary-dark rounded-lg flex items-center justify-center subtle-glow">
              <span className="text-primary-dark font-bold">PLT</span>
            </div>
            <span className="text-xl font-bold text-primary-black">Power Link Technologies</span>
          </div>
          <p className="text-primary-dark/80 mb-4">Founded by Venkatesan K • Serving since 2008</p>
          <p className="text-primary-dark/60">&copy; 2024 Power Link Technologies. All rights reserved.</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default Index;
