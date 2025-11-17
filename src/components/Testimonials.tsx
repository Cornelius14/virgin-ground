
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      title: "The Solaire Collection",
      metric: "Same-day qualified calls booked",
      quote: "Identified luxury homeowners in legal STR markets. Outreach confirmed interest and pricing. Using Realflow, the company scaled from 0 to 70 properties in just 2 months—becoming the fastest-growing STR property manager in the US.",
      author: "The Solaire Collection",
      position: "Max Zheng",
    },
    {
      title: "Makras Real Estate",
      metric: "Off-Market Owner Pipeline Transformed",
      quote: "With Realflow's outbound engine, Makras moved from reactive listings to sourcing hidden owners. In 30 days, we reached 6,500 off-market owner contacts in SF neighborhoods, qualified 320, and booked 27 high-value listing conversations — landing 3 exclusives we would never have uncovered otherwise.",
      author: "Makras Real Estate",
      position: "Victor G. Makras",
    },
    {
      title: "Southeast Industrial",
      metric: "612 warehouses → 6 at target price in ~58 minutes",
      quote: "612 warehouses identified in Nashville; 487 contactable; 121 live connects; 6 at target price. First live call in ~58 minutes.",
      author: "Southeast Industrial",
      position: "Industrial Acquisition Team",
    },
    {
      title: "Hudson Walk-Ups", 
      metric: "1,940 units → 9 under diligence in 14 days",
      quote: "1,940 small multifamily units; 76 qualified sellers; 9 under diligence within 14 days.",
      author: "Hudson Walk-Ups Group",
      position: "Acquisition Manager", 
    },
    {
      title: "Lending Specialty",
      metric: "612 lender calls in 10 days; quotes in 36 hours",
      quote: "Realflow targeted owners with near-term maturities across 12 states. In 10 days we reached 18,400 owners, booked 612 lender conversations, and flagged 'docs-ready' borrowers for same-day quotes. Average quote turnaround: 36 hours. Funded volume from the first cycle covered platform cost 30×.",
      author: "Lending Specialty team",
      position: "Bar Shechter",
    },
    {
      title: "Meridian Capital Group",
      metric: "Commercial debt placement at scale",
      quote: "Meridian leveraged Realflow to identify qualified borrowers across major metros. The platform's precision targeting enabled us to connect with decision-makers at the right time, resulting in faster deal flow and higher conversion rates on our commercial lending pipeline.",
      author: "Meridian Capital Group",
      position: "Commercial Lending Team",
    }
  ];
  
  return (
    <section id="cases" className="w-full py-16 lg:py-24 px-4 sm:px-6 md:px-12 bg-[#F5F1E9] border-t border-border">
      <div className="max-w-7xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            Field-proven results across use cases
          </h2>
          <p className="text-[#4A4A4A] text-lg">
            See how Realflow transforms real estate acquisition workflows
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-[0_16px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground">{testimonial.title}</h3>
              </div>
              
              <div className="mb-4">
                <p className="text-lg font-bold text-primary font-inter">{testimonial.metric}</p>
              </div>
              
              <p className="text-[#4A4A4A] mb-6 text-sm leading-relaxed flex-grow">"{testimonial.quote}"</p>
              
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-muted flex-shrink-0"></div>
                <div className="text-left">
                  <h4 className="font-medium text-foreground text-sm font-inter">{testimonial.author}</h4>
                  <p className="text-xs text-[#757575]">{testimonial.position}</p>
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
