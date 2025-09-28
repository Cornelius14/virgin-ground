import React from 'react';
import type { FirmIntelResponse } from '../lib/firmIntelClient';
import { getSuggestedQueries } from '../lib/suggestedQueries';
import { Button } from '@/components/ui/button';

interface SuggestedQueriesProps {
  intel: FirmIntelResponse | null;
  onQuerySelect: (query: string) => void;
  onAddFragment: (fragment: string) => void;
}

export default function SuggestedQueries({ intel, onQuerySelect, onAddFragment }: SuggestedQueriesProps) {
  const queries = getSuggestedQueries(intel);
  
  if (!intel || queries.length === 0) return null;
  
  const getMissingChips = (missingKeys: string[]) => {
    const chipMap: Record<string, string> = {
      assetType: '🔸 Add Asset Type',
      units: '🔸 Add Units', 
      sizeSf: '🔸 Add Size (SF)',
      budget: '🔸 Add Budget',
      capRate: '🔸 Add Cap Rate',
      timing: '🔸 Add Timing'
    };
    
    return missingKeys.map(key => chipMap[key] || `🔸 Add ${key}`);
  };
  
  const handleChipClick = (chipText: string) => {
    const fragments: Record<string, string> = {
      '🔸 Add Asset Type': 'Asset Type: multifamily',
      '🔸 Add Units': 'Units: 50-100',
      '🔸 Add Size (SF)': 'Size (SF): 50k-100k SF', 
      '🔸 Add Budget': 'Budget: ≤ $20M',
      '🔸 Add Cap Rate': 'Cap Rate: ≥ 6%',
      '🔸 Add Timing': 'Timing/Notes: closing within 90 days'
    };
    
    const fragment = fragments[chipText];
    if (fragment) {
      onAddFragment(fragment);
    }
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
          Intent-Aware Suggestions
        </h2>
        <p className="text-muted-foreground text-lg">
          Tailored queries based on your firm's activity
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {queries.map((query) => (
          <div key={query.id} className="cosmic-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">{query.title}</h3>
              
              <div className="space-y-2">
                {query.bullets.map((bullet, index) => (
                  <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Button
                    onClick={() => onQuerySelect(query.text)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    size="sm"
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={() => handleCopyToClipboard(query.text)}
                    variant="outline"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
                
                {query.missingKeys.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {getMissingChips(query.missingKeys).map((chip, chipIndex) => (
                      <button
                        key={chipIndex}
                        onClick={() => handleChipClick(chip)}
                        className="rounded-md border border-amber-300/30 bg-amber-50/10 px-2 py-1 text-xs text-amber-400 hover:bg-amber-50/20 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}