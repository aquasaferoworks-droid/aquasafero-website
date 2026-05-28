'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#reel', label: 'Work Reel' },
  { href: '#awards', label: 'Honors' },
  { href: '#contact', label: 'Inquiry' },
];

export function VaelHeader() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['reel', 'awards', 'contact'];
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

  const reelYoutubeId = "gJKxIAmhbvg";
  const reelUrl = `https://www.youtube.com/embed/${reelYoutubeId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&loop=1&playlist=${reelYoutubeId}&enablejsapi=1`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 md:px-16 md:py-6 flex items-center justify-between ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-border/40 py-4 shadow-sm' : 'bg-transparent'}`}>
      <Link href="/" className="font-headline text-2xl md:text-4xl tracking-tighter hover:text-primary transition-all duration-700 flex-shrink-0 italic font-bold">
        ERROL <span className="text-primary not-italic font-light">ADITYA</span>
      </Link>
      
      <div className="hidden md:flex items-center justify-center gap-16 font-headline text-[13px] tracking-[0.3em] uppercase italic font-bold flex-grow">
        {navLinks.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className={`nav-link-strike hover:text-primary transition-colors ${activeSection === link.href.substring(1) ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex-shrink-0 flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="hidden sm:flex rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-headline italic font-bold text-[10px] tracking-[0.2em] uppercase h-auto py-3 px-8 transition-all duration-300 transform hover:-translate-y-0.5">
              Watch Reel
            </Button>
          </DialogTrigger>
          <DialogContent className="z-[200] max-w-6xl bg-black border border-white/10 p-0 rounded-none overflow-hidden aspect-video shadow-[0_0_120px_rgba(0,0,0,1)] outline-none focus:outline-none">
            <DialogTitle className="sr-only">2026 Directing Reel</DialogTitle>
            <DialogDescription className="sr-only">Cinematic showcase of Errol Aditya's directorial work.</DialogDescription>
            <div className="w-full h-full flex items-center justify-center relative group">
              <iframe
                className="w-full h-full"
                src={reelUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              <DialogClose className="absolute top-6 right-6 z-[201] transition-all duration-300 group/close">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-none bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/close:border-primary/50 group-hover/close:scale-110 transition-all">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white group-hover/close:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <span className="sr-only">Close Reel</span>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden rounded-none hover:bg-primary/5">
              <Menu className="w-6 h-6 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-none p-12 w-[85vw] flex flex-col justify-between rounded-none">
            <div className="space-y-16">
              <div className="font-headline text-2xl tracking-tighter italic text-white font-bold">
                ERROL <span className="text-primary not-italic font-light">ADITYA</span>
              </div>
              <div className="flex flex-col gap-10 font-headline text-[15px] tracking-[0.2em] uppercase text-white/70 italic font-bold">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="hover:text-primary transition-colors border-b border-border/40 pb-6"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <Button variant="outline" className="w-full rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-headline italic font-bold text-[11px] tracking-[0.2em] uppercase h-auto py-5">
                Watch Reel
              </Button>
              <div className="flex gap-8 text-[11px] tracking-widest text-muted-foreground uppercase justify-center">
                <Link href="#">IG</Link>
                <Link href="#">VM</Link>
                <Link href="#">IM</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
