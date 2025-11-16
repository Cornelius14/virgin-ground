
import React from 'react';

const Testimonials = () => {
  const caseStudies = [
    {
      category: "STR Property Management",
      metric: "0 → 70 properties in 2 months",
      quote: "Identified luxury homeowners in legal STR markets and scaled from zero to seventy units.",
      company: "The Solaire Collection",
      role: "Max Zheng",
      icon: "🏡"
    },
    {
      category: "Residential Brokerage",
      metric: "6,500 owners → 27 listing calls",
      quote: "Shifted to proactive owner sourcing, qualified 320, booked 27 calls, and won three exclusives.",
      company: "Makras Real Estate",
      role: "Victor G. Makras",
      icon: "🏘️"
    },
    {
      category: "Industrial Acquisition",
      metric: "612 warehouses → 6 at target price",
      quote: "Found Nashville warehouses, contacted 487, connected with 121, and secured six at target price.",
      company: "Southeast Industrial",
      role: "Industrial Acquisition Team",
      icon: "🏭"
    },
    {
      category: "Multifamily",
      metric: "1,940 units → 9 under diligence in 14 days",
      quote: "Reviewed small multifamily units, qualified seventy-six sellers, moved nine deals into diligence.",
      company: "Hudson Walk-Ups Group",
      role: "Acquisition Manager",
      icon: "🏢"
    },
    {
      category: "Lending",
      metric: "612 lender calls in 10 days; quotes in 36 hours",
      quote: "Targeted owners with near-term maturities and achieved average quote turnaround of thirty-six hours.",
      company: "Lending Specialty",
      role: "Bar Shechter",
      icon: "🏦"
    },
    {
      category: "Commercial Lending",
      metric: "Qualified borrowers across major metros",
      quote: "Surfaced qualified borrowers, connecting us earlier with decision-makers and accelerating deal flow.",
      company: "Meridian Capital Group",
      role: "Commercial Lending Team",
      icon: "🏢"
    }
  ];
  
  return (
    <section id="cases" className="relative w-full py-24 md:py-36 px-6 md:px-12 overflow-hidden section-light">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-5 max-w-3xl mx-auto mb-20 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-tight" style={{ color: '#0a0a0a' }}>
            Field-proven results across use cases
          </h2>
        </div>
        
        {/* 2x3 grid on desktop, 2 per row on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {caseStudies.map((study, index) => (
            <div 
              key={index}
              className="rounded-[24px] p-8 md:p-9 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col bg-white/90 border border-black/[0.04]"
            >
              {/* Category pill */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{study.icon}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-black/5 font-medium tracking-tight" style={{ color: '#4a4a4a' }}>
                  {study.category}
                </span>
              </div>
              
              {/* Primary metric */}
              <div className="mb-4">
                <p className="text-base md:text-lg font-semibold leading-tight tracking-tight" style={{ color: '#1a1a1a' }}>
                  {study.metric}
                </p>
              </div>
              
              {/* Quote */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#555' }}>
                "{study.quote}"
              </p>
              
              {/* Footer: company + role */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                <div>
                  <h4 className="font-semibold text-sm tracking-tight" style={{ color: '#1a1a1a' }}>{study.company}</h4>
                  <p className="text-xs" style={{ color: '#6a6a6a' }}>{study.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
