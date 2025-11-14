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

  return <section id="how" className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-background overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 notebook-grid opacity-100"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground">
            How it Works — Step by Step
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1000px] mx-auto px-4 md:px-0">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="relative p-8 md:p-10 rounded-[24px] shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col group"
              style={{
                background: 'linear-gradient(to bottom, #F4F4F5, #E9E9EB)',
              }}
            >
              <div className="absolute -top-5 left-6 flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-md group-hover:brightness-110 transition-all duration-300 flex-shrink-0">
                <span className="text-lg font-bold text-primary-foreground">{step.number}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg md:text-xl font-semibold mb-3 leading-tight" style={{ color: '#1a1a1a' }}>{step.title}</h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#4a4a4a', maxWidth: '65ch' }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>;
};
export default HowItWorks;