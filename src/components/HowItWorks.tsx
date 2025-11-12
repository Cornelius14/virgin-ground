import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "We expand your target list",
      description: "Realflow pulls thousands of properties from multiple data sources and flags owners who match your price, timing, and deal constraints."
    },
    {
      number: 2,
      title: "AI works every lead and answers inbound",
      description: "The agent calls, texts, emails, drops voicemail, and picks up inbound calls or forms—qualifying each owner in real time."
    },
    {
      number: 3,
      title: "You see a live, ranked pipeline",
      description: "Qualified owners flow into your CRM with notes, motivation level, and next steps—ready for you to negotiate and close."
    }
  ];

  return (
    <section id="how" className="w-full py-12 md:py-20 lg:py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground">
            How it Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="text-center p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 mb-4">
                <span className="text-xl md:text-2xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed" style={{ lineHeight: '1.5' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;