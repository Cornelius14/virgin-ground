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
  return <section className="relative w-full min-h-[90vh] py-12 md:py-20 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-background mb-8 md:mb-12">
      {/* Skyline background - full bleed */}
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-center" style={{
      backgroundImage: `url(${heroSkyline})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }}></div>
      
      {/* Gradient overlay for readability - darker at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background/85"></div>
      
      {/* Hero card wrapper */}
      <div className={`relative z-10 w-full max-w-4xl mx-auto px-4 md:px-0 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center space-y-6 flex flex-col items-center">
          <div className="flex justify-center mb-4 md:mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-muted text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              Workflows that take weeks → ~60 minutes
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1] mb-6 md:mb-8">AI engine for real estate deals</h1>
          
          {/* Deal Finder Card - Large, Bold, Dark */}
          <div className="w-full rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8 lg:p-10 space-y-6">
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wide uppercase text-primary mb-4">Deal Finder</div>
            </div>
            
            {/* Large Input Area */}
            <div className="w-full rounded-xl border border-border bg-background/50 p-4 md:p-5">
              <div className="text-left text-sm md:text-base text-foreground font-mono leading-relaxed min-h-[100px] md:min-h-[120px]">
                <TypewriterAnimation />
              </div>
            </div>
            
            {/* Full-width CTA Button */}
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg font-medium py-6" size="lg">
              find qualified targets
            </Button>
          </div>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4 mt-6 md:mt-8">
            Tell us what you want, and we handle the rest: prospecting, outreach, qualification, and booking meetings with only the motivated, qualified owners.
          </p>
          
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 md:mt-8 w-full md:w-auto px-8" onClick={() => setModalOpen(true)}>
            Get a 30-minute demo
          </Button>
          
          <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </div>
      
    </section>;
};
export default HeroSection;
