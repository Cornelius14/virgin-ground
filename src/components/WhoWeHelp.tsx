import React from 'react';

const WhoWeHelp = () => {
  const categories = [
    {
      emoji: "🏘️",
      title: "Wholesalers & single-family investors",
      description: "Off-market lists, tax-delinquent owners, tired landlords, and inherited properties—AI works every number, you focus on locking contracts."
    },
    {
      emoji: "🏢",
      title: "CRE brokers & investors",
      description: "Multitenant, value-add, and off-market assets—AI sources, pre-screens principals, and books meetings with serious buyers and sellers."
    },
    {
      emoji: "🏦",
      title: "Lenders, mortgage & capital markets teams",
      description: "24/7 lead response and re-engagement so no borrower waits; AI qualifies, routes, and hands warm conversations to your loan officers."
    }
  ];

  return (
    <section id="who-we-help" aria-labelledby="whoWeHelpHeading" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 
            id="whoWeHelpHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Who We Help
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6 md:p-8 flex flex-col items-center text-center h-full transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl mb-4">
                {category.emoji}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                {category.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed" style={{ lineHeight: '1.5' }}>
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
