import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Step1 from './DemoLeadSteps/Step1';
import Step2 from './DemoLeadSteps/Step2';
import Step3 from './DemoLeadSteps/Step3';
import Step4 from './DemoLeadSteps/Step4';

interface DemoLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface FormData {
  email: string;
  phone: string;
  firm: string;
  role: string;
  segment: string;
  mandate: string;
  volumeIntent: string;
  timeframe: string;
}

const DemoLeadModal: React.FC<DemoLeadModalProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    firm: '',
    role: '',
    segment: '',
    mandate: '',
    volumeIntent: '',
    timeframe: '',
  });

  useEffect(() => {
    if (!open) {
      setCurrentStep(1);
    }
  }, [open]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl bg-background"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>

            <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
              {/* Left Panel - Dark Marketing Copy */}
              <div className="w-full md:w-2/5 bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-center space-y-8">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">Oblique AI</h2>
                  <p className="text-xl opacity-90">Outbound for Commercial Real Estate</p>
                  <p className="text-lg mt-4 font-medium">Target. Automate. Schedule.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Never Miss Momentum</h3>
                      <p className="text-sm opacity-80">Outreach scales instantly across calls/SMS/email/VM.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">More Quality Meetings</h3>
                      <p className="text-sm opacity-80">Decision-makers matched to your mandate.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Grow Revenue</h3>
                      <p className="text-sm opacity-80">Meetings that move deals forward.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Free Your Team</h3>
                      <p className="text-sm opacity-80">We handle sourcing, outreach, and scheduling.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Form Card */}
              <div className="w-full md:w-3/5 bg-card overflow-y-auto p-8 md:p-12">
                <div className="max-w-xl mx-auto">
                  <h3 id="modal-title" className="text-3xl font-semibold text-foreground mb-2">
                    Schedule a Demo
                  </h3>
                  <p className="text-sm text-muted-foreground mb-8">
                    We currently prioritize CRE teams (brokers, lenders, investors, developers/GCs, title/insurance).
                  </p>

                  {/* Step Indicator */}
                  <div className="flex items-center justify-between mb-8">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                            currentStep >= step
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step}
                        </div>
                        {step < 4 && (
                          <div
                            className={`w-12 h-1 mx-2 transition-colors ${
                              currentStep > step ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step Content */}
                  {currentStep === 1 && (
                    <Step1
                      formData={formData}
                      updateFormData={updateFormData}
                      onNext={handleNext}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2
                      formData={formData}
                      updateFormData={updateFormData}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3
                      formData={formData}
                      updateFormData={updateFormData}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {currentStep === 4 && (
                    <Step4
                      formData={formData}
                      onBack={handleBack}
                      onClose={() => onOpenChange(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default DemoLeadModal;
