import React from 'react';

const WhyItPaysOff = () => {
  const benefits = [
    {
      icon: "⏰",
      title: "20–30 Hours Saved Weekly",
      description: "Teams reclaim time from manual list-building and follow-up."
    },
    {
      icon: "🔧",
      title: "1 Tool, Lower Stack Cost",
      description: "Replace your 8-tool outbound routine with one engine."
    },
    {
      icon: "⚡",
      title: "First to Market",
      description: "Detect new sell signals and reach owners before competitors."
    },
    {
      icon: "⏱️",
      title: "Instant Follow-Up",
      description: "AI responds to calls, texts, forms, and emails in seconds."
    }
  ];

  return (
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="relative py-24 md:py-36 overflow-hidden section-dark">
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center space-y-5 max-w-3xl mx-auto mb-20 md:mb-24">
          <h2 
            id="whyPaysOffHeading" 
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-tight text-foreground"
          >
            Why it pays off
          </h2>
        </div>
        
        {/* 2x2 grid on desktop, 2 per row on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="rounded-[24px] p-10 md:p-11 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 bg-card/20 border border-border/30 backdrop-blur-sm"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 text-primary">
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground tracking-tight">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItPaysOff;
