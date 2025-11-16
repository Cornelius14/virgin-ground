import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from './Logo';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { z } from 'zod';
import DemoLeadModal from './DemoLeadModal';

const Header = () => {
  const [activePage, setActivePage] = useState('product');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    // Apply theme immediately on load without flash
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme);
    
    setIsDarkMode(prefersDark);
    
    // Apply theme class immediately
    requestAnimationFrame(() => {
      if (prefersDark) {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode'); 
        document.documentElement.classList.add('light-mode');
      }
    });
  }, []);
  
  useEffect(() => {
    // Update theme when state changes
    requestAnimationFrame(() => {
      if (isDarkMode) {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  }, [isDarkMode]);
  
  // Manage body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);
  
  const handleNavClick = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePage(page);
    setMobileMenuOpen(false);
    
    // Handle home navigation
    if (page === 'home') {
      if (window.location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = '/';
      }
      return;
    }
    
    // Handle special routes
    if (page === 'features') {
      if (window.location.pathname === '/') {
        window.location.href = '/features';
      } else {
        window.location.href = '/features';
      }
      return;
    }
    
    if (page === 'demo') {
      setShowPasswordPrompt(true);
      return;
    }
    
    // Handle anchor links - check if we're on home page
    if (window.location.pathname === '/') {
      const element = document.getElementById(page);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash
      window.location.href = `/#${page}`;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Password validation schema
  const passwordSchema = z.string().trim().min(1, "Password is required").max(50, "Password too long");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    try {
      // Validate password input
      const validatedPassword = passwordSchema.parse(password);
      
      if (validatedPassword === '1409') {
        setShowPasswordPrompt(false);
        setPassword('');
        setPasswordError('');
        // Set demo access flag in sessionStorage
        sessionStorage.setItem('demoAccess', 'granted');
        // Use window.location.href for reliable navigation
        window.location.href = '/demo';
      } else {
        setPasswordError('Incorrect password');
        setPassword('');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.errors[0]?.message || 'Invalid input');
      } else {
        setPasswordError('An error occurred');
      }
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setPassword('');
    setPasswordError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limit input length and clear error on change
    if (value.length <= 50) {
      setPassword(value);
      if (passwordError) {
        setPasswordError('');
      }
    }
  };


  return (
    <div className="relative z-50 pt-6 px-4">
      <header className="w-full max-w-7xl mx-auto py-4 px-6 md:px-8 flex items-center justify-between rounded-2xl backdrop-blur-md bg-background/30 border border-white/10">
        <div className="py-1">
          <a href="/" className="inline-flex items-center gap-2.5 -m-1.5 p-1.5 rounded-md hover:bg-white/5 light-mode:hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 light-mode:focus-visible:ring-black/20">
            <Logo />
          </a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-3 rounded-2xl text-muted-foreground hover:text-foreground"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2" style={{ marginLeft: '-1cm' }}>
          <div className="nav-pill px-1.5 py-1.5 shadow-xl bg-card/80">
            <div className="flex items-center gap-1">
              <button 
                onClick={handleNavClick('product')}
                className={cn(
                  "nav-pill-item",
                  activePage === 'product' && 'active'
                )}
              >
                Product
              </button>
              <button 
                onClick={handleNavClick('how')}
                className={cn(
                  "nav-pill-item",
                  activePage === 'how' && 'active'
                )}
              >
                How it Works
              </button>
              <button 
                onClick={handleNavClick('features')}
                className={cn(
                  "nav-pill-item",
                  activePage === 'features' && 'active'
                )}
              >
                Features
              </button>
              <button 
                onClick={handleNavClick('cases')}
                className={cn(
                  "nav-pill-item",
                  activePage === 'cases' && 'active'
                )}
              >
                Case studies
              </button>
              <button 
                onClick={handleNavClick('pricing')}
                className={cn(
                  "nav-pill-item",
                  activePage === 'pricing' && 'active'
                )}
              >
                Pricing
              </button>
              <button 
                onClick={handleNavClick('demo')}
                className={cn(
                  "nav-pill-item",
                  activePage === 'demo' && 'active'
                )}
              >
                Demo
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mobile navigation backdrop */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden fixed top-20 left-4 right-4 bg-background/95 backdrop-blur-md py-4 px-6 border border-border rounded-2xl shadow-lg z-50"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleNavClick('home')}
                className={`px-3 py-3 min-h-[44px] text-base rounded-lg transition-colors text-left ${
                  activePage === 'home' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Home
              </button>
              <button 
                onClick={handleNavClick('product')}
                className={`px-3 py-3 min-h-[44px] text-base rounded-lg transition-colors text-left ${
                  activePage === 'product' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Product
              </button>
              <button 
                onClick={handleNavClick('how')}
                className={`px-3 py-3 min-h-[44px] text-base rounded-lg transition-colors text-left ${
                  activePage === 'how' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                How it Works
              </button>
              <button 
                onClick={handleNavClick('features')}
                className={`px-3 py-3 min-h-[44px] text-base rounded-lg transition-colors text-left ${
                  activePage === 'features' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Features
              </button>
              <button 
                onClick={handleNavClick('cases')}
                className={`px-3 py-3 min-h-[44px] text-base rounded-lg transition-colors text-left ${
                  activePage === 'cases' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Case studies
              </button>
              <button 
                onClick={handleNavClick('pricing')}
                className={`px-3 py-3 min-h-[44px] text-base rounded-lg transition-colors text-left ${
                  activePage === 'pricing' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Pricing
              </button>
              <button 
                onClick={handleNavClick('demo')}
                className={`px-3 py-3 min-h-[44px] text-base rounded-lg transition-colors text-left ${
                  activePage === 'demo' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Demo
              </button>
              
              {/* Theme toggle for mobile */}
              <div className="flex items-center justify-between px-3 py-3 border-t border-border mt-2 pt-4">
                <span className="text-sm text-muted-foreground">Theme</span>
                <div className="flex items-center gap-2">
                  <Moon size={16} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch 
                    role="switch"
                    aria-checked={!isDarkMode}
                    checked={!isDarkMode} 
                    onCheckedChange={toggleTheme} 
                    className="data-[state=checked]:bg-primary"
                  />
                  <Sun size={16} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Password prompt overlay */}
        {showPasswordPrompt && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-medium mb-4 text-center text-foreground">Demo Access</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="text-center"
                    autoFocus
                    autoComplete="off"
                    maxLength={50}
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500 text-center" role="alert">
                      {passwordError}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePasswordCancel} 
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={!password.trim()}
                  >
                    Access Demo
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle for desktop */}
          <div className="flex items-center gap-2 rounded-full px-3 py-2">
            <Moon size={18} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
            <Switch 
              role="switch"
              aria-checked={!isDarkMode}
              checked={!isDarkMode} 
              onCheckedChange={toggleTheme} 
              className="data-[state=checked]:bg-primary"
            />
            <Sun size={18} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="rounded-2xl">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 text-base font-medium rounded-xl shadow-lg hover:shadow-primary/20 transition-all" 
              onClick={() => setModalOpen(true)}
            >
              Get a 30-minute demo
            </Button>
          </div>
        </div>
      </header>
      
      <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Header;
