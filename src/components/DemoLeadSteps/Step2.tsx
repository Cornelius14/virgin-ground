import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '../DemoLeadModal';

interface Step2Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2: React.FC<Step2Props> = ({ formData, updateFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const segments = [
    'Brokers / Investment Sales',
    'Lenders / Originators',
    'Investors / Owner-Operators',
    'Developers / GCs / Vendors',
    'Title / Insurance & Closing',
    'Other',
  ];

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.segment) {
      newErrors.segment = 'Please select a segment';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-semibold mb-4">Role & Segment</h4>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="role" className="text-sm font-medium">
            Your Role
          </Label>
          <Input
            id="role"
            type="text"
            placeholder="e.g., VP of Originations, Senior Broker"
            value={formData.role}
            onChange={(e) => updateFormData({ role: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="segment" className="text-sm font-medium">
            Segment <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.segment}
            onValueChange={(value) => updateFormData({ segment: value })}
          >
            <SelectTrigger
              id="segment"
              className={errors.segment ? 'border-destructive' : ''}
              aria-invalid={!!errors.segment}
              aria-describedby={errors.segment ? 'segment-error' : undefined}
            >
              <SelectValue placeholder="Select your segment" />
            </SelectTrigger>
            <SelectContent>
              {segments.map((segment) => (
                <SelectItem key={segment} value={segment}>
                  {segment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.segment && (
            <p id="segment-error" className="text-sm text-destructive mt-1">
              {errors.segment}
            </p>
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

export default Step2;
