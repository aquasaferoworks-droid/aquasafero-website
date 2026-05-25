import { VaelHeader } from '@/components/VaelHeader';
import { VaelAbout } from '@/components/VaelAbout';
import { VaelFilms } from '@/components/VaelFilms';
import { VaelReel } from '@/components/VaelReel';
import { VaelAwards } from '@/components/VaelAwards';
import { VaelContact } from '@/components/VaelContact';
import { VaelFooter } from '@/components/VaelFooter';
import ScrollExpandMedia from '@/components/ScrollExpandMedia';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroBg = PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || '';
  
  return (
    <main className="relative selection:bg-primary/30">
      <VaelHeader />
      
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://player.vimeo.com/external/494252666.hd.mp4?s=2f5577346418342774d009fa5d60893325c8991b&profile_id=175"
        bgImageSrc={heroBg}
        title="Architecture of Emotion"
        date="2026 Directing Reel"
        scrollToExpand="Scroll to Experience"
      >
        <VaelAbout />
        <VaelFilms />
        <VaelReel />
        <VaelAwards />
        <VaelContact />
        <VaelFooter />
      </ScrollExpandMedia>
      
      {/* Background grain consistent through the site */}
      <div className="fixed inset-0 pointer-events-none grain-overlay z-[200] opacity-5" />
    </main>
  );
}