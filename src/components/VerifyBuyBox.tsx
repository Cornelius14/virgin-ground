import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ParsedBuyBox } from '../lib/parserClient';

interface VerifyBuyBoxProps {
  parsed: ParsedBuyBox | null;
  onConfirm: () => void;
  onEdit: (updatedParsed: ParsedBuyBox) => void;
  onReparse: () => void;
}

export default function VerifyBuyBox({ parsed, onConfirm, onEdit, onReparse }: VerifyBuyBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ParsedBuyBox | null>(parsed);
  
  if (!parsed) return null;
  
  // Check for missing core fields
  const missingFields = [];
  if (!parsed.intent) missingFields.push('intent');
  if (!parsed.market?.city) missingFields.push('market');
  if (!parsed.asset_type) missingFields.push('asset_type');
  if (!parsed.units && !parsed.size_sf) missingFields.push('units OR size');
  if (!parsed.budget && !parsed.cap_rate) missingFields.push('budget OR cap');
  
  const needsInput = missingFields.length > 0;
  
  const handleFieldChange = (field: string, value: any) => {
    if (!editedData) return;
    
    setEditedData({
      ...editedData,
      [field]: value
    });
  };
  
  const handleSaveEdits = () => {
    if (editedData) {
      onEdit(editedData);
      setIsEditing(false);
    }
  };
  
  const getExampleChips = (field: string) => {
    const examples: Record<string, string[]> = {
      intent: ['acquisition', 'disposition', 'refinancing'],
      asset_type: ['multifamily', 'office', 'retail', 'industrial'],
      market: ['Atlanta', 'Dallas', 'Miami'],
      units: ['10-20 units', '50-100 units', '100+ units'],
      size: ['≤ 50k SF', '50k-100k SF', '≥ 100k SF'],
      budget: ['≤ $10M', '$10-20M', '≥ $20M'],
      cap: ['≥ 6%', '≥ 7%', '≥ 8%']
    };
    
    return examples[field] || [];
  };
  
  return (
    <div className="cosmic-card rounded-xl p-6 mb-6 shadow-lg border-l-4 border-l-amber-400 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-medium tracking-tighter text-foreground">
          {needsInput ? '⚠️ Verify Buy-Box' : '✅ Confirm Buy-Box'}
        </h3>
        <div className="text-lg text-muted-foreground">
          Did we understand this correctly?
        </div>
      </div>
      
      {needsInput && (
        <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-400/30">
          <div className="text-sm font-medium text-amber-400 mb-3">
            <strong>Needs input:</strong> {missingFields.join(', ')}
          </div>
          <div className="flex flex-wrap gap-2">
            {missingFields.includes('intent') && getExampleChips('intent').map(chip => (
              <button key={chip} className="px-3 py-1.5 text-xs font-medium rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors">
                {chip}
              </button>
            ))}
            {missingFields.includes('asset_type') && getExampleChips('asset_type').map(chip => (
              <button key={chip} className="px-3 py-1.5 text-xs font-medium rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors">
                {chip}
              </button>
            ))}
            {missingFields.includes('units OR size') && [...getExampleChips('units'), ...getExampleChips('size')].map(chip => (
              <button key={chip} className="px-3 py-1.5 text-xs font-medium rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors">
                {chip}
              </button>
            ))}
            {missingFields.includes('budget OR cap') && [...getExampleChips('budget'), ...getExampleChips('cap')].map(chip => (
              <button key={chip} className="px-3 py-1.5 text-xs font-medium rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors">
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isEditing ? (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Intent</label>
              <Input
                value={editedData?.intent || ''}
                onChange={(e) => handleFieldChange('intent', e.target.value)}
                placeholder="acquisition, disposition, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Asset Type</label>
              <Input
                value={editedData?.asset_type || ''}
                onChange={(e) => handleFieldChange('asset_type', e.target.value)}
                placeholder="multifamily, office, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Market</label>
              <Input
                value={editedData?.market?.city || ''}
                onChange={(e) => handleFieldChange('market', { ...editedData?.market, city: e.target.value })}
                placeholder="City name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Units Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={editedData?.units?.min || ''}
                  onChange={(e) => handleFieldChange('units', { ...editedData?.units, min: parseInt(e.target.value) || null })}
                  placeholder="Min"
                />
                <Input
                  type="number"
                  value={editedData?.units?.max || ''}
                  onChange={(e) => handleFieldChange('units', { ...editedData?.units, max: parseInt(e.target.value) || null })}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
          <div className={needsInput && !parsed.intent ? 'text-amber-400' : ''}>
            <span className="font-medium">Intent:</span> <span className="text-muted-foreground">{parsed.intent || "—"}</span>
          </div>
          <div className={needsInput && !parsed.asset_type ? 'text-amber-400' : ''}>
            <span className="font-medium">Asset Type:</span> <span className="text-muted-foreground">{parsed.asset_type || "—"}</span>
          </div>
          <div className={needsInput && !parsed.market?.city ? 'text-amber-400' : ''}>
            <span className="font-medium">Market:</span> <span className="text-muted-foreground">{parsed.market?.city ? `${parsed.market.city}${parsed.market?.state ? ", " + parsed.market.state : ""}` : "—"}</span>
          </div>
          <div className={needsInput && !parsed.units ? 'text-amber-400' : ''}>
            <span className="font-medium">Units:</span> <span className="text-muted-foreground">{parsed.units ? `${parsed.units.min || ""}${parsed.units.min ? "–" : ""}${parsed.units.max || ""}` : "—"}</span>
          </div>
          <div className={needsInput && !parsed.size_sf ? 'text-amber-400' : ''}>
            <span className="font-medium">Size (SF):</span> <span className="text-muted-foreground">{parsed.size_sf ? `${parsed.size_sf.min || ""}${parsed.size_sf.min ? "–" : ""}${parsed.size_sf.max || ""}` : "—"}</span>
          </div>
          <div className={needsInput && !parsed.budget ? 'text-amber-400' : ''}>
            <span className="font-medium">Budget:</span> <span className="text-muted-foreground">{parsed.budget?.max ? `≤ $${Number(parsed.budget.max).toLocaleString()}` : (parsed.budget?.min ? `$${Number(parsed.budget.min).toLocaleString()}+` : "—")}</span>
          </div>
          <div className={needsInput && !parsed.cap_rate ? 'text-amber-400' : ''}>
            <span className="font-medium">Cap Rate:</span> <span className="text-muted-foreground">{parsed.cap_rate?.min ? `≥ ${parsed.cap_rate.min}%` : (parsed.cap_rate?.max ? `≤ ${parsed.cap_rate.max}%` : "—")}</span>
          </div>
          <div>
            <span className="font-medium">Timing/Notes:</span> <span className="text-muted-foreground">{parsed.timing || "—"}</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3">
        {isEditing ? (
          <>
            <Button onClick={handleSaveEdits} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              onClick={onConfirm} 
              disabled={needsInput}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {needsInput ? 'Complete Missing Fields' : 'Confirm & Continue'}
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Fields
            </Button>
            <Button variant="outline" onClick={onReparse}>
              Reparse
            </Button>
          </>
        )}
      </div>
    </div>
  );
}