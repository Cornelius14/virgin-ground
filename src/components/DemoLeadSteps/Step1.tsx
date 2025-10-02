import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '../DemoLeadModal';

interface Step1Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    
    // Soft validation for corporate domains (warn but allow common providers)
    const commonProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    if (commonProviders.includes(domain)) {
      return 'Corporate email preferred, but we accept all domains';
    }
    return '';
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phone || phone.length < 10) return 'Please enter a valid phone number';
    if (!phoneRegex.test(phone)) return 'Phone number can only contain digits, spaces, +, -, (, )';
    return '';
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailError = validateEmail(formData.email);
      if (emailError && !emailError.includes('preferred')) {
        newErrors.email = emailError;
      }
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneError = validatePhone(formData.phone);
      if (phoneError) {
        newErrors.phone = phoneError;
      }
    }

    if (!formData.firm) {
      newErrors.firm = 'Company name is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-semibold mb-4">Company & Contact</h4>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">
            Company Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={errors.email ? 'border-destructive' : ''}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className={errors.phone ? 'border-destructive' : ''}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-sm text-destructive mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="firm" className="text-sm font-medium">
            Firm/Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firm"
            type="text"
            placeholder="Your Company"
            value={formData.firm}
            onChange={(e) => updateFormData({ firm: e.target.value })}
            className={errors.firm ? 'border-destructive' : ''}
            aria-invalid={!!errors.firm}
            aria-describedby={errors.firm ? 'firm-error' : undefined}
          />
          {errors.firm && (
            <p id="firm-error" className="text-sm text-destructive mt-1">
              {errors.firm}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} size="lg">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1;
