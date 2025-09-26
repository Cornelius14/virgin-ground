import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-gradient opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-up">
          Build Something
          <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
            Beautiful
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-fade-up max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Create stunning web applications with modern design patterns, 
          beautiful animations, and cutting-edge technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-4 shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Button>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-primary-glow/20 rounded-full blur-2xl animate-glow" />
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </main>
  );
};