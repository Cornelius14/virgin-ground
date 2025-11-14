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
  return <section className="relative w-full py-12 md:py-20 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Skyline background */}
      <div className="absolute inset-0" style={{
      backgroundImage: `url(${heroSkyline})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top'
    }}></div>
      
      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
      
      {/* Hero card wrapper with soft glow */}
      <div className={`relative z-10 w-full max-w-4xl mx-auto rounded-[24px] backdrop-blur-sm border border-border/50 shadow-2xl p-6 md:p-10 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ backgroundColor: '#101114', boxShadow: '0 0 60px rgba(0, 0, 0, 0.5), 0 20px 40px rgba(0, 0, 0, 0.4)' }}>
        <div className="text-center space-y-6 flex flex-col items-center">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-muted text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              Workflows that take weeks → ~60 minutes
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1] mb-5 w-full">AI engine for real estate deals</h1>
          
          {/* Typewriter Demo Card */}
          <div className="mt-6 w-full rounded-2xl border-2 border-border/80 shadow-sm bg-card/70 backdrop-blur p-4 md:p-6">
            <h3 className="text-lg font-semibold text-foreground text-left">Deal Finder</h3>

            {/* Typewriter viewport */}
            <div className="mt-4 font-mono text-sm text-foreground relative min-h-[4rem] leading-relaxed text-left">
              <TypewriterAnimation />
            </div>

            {/* Static "Run query" button purely for look */}
            <div className="mt-3 text-left">
              <button type="button" disabled aria-disabled="true" className="rounded-xl px-4 py-2 font-medium border shadow-sm disabled:opacity-50 text-foreground">
                find qualified targets
              </button>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-[1.4] mt-6 text-center w-full">Sourcing, qualifying, and booking high intent opportunites                           </p>
          
          <div className="flex justify-center pt-6 w-full">
            <Button onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground text-base h-12 px-8 transition-all duration-200 min-h-[48px] w-full sm:w-auto">
              Get a 30-minute demo
            </Button>
          </div>
          
          <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </div>
      
    </section>;
};
export default HeroSection;
