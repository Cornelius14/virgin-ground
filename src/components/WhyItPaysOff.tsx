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
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 notebook-grid opacity-100"></div>
      
      {/* Cinematic blue gradient overlay inspired by happyrobot.ai */}
      <div className="absolute inset-0 bg-gradient-radial from-[#007BFF]/15 via-[#00BFFF]/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 
            id="whyPaysOffHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Why it pays off
          </h2>
        </div>
        
        {/* 2x2 grid on desktop, 2 per row on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-eggshell"
            >
              {/* Icon with glow effect */}
              <div className="text-5xl mb-4 text-primary filter drop-shadow-lg">
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl md:text-[1.75rem] font-bold mb-4" style={{ color: '#1a1a1a' }}>
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base leading-relaxed mb-3" style={{ color: '#4a4a4a' }}>
                {benefit.description}
              </p>
              
              {/* Introspective sub-question inspired by movoai.co */}
              <p className="text-xs md:text-sm italic text-[#6B7280] mt-2">
                {index === 0 && "How much time could you reclaim?"}
                {index === 1 && "What if you could simplify your stack?"}
                {index === 2 && "Ready to beat the competition?"}
                {index === 3 && "Imagine instant engagement with every lead?"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItPaysOff;
