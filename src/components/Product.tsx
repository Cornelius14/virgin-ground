import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Product = () => {
  return (
    <section id="product" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Prospects → Qualified Targets → Meetings Booked</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Move deals through Prospects → Qualified Targets → Meetings Booked with coordinated email, SMS, voicemail, and live calls.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Pipeline Chart */}
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-6 border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Prospects</span>
                  <span className="text-2xl font-bold text-primary">2,847</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Qualified Targets</span>
                  <span className="text-2xl font-bold text-primary">421</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Meetings Booked</span>
                  <span className="text-2xl font-bold text-primary">73</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pipeline Table */}
          <div className="bg-card rounded-lg border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Deal Pipeline</h3>
                <div className="text-xs text-muted-foreground uppercase">Asset Types</div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Multifamily</span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Industrial</span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Land</span>
              </div>
              
              <div className="space-y-6">
                {/* Prospected */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Prospected</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-md">
                      <div className="text-sm font-medium">🏭 Industrial — 92k SF (Atlanta, GA)</div>
                      <div className="text-xs text-muted-foreground mt-1">owner prefers email</div>
                      <div className="flex gap-1 mt-2 text-xs">
                        <span className="text-green-500">email</span> ·
                        <span className="text-red-500">sms</span> ·
                        <span className="text-green-500">call</span> ·
                        <span className="text-red-500">vm</span>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-md">
                      <div className="text-sm font-medium">🏢 Multifamily — 76 units (Charlotte, NC)</div>
                      <div className="text-xs text-muted-foreground mt-1">screened for expansion criteria</div>
                      <div className="flex gap-1 mt-2 text-xs">
                        <span className="text-red-500">email</span> ·
                        <span className="text-green-500">sms</span> ·
                        <span className="text-red-500">call</span> ·
                        <span className="text-green-500">vm</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Qualified Targets */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Qualified Targets</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-md">
                      <div className="text-sm font-medium">🏭 Industrial — 105k SF (Atlanta, GA)</div>
                      <div className="text-xs text-muted-foreground mt-1">loan maturing in 5 mo; responsive owner</div>
                      <div className="text-xs text-muted-foreground">j.martinez@example.com • (404) 555-0123</div>
                      <div className="flex gap-1 mt-2 text-xs">
                        <span className="text-green-500">email</span> ·
                        <span className="text-green-500">sms</span> ·
                        <span className="text-green-500">call</span> ·
                        <span className="text-green-500">vm</span>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-md">
                      <div className="text-sm font-medium">🏬 Retail — 18k SF (Miami Beach, FL)</div>
                      <div className="text-xs text-muted-foreground mt-1">zoning OK; target price band</div>
                      <div className="text-xs text-muted-foreground">s.cohen@example.com • (305) 555-0187</div>
                      <div className="flex gap-1 mt-2 text-xs">
                        <span className="text-green-500">email</span> ·
                        <span className="text-red-500">sms</span> ·
                        <span className="text-green-500">call</span> ·
                        <span className="text-green-500">vm</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Meetings Booked */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Meetings Booked</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-md">
                      <div className="text-sm font-medium">🏭 Industrial — 92k SF (Atlanta, GA)</div>
                      <div className="text-xs text-muted-foreground mt-1">Thu 2:30p ET · Intro + buy-box sync</div>
                      <div className="text-xs text-muted-foreground">j.martinez@example.com • (404) 555-0123</div>
                      <div className="flex gap-1 mt-2 text-xs">
                        <span className="text-green-500">email</span> ·
                        <span className="text-green-500">sms</span> ·
                        <span className="text-green-500">call</span> ·
                        <span className="text-green-500">vm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Product;