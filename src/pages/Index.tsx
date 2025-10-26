
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
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <WhoWeHelp />
        <Testimonials />
        <WhyItPaysOff />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
