import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TaskBoard from './TaskBoard';
import { Loader } from 'lucide-react';
import DemoLeadModal from './DemoLeadModal';
import buildingsBg from '@/assets/buildings-bg.jpg';
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
  return <section className="relative min-h-[520px] md:min-h-[640px] overflow-hidden bg-[#F5F1E9]">
      {/* Background image layer */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={buildingsBg} 
          alt="" 
          className="w-full h-full object-cover opacity-35"
        />
      </div>
      
      {/* Content layer */}
      <div className={`relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24 flex flex-col md:flex-row md:items-center gap-10 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Left side: Text content, buttons, and Deal Finder */}
        <div className="flex-1 flex flex-col items-start max-w-2xl">
          <h1 className="text-[40px] leading-[1.05] md:text-[54px] md:leading-[1.05] font-semibold tracking-tight text-neutral-900">
            AI engine for real estate deals
          </h1>
          
          <p className="mt-6 max-w-xl text-[18px] md:text-[20px] leading-relaxed text-neutral-800">
            Source, qualify, and book high intent opportunities
          </p>
          
          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Button 
              onClick={() => setModalOpen(true)} 
              className="bg-[#111111] text-white hover:bg-[#111111]/90 text-base h-12 px-8 transition-all duration-200"
            >
              Get a 30-minute demo
            </Button>
            <Button 
              variant="outline"
              className="bg-white text-[#111111] border-[#111111] hover:bg-[#111111] hover:text-white text-base h-12 px-8 transition-all duration-200"
            >
              Learn more
            </Button>
          </div>
          
          {/* Deal Finder */}
          <div className="mt-10 max-w-xl w-full">
            <div className="bg-white rounded-2xl border border-[#E0D8CB] shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-6 md:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Deal Finder</h3>

              {/* Typewriter viewport */}
              <div className="font-mono text-sm text-foreground relative min-h-[4rem] leading-relaxed mb-4">
                <TypewriterAnimation />
              </div>

              {/* Static "Run query" button purely for look */}
              <button 
                type="button" 
                disabled 
                aria-disabled="true" 
                className="rounded-xl px-6 py-3 font-medium border border-[#E0D8CB] shadow-sm disabled:opacity-50 text-foreground bg-white"
              >
                find qualified targets
              </button>
            </div>
          </div>
        </div>
        
      </div>
      
      <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>;
};
export default HeroSection;