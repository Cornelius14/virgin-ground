import React from 'react';

const WhoWeHelp = () => {
  const categories = [
    {
      title: "Brokers & Investment Sales",
      description: "Dispositions, off-market sourcing, and owner outreach."
    },
    {
      title: "Lenders & Originators",
      description: "Refinance, acquisition, and construction loan sourcing."
    },
    {
      title: "Developers & Construction",
      description: "Owners with new permits and large-scale projects."
    },
    {
      title: "Investors & Owner-Operators",
      description: "Mandate-matched sourcing by market, asset, and yield."
    },
    {
      title: "Title, Insurance & Closing",
      description: "Active deeds, refis, and in-progress transactions."
    }
  ];

  return (
    <section id="who-we-help" aria-labelledby="whoWeHelpHeading" className="py-20 md:py-24 px-6 md:px-12 bg-[#F8F5EE] border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            id="whoWeHelpHeading" 
            className="text-4xl md:text-5xl font-medium tracking-tight text-foreground"
          >
            Who We Help
          </h2>
        </div>
        
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {category.title}
              </h3>
              <p className="text-base text-[#4A4A4A] leading-relaxed">
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
