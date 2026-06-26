import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.substring(1);
    const el = document.getElementById(targetId);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-calm-900/90 backdrop-blur-md border-b border-calm-800/60 py-4 shadow-lg shadow-calm-950/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          id="nav-logo"
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="font-display font-bold text-xl tracking-tight text-slate-800 hover:text-accent-sage transition-colors group"
        >
          {PERSONAL_INFO.name}
        </a>

        {/* Desktop Nav */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`text-sm font-medium transition-all duration-200 hover:text-accent-sage ${
                  isActive ? 'text-accent-sage font-semibold' : 'text-slate-600'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Mobile Nav Button */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-700 hover:text-accent-sage transition-colors focus:outline-none p-1"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-x-0 top-[72px] bg-calm-900 border-b border-calm-800 transition-all duration-300 md:hidden overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-4 px-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`text-base font-medium transition-colors ${
                  isActive ? 'text-accent-sage' : 'text-slate-700 hover:text-accent-sage'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
