import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { parseBuyBox, type ParsedBuyBox } from '../lib/parserClient';

interface CriteriaFields {
  intent: string;
  assetType: string;
  market: string;
  units: string;
  sizeSf: string;
  budget: string;
  capRate: string;
  timing: string;
}

interface CriteriaEditModalProps {
  open: boolean;
  onClose: () => void;
  initialCriteria: string;
  onConfirm: (criteriaText: string, parsed: ParsedBuyBox) => void;
}

export default function CriteriaEditModal({ 
  open, 
  onClose, 
  initialCriteria, 
  onConfirm 
}: CriteriaEditModalProps) {
  const [fields, setFields] = useState<CriteriaFields>({
    intent: '',
    assetType: '',
    market: '',
    units: '',
    sizeSf: '',
    budget: '',
    capRate: '',
    timing: ''
  });
  
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse initial criteria when modal opens
  useEffect(() => {
    if (open && initialCriteria) {
      const parsed = parseInitialCriteria(initialCriteria);
      setFields(parsed);
    }
  }, [open, initialCriteria]);

  const parseInitialCriteria = (criteria: string): CriteriaFields => {
    const extractField = (patterns: string[]) => {
      for (const pattern of patterns) {
        const regex = new RegExp(`${pattern}\\s*([^•]+)`, 'i');
        const match = criteria.match(regex);
        if (match && match[1]) {
          return match[1].trim();
        }
      }
      return '';
    };

    return {
      intent: extractField(['intent:', 'Intent:']),
      assetType: extractField(['asset type:', 'Asset Type:', 'asset:']),
      market: extractField(['market:', 'Market:', 'in ']),
      units: extractField(['units:', 'Units:']),
      sizeSf: extractField(['size:', 'Size:', 'sf:', 'SF:']),
      budget: extractField(['budget:', 'Budget:', '$']),
      capRate: extractField(['cap rate:', 'Cap Rate:', 'cap:', '≥', '>=']),
      timing: extractField(['timing:', 'Timing:', 'notes:', 'Notes:'])
    };
  };

  const generateCriteriaText = (fields: CriteriaFields): string => {
    const parts = [];
    
    if (fields.intent) parts.push(`Intent: ${fields.intent}`);
    if (fields.assetType) parts.push(`Asset Type: ${fields.assetType}`);
    if (fields.market) parts.push(`Market: ${fields.market}`);
    if (fields.units) parts.push(`Units: ${fields.units}`);
    if (fields.sizeSf) parts.push(`Size (SF): ${fields.sizeSf}`);
    if (fields.budget) parts.push(`Budget: ${fields.budget}`);
    if (fields.capRate) parts.push(`Cap Rate: ${fields.capRate}`);
    if (fields.timing) parts.push(`Timing/Notes: ${fields.timing}`);
    
    return parts.join(' • ');
  };

  const previewText = generateCriteriaText(fields);

  const handleFieldChange = (fieldName: keyof CriteriaFields, value: string) => {
    setFields(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleConfirm = async () => {
    setBusy(true);
    setError(null);
    
    try {
      const criteriaText = generateCriteriaText(fields);
      const parsed = await parseBuyBox(criteriaText);
      onConfirm(criteriaText, parsed);
      onClose();
    } catch (e: any) {
      const message = String(e?.message || e);
      if (message.includes("llm_unavailable") || message.includes("llm") || message.includes("model")) {
        setError("LLM unavailable. Try again in a moment.");
      } else {
        setError(message === "supabase_not_configured" 
          ? "Supabase not configured. Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY." 
          : message.startsWith("http-") 
            ? `Server ${message.replace("http-", "")}` 
            : message.includes("timeout") 
              ? "Function timeout." 
              : "Network error or function unreachable."
        );
      }
    } finally {
      setBusy(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Edit Deal Criteria</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Structured Fields</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="intent">Intent</Label>
                <Select value={fields.intent} onValueChange={(value) => handleFieldChange('intent', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select intent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acquisition">Acquisition</SelectItem>
                    <SelectItem value="disposition">Disposition</SelectItem>
                    <SelectItem value="refinancing">Refinancing</SelectItem>
                    <SelectItem value="construction services">Construction Services</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="leasing">Leasing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assetType">Asset Type</Label>
                <Select value={fields.assetType} onValueChange={(value) => handleFieldChange('assetType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multifamily">Multifamily</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="market">Market</Label>
                <Input
                  id="market"
                  value={fields.market}
                  onChange={(e) => handleFieldChange('market', e.target.value)}
                  placeholder="e.g., Atlanta, Dallas, Miami"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="units">Units</Label>
                <Input
                  id="units"
                  value={fields.units}
                  onChange={(e) => handleFieldChange('units', e.target.value)}
                  placeholder="e.g., 50-120, ≥ 100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sizeSf">Size (SF)</Label>
                <Input
                  id="sizeSf"
                  value={fields.sizeSf}
                  onChange={(e) => handleFieldChange('sizeSf', e.target.value)}
                  placeholder="e.g., 50k-100k SF, ≥ 25k SF"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  value={fields.budget}
                  onChange={(e) => handleFieldChange('budget', e.target.value)}
                  placeholder="e.g., ≤ $20M, $5-15M"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capRate">Cap Rate</Label>
                <Input
                  id="capRate"
                  value={fields.capRate}
                  onChange={(e) => handleFieldChange('capRate', e.target.value)}
                  placeholder="e.g., ≥ 6%, 5-7%"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timing">Timing/Notes</Label>
                <Input
                  id="timing"
                  value={fields.timing}
                  onChange={(e) => handleFieldChange('timing', e.target.value)}
                  placeholder="e.g., closing within 90 days, loan maturing ≤ 6 months"
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Preview</h3>
            
            <div className="cosmic-card rounded-xl p-4 min-h-[200px]">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Generated Criteria:</h4>
              <div className="text-sm text-foreground leading-relaxed">
                {previewText || (
                  <span className="text-muted-foreground italic">
                    Fill in the fields above to see the generated criteria
                  </span>
                )}
              </div>
            </div>

            {error && (
              <div className="cosmic-card rounded-lg p-3 border-l-4 border-l-destructive bg-destructive/5">
                <div className="text-sm text-destructive">{error}</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={busy || !previewText}
            className="min-w-[120px]"
          >
            {busy ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}