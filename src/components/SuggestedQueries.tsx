import React from 'react';
import type { FirmIntelResponse } from '../lib/firmIntelClient';
import { getSuggestedQueries } from '../lib/suggestedQueries';

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
  
  return (
    <div className="space-y-6">
      <h3 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">Suggested Queries</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {queries.map((query, index) => (
          <div key={index} className="cosmic-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-border">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{query.title}</h4>
              
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <div>• {Object.entries(query.fields).filter(([_, value]) => value).slice(0, 2).map(([key, value]) => `${key}: ${value}`).join(' • ')}</div>
                <div>• {Object.entries(query.fields).filter(([_, value]) => value).slice(2, 4).map(([key, value]) => `${key}: ${value}`).join(' • ')}</div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => onQuerySelect(query.text)}
                  className="w-full rounded-lg border border-border bg-primary text-primary-foreground px-4 py-3 text-sm font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Use This Query
                </button>
                
                {query.missingKeys.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {getMissingChips(query.missingKeys).map((chip, chipIndex) => (
                      <button
                        key={chipIndex}
                        onClick={() => handleChipClick(chip)}
                        className="rounded-md border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/20 transition-colors"
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