'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function VaelHeader() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'work', 'awards', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-6 md:px-16 md:py-8 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50">
      <Link href="/" className="font-headline text-xl tracking-[0.15em] hover:text-primary transition-colors uppercase flex-shrink-0">
        erroladitya.com
      </Link>
      
      <div className="hidden md:flex items-center justify-center gap-12 font-body text-[10px] tracking-[0.4em] uppercase flex-grow">
        <Link href="#about" className={`nav-link-strike hover:text-primary transition-colors ${activeSection === 'about' ? 'active text-primary' : ''}`}>
          About
        </Link>
        <Link href="#work" className={`nav-link-strike hover:text-primary transition-colors ${activeSection === 'work' ? 'active text-primary' : ''}`}>
          Work
        </Link>
        <Link href="#awards" className={`nav-link-strike hover:text-primary transition-colors ${activeSection === 'awards' ? 'active text-primary' : ''}`}>
          Recognition
        </Link>
        <Link href="#contact" className={`nav-link-strike hover:text-primary transition-colors ${activeSection === 'contact' ? 'active text-primary' : ''}`}>
          Contact
        </Link>
      </div>

      <div className="flex-shrink-0 flex justify-end min-w-[150px]">
        <Button variant="outline" className="rounded-none border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-body text-[10px] tracking-[0.2em] uppercase h-auto py-2 px-6" asChild>
          <Link href="#reel">Watch Reel</Link>
        </Button>
      </div>
    </nav>
  );
}