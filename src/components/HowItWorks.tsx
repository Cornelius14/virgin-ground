import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Tell Us What You're Looking For",
      description: "Describe the exact leads you want using natural language: market, property type, pricing, timeline, constraints."
    },
    {
      number: 2,
      title: "AI Sources Prospects and Captures Inbound Interest",
      description: "System pulls thousands of matching properties from multiple sources and captures inbound calls, texts, and forms instantly."
    },
    {
      number: 3,
      title: "Multi-Channel Outreach",
      description: "AI calls, texts, emails, drops voicemail, and qualifies each owner across channels based on your criteria."
    },
    {
      number: 4,
      title: "Qualified Meetings Booked",
      description: "Only genuinely interested, qualified owners reach your calendar as scheduled meetings—no tire-kickers, only real opportunities."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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