import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FormData } from '../DemoLeadModal';

interface Step4Props {
  formData: FormData;
  onBack: () => void;
  onClose: () => void;
}

const Step4: React.FC<Step4Props> = ({ formData, onBack, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Build payload with metadata
    const payload = {
      ...formData,
      userAgent: navigator.userAgent,
      pageUrl: window.location.href,
      submittedAt: new Date().toISOString(),
    };

    // Optional webhook (non-blocking)
    const webhookUrl = import.meta.env.VITE_INQUIRY_WEBHOOK;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.warn('Webhook failed (non-critical):', error);
      }
    }

    // Guaranteed email fallback
    const to = encodeURIComponent('sales@oblique-ai.com,tomer@oblique-ai.com');
    const subject = encodeURIComponent('Realflow Demo Request');
    const body = encodeURIComponent(
      `Firm: ${formData.firm}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Role: ${formData.role || 'N/A'}\n` +
      `Segment: ${formData.segment}\n\n` +
      `Mandate/Criteria:\n${formData.mandate || 'N/A'}\n\n` +
      `Volume: ${formData.volumeIntent}\n` +
      `Timeframe: ${formData.timeframe}\n\n` +
      `URL: ${window.location.href}\n` +
      `Submitted: ${new Date().toISOString()}\n`
    );

    window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_blank');

    toast.success(
      "We've prepared an email to sales@oblique-ai.com & tomer@oblique-ai.com. If your mail app didn't open, please email us directly."
    );

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const bookingUrl = import.meta.env.VITE_BOOKING_URL;

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4 py-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4 className="text-2xl font-semibold">Thank you!</h4>
          <p className="text-muted-foreground">
            We'll be in touch shortly. Check your email for the draft we prepared.
          </p>
          {bookingUrl && (
            <div className="pt-4">
              <Button
                onClick={() => window.open(bookingUrl, '_blank')}
                size="lg"
                className="w-full"
              >
                Pick a time
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Or wait for us to reach out
              </p>
            </div>
          )}
          <Button onClick={onClose} variant="outline" size="lg" className="w-full mt-4">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-semibold mb-4">Review & Submit</h4>
      </div>

      <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-medium">Company</p>
            <p className="text-sm font-medium">{formData.firm}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-medium">Email</p>
            <p className="text-sm font-medium">{formData.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-medium">Phone</p>
            <p className="text-sm font-medium">{formData.phone}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-medium">Segment</p>
            <p className="text-sm font-medium">{formData.segment}</p>
          </div>
          {formData.role && (
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground uppercase font-medium">Role</p>
              <p className="text-sm font-medium">{formData.role}</p>
            </div>
          )}
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground uppercase font-medium">Volume</p>
            <p className="text-sm font-medium">{formData.volumeIntent}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground uppercase font-medium">Timeframe</p>
            <p className="text-sm font-medium">{formData.timeframe}</p>
          </div>
          {formData.mandate && (
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground uppercase font-medium">Mandate</p>
              <p className="text-sm whitespace-pre-wrap">{formData.mandate}</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        We'll follow up quickly. If your email client opens, just hit send—no extra typing needed.
      </p>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg" disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Request Demo'}
        </Button>
      </div>
    </div>
  );
};

export default Step4;
