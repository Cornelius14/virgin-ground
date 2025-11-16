
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import WhoWeHelp from '@/components/WhoWeHelp';
import Testimonials from '@/components/Testimonials';
import WhyItPaysOff from '@/components/WhyItPaysOff';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <div className="py-24 md:py-32">
          <HowItWorks />
        </div>
        <div className="py-24 md:py-32">
          <WhoWeHelp />
        </div>
        <div className="py-24 md:py-32 border-t border-border">
          <Testimonials />
        </div>
        <div className="py-16 md:py-24 bg-muted">
          <WhyItPaysOff />
        </div>
        <div className="py-24 md:py-32">
          <Pricing />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
