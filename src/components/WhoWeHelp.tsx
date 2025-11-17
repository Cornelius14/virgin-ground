import React, { useState } from 'react';

const WhoWeHelp = () => {
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      icon: "🏠",
      title: "Wholesalers & Investors",
      shortDesc: "Find motivated sellers before they hit the market.",
      viewTitle: "Wholesaler View",
      queryExample: "Find single-family homes under $500k, ready to sell in 14 days — Tampa Bay area",
      leads: [
        { name: "Maria Lopez", address: "3421 Pine St — Tampa, FL", status: "Divorce, needs fast close" },
        { name: "Tom Bradley", address: "987 Maple Ave — Clearwater, FL", status: "Estate sale, pricing flexible" },
      ]
    },
    {
      icon: "🏢",
      title: "CRE Owners & Brokers",
      shortDesc: "Surface off-market owners that match your mandate.",
      viewTitle: "CRE View",
      queryExample: "Find office buildings 50k–100k SF, Tampa, built 1990–2010, cap ≥7%",
      leads: [
        { name: "Gateway Properties", address: "1200 Commerce Blvd — Tampa, FL", status: "Exploring sale, wants LOI" },
        { name: "Horizon LLC", address: "540 Business Dr — Tampa, FL", status: "Open to offers above $8M" },
      ]
    },
    {
      icon: "🏦",
      title: "Lenders & Capital Providers",
      shortDesc: "Identify borrowers with real near-term financing needs.",
      viewTitle: "Lender View",
      queryExample: "Find multifamily owners with loans maturing in next 180 days — Southeast markets",
      leads: [
        { name: "Coastal Apartments", address: "890 Harbor Way — Miami, FL", status: "Loan matures in 90 days" },
        { name: "Summit Holdings", address: "234 Tower Ln — Orlando, FL", status: "Seeking refi at 5.5% rate" },
      ]
    },
    {
      icon: "🏦",
      title: "Mortgage Lenders",
      shortDesc: "Convert inbound borrowers and reach owners with near-term maturities.",
      viewTitle: "Mortgage Lender View",
      queryExample: "Find homeowners with mortgages maturing in 60–90 days — Charlotte metro",
      leads: [
        { name: "Johnson Family", address: "450 Oak Ridge — Charlotte, NC", status: "Refi needed, rate 6.2%" },
        { name: "Patterson Trust", address: "890 Cedar Lane — Charlotte, NC", status: "Loan matures in 75 days" },
      ]
    }
  ];

  const active = personas[activePersona];

  return (
    <section id="who-we-help" aria-labelledby="whoWeHelpHeading" className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 notebook-grid opacity-100"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 
            id="whoWeHelpHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Who We Help
          </h2>
        </div>
        
        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-[1200px] mx-auto">
          
          {/* Left: Persona Rail (hidden on mobile, shows below card) */}
          <div className="hidden lg:block lg:col-span-4 space-y-1">
            {personas.map((persona, index) => (
              <button
                key={index}
                onClick={() => setActivePersona(index)}
                className={`w-full text-left p-5 rounded-lg transition-all duration-300 ${
                  activePersona === index
                    ? 'bg-card/50 border-l-4 border-primary'
                    : 'border-l-4 border-transparent hover:bg-card/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{persona.icon}</span>
                  <div className="flex-1">
                    <h3 
                      className={`text-base font-semibold mb-1 transition-colors ${
                        activePersona === index ? 'text-foreground' : 'text-muted-foreground/60'
                      }`}
                    >
                      {persona.title}
                    </h3>
                    <p 
                      className={`text-sm leading-relaxed transition-colors ${
                        activePersona === index ? 'text-muted-foreground' : 'text-muted-foreground/50'
                      }`}
                    >
                      {persona.shortDesc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Dashboard Card */}
          <div className="lg:col-span-8 order-first lg:order-last">
            <div 
              className="rounded-[28px] p-1 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }}
            >
              <div 
                className="rounded-[24px] p-6 md:p-8 min-h-[400px]"
                style={{ background: 'hsl(var(--eggshell))' }}
              >
                {/* Top label row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-base font-semibold" style={{ color: '#1a1a1a' }}>{active.viewTitle}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/60" style={{ color: '#4a4a4a' }}>Realflow Deal Engine</span>
                </div>

                {/* Search Query */}
                <div className="p-4 rounded-xl bg-white shadow-sm mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>Search Query</span>
                  </div>
                  <p className="text-sm" style={{ color: '#4a4a4a' }}>
                    {active.queryExample}
                  </p>
                </div>

                {/* Mini 3-column pipeline */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/60 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>Prospected</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100" style={{ color: '#1a1a1a' }}>127</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                        <div className="font-semibold text-xs mb-0.5" style={{ color: '#1a1a1a' }}>{active.leads[0].name}</div>
                        <div className="text-[10px] mb-1" style={{ color: '#6a6a6a' }}>{active.leads[0].address}</div>
                        <div className="text-[9px]" style={{ color: '#4a4a4a' }}>{active.leads[0].status}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/60 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>Qualified</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100" style={{ color: '#1a1a1a' }}>18</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                        <div className="font-semibold text-xs mb-0.5" style={{ color: '#1a1a1a' }}>{active.leads[1].name}</div>
                        <div className="text-[10px] mb-1" style={{ color: '#6a6a6a' }}>{active.leads[1].address}</div>
                        <div className="text-[9px]" style={{ color: '#4a4a4a' }}>{active.leads[1].status}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/60 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>Booked</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100" style={{ color: '#1a1a1a' }}>5</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border border-green-200">
                        <div className="text-[9px]" style={{ color: '#4a4a4a' }}>📅 Meeting scheduled</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile persona list - below card */}
          <div className="lg:hidden space-y-1 order-last col-span-1">
            {personas.map((persona, index) => (
              <button
                key={index}
                onClick={() => setActivePersona(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  activePersona === index
                    ? 'bg-card/50 border-l-4 border-primary'
                    : 'border-l-4 border-transparent bg-card/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{persona.icon}</span>
                  <div className="flex-1">
                    <h3 
                      className={`text-base font-semibold mb-1 transition-colors ${
                        activePersona === index ? 'text-foreground' : 'text-muted-foreground/60'
                      }`}
                    >
                      {persona.title}
                    </h3>
                    <p 
                      className={`text-sm leading-relaxed transition-colors ${
                        activePersona === index ? 'text-muted-foreground' : 'text-muted-foreground/50'
                      }`}
                    >
                      {persona.shortDesc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
