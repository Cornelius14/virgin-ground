import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import DemoLeadModal from './DemoLeadModal';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <nav className="container mx-auto flex h-20 max-w-[1160px] items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#who" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Who We Help
            </a>
            <a href="#results" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Case studies
            </a>
            <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            size="lg" 
            onClick={() => setModalOpen(true)}
            className="hidden md:inline-flex shadow-md hover:shadow-lg"
          >
            Get a 30-minute demo
          </Button>
        </div>
      </nav>
      
      <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
    </header>
  );
};

export default Header;
