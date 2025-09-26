import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Modern Design",
    description: "Beautiful, responsive interfaces built with the latest design trends and best practices.",
    icon: "🎨"
  },
  {
    title: "Fast Performance", 
    description: "Optimized for speed with modern bundling and cutting-edge web technologies.",
    icon: "⚡"
  },
  {
    title: "Developer Experience",
    description: "Built with TypeScript, modern tooling, and excellent developer experience in mind.",
    icon: "🚀"
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Experience the perfect blend of aesthetics, performance, and developer productivity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-8 text-center card-gradient shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-up border-border/50"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};