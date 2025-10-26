import React from 'react';

const WhoWeHelp = () => {
  const categories = [
    {
      emoji: "🏢",
      title: "Brokers & Investment Sales",
      description: "Dispositions, off-market sourcing, and owner outreach."
    },
    {
      emoji: "🏦",
      title: "Lenders & Originators",
      description: "Refinance, acquisition, and construction loan sourcing."
    },
    {
      emoji: "🏗️",
      title: "Developers & Construction",
      description: "Owners with new permits and large-scale projects."
    },
    {
      emoji: "🏘️",
      title: "Investors & Owner-Operators",
      description: "Mandate-matched sourcing by market, asset, and yield."
    },
    {
      emoji: "📑",
      title: "Title, Insurance & Closing",
      description: "Active deeds, refis, and in-progress transactions."
    }
  ];

  return (
    <section id="who-we-help" aria-labelledby="whoWeHelpHeading" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 
            id="whoWeHelpHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Who We Help
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Realflow powers outbound for every corner of commercial real estate — connecting brokers, lenders, investors, developers, and service providers with the right decision-makers faster than any team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6 flex flex-col items-center text-center min-h-[200px] transition-all duration-300"
            >
              <div className="text-4xl mb-4">
                {category.emoji}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground">
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
