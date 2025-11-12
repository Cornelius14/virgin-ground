import React from 'react';

const WhoWeHelp = () => {
  const categories = [
    {
      emoji: "🏘️",
      title: "Wholesalers & Single-Family Investors"
    },
    {
      emoji: "🏢",
      title: "CRE Brokers & Investors"
    },
    {
      emoji: "🏦",
      title: "Lenders & Capital Markets Teams"
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
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
