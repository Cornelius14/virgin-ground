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
  return <section className="relative w-full min-h-[85vh] py-24 md:py-32 flex items-center overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Hero content wrapper */}
      <div className={`relative z-10 w-full max-w-[1160px] mx-auto px-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Yellow pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Workflows that take weeks → ~60 minutes
            </div>
            
            {/* H1 */}
            <h1 className="text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight text-foreground leading-[1.1]">
              AI engine for real estate deals
            </h1>
            
            {/* Subheader */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Source, qualify, and book high intent opportunities
            </p>
          </div>
          
          {/* Right: Deal Finder card */}
          <div className="space-y-6 premium-card p-8 md:p-10">
            
            {/* Deal Finder title */}
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Deal Finder
            </h2>
            
            {/* Typed query area - DO NOT MODIFY CONTENT OR ANIMATION */}
            <div className="w-full rounded-xl bg-muted/30 border border-border p-5 md:p-6">
              <div className="text-left text-sm md:text-base text-foreground leading-relaxed min-h-[120px] md:min-h-[140px]">
                <TypewriterAnimation />
              </div>
            </div>
            
            {/* CTA button inside card */}
            <div className="flex justify-center">
              <Button className="w-full" size="lg">
                find qualified targets
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>;
};
export default HeroSection;