import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import ParticlesBackground from './Particles';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import api from '@/lib/api';

const Hero = () => {
  const [settings, setSettings] = useState({
    hero_title: "GAYATHIRI R",
    hero_subtitle: "Hi, I'm",
    hero_description: "I'm a Developer and freelancer passionate about building modern web applications."
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (Object.keys(res.data).length > 0) {
          setSettings(prev => ({ ...prev, ...res.data }));
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const socialLinks = [
    { icon: Github, href: 'https://github.com/BALASUBRAMANIYAN-S/', label: 'GitHub', color: 'hover:text-gray-800' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/bala-ece',
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    { icon: Mail, href: 'mailto:balalatha660@gmail.com', label: 'Email', color: 'hover:text-red-500' },
    { icon: MessageCircle, href: 'https://wa.me/+918072818585', label: 'WhatsApp', color: 'hover:text-green-500' },
  ];

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://balasubramaniyan-s.github.io/portfolio-assets/BALASUBRAMANIYAN_CV.pdf';
    link.download = 'BALA_ECE.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Particles Background */}
      <div className="absolute inset-0">
        <ParticlesBackground />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="gpu-accelerated"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {settings.hero_subtitle}{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {settings.hero_title}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {settings.hero_description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('#contact')}
              className="min-w-[200px] group"
            >

              Get In Touch
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={downloadResume}
              className="min-w-[200px] group"
            >
              <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {/* Social Links */}
        <div className="flex justify-center space-x-6 pt-4 ">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground ${link.color} transition-colors p-3 rounded-full bg-muted/30 hover:bg-muted/50`}
                aria-label={link.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="h-6 w-6" />
              </motion.a>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Hero;
