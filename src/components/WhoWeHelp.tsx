import React, { useState } from 'react';

const WhoWeHelp = () => {
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      id: 0,
      name: "Wholesalers & Investors",
      icon: "🏠",
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

          <div className="premium-card p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-foreground">{active.viewTitle}</span>
              <span className="text-sm px-4 py-1.5 rounded-full bg-muted/50 text-muted-foreground">Realflow Deal Engine</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 mb-6 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-xs font-semibold text-foreground">Search Query</span>
              </div>
              <p className="text-sm text-muted-foreground">{active.queryExample}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Prospected', 'Qualified', 'Booked'].map((stage, idx) => (
                <div key={stage} className="p-4 rounded-xl bg-muted/20 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-foreground">{stage}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-foreground">
                      {idx === 0 ? '127' : idx === 1 ? '18' : '5'}
                    </span>
                  </div>
                  {active.leads.slice(0, 1).map((lead, i) => (
                    <div key={i} className="p-3 rounded-lg bg-card shadow-sm border border-border">
                      <div className="font-semibold text-sm text-foreground">{lead.name}</div>
                      <div className="text-xs text-caption">{lead.location}</div>
                      <div className="text-xs text-muted-foreground mt-1">{lead.status}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
