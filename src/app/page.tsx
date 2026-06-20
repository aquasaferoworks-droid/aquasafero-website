
import { VaelHeader } from '@/components/VaelHeader';
import { VaelReel } from '@/components/VaelReel';
import { VaelAwards } from '@/components/VaelAwards';
import { VaelContact } from '@/components/VaelContact';
import { VaelFooter } from '@/components/VaelFooter';
import { VaelSlider } from '@/components/VaelSlider';

export default async function Home(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const activeCategory = searchParams.category || 'all';

  return (
    <main className="relative bg-background min-h-screen selection:bg-primary/30">
      <VaelHeader />
      
      <div className="pt-24 md:pt-32">
        {/* Slider filters itself based on activeCategory */}
        <VaelSlider activeCategory={activeCategory} />
      </div>

      <div className="bg-background">
        {/* Reel filters itself based on activeCategory and adheres to fixed 5-row structure */}
        <VaelReel activeCategory={activeCategory} />
        
        <div id="awards">
          <VaelAwards />
        </div>
        
        <div id="contact">
          <VaelContact />
        </div>
        
        <VaelFooter />
      </div>
      
      <div className="fixed inset-0 pointer-events-none grain-overlay z-[200] opacity-5" />
    </main>
  );
}
