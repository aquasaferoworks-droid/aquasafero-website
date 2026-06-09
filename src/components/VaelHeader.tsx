
'use client';

import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#reel', label: 'Work Reel' },
  { href: '#awards', label: 'Honors' },
  { href: '#contact', label: 'Inquiry' },
];

const categories = [
  'all',
  'celebrity',
  'ads',
  'promo',
  'humor',
  'cricketers',
  'vfx',
  'home&living',
  'car',
  'food'
];

export function VaelHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeCategory = searchParams.get('category') || 'all';

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

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Smooth scroll to work section if filtering
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const reelYoutubeId = "gJKxIAmhbvg";
  const reelUrl = `https://www.youtube.com/embed/${reelYoutubeId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&loop=1&playlist=${reelYoutubeId}&enablejsapi=1`;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
      {/* Main Header */}
      <nav className={cn(
        "transition-all duration-500 px-6 py-4 md:px-16 md:py-6 flex items-center justify-between",
        isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent'
      )}>
        <Link href="/" className="font-headline text-xl md:text-3xl tracking-tighter hover:text-primary transition-all duration-700 flex-shrink-0 italic font-bold">
          ERROL <span className="text-primary not-italic font-light">ADITYA</span>
        </Link>
        
        <div className="hidden md:flex items-center justify-center gap-12 font-headline text-[12px] tracking-[0.25em] uppercase italic font-bold flex-grow">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "nav-link-strike hover:text-primary transition-colors",
                activeSection === link.href.substring(1) ? 'active' : ''
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="hidden sm:flex rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-headline italic font-bold text-[10px] tracking-[0.2em] uppercase h-auto py-3 px-8 transition-all duration-300 transform hover:-translate-y-0.5">
                Watch Reel
              </Button>
            </DialogTrigger>
            <DialogContent className="z-[250] max-w-6xl bg-black border border-white/10 p-0 rounded-none overflow-hidden aspect-video shadow-[0_0_120px_rgba(0,0,0,1)] outline-none focus:outline-none">
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
              <Button variant="ghost" size="icon" className="md:hidden rounded-none hover:bg-white/5 h-10 w-10">
                <Menu className="w-6 h-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 backdrop-blur-2xl border-l border-white/5 p-0 w-full sm:max-w-md flex flex-col rounded-none z-[300]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Access links to work, awards, and contact information.</SheetDescription>
              
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                <div className="font-headline text-xl tracking-tighter italic text-white font-bold">
                  ERROL <span className="text-primary not-italic font-light">ADITYA</span>
                </div>
                <SheetClose className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </SheetClose>
              </div>

              <div className="flex-1 flex flex-col justify-center px-8 space-y-2">
                <nav className="flex flex-col">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.5 }}
                      className="border-b border-white/5"
                    >
                      <SheetClose asChild>
                        <Link 
                          href={link.href} 
                          className="flex items-center justify-between py-6 group"
                        >
                          <span className="font-headline text-2xl tracking-[0.05em] uppercase text-white/70 italic font-bold group-hover:text-primary transition-colors">
                            {link.label}
                          </span>
                          <div className="w-2 h-2 bg-primary transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                </nav>

                <div className="pt-8 border-t border-white/5 mt-8 overflow-x-auto no-scrollbar">
                   <div className="flex flex-col gap-4">
                     <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 mb-2">Filter by Genre</span>
                     <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <SheetClose key={cat} asChild>
                            <button
                              onClick={() => setCategory(cat)}
                              className={cn(
                                "text-[10px] tracking-widest uppercase px-4 py-2 border border-white/10 transition-all",
                                activeCategory === cat ? "bg-primary text-black border-primary" : "text-white/60 hover:text-white hover:border-white/30"
                              )}
                            >
                              {cat}
                            </button>
                          </SheetClose>
                        ))}
                     </div>
                   </div>
                </div>
              </div>

              <div className="px-8 py-10 border-t border-white/5 bg-white/[0.02]">
                <div className="flex flex-col gap-6">
                  <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 block text-center">Social Connect</span>
                  <div className="flex justify-between items-center text-[10px] tracking-[0.3em] uppercase text-white/60 font-bold italic">
                    <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                    <a href="#" className="hover:text-primary transition-colors">Vimeo</a>
                    <a href="#" className="hover:text-primary transition-colors">IMDb</a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Category Navigation Bar */}
      <div className={cn(
        "bg-black/80 backdrop-blur-md border-b border-white/5 transition-all duration-500 overflow-hidden",
        isScrolled ? "h-12" : "h-0 md:h-12"
      )}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 h-full flex items-center overflow-x-auto no-scrollbar gap-8 md:gap-12 scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "relative text-[9px] md:text-[11px] tracking-[0.25em] uppercase whitespace-nowrap transition-all duration-300 font-body py-1",
                activeCategory === cat ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
              )}
            >
              {cat.replace('&', ' & ')}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
