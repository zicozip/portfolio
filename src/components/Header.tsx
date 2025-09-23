import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortfolioSection, setIsPortfolioSection] = useState(false);
  const heroObserverRef = useRef<HTMLElement | null>(null);
  const portfolioObserverRef = useRef<HTMLElement | null>(null);
  const navigationItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    // Hero observer for basic navbar background
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // Only update if NOT in portfolio section
        if (!isPortfolioSection) {
          setIsScrolled(!entry.isIntersecting);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    // Portfolio observer to lock navbar when in portfolio
    const portfolioObserver = new IntersectionObserver(
      ([entry]) => {
        setIsPortfolioSection(entry.isIntersecting);
        // Force navbar background when in portfolio section
        if (entry.isIntersecting) {
          setIsScrolled(true);
        }
      },
      {
        threshold: 0.2, // 20% of portfolio section visible
        rootMargin: '0px'
      }
    );

    // Find sections to observe
    const heroElement = document.getElementById('hero');
    const portfolioElement = document.getElementById('portfolio');
    
    if (heroElement) {
      heroObserver.observe(heroElement);
      heroObserverRef.current = heroElement;
    }
    
    if (portfolioElement) {
      portfolioObserver.observe(portfolioElement);
      portfolioObserverRef.current = portfolioElement;
    }

    return () => {
      if (heroObserverRef.current) {
        heroObserver.unobserve(heroObserverRef.current);
      }
      if (portfolioObserverRef.current) {
        portfolioObserver.unobserve(portfolioObserverRef.current);
      }
      heroObserver.disconnect();
      portfolioObserver.disconnect();
    };
  }, [isPortfolioSection]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
              <span className="text-white">KJ</span>
              <span className="text-green-400">Gudez</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-green-400 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-700"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 py-2"
                    whileHover={{ x: 10 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
