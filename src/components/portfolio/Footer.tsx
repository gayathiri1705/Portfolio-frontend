import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/',
      label: 'GitHub',
      color: 'hover:text-gray-700 dark:hover:text-gray-300'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/bala-ece',
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    {
      icon: Mail,
      href: 'mailto:balalatha660@gmail.com',
      label: 'Email',
      color: 'hover:text-red-500'
    },
    {
      icon: Phone,
      href: 'tel:+918072818585',
      label: 'Call',
      color: 'hover:text-green-500'
    },
    {
      icon: MessageSquare,
      href: 'https://wa.me/+918072818585',
      label: 'WhatsApp',
      color: 'hover:text-green-500'
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-muted/50 border-t border-muted-foreground/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Brand Section */}
          <div className="text-center lg:text-left">
            <motion.h3
              className="text-2xl font-bold text-primary mb-2"
              whileHover={{ scale: 1.02 }}
            >
              Gayathiri R
            </motion.h3>
            <p className="text-muted-foreground text-sm mb-4">
              MERN Stack Developer & Freelancer
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="group"
            >
              Back to Top
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 group-hover:-translate-y-1 transition-transform"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-medium mb-4">Connect with me</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`p-3 rounded-full bg-muted/50 ${link.color} transition-colors`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Contact */}
          <div className="text-center lg:text-right">
            <h4 className="text-lg font-medium mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-muted-foreground/20 mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Gayathiri R. All rights reserved.
          </p>
          <p className="text-muted-foreground/70 text-xs mt-2">
            Crafted with ❤️ using React TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;