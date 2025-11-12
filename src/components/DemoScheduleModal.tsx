import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DemoScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dealFinderPrompt: string;
}

const DemoScheduleModal = ({ open, onOpenChange, dealFinderPrompt }: DemoScheduleModalProps) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    firm: '',
    role: '',
    markets: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request:', { ...formData, criteria: dealFinderPrompt });
    // Handle demo request submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule a Demo</DialogTitle>
          <DialogDescription className="text-base">
            We'll use this exact criteria to generate a live pipeline for you.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="criteria">Your Deal Criteria</Label>
            <Textarea
              id="criteria"
              value={dealFinderPrompt}
              readOnly
              className="min-h-[80px] bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
              className="min-h-[44px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="min-h-[44px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firm">Firm / Company *</Label>
            <Input
              id="firm"
              required
              value={formData.firm}
              onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
              placeholder="ABC Investments"
              className="min-h-[44px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Input
              id="role"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Investor, Broker, Lender, etc."
              className="min-h-[44px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="markets">Market(s) of Interest</Label>
            <Input
              id="markets"
              value={formData.markets}
              onChange={(e) => setFormData({ ...formData, markets: e.target.value })}
              placeholder="Charlotte, Dallas, Phoenix"
              className="min-h-[44px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full min-h-[44px] text-base"
          >
            Schedule My Demo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoScheduleModal;
