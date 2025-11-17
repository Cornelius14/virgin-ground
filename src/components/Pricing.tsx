import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import DemoLeadModal from './DemoLeadModal';
const Pricing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const plans = [{
    name: "Teams",
    price: "Custom",
    description: "For real estate deal finder teams ready to scale their operations",
    features: ["10 queries per month", "Omnichannel outreach automation", "Advanced qualification logic", "Due diligence red flag detection", "Live handoff to calendar", "CRM integrations", "Analytics dashboard"],
    buttonText: "Get a 30-minute demo",
    buttonVariant: "default",
    popular: false
  }, {
    name: "Enterprise",
    price: "Custom",
    description: "For large real estate organizations with complex deal finder needs",
    features: ["Everything in Teams", "Custom workflow automation", "Advanced compliance tools", "Dedicated infrastructure", "White-label solutions", "Dedicated account manager", "24/7 premium support"],
    buttonText: "Get a 30-minute demo",
    buttonVariant: "outline",
    popular: true
  }];
  return (
    <section id="pricing" className="w-full py-16 md:py-20 px-6 md:px-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Teams & Enterprise pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Custom pricing discussed on a call to scope your volumes, domains, and compliance needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-2xl border flex flex-col h-full transition-all duration-300 relative ${
                plan.popular 
                  ? "border-primary bg-card shadow-xl" 
                  : "border-border bg-card shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm rounded-full font-medium font-inter">
                  Most Popular
                </div>
              )}
              
              <div className="mb-auto">
                <h3 className="text-2xl font-semibold tracking-tight mb-2 text-foreground font-inter">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold tracking-tight text-foreground font-inter">
                    {plan.price}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8">
                  {plan.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M5 12L10 17L19 8" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  className={
                    plan.buttonVariant === "default" 
                      ? "w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "w-full border-primary text-primary hover:bg-primary/10"
                  }
                  variant={plan.buttonVariant as "default" | "outline"}
                  onClick={() => setModalOpen(true)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
export default Pricing;