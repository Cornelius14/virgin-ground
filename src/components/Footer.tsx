import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 bg-muted border-t border-border">
      <div className="max-w-[1160px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <nav className="flex flex-wrap justify-center gap-8 text-sm">
            <a href="#how" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#who" className="text-muted-foreground hover:text-foreground transition-colors">Who We Help</a>
            <a href="#results" className="text-muted-foreground hover:text-foreground transition-colors">Case studies</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <p className="text-sm text-caption">© 2024 Realflow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
