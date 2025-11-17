import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TaskBoard from './TaskBoard';
import { Loader } from 'lucide-react';
import DemoLeadModal from './DemoLeadModal';
import heroCityscape from '@/assets/hero-cityscape.png';
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
  return <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#F5F1E9] to-[#F8F5EE]">
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Two column layout: text left, image right */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Left column: Text content and CTA */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-tight">
              AI engine for real estate deals
            </h1>
            
            <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed">
              Source, qualify, and book high intent opportunities
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
          </div>
          
          {/* Right column: Architectural illustration */}
          <div className="relative">
            <div className="bg-white rounded-2xl border border-[#E0D8CB] shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden aspect-[4/3]">
              <img 
                src={heroCityscape} 
                alt="Architectural data visualization" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Deal Finder - Full width below hero content */}
        <div className={`mt-16 lg:mt-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
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
        
        <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
      </div>
    </section>;
};
export default HeroSection;