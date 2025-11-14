import { useState } from "react";
import { Building2, X } from "lucide-react";
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
        className="fixed z-50 bg-eggshell text-primary-foreground rounded-[28px] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98] md:bottom-8 md:right-8 bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto px-5 py-3 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Building2 className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold text-sm leading-tight">Talk to Realflow</span>
          <span className="text-xs text-primary-foreground/70 hidden md:block leading-tight">Speak with a live AI rep in seconds</span>
        </div>
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[560px] bg-eggshell border border-border/10 rounded-[32px] p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary-foreground">
              Talk to Realflow
            </DialogTitle>
            <p className="text-primary-foreground/70 mt-2 text-sm leading-relaxed">
              Connect to a Realflow voice agent in seconds.
              <br />
              Choose your use case and we'll call you back or start a live call.
            </p>
          </DialogHeader>

          {showSuccess ? (
            <div className="py-8 text-center">
              <p className="text-lg text-primary-foreground">
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
                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=off]:bg-muted/30 data-[state=off]:text-muted-foreground rounded-2xl px-4 py-3 font-medium transition-all flex flex-col items-center gap-1"
                  >
                    <span className="text-sm font-semibold">Wholesaler / Investor</span>
                    <span className="text-xs opacity-80 hidden sm:block">Find motivated sellers</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="mortgage"
                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=off]:bg-muted/30 data-[state=off]:text-muted-foreground rounded-2xl px-4 py-3 font-medium transition-all flex flex-col items-center gap-1"
                  >
                    <span className="text-sm font-semibold">Mortgage & Lending</span>
                    <span className="text-xs opacity-80 hidden sm:block">Qualify borrowers</span>
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-sm text-primary-foreground/70 text-center sm:hidden">
                  {agentDescriptions[agentType]}
                </p>
              </div>

              {/* Hidden field for agent type */}
              <input type="hidden" name="agentType" value={agentType} />

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-primary-foreground font-medium text-xs uppercase tracking-wide mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-muted/20 border-muted/40 focus:border-primary text-primary-foreground rounded-xl h-11"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-primary-foreground font-medium text-xs uppercase tracking-wide mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-muted/20 border-muted/40 focus:border-primary text-primary-foreground rounded-xl h-11"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-primary-foreground font-medium text-xs uppercase tracking-wide mb-2 block">
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-muted/20 border-muted/40 focus:border-primary text-primary-foreground rounded-xl h-11"
                    placeholder="(555) 123-4567"
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
                    className="mt-1 border-primary data-[state=checked]:bg-primary"
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm text-primary-foreground font-medium cursor-pointer leading-tight"
                  >
                    I agree to get a call from Realflow
                  </Label>
                </div>
                <p className="text-xs text-primary-foreground/60 leading-relaxed pl-9">
                  By submitting your phone number, you consent to receive automated calls
                  (including AI-generated calls) and texts from Realflow at the number provided.
                  Message and data rates may apply. You can opt out at any time.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.agreed}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? "Calling…" : "Start call with Realflow"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
