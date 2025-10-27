import React from 'react';

const WhyItPaysOff = () => {
  const stats = [
    {
      topLine: "10K",
      label: "Owners Reached",
      description: "Expect hundreds of qualified meetings from every 10k targeted owners (conservative 4–8% of engaged targets)."
    },
    {
      topLine: "20–30",
      label: "Hrs Saved",
      description: "Teams reclaim valuable time from manual list-building and outreach efforts."
    },
    {
      topLine: "25–75×",
      label: "Return",
      description: "Single-digit closes routinely produce significant returns on costs."
    },
    {
      topLine: "1",
      label: "Stack, 8 Tools Replaced",
      description: "Replace an 8-tool routine with one integrated outbound engine."
    }
  ];

  return (
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-8">
          <h2 
            id="whyPaysOffHeading" 
            className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Why it pays off
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[300px] transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-semibold leading-none text-foreground mb-4">
                {stat.topLine}
              </div>
              <h3 className="text-xl md:text-2xl text-foreground mb-4">
                {stat.label}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground">
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
