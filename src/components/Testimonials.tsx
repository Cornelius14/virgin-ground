
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "We went from stalled lists to constant seller conversations. The AI works leads all day while we focus on contracts.",
      author: "Marcus Chen",
      position: "Wholesaler, Charlotte NC",
      avatar: "bg-muted"
    },
    {
      quote: "Realflow surfaces owners we'd never reach manually and books calls directly on our calendars. It feels like an extra associate.",
      author: "Jennifer Park",
      position: "Senior Broker, Miami CRE",
      avatar: "bg-muted"
    },
    {
      quote: "Our team no longer scrambles to return calls. AI answers instantly, qualifies, and hands us only serious borrowers.",
      author: "David Rodriguez",
      position: "Loan Officer, Regional Bank",
      avatar: "bg-muted"
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <p className="text-sm md:text-base text-foreground leading-relaxed" style={{ lineHeight: '1.5' }}>
                  "{testimonial.quote}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.author}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{testimonial.position}</p>
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
