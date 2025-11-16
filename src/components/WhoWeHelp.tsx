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
        { name: "Maria Lopez", location: "Tampa, FL", status: "Divorce, needs fast close" },
        { name: "Tom Bradley", location: "Clearwater, FL", status: "Estate sale, pricing flexible" },
      ]
    },
    {
      icon: "🏢",
      title: "CRE Owners & Brokers",
      shortDesc: "Surface off-market owners that match your mandate.",
      viewTitle: "CRE View",
      queryExample: "Find office buildings 50k–100k SF, Tampa, built 1990–2010, cap ≥7%",
      leads: [
        { name: "Gateway Properties", location: "Tampa, FL", status: "Exploring sale, wants LOI" },
        { name: "Horizon LLC", location: "Tampa, FL", status: "Open to offers above $8M" },
      ]
    },
    {
      icon: "🏦",
      title: "Lenders & Capital Providers",
      shortDesc: "Identify borrowers with real near-term financing needs.",
      viewTitle: "Lender View",
      queryExample: "Find multifamily owners with loans maturing in next 180 days — Southeast markets",
      leads: [
        { name: "Coastal Apartments", location: "Miami, FL", status: "Loan matures in 90 days" },
        { name: "Summit Holdings", location: "Orlando, FL", status: "Seeking refi at 5.5% rate" },
      ]
    },
    {
      icon: "🏦",
      title: "Mortgage Lenders",
      shortDesc: "Convert inbound borrowers and reach owners with near-term maturities.",
      viewTitle: "Mortgage Lender View",
      queryExample: "Find homeowners with mortgages maturing in 60–90 days — Charlotte metro",
      leads: [
        { name: "Johnson Family", location: "Charlotte, NC", status: "Refi needed, rate 6.2%" },
        { name: "Patterson Trust", location: "Charlotte, NC", status: "Loan matures in 75 days" },
      ]
    }
  ];

  const active = personas[activePersona];

  return (
    <section id="who-we-help" className="relative py-24 md:py-36 overflow-hidden px-4 md:px-6 lg:px-12 section-dark">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-tight text-foreground">
            Who We Help
          </h2>
        </div>
        
        {/* Mobile: persona list first, then card */}
        {/* Desktop: persona rail left, hero card right */}
        <div className="flex flex-col lg:grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 max-w-[1200px] mx-auto">
          
          {/* Mobile: Persona List First (order-1), Desktop: Left Rail (order-1) */}
          <div className="block space-y-1 order-1">
            {personas.map((persona, index) => (
              <button
                key={index}
                onClick={() => setActivePersona(index)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  activePersona === index
                    ? 'bg-card/30 border-l-2 border-primary backdrop-blur-sm'
                    : 'border-l-2 border-transparent hover:bg-card/15'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{persona.icon}</span>
                  <div className="flex-1">
                    <h3 
                      className={`text-base font-medium mb-2 transition-colors tracking-tight ${
                        activePersona === index ? 'text-foreground' : 'text-muted-foreground/50'
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

          {/* Dashboard Card - order-2 on both mobile and desktop */}
          <div className="order-2 w-full">
            <div 
              className="rounded-[28px] p-1 shadow-2xl w-full"
              style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }}
            >
              <div 
                className="rounded-[24px] p-6 md:p-8 lg:p-10 min-h-[400px] md:min-h-[500px] w-full bg-eggshell"
              >
                {/* Top label row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                  <span className="text-base md:text-lg lg:text-xl font-semibold text-gray-900">
                    {active.viewTitle}
                  </span>
                  <span className="text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full bg-white/70 text-gray-700">
                    Realflow Deal Engine
                  </span>
                </div>

                {/* Search Query */}
                <div className="p-3 md:p-4 rounded-xl bg-white shadow-sm mb-4 md:mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-xs font-semibold text-gray-900">Search Query</span>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed text-gray-700">
                    {active.queryExample}
                  </p>
                </div>

                {/* Mini Pipeline - vertical stack on mobile, grid on sm and up */}
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3">
                  {['Prospected', 'Qualified', 'Booked'].map((stage, idx) => (
                    <div key={stage} className="p-3 md:p-4 rounded-xl bg-white/70 shadow-sm w-full">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs md:text-sm font-semibold text-gray-900">{stage}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-gray-900">
                          {idx === 0 ? '127' : idx === 1 ? '18' : '5'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {active.leads.slice(0, 1).map((lead, i) => (
                          <div key={i} className="p-2 md:p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                            <div className="font-semibold text-xs md:text-sm mb-0.5 text-gray-900">{lead.name}</div>
                            <div className="text-[10px] md:text-xs text-gray-600">{lead.location}</div>
                            <div className="text-[10px] md:text-xs leading-relaxed mt-1 text-gray-700">{lead.status}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
