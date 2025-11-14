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
    <section className="py-16 md:py-24 px-4 md:px-8 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-16 text-foreground">
          How it Works — Step by Step
        </h2>
        
        <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-start">
          
          {/* Left side - Steps */}
          <div className="w-full space-y-1">
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

          {/* Right side - Realflow Deal Engine card */}
          <div className="relative w-full">
            <div className="rounded-3xl border-2 border-border shadow-lg p-6 md:p-10 bg-eggshell">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <span className="text-lg md:text-xl font-semibold" style={{ color: '#1a1a1a' }}>Realflow Deal Engine</span>
                <span className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37' }}>
                  Live Demo
                </span>
              </div>

              {/* Search Query */}
              <div className="mb-8 p-5 rounded-xl" style={{ backgroundColor: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div className="text-xs font-semibold mb-2" style={{ color: '#666' }}>Search Query</div>
                <div className="text-sm md:text-base font-mono leading-relaxed" style={{ color: '#1a1a1a' }}>
                  Find value-add multifamily, 20–40 units, in Charlotte, built 1980–2005, cap ≥ 6.5%, ≤ $180k/door.
                </div>
              </div>

              {/* Three columns: Prospected, Qualified, Booked */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Prospected */}
                <div className="flex flex-col">
                  <ColumnHeader title="Prospected" count={127} isActive={activeStep === 1} />
                  <div className="space-y-3 mb-3">
                    <PropertyCard
                      name="3400 Commerce Ave"
                      city="Charlotte, NC"
                      details="32 units, 1990 build"
                      owner="Smith Capital"
                      intent="Requested rent roll; reviewing options."
                      isActive={activeStep === 1}
                    />
                    <PropertyCard
                      name="1820 South Blvd"
                      city="Charlotte, NC"
                      details="28 units, 1985 build"
                      owner="Davidson RE"
                      intent="Considering sale if price works."
                      isActive={activeStep === 1}
                    />
                  </div>
                  <MoreIndicator isActive={activeStep === 1} />
                </div>

                {/* Qualified */}
                <div className="flex flex-col">
                  <ColumnHeader title="Qualified" count={18} isActive={activeStep >= 2} />
                  <div className="space-y-3 mb-3">
                    <PropertyCard
                      name="2100 Park Rd"
                      city="Charlotte, NC"
                      details="24 units, 1988 build"
                      owner="Mecklenburg Holdings"
                      intent="Open to offers; wants LOI this week."
                      isActive={activeStep >= 2}
                      channels={activeStep >= 2}
                    />
                    <PropertyCard
                      name="7800 Nations Ford Rd"
                      city="Charlotte, NC"
                      details="40 units, 2000 build"
                      owner="Crown Equity"
                      intent="Interested in cash close within 30 days."
                      isActive={activeStep >= 2}
                      channels={activeStep >= 2}
                    />
                  </div>
                  <MoreIndicator isActive={activeStep >= 2} />
                </div>

                {/* Booked */}
                <div className="flex flex-col">
                  <ColumnHeader title="Booked" count={3} isActive={activeStep >= 3} />
                  <div className="space-y-3 mb-3">
                    <PropertyCard
                      name="9100 University City Blvd"
                      city="Charlotte, NC"
                      details="22 units, 1982 build"
                      owner="Plaza Properties"
                      intent="Tour booked Thu 2 PM."
                      isActive={activeStep >= 3}
                    />
                    <PropertyCard
                      name="3300 Pineville Rd"
                      city="Charlotte, NC"
                      details="26 units, 1998 build"
                      owner="Southern Gateway"
                      intent="Offer review call booked Tue 11 AM."
                      isActive={activeStep >= 3}
                    />
                  </div>
                  <MoreIndicator isActive={activeStep >= 3} />
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

const PropertyCard = ({ name, city, details, owner, intent, isActive, channels }: {
  name: string;
  city: string;
  details: string;
  owner: string;
  intent: string;
  isActive: boolean;
  channels?: boolean;
}) => (
  <div 
    className={`p-4 rounded-xl transition-all duration-300 ${
      isActive 
        ? 'shadow-sm' 
        : 'opacity-50'
    }`}
    style={{
      backgroundColor: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
      border: isActive ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.04)'
    }}
  >
    <div className="space-y-1.5">
      <div className="font-semibold text-sm" style={{ color: isActive ? '#1a1a1a' : '#999' }}>
        {name}
      </div>
      <div className="text-xs" style={{ color: isActive ? '#666' : '#aaa' }}>
        {city}
      </div>
      <div className="text-xs" style={{ color: isActive ? '#666' : '#aaa' }}>
        {details} • {owner}
      </div>
      <div className="text-xs italic" style={{ color: isActive ? '#1a1a1a' : '#999' }}>
        {intent}
      </div>
    </div>
    
    {channels && (
      <div className="flex items-center justify-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
          📞
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
          💬
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
          🔔
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
          📩
        </div>
      </div>
    )}
  </div>
);

const ColumnHeader = ({ title, count, isActive }: { title: string; count: number; isActive: boolean }) => (
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-base font-semibold" style={{ color: isActive ? '#1a1a1a' : '#999' }}>
      {title}
    </h4>
    <span 
      className="text-sm font-medium px-3 py-1 rounded-full"
      style={{
        backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0,0,0,0.05)',
        color: isActive ? '#D4AF37' : '#999'
      }}
    >
      {count}
    </span>
  </div>
);

const MoreIndicator = ({ isActive }: { isActive: boolean }) => (
  <div 
    className="text-center py-2 text-xs"
    style={{ color: isActive ? '#999' : '#ccc' }}
  >
    + more
  </div>
);

export default HowItWorks;
