import React, { useState } from 'react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: "01",
      title: "Tell Us What You're Looking For",
      description: "Describe the exact leads you want using natural language: market, price, property type, timing.",
    },
    {
      number: "02",
      title: "AI Sources Prospects and Captures Inbound Interest",
      description: "System pulls thousands of matching properties from multiple sources and captures inbound calls, texts, and forms.",
    },
    {
      number: "03",
      title: "Multi-Channel Outreach",
      description: "AI calls, texts, emails, drops voicemail, and qualifies each owner across channels based on your criteria.",
    },
    {
      number: "04",
      title: "Qualified Meetings Booked",
      description: "Only genuinely interested, qualified owners reach your calendar as scheduled meetings—no tire-kickers.",
    }
  ];

  return (
    <section id="how" className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-background overflow-hidden">
      <div className="absolute inset-0 notebook-grid opacity-100"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground">
            How it Works — Step by Step
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-[1200px] mx-auto">
          
          <div className="hidden lg:block space-y-1">
            {steps.map((step, index) => (
              <div key={step.number}>
                <button
                  onClick={() => setActiveStep(index + 1)}
                  className={`w-full text-left p-6 rounded-lg transition-all duration-300 ${
                    activeStep === index + 1
                      ? 'bg-card/50 border-l-4 border-primary'
                      : 'border-l-4 border-transparent hover:bg-card/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span 
                      className={`text-2xl font-bold transition-colors ${
                        activeStep === index + 1 ? 'text-primary' : 'text-muted-foreground/40'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 
                        className={`text-lg font-semibold mb-2 transition-colors ${
                          activeStep === index + 1 ? 'text-foreground' : 'text-muted-foreground/60'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className={`text-sm leading-relaxed transition-colors ${
                          activeStep === index + 1 ? 'text-muted-foreground' : 'text-muted-foreground/50'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div className="h-px bg-border/30 my-1 ml-6"></div>
                )}
              </div>
            ))}
          </div>

          <div className="order-first lg:order-last">
            <div 
              className="rounded-[28px] p-1 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }}
            >
              <div 
                className="rounded-[24px] p-8 md:p-10 min-h-[500px] md:min-h-[600px] bg-eggshell"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg md:text-xl font-semibold" style={{ color: '#1a1a1a' }}>Realflow Deal Engine</span>
                  <span className="text-sm px-4 py-1.5 rounded-full bg-white/70" style={{ color: '#4a4a4a' }}>Live Pipeline</span>
                </div>

                <div className="space-y-6">
                  <div 
                    className={`p-5 rounded-xl transition-all duration-300 ${
                      activeStep === 1 ? 'bg-white shadow-lg ring-2 ring-primary/50' : 'bg-white/70 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                      <span className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>Search Query</span>
                    </div>
                    <p className="text-base leading-relaxed" style={{ color: '#4a4a4a' }}>
                      Find value-add multifamily, 20–40 units, in Charlotte, built 1980–2005, cap ≥ 6.5%, ≤ $180k/door.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl transition-all duration-300 ${activeStep === 2 ? 'bg-white shadow-lg ring-2 ring-primary/50' : 'bg-white/70 shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>Prospected</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100" style={{ color: '#1a1a1a' }}>127</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                          <div className="font-semibold text-sm mb-1" style={{ color: '#1a1a1a' }}>Commerce Ave Property</div>
                          <div className="text-xs mb-1.5" style={{ color: '#6a6a6a' }}>Charlotte, NC</div>
                          <div className="text-xs mb-1.5" style={{ color: '#4a4a4a' }}>32 units, 1990 build</div>
                          <div className="text-xs leading-relaxed" style={{ color: '#4a4a4a' }}>Requested details, considering sale.</div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl transition-all duration-300 ${activeStep === 3 ? 'bg-white shadow-lg ring-2 ring-primary/50' : 'bg-white/70 shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>Qualified</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100" style={{ color: '#1a1a1a' }}>18</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                          <div className="font-semibold text-sm mb-1" style={{ color: '#1a1a1a' }}>South Blvd Building</div>
                          <div className="text-xs mb-1.5" style={{ color: '#6a6a6a' }}>Charlotte, NC</div>
                          <div className="text-xs mb-1.5" style={{ color: '#4a4a4a' }}>36 units, 1992 build</div>
                          <div className="text-xs leading-relaxed mb-2" style={{ color: '#4a4a4a' }}>Open to offers, wants LOI soon.</div>
                          <div className="flex gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-xs">📞</span></div>
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"><span className="text-xs">💬</span></div>
                            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center"><span className="text-xs">🎤</span></div>
                            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center"><span className="text-xs">✉️</span></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl transition-all duration-300 ${activeStep === 4 ? 'bg-white shadow-lg ring-2 ring-primary/50' : 'bg-white/70 shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>Booked</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-green-100" style={{ color: '#1a1a1a' }}>5</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border border-green-200">
                          <div className="font-semibold text-sm mb-1" style={{ color: '#1a1a1a' }}>Tryon Street Complex</div>
                          <div className="text-xs mb-1.5" style={{ color: '#6a6a6a' }}>Charlotte, NC</div>
                          <div className="text-xs leading-relaxed" style={{ color: '#4a4a4a' }}>📅 Tour booked Thu 2 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-1 order-last">
            {steps.map((step, index) => (
              <div key={step.number}>
                <button
                  onClick={() => setActiveStep(index + 1)}
                  className={`w-full text-left p-5 rounded-lg transition-all duration-300 ${
                    activeStep === index + 1 ? 'bg-card/50 border-l-4 border-primary' : 'border-l-4 border-transparent bg-card/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-xl font-bold transition-colors ${activeStep === index + 1 ? 'text-primary' : 'text-muted-foreground/40'}`}>
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className={`text-base font-semibold mb-1 transition-colors ${activeStep === index + 1 ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors ${activeStep === index + 1 ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
                {index < steps.length - 1 && <div className="h-px bg-border/30 my-1 ml-4"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
