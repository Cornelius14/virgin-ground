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
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="relative py-20 md:py-32 overflow-hidden section-light">
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 
            id="whyPaysOffHeading" 
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight"
            style={{ color: '#0a0a0a' }}
          >
            Why it pays off
          </h2>
        </div>
        
        {/* 2x2 grid on desktop, 2 per row on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="rounded-[28px] p-10 md:p-12 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-white/80 border border-black/5"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 text-primary">
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#1a1a1a' }}>
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#4a4a4a' }}>
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
