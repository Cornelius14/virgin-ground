
import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="w-full py-16 md:py-20 px-6 md:px-12 border-t border-border/20 section-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-7">
          <Logo />
          <p className="max-w-md text-center text-sm leading-relaxed" style={{ color: '#6a6a6a' }}>
            Find, qualify, and engage real-estate sellers—fast. Realflow orchestrates outreach and delivers only qualified prospects.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-all" style={{ color: '#6a6a6a' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-all" style={{ color: '#6a6a6a' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-xs" style={{ color: '#6a6a6a' }}>
          <div>© 2025 Realflow. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Terms</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
