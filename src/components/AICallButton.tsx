import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import realflowLogo from "@/assets/realflow-logo.png";

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
    wholesaler: "Find motivated sellers & off-market deals.",
    mortgage: "Qualify borrowers & near-term maturities.",
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
        className="fixed z-50 bg-card text-foreground rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-1 active:scale-[0.98] md:bottom-8 md:right-8 bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto px-5 py-3 flex items-center gap-3 border border-border"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 p-1.5 shadow-sm">
          <img src={realflowLogo} alt="Realflow" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold text-sm leading-tight text-foreground">Talk to Realflow</span>
          <span className="text-xs text-muted-foreground hidden md:block leading-tight">Speak with a live AI rep in seconds</span>
        </div>
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[560px] bg-card border border-border rounded-2xl p-8 max-h-[90vh] overflow-y-auto shadow-[0_24px_48px_rgba(15,23,42,0.12)]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Talk to Realflow
            </DialogTitle>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Connect to a Realflow voice agent in seconds.
              <br />
              Choose your use case and we'll call you back or start a live call.
            </p>
          </DialogHeader>

          {showSuccess ? (
            <div className="py-8 text-center">
              <p className="text-lg text-foreground">
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
                  className="grid grid-cols-2 gap-3 w-full"
                >
                  <ToggleGroupItem
                    value="wholesaler"
                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border border-border rounded-xl py-4 px-4 text-sm font-medium hover:bg-muted/50 transition-colors"
                  >
                    Wholesaler / Seller Leads
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="mortgage"
                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border border-border rounded-xl py-4 px-4 text-sm font-medium hover:bg-muted/50 transition-colors"
                  >
                    Mortgage LO
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {agentDescriptions[agentType]}
                </p>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="agree"
                  checked={formData.agreed}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreed: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <Label htmlFor="agree" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to receive a call or text from Realflow. By submitting this form, you consent to being contacted by
                  Realflow's AI voice agent for the purpose of scheduling a demo or discussing your use case. Standard message
                  and data rates may apply. You can opt out at any time.
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || !formData.agreed}
              >
                {isSubmitting ? "Connecting..." : "Connect Now"}
              </Button>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Your information is secure and will only be used to facilitate the AI-powered call experience. We respect your
                privacy and comply with all applicable regulations.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
