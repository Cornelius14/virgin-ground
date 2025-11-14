import React, { useState } from 'react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: "01",
      title: "Tell Us What You're Looking For",
      description: "Describe the exact leads you want using natural language: market, price, property type, timing.",
      demoHighlight: "query"
    },
    {
      number: "02",
      title: "AI Sources Prospects and Captures Inbound Interest",
      description: "System pulls thousands of matching properties from multiple sources and captures inbound calls, texts, and forms.",
      demoHighlight: "sources"
    },
    {
      number: "03",
      title: "Multi-Channel Outreach",
      description: "AI calls, texts, emails, drops voicemail, and qualifies each owner across channels based on your criteria.",
      demoHighlight: "outreach"
    },
    {
      number: "04",
      title: "Qualified Meetings Booked",
      description: "Only genuinely interested, qualified owners reach your calendar as scheduled meetings—no tire-kickers.",
      demoHighlight: "meetings"
    }
  ];

  return (
    <section id="how" className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-background overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 notebook-grid opacity-100"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground">
            How it Works — Step by Step
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-[1200px] mx-auto">
          
          {/* Left Column - Step List (Hidden on mobile, shown on desktop) */}
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

          {/* Right Column - Demo Card */}
          <div className="order-first lg:order-last">
            <div 
              className="rounded-[28px] p-1 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }}
            >
              <div 
                className="rounded-[24px] p-6 md:p-8 min-h-[500px] md:min-h-[600px]"
                style={{ background: 'linear-gradient(to bottom, #F4F4F5, #E9E9EB)' }}
              >
                {/* Demo Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#4a4a4a' }}>Realflow Deal Engine</span>
                </div>

                {/* Demo Content Based on Active Step */}
                <div className="space-y-4">
                  
                  {/* Query Bar - Highlighted for Step 1 */}
                  <div 
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      activeStep === 1 
                        ? 'bg-white shadow-lg ring-2 ring-primary/50' 
                        : 'bg-white/60 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>Search Query</span>
                    </div>
                    <p className="text-sm" style={{ color: '#4a4a4a' }}>
                      Find multifamily 20-40 units, Charlotte, 1980-2005, cap ≥6.5%
                    </p>
                  </div>

                  {/* Pipeline Columns */}
                  <div className="grid grid-cols-3 gap-3">
                    
                    {/* Prospected Column - Highlighted for Step 2 */}
                    <div 
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        activeStep === 2 
                          ? 'bg-white shadow-lg ring-2 ring-primary/50' 
                          : 'bg-white/60 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>Prospected</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100" style={{ color: '#1a1a1a' }}>487</span>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                            <div className="w-full h-1.5 bg-gray-200 rounded mb-1"></div>
                            <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Qualified Column - Highlighted for Step 3 */}
                    <div 
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        activeStep === 3 
                          ? 'bg-white shadow-lg ring-2 ring-primary/50' 
                          : 'bg-white/60 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>Qualified</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100" style={{ color: '#1a1a1a' }}>24</span>
                      </div>
                      <div className="space-y-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                            <div className="w-full h-1.5 bg-gray-200 rounded mb-1"></div>
                            <div className="flex gap-1 mt-2">
                              <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center">
                                <span className="text-[8px] text-white">📞</span>
                              </div>
                              <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                                <span className="text-[8px] text-white">💬</span>
                              </div>
                              <div className="w-4 h-4 rounded-full bg-purple-400 flex items-center justify-center">
                                <span className="text-[8px] text-white">✉️</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booked Column - Highlighted for Step 4 */}
                    <div 
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        activeStep === 4 
                          ? 'bg-white shadow-lg ring-2 ring-primary/50' 
                          : 'bg-white/60 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>Booked</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100" style={{ color: '#1a1a1a' }}>8</span>
                      </div>
                      <div className="space-y-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border border-green-200">
                            <div className="flex items-center gap-1 mb-1">
                              <div className="w-1 h-1 rounded-full bg-green-500"></div>
                              <div className="w-full h-1 bg-green-200 rounded"></div>
                            </div>
                            <div className="text-[8px]" style={{ color: '#4a4a4a' }}>📅 Meeting</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Multi-Channel Icons - Extra highlight for Step 3 */}
                  {activeStep === 3 && (
                    <div className="p-4 rounded-xl bg-white shadow-lg ring-2 ring-primary/50">
                      <div className="flex items-center gap-3 justify-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                            <span className="text-sm">📞</span>
                          </div>
                          <span className="text-xs font-medium" style={{ color: '#1a1a1a' }}>Calls</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                            <span className="text-sm">💬</span>
                          </div>
                          <span className="text-xs font-medium" style={{ color: '#1a1a1a' }}>SMS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
                            <span className="text-sm">✉️</span>
                          </div>
                          <span className="text-xs font-medium" style={{ color: '#1a1a1a' }}>Email</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Step List - Below demo card on mobile */}
          <div className="lg:hidden space-y-1 order-last">
            {steps.map((step, index) => (
              <div key={step.number}>
                <button
                  onClick={() => setActiveStep(index + 1)}
                  className={`w-full text-left p-5 rounded-lg transition-all duration-300 ${
                    activeStep === index + 1
                      ? 'bg-card/50 border-l-4 border-primary'
                      : 'border-l-4 border-transparent bg-card/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span 
                      className={`text-xl font-bold transition-colors ${
                        activeStep === index + 1 ? 'text-primary' : 'text-muted-foreground/40'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 
                        className={`text-base font-semibold mb-1 transition-colors ${
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
                  <div className="h-px bg-border/30 my-1 ml-4"></div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;