import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TaskBoard from './TaskBoard';
import { Loader } from 'lucide-react';
import DemoLeadModal from './DemoLeadModal';
import heroSkyline from '@/assets/hero-skyline.png';
const TypewriterAnimation = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [currentQuery, setCurrentQuery] = useState(0);
  const queries = ["Find value-add multifamily, 20–40 units, in Charlotte, built 1980–2005, cap ≥ 6.5%, ≤ $180k/door.", "Find 18–22k SF retail for lease in Miami Beach, $180–$220 PSF, frontage ≥ 60 ft.", "Find Dallas multifamily owners with loans maturing in 3–6 months, 50–150 units, LTV ≥ 65% for refinance.", "Find Travis County, TX properties with recent deed filings/escrow opens likely to need title insurance in ≤45 days.", "I am a concrete supplier, find me property owners who have recently pulled permits with buildings over 100k SF."];
  useEffect(() => {
    const currentText = queries[currentQuery];
    if (isTyping) {
      if (currentIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentQuery(prev => (prev + 1) % queries.length);
          setIsTyping(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, isTyping, currentQuery, queries]);
  return <div className="relative">
      <div className="whitespace-pre-line">
        {displayText}
        <span className="animate-pulse">|</span>
      </div>
    </div>;
};
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return <section className="relative w-full min-h-[90vh] py-12 md:py-20 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden mb-10 md:mb-14" style={{ background: '#000000' }}>
      {/* X-ray urban buildings background */}
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-30" style={{
      backgroundImage: `url(${heroSkyline})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }}></div>
      
      {/* Subtle wavy lines overlay */}
      <div className="absolute inset-0 wavy-lines-overlay"></div>
      
      {/* Hero content wrapper */}
      <div className={`relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center space-y-8 flex flex-col items-center">
          
          {/* Yellow pill */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              Workflows that take weeks → ~60 minutes
            </span>
          </div>
          
          {/* H1 */}
          <h1 className="text-[3rem] md:text-[4.5rem] font-bold tracking-tight leading-[1.1]" style={{ color: '#FFFFFF' }}>
            The AI Engine for Real Estate Deals
          </h1>
          
          {/* Large Dark Deal Finder Card */}
          <div className="w-full max-w-4xl rounded-3xl bg-card/95 backdrop-blur-sm border border-border shadow-2xl p-8 md:p-10 lg:p-12 space-y-6">
            
            {/* Deal Finder title */}
            <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
              Deal Finder
            </h2>
            
            {/* Typed query area - DO NOT MODIFY CONTENT OR ANIMATION */}
            <div className="w-full rounded-xl bg-background/60 border border-border/50 p-5 md:p-6">
              <div className="text-left text-sm md:text-base text-foreground leading-relaxed min-h-[100px] md:min-h-[120px]">
                <TypewriterAnimation />
              </div>
            </div>
            
            {/* CTA button inside card */}
            <div className="flex justify-center">
              <Button className="bg-background hover:bg-background/80 text-foreground border border-border/50 px-12 py-6 text-base md:text-lg font-medium rounded-xl transition-all hover:shadow-[0_2px_4px_rgba(0,0,0,0.2)]" size="lg" style={{ borderRadius: '12px' }}>
                find qualified targets
              </Button>
            </div>
          </div>
          
          {/* Subheader text */}
          <p className="text-[1.25rem] leading-relaxed max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
            Source, qualify, and book high-intent opportunities automatically
          </p>
          
          {/* Introspective question */}
          <p className="text-[1rem] italic max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
            How many deals are you missing right now?
          </p>
          
          {/* Trusted by logos */}
          <div className="w-full max-w-4xl mx-auto pt-8">
            <p className="text-[0.875rem] text-center mb-4" style={{ color: '#9CA3AF' }}>
              Trusted by Leading Real Estate Teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              <span className="text-sm font-medium" style={{ color: '#9CA3AF' }}>Hudson Walk-Ups Group</span>
              <span className="text-sm font-medium" style={{ color: '#9CA3AF' }}>Makras Real Estate</span>
              <span className="text-sm font-medium" style={{ color: '#9CA3AF' }}>The Solaire Collection</span>
              <span className="text-sm font-medium" style={{ color: '#9CA3AF' }}>Meridian Capital Group</span>
            </div>
          </div>
          
          {/* Yellow demo button */}
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base md:text-lg font-medium rounded-xl shadow-lg w-full md:w-auto" onClick={() => setModalOpen(true)}>
            Get a 30-minute demo
          </Button>
          
          <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </div>
      
    </section>;
};
export default HeroSection;