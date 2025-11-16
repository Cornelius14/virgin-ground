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
  return <section className="relative w-full min-h-[90vh] py-12 md:py-20 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-background mb-10 md:mb-14">
      {/* Abstract wavy lines background inspired by toma.com */}
      <div className="absolute inset-0 bg-[#F0F0F0]">
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <path d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z" fill="none" stroke="#6B7280" strokeWidth="2" className="animate-pulse" style={{animationDuration: '8s'}} />
          <path d="M0,350 Q300,250 600,350 T1200,350" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.6" />
          <path d="M0,450 Q300,550 600,450 T1200,450" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.4" />
        </svg>
      </div>
      
      {/* Semi-transparent overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/85"></div>
      
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
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-black leading-[1.1]">
            The AI Engine for Real Estate Deals
          </h1>
          
          {/* Subtext */}
          <p className="text-lg md:text-2xl text-[#6B7280] max-w-3xl">
            Source, qualify, and book high-intent opportunities automatically
          </p>
          
          {/* Introspective question inspired by movoai.co */}
          <p className="text-base md:text-xl text-[#6B7280] italic font-light max-w-2xl">
            How many deals are you missing right now?
          </p>
          
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
              <Button className="bg-background hover:bg-background/80 text-foreground border border-border/50 px-12 py-6 text-base md:text-lg font-medium rounded-2xl shadow-lg transition-all hover:scale-105" size="lg">
                find qualified targets
              </Button>
            </div>
          </div>
          
          {/* Trusted by section inspired by movoai.co */}
          <div className="w-full max-w-4xl space-y-3">
            <p className="text-sm md:text-base text-[#6B7280] text-center">
              Trusted by Leading Real Estate Teams
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap grayscale opacity-60">
              <div className="text-base md:text-lg font-semibold text-muted-foreground">Hudson Group</div>
              <div className="text-base md:text-lg font-semibold text-muted-foreground">Makras Real Estate</div>
              <div className="text-base md:text-lg font-semibold text-muted-foreground">The Solaire Collection</div>
              <div className="text-base md:text-lg font-semibold text-muted-foreground">Southeast Industrial</div>
            </div>
          </div>
          
          {/* Yellow demo button */}
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base md:text-lg font-medium rounded-xl shadow-lg w-full md:w-auto hover:scale-105 transition-all" onClick={() => setModalOpen(true)}>
            Get a 30-minute demo
          </Button>
          
          <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </div>
      
    </section>;
};
export default HeroSection;