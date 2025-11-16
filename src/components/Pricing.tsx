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
  return <section id="pricing" className="relative w-full overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Teams & Enterprise pricing
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Built to scale from small teams to full organizations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            if (plan.popular) {
              return <div key={index} className="relative premium-card p-10 border-2 border-primary/20 hover:scale-[1.01] transition-all duration-200">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/90 text-primary-foreground shadow-md">
                    Most popular
                  </span>
                </div>
              
              <div className="mb-auto">
                <h3 className="text-2xl font-bold tracking-tight mb-1 text-foreground">{plan.name}</h3>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold tracking-tight text-foreground">{plan.price}</div>
                </div>
                
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => <div key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>)}
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full" onClick={() => setModalOpen(true)}>
                  {plan.buttonText}
                </Button>
              </div>
            </div>;
            } else {
              return <div key={index} className="premium-card p-10 hover:scale-[1.01] transition-all duration-200">
        </div>
        
        
      </div>
      
      <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>;
};
export default Pricing;