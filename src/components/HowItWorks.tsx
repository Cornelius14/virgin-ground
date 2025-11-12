import React from 'react';
const HowItWorks = () => {
  return <section id="how" className="w-full py-20 lg:py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground">
            How it Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <p className="text-base text-foreground leading-relaxed">
              Load your buy-box — type market, asset, and constraints once; Realflow maps every matching owner and property.
            </p>
          </div>

          <div className="text-center p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <p className="text-base text-foreground leading-relaxed">
              AI enriches and routes — scores urgency, enriches records, and orchestrates outreach across voice, SMS, email, and inbound channels.
            </p>
          </div>

          <div className="text-center p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <p className="text-base text-foreground leading-relaxed">
              Deals land in your CRM — qualified conversations sync with meetings, notes, and timelines attached to each opportunity.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default HowItWorks;