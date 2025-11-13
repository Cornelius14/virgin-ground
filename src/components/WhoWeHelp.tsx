import React from 'react';

const WhoWeHelp = () => {
  const categories = [
    {
      emoji: "🏠",
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
    <section id="who-we-help" aria-labelledby="whoWeHelpHeading" className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 
            id="whoWeHelpHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Who We Help
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border bg-card backdrop-blur-sm p-8 flex flex-col items-center justify-center h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[200px]"
            >
              <div className="text-5xl mb-6">
                {category.emoji}
              </div>
              <h3 className="text-xl font-semibold text-foreground text-center">
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
