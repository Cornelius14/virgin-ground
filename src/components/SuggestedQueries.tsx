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
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">Suggested Queries</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {queries.map((query, index) => (
          <div key={index} className="cosmic-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">{query.title}</h4>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• {Object.entries(query.fields).filter(([_, value]) => value).slice(0, 2).map(([key, value]) => `${key}: ${value}`).join(' • ')}</div>
                <div>• {Object.entries(query.fields).filter(([_, value]) => value).slice(2, 4).map(([key, value]) => `${key}: ${value}`).join(' • ')}</div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onQuerySelect(query.text)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                >
                  Use This Query
                </button>
                
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