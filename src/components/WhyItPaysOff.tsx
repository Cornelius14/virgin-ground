import React from 'react';

const WhyItPaysOff = () => {
  const stats = [
    {
      topLine: "10K",
      label: "Targeted Owners",
      description: "Expect hundreds of qualified meetings from every 10k targeted owners (conservative 4–8% of engaged targets)."
    },
    {
      topLine: "20–30",
      label: "Hours Saved Weekly",
      description: "Teams reclaim valuable time from manual list-building and outreach efforts."
    },
    {
      topLine: "25–75×",
      label: "ROI",
      description: "Single-digit closes routinely produce significant returns on costs."
    },
    {
      topLine: "⬇️",
      label: "Lower Stack Cost",
      description: "Replace an 8-tool routine with one integrated outbound engine."
    }
  ];

  return (
    <section id="why-it-pays-off" aria-labelledby="whyPaysOffHeading" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 
          id="whyPaysOffHeading" 
          className="text-3xl md:text-5xl tracking-tight font-semibold text-white text-center mb-12 md:mb-16"
        >
          Why it pays off
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-5xl md:text-6xl font-semibold text-white mb-4">
                {stat.topLine}
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                {stat.label}
              </h3>
              <p className="text-base md:text-lg text-zinc-300">
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
