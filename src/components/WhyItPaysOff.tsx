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
    <section className="relative w-full overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Why it pays off
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group premium-card p-8 hover:scale-[1.01] transition-all duration-200"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 text-primary">
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
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
