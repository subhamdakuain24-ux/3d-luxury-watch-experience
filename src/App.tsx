import React, { useState, useEffect } from 'react';
import { WatchCanvas } from './components/3d/WatchCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { MovementSection } from './components/MovementSection';
import { PrecisionSection } from './components/PrecisionSection';
import { CollectionSection } from './components/CollectionSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ControlOverlay } from './components/ControlOverlay';
import { ProductModal } from './components/ProductModal';
import { WatchFinish, SceneLightingMode, WatchProduct } from './types';
import { WATCH_PRODUCTS } from './data/products';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [finish, setFinish] = useState<WatchFinish>('steel');
  const [lightingMode, setLightingMode] = useState<SceneLightingMode>('studio');
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);

  // Track scroll position continuously
  useEffect(() => {
    let animFrame: number;

    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const currentProgress = Math.max(0, Math.min(window.scrollY / totalHeight, 1));
          setScrollProgress(currentProgress);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConcierge = () => {
    // Open product modal with default flagship model
    setSelectedProduct(WATCH_PRODUCTS[0]);
  };

  return (
    <div className="relative min-h-screen bg-[#060608] text-zinc-100 overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      {/* 1. Full-Screen 3D Interactive Watch Background */}
      <WatchCanvas
        scrollProgress={scrollProgress}
        finish={finish}
        lightingMode={lightingMode}
        isFreeOrbit={false}
      />

      {/* 2. Sticky Luxury Navigation Bar */}
      <Navbar
        finish={finish}
        onFinishChange={setFinish}
        lightingMode={lightingMode}
        onLightingChange={setLightingMode}
        onNavigate={scrollToSection}
        onOpenInquiry={handleOpenConcierge}
      />

      {/* 3. Floating HUD Controls */}
      <ControlOverlay
        lightingMode={lightingMode}
        onLightingChange={setLightingMode}
        scrollProgress={scrollProgress}
        onResetView={scrollToTop}
      />

      {/* 4. Scroll-Driven Storytelling Content Layers */}
      <main className="relative z-10 space-y-24 sm:space-y-36">
        {/* Section 1: Hero */}
        <HeroSection
          onExploreWatch={() => scrollToSection('craftsmanship')}
          onDiscoverMovement={() => scrollToSection('movement')}
        />

        {/* Section 2: Craftsmanship */}
        <CraftsmanshipSection />

        {/* Section 3: The Movement (Exploded Mechanism with 3D Labels) */}
        <MovementSection />

        {/* Section 4: Precision */}
        <PrecisionSection />

        {/* Section 5: Collection */}
        <CollectionSection
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onSelectFinish={(f) => setFinish(f)}
          currentFinish={finish}
        />

        {/* Section 6: Final Cinematic Call to Action */}
        <CtaSection
          onExploreCollection={() => scrollToSection('collection')}
          onOpenConcierge={handleOpenConcierge}
        />
      </main>

      {/* 5. Haute Horlogerie Footer */}
      <Footer />

      {/* 6. Product Technical Dossier Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onApplyFinishTo3D={(f) => setFinish(f)}
      />
    </div>
  );
}
