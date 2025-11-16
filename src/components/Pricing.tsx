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
  return <section id="pricing" className="w-full py-24 md:py-36 px-6 md:px-12 section-light">
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-tight" style={{ color: '#0a0a0a' }}>
            Teams & Enterprise pricing
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#555' }}>Custom pricing discussed on a call to scope your volumes, domains, and compliance needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => <div key={index} className={`p-10 md:p-11 rounded-[24px] shadow-lg flex flex-col h-full bg-white/90 transition-all duration-300 relative hover:shadow-xl border border-black/[0.04] ${plan.popular ? "ring-2 ring-primary/30" : ""}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                  Most Popular
                </div>}
              
              <div className="mb-auto">
                <h3 className="text-xl font-medium tracking-tight mb-1 text-gray-900">{plan.name}</h3>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold tracking-tight text-gray-900">{plan.price}</div>
                </div>
                
                <p className="text-sm text-gray-700 mb-6">{plan.description}</p>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => <div key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-900">{feature}</span>
                    </div>)}
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setModalOpen(true)}>
                  {plan.buttonText}
                </Button>
              </div>
            </div>)}
        </div>
        
        
      </div>
      
      <DemoLeadModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>;
};
export default Pricing;