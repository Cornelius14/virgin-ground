import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from '../DemoLeadModal';

interface Step3Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3: React.FC<Step3Props> = ({ formData, updateFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.volumeIntent) {
      newErrors.volumeIntent = 'Please select estimated monthly volume';
    }

    if (!formData.timeframe) {
      newErrors.timeframe = 'Please select a timeframe';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-semibold mb-4">Mandate & Timing</h4>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="mandate" className="text-sm font-medium">
            Mandate / Criteria
          </Label>
          <Textarea
            id="mandate"
            placeholder="e.g., Multifamily in Atlanta, 50-150 units, $5-15M, value-add, targeting owners with loans maturing Q2-Q3"
            value={formData.mandate}
            onChange={(e) => updateFormData({ mandate: e.target.value })}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Market, asset type, size/units, budget or cap, timing
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            Estimated Monthly Volume <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-2">
            {[
              { value: 'Low (≤1k targets)', label: 'Low (≤1k targets)' },
              { value: 'Medium (1–10k)', label: 'Medium (1–10k)' },
              { value: 'High (10k+)', label: 'High (10k+)' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <input
                  type="radio"
                  name="volumeIntent"
                  value={option.value}
                  checked={formData.volumeIntent === option.value}
                  onChange={(e) => updateFormData({ volumeIntent: e.target.value })}
                  className="h-4 w-4"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.volumeIntent && (
            <p className="text-sm text-destructive mt-1">{errors.volumeIntent}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            Timeframe to Start <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-2">
            {[
              { value: 'ASAP', label: 'ASAP' },
              { value: '< 2 weeks', label: '< 2 weeks' },
              { value: 'This quarter', label: 'This quarter' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <input
                  type="radio"
                  name="timeframe"
                  value={option.value}
                  checked={formData.timeframe === option.value}
                  onChange={(e) => updateFormData({ timeframe: e.target.value })}
                  className="h-4 w-4"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.timeframe && (
            <p className="text-sm text-destructive mt-1">{errors.timeframe}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={handleNext} size="lg">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3;
