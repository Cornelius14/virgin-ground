import React from 'react';

const WhyItPaysOff = () => {
  const benefits = [
    {
      icon: "⚡",
      title: "Never miss an inquiry",
      description: "AI answers calls and forms in seconds, 24/7."
    },
    {
      icon: "💬",
      title: "More real conversations",
      description: "Works every list and re-engages cold leads automatically, increasing contact and meeting rates."
    },
    {
      icon: "📋",
      title: "Clean CRM, less grunt work",
      description: "Every interaction logged with notes, motivation, and next steps."
    },
    {
      icon: "🎯",
      title: "Teams stay focused",
      description: "Reps and partners spend time negotiating, not chasing unresponsive leads."
    }
  ];

  return (
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 
            id="whyPaysOffHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Why it pays off
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed" style={{ lineHeight: '1.5' }}>
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
