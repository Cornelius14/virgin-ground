import React from 'react';

const WhyItPaysOff = () => {
  const stats = [
    {
      topLine: "10K",
      label: "Targeted Owners",
      description: "Expect hundreds of qualified meetings from every 10k targeted owners."
    },
    {
      topLine: "20–30",
      label: "Hours Saved Weekly",
      description: "Teams reclaim valuable time from manual list-building and outreach efforts."
    },
    {
      topLine: "25–75×",
      label: "Return on Investment",
      description: "Single-digit closes routinely produce significant returns on costs."
    },
    {
      topLine: "1 Tool",
      label: "Lower Stack Cost",
      description: "Replace an 8-tool routine with one integrated outbound engine."
    }
  ];

  return (
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="py-20 md:py-24 px-6 md:px-12 bg-[#F8F5EE] border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 
            id="whyPaysOffHeading" 
            className="text-4xl md:text-5xl font-medium tracking-tight text-foreground"
          >
            Why it pays off
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border bg-card shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-[280px] transition-all duration-300 hover:shadow-md"
            >
              <div className="text-5xl md:text-6xl font-semibold leading-none text-foreground mb-4 font-inter">
                {stat.topLine}
              </div>
              <h3 className="text-xl md:text-2xl text-foreground mb-4 font-inter">
                {stat.label}
              </h3>
              <p className="text-base md:text-lg text-[#4A4A4A]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItPaysOff;
