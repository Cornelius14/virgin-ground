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
    <section id="how" className="relative w-full py-20 md:py-32 px-4 md:px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 notebook-grid opacity-50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-20 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            How it Works — Step by Step
          </h2>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-[1200px] mx-auto">
          
          {/* Desktop: steps on left */}
          <div className="hidden lg:block space-y-2 order-1">
            {steps.map((step, index) => (
              <div key={step.number}>
                <button
                  onClick={() => setActiveStep(index + 1)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                    activeStep === index + 1
                      ? 'bg-card shadow-md border-l-4 border-primary'
                      : 'border-l-4 border-transparent hover:bg-muted/30'
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
                  <div className="h-px bg-border my-2 ml-6"></div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: show steps first, then card */}
          <div className="order-2 lg:order-last w-full">
            <div 
              className="rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.08)] w-full bg-card border border-border overflow-hidden"
            >
              <div 
                className="p-6 md:p-8 lg:p-10 min-h-[600px] lg:min-h-[700px] w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg md:text-xl font-semibold" style={{ color: '#1a1a1a' }}>Realflow Deal Engine</span>
                  <span className="text-sm px-4 py-1.5 rounded-full bg-white/70" style={{ color: '#4a4a4a' }}>Live Pipeline</span>
                </div>

                <div className="space-y-6">
                  {/* Search Query Box */}
                  <div 
                    className={`p-4 md:p-5 rounded-xl transition-all duration-300 ${
                      activeStep === 1 ? 'bg-white shadow-lg ring-2 ring-primary/50' : 'bg-white/70 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                      <span className="text-xs md:text-sm font-semibold text-gray-900">Search Query</span>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      Find value-add multifamily, 20–40 units, in Charlotte, built 1980–2005, cap ≥ 6.5%, ≤ $180k/door.
                    </p>
                  </div>

                  {/* Pipeline columns - horizontal on desktop, vertical on mobile */}
                  <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-4">
                    {/* Prospected Column */}
                    <div className={`p-4 md:p-5 rounded-xl transition-all duration-300 w-full ${activeStep === 2 ? 'bg-white shadow-lg ring-2 ring-primary/50' : 'bg-white/70 shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm md:text-base font-semibold text-gray-900">Prospected</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-gray-900">127</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                          <div className="font-semibold text-sm mb-1 text-gray-900">3400 Commerce Ave</div>
                          <div className="text-xs mb-1 text-gray-600">Charlotte, NC</div>
                          <div className="text-xs mb-1.5 text-gray-700">32 units, 1990 build • Owner: Smith Capital</div>
                          <div className="text-xs leading-relaxed text-gray-700">Requested rent roll, considering sale this month.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                          <div className="font-semibold text-sm mb-1 text-gray-900">2156 South Blvd</div>
                          <div className="text-xs mb-1 text-gray-600">Charlotte, NC</div>
                          <div className="text-xs mb-1.5 text-gray-700">28 units, 1995 build • Owner: Park Properties</div>
                          <div className="text-xs leading-relaxed text-gray-700">Curious about offers, reviewing options.</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">+ 125 more</div>
                      </div>
                    </div>

                    {/* Qualified Column */}
                    <div className={`p-4 md:p-5 rounded-xl transition-all duration-300 w-full ${activeStep === 3 ? 'bg-white shadow-lg ring-2 ring-primary/50' : 'bg-white/70 shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm md:text-base font-semibold text-gray-900">Qualified</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-gray-900">18</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                          <div className="font-semibold text-sm mb-1 text-gray-900">4850 Tryon Street</div>
                          <div className="text-xs mb-1 text-gray-600">Charlotte, NC</div>
                          <div className="text-xs mb-1.5 text-gray-700">36 units, 1992 build • Owner: Tryon Holdings</div>
                          <div className="text-xs leading-relaxed mb-2 text-gray-700">Open to cash offer this week; wants LOI before month-end.</div>
                          <div className="flex gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-xs">📞</span></div>
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><span className="text-xs">💬</span></div>
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center"><span className="text-xs">🎤</span></div>
                            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center"><span className="text-xs">✉️</span></div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                          <div className="font-semibold text-sm mb-1 text-gray-900">1820 East Blvd</div>
                          <div className="text-xs mb-1 text-gray-600">Charlotte, NC</div>
                          <div className="text-xs mb-1.5 text-gray-700">24 units, 1988 build • Owner: East Capital</div>
                          <div className="text-xs leading-relaxed mb-2 text-gray-700">Asked for LOI at ≥ 6.5% cap, ready to close.</div>
                          <div className="flex gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-xs">📞</span></div>
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><span className="text-xs">💬</span></div>
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center"><span className="text-xs">🎤</span></div>
                            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center"><span className="text-xs">✉️</span></div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">+ 16 more</div>
                      </div>
                    </div>

                    {/* Booked Column */}
                    <div className={`p-4 md:p-5 rounded-xl transition-all duration-300 w-full ${activeStep === 4 ? 'bg-white shadow-lg ring-2 ring-primary/50' : 'bg-white/70 shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm md:text-base font-semibold text-gray-900">Booked</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-gray-900">5</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border border-green-200">
                          <div className="font-semibold text-sm mb-1 text-gray-900">7200 Park Road</div>
                          <div className="text-xs mb-1 text-gray-600">Charlotte, NC</div>
                          <div className="text-xs mb-1.5 text-gray-700">40 units, 1985 build • Owner: Park Investors</div>
                          <div className="text-xs leading-relaxed text-gray-700">📅 Tour booked Thu 2 PM — decision-maker attending.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border border-green-200">
                          <div className="font-semibold text-sm mb-1 text-gray-900">3315 Monroe Road</div>
                          <div className="text-xs mb-1 text-gray-600">Charlotte, NC</div>
                          <div className="text-xs mb-1.5 text-gray-700">22 units, 1998 build • Owner: Monroe LLC</div>
                          <div className="text-xs leading-relaxed text-gray-700">📅 Call booked Fri 11 AM — reviewing offers same day.</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">+ 3 more</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: steps below card */}
          <div className="lg:hidden space-y-1 order-1 mb-8 px-4">
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
