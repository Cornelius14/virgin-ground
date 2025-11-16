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
  return <section className="relative w-full min-h-[95vh] py-16 md:py-24 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Cinematic background image */}
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-center" style={{
      backgroundImage: `url(${heroSkyline})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }}></div>
      
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40"></div>
      
      {/* Hero content wrapper */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center space-y-10 flex flex-col items-center">
          
          {/* Status pill */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 text-sm font-medium rounded-full bg-primary/15 text-primary border border-primary/20 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Workflows that take weeks → ~60 minutes
            </span>
          </div>
          
          {/* Cinematic H1 */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05] max-w-5xl">
            AI engine for real estate deals
          </h1>
          
          {/* Glassmorphism Deal Finder Card */}
          <div className="w-full max-w-4xl rounded-3xl glass-panel p-10 md:p-12 lg:p-14 space-y-8 shadow-2xl">
            
            {/* Deal Finder title */}
            <h2 className="text-2xl md:text-3xl font-medium text-foreground/90 text-center">
              Deal Finder
            </h2>
            
            {/* Typed query area - DO NOT MODIFY CONTENT OR ANIMATION */}
            <div className="w-full rounded-2xl bg-background/40 border border-white/10 p-6 md:p-8 backdrop-blur-sm">
              <div className="text-left text-base md:text-lg text-foreground/90 leading-relaxed min-h-[100px] md:min-h-[120px]">
                <TypewriterAnimation />
              </div>
            </div>
            
            {/* CTA button inside card */}
            <div className="flex justify-center">
              <Button className="bg-card/60 hover:bg-card/80 text-foreground border border-white/10 px-14 py-7 text-base md:text-lg font-medium rounded-2xl shadow-xl transition-all backdrop-blur-sm" size="lg">
                find qualified targets
              </Button>
            </div>
          </div>
          
          {/* Subheader text */}
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto font-light">
            Source, qualify, and book high intent opportunities
          </p>
          
          {/* Primary CTA */}
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-7 text-base md:text-lg font-medium rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all w-full md:w-auto" onClick={() => setModalOpen(true)}>
            Get a 30-minute demo
          </Button>
          
          <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </div>
      
    </section>;
};
export default HeroSection;