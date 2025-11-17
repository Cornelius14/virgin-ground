
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      title: "🏡 The Solaire Collection",
      heading: "Same-day qualified calls booked",
      quote: "Identified luxury homeowners in legal STR markets, confirmed interest and pricing, and helped scale from zero to seventy units in two months.",
      company: "The Solaire Collection",
      contact: "Max Zheng",
      avatar: "bg-muted"
    },
    {
      title: "🏘️ Makras Real Estate",
      heading: "Off-Market Owner Pipeline Transformed",
      quote: "Realflow shifted us to proactive owner sourcing, reaching 6,500 owners, qualifying 320, booking 27 listing calls, and winning three exclusives.",
      company: "Makras Real Estate",
      contact: "Victor G. Makras",
      avatar: "bg-muted"
    },
    {
      title: "🏭 Southeast Industrial",
      heading: "Nashville warehouse acquisition",
      quote: "Found 612 Nashville warehouses, contacted 487, connected with 121, and secured six at target price, with first live call in under an hour.",
      company: "Southeast Industrial",
      contact: "Industrial Acquisition Team",
      avatar: "bg-muted"
    },
    {
      title: "🏢 Hudson Walk-Ups Group", 
      heading: "Multifamily pipeline acceleration",
      quote: "Reviewed 1,940 small multifamily units, qualified seventy-six sellers, and moved nine deals into diligence in just fourteen days.",
      company: "Hudson Walk-Ups Group",
      contact: "Acquisition Manager", 
      avatar: "bg-muted"
    },
    {
      title: "🏦 Lending Specialty Team",
      heading: "Lending pipeline at scale",
      quote: "Targeted owners with near-term maturities, booked 612 lender calls in ten days, and achieved average quote turnaround of roughly thirty-six hours.",
      company: "Lending Specialty",
      contact: "Bar Shechter",
      avatar: "bg-muted"
    },
    {
      title: "🏢 Meridian Capital Group",
      heading: "Commercial lending acceleration",
      quote: "Realflow surfaced qualified borrowers across major metros, connecting us earlier with decision-makers and accelerating commercial lending deal flow.",
      company: "Meridian Capital Group",
      contact: "Commercial Lending Team",
      avatar: "bg-muted"
    }
  ];
  
  return (
    <section id="cases" className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Real Results
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-7 rounded-[22px] border border-border bg-background/80 backdrop-blur-sm hover:border-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col text-center"
              style={{
                background: 'linear-gradient(to bottom, hsl(var(--background) / 0.9), hsl(var(--background) / 0.85))'
              }}
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-foreground">{testimonial.title}</h3>
              </div>
              
              <div className="mb-4">
                <p className="text-base font-semibold text-primary">{testimonial.heading}</p>
              </div>
              
              <p className="text-foreground/90 mb-6 text-sm leading-relaxed">"{testimonial.quote}"</p>
              
              <div className="flex items-center gap-3 mt-auto justify-center">
                <div className={`h-10 w-10 rounded-full ${testimonial.avatar} bg-muted flex-shrink-0`}></div>
                <div className="text-left">
                  <h4 className="font-medium text-foreground text-sm">{testimonial.company}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.contact}</p>
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
