import { useState } from "react";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const AICallButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [agentType, setAgentType] = useState<"wholesaler" | "mortgage">("wholesaler");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agreed: false,
  });

  const agentDescriptions = {
    wholesaler: "We'll have our AI wholesaler call homeowners like your best acquisitions rep.",
    mortgage: "We'll have our AI loan officer call borrowers like a top LO.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for backend implementation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      setFormData({ name: "", email: "", phone: "", agreed: false });
    }, 3000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        id="rf-talk-to-ai-button"
        onClick={() => setIsOpen(true)}
        className="fixed z-50 flex items-center gap-2 px-5 h-12 rounded-full shadow-lg transition-all hover:shadow-xl active:scale-95 bg-cosmic-accent text-cosmic-dark hover:bg-cosmic-accent/90 md:bottom-8 md:right-8 bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto"
      >
        <div className="w-6 h-6 rounded-full bg-cosmic-dark/10 flex items-center justify-center">
          <Phone className="w-4 h-4" />
        </div>
        <span className="font-medium hidden md:inline">Talk to an AI agent</span>
        <span className="font-medium md:hidden">Talk to AI</span>
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[560px] bg-cosmic-cream border border-border/20 rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cosmic-dark">
              Talk to an AI agent
            </DialogTitle>
            <p className="text-cosmic-dark/70 mt-2">
              Share your details and we'll trigger a live AI call in seconds.
            </p>
          </DialogHeader>

          {showSuccess ? (
            <div className="py-8 text-center">
              <p className="text-lg text-cosmic-dark">
                Got it — we're connecting you with our AI {agentType === "wholesaler" ? "wholesaler" : "loan officer"} now.
              </p>
            </div>
          ) : (
            <form id="rf-ai-call-form" onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Agent Type Toggle */}
              <div className="space-y-3">
                <ToggleGroup
                  type="single"
                  value={agentType}
                  onValueChange={(value) => value && setAgentType(value as "wholesaler" | "mortgage")}
                  className="grid grid-cols-2 gap-2 w-full"
                >
                  <ToggleGroupItem
                    value="wholesaler"
                    className="data-[state=on]:bg-cosmic-accent data-[state=on]:text-cosmic-dark data-[state=off]:bg-cosmic-dark/5 data-[state=off]:text-cosmic-dark/70 rounded-full px-6 py-3 font-medium transition-colors"
                  >
                    Wholesaler caller
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="mortgage"
                    className="data-[state=on]:bg-cosmic-accent data-[state=on]:text-cosmic-dark data-[state=off]:bg-cosmic-dark/5 data-[state=off]:text-cosmic-dark/70 rounded-full px-6 py-3 font-medium transition-colors"
                  >
                    Mortgage loan officer
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-sm text-cosmic-dark/70 text-center">
                  {agentDescriptions[agentType]}
                </p>
              </div>

              {/* Hidden field for agent type */}
              <input type="hidden" name="agentType" value={agentType} />

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-cosmic-dark font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 bg-cosmic-cream border-cosmic-dark/20 focus:border-cosmic-accent text-cosmic-dark"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-cosmic-dark font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 bg-cosmic-cream border-cosmic-dark/20 focus:border-cosmic-accent text-cosmic-dark"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-cosmic-dark font-medium">
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 bg-cosmic-cream border-cosmic-dark/20 focus:border-cosmic-accent text-cosmic-dark"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    required
                    checked={formData.agreed}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreed: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm text-cosmic-dark font-medium cursor-pointer"
                  >
                    I agree to get a call from Realflow's AI agent.
                  </Label>
                </div>
                <p className="text-xs text-cosmic-dark/60 leading-relaxed pl-8">
                  By submitting your phone number, you consent to receive automated calls
                  (including AI-generated calls) and texts from Realflow at the number provided.
                  Message and data rates may apply. You can opt out at any time.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.agreed}
                className="w-full bg-cosmic-accent text-cosmic-dark hover:bg-cosmic-accent/90 font-semibold py-6 rounded-lg transition-colors"
              >
                {isSubmitting ? "Calling…" : "Call me now"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
