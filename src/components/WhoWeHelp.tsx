import React, { useState } from 'react';

const WhoWeHelp = () => {
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      id: 0,
      name: "Wholesalers & Investors",
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
      id: 1,
      name: "CRE Owners & Brokers",
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
      id: 2,
      name: "Lenders & Capital Providers",
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
      id: 3,
      name: "Mortgage Lenders",
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
    <section id="who" className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background-subtle"></div>
      
      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Who We Help
          </h2>
        </div>
        
        <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          
          {/* Left side - persona selector */}
          <div className="flex flex-col gap-1">
            {personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona.id)}
                className={`p-5 rounded-xl text-left transition-all duration-200 ${
                  activePersona === persona.id
                    ? 'bg-card shadow-sm border-l-4 border-primary'
                    : 'bg-transparent border-l-4 border-transparent hover:bg-card/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{persona.icon}</span>
                  <span className={`font-semibold text-sm ${
                    activePersona === persona.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {persona.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
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
              className="rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.08)] w-full bg-card border border-border overflow-hidden"
            >
              <div 
                className="p-6 md:p-8 lg:p-10 min-h-[400px] md:min-h-[500px] w-full"
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
