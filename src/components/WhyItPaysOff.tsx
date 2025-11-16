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
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="relative py-16 md:py-24 overflow-hidden" style={{ background: '#000000' }}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 notebook-grid opacity-100"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 
            id="whyPaysOffHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter"
            style={{ color: '#FFFFFF' }}
          >
            Why it pays off
          </h2>
        </div>
        
        {/* 2x2 grid on desktop, 2 per row on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="rounded-[24px] p-[1.5rem] md:p-[1.5rem] flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 bg-[#F5F5F5]"
              style={{ 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Icon with gold tint */}
              <div className="text-5xl mb-4" style={{ color: '#FBBF24' }}>
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-[1.5rem] font-bold mb-4" style={{ color: '#111827' }}>
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-[0.875rem] leading-relaxed mb-3" style={{ color: '#6B7280' }}>
                {benefit.description}
              </p>
              
              {/* Introspective question */}
              <p className="text-[0.875rem] italic" style={{ color: '#6B7280' }}>
                {index === 0 && "How much time could you reclaim?"}
                {index === 1 && "How much are you spending on tools?"}
                {index === 2 && "How many deals slip away?"}
                {index === 3 && "How fast do you respond?"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItPaysOff;
