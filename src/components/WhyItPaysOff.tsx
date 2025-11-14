import React from 'react';

const WhyItPaysOff = () => {
  const stats = [
    {
      topLine: "20–30",
      label: "Hours Saved Weekly",
      description: "Teams reclaim valuable time from manual list-building and outreach efforts.",
      icon: null
    },
    {
      topLine: "1 Tool",
      label: "Lower Stack Cost",
      description: "Replace an 8-tool routine with one integrated outbound engine.",
      icon: null
    },
    {
      topLine: "",
      label: "First to Market",
      description: "AI detects new sell signals and reaches owners before competitors, giving you the earliest shot at each deal.",
      icon: "⚡"
    },
    {
      topLine: "",
      label: "Instant Follow-Up",
      description: "AI responds to calls, texts, and forms within seconds so serious opportunities aren't lost to slow response.",
      icon: "⏱️"
    }
  ];

  return (
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 notebook-grid opacity-100"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 
            id="whyPaysOffHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Why it pays off
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="rounded-[22px] border border-border bg-card backdrop-blur-sm p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[280px] hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              style={{
                background: 'linear-gradient(to bottom, hsl(var(--card)), hsl(var(--card) / 0.95))'
              }}
            >
              {stat.icon && (
                <div className="text-3xl mb-3">
                  {stat.icon}
                </div>
              )}
              <div className="text-4xl md:text-5xl font-semibold leading-none text-primary mb-4">
                {stat.topLine}
              </div>
              <h3 className="text-xl md:text-2xl text-foreground mb-4 font-semibold">
                {stat.label}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItPaysOff;
