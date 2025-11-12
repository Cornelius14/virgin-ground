
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      title: "Same-day qualified calls booked",
      company: "The Solaire Collection",
      quote: "Identified luxury homeowners in legal STR markets, confirmed interest and pricing, and helped scale from zero to seventy units in two months."
    },
    {
      title: "Off-Market Owner Pipeline Transformed",
      company: "Makras Real Estate",
      quote: "Realflow shifted us to proactive owner sourcing, reaching 6,500 owners, qualifying 320, booking 27 listing calls, and winning three exclusives."
    },
    {
      title: "Nashville Warehouse Acquisition",
      company: "Southeast Industrial",
      quote: "Found 612 warehouses in Nashville, contacted 487, connected with 121, and secured six at target price, with first live call in under an hour."
    },
    {
      title: "Multifamily Pipeline Acceleration",
      company: "Hudson Walk-Ups Group",
      quote: "Reviewed 1,940 small multifamily units, qualified seventy-six sellers, and moved nine deals into diligence in just fourteen days."
    },
    {
      title: "Statewide Lender Outreach",
      company: "Lending Specialty Team",
      quote: "Targeted owners with near-term maturities statewide, booked 612 lender calls in ten days, and delivered average quote turnaround near thirty-six hours."
    },
    {
      title: "Qualified Borrower Flow",
      company: "Meridian Capital Group",
      quote: "Realflow surfaced qualified borrowers across major metros, accelerating deal flow and improving conversion by connecting with decision-makers earlier."
    }
  ];
  
  return (
    <section id="cases" className="w-full py-12 md:py-20 lg:py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground">
            Real Results
          </h2>
          <p className="text-base md:text-lg text-muted-foreground" style={{ lineHeight: '1.5' }}>
            Teams across wholesaling, CRE, and lending use Realflow to turn cold lists into qualified deal flow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground text-base md:text-lg mb-1">{testimonial.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">{testimonial.company}</p>
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed" style={{ lineHeight: '1.5' }}>
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
