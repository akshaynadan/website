import { ChevronUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="footer-container" className="bg-calm-950 border-t border-calm-900 py-12 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand/Signature */}
        <div className="text-center sm:text-left">
          <p className="font-display font-semibold text-slate-900 tracking-tight">
            {PERSONAL_INFO.name}
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Built with modern React, TypeScript & Tailwind CSS. Designed to be easy on the eyes.
          </p>
        </div>

        {/* Copyright notice */}
        <div className="text-slate-500 text-xs text-center">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </div>

        {/* Back to top button */}
        <button
          onClick={handleScrollTop}
          className="flex items-center justify-center p-2.5 bg-calm-900 hover:bg-calm-850 border border-calm-800 hover:border-calm-700 text-slate-655 hover:text-accent-sage rounded-full transition-all cursor-pointer shadow-md"
          aria-label="Scroll back to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
