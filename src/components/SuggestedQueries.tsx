import React from 'react';
import type { FirmIntelResponse, StructuredQuery } from '../lib/firmIntelClient';

interface SuggestedQueriesProps {
  intel: FirmIntelResponse | null;
  onQuerySelect: (query: string, fields?: any) => void;
  onAddFragment: (fragment: string) => void;
}

// Import Button component
import { Button } from './ui/button';

// Use structured queries from API response directly
function getStructuredQueries(intel: FirmIntelResponse | null): StructuredQuery[] {
  if (!intel?.structuredQueries) return [];
  return intel.structuredQueries;
}

export default function SuggestedQueries({ intel, onQuerySelect, onAddFragment }: SuggestedQueriesProps) {
  const queries = getStructuredQueries(intel);

  if (!queries.length) return null;

  const handleUseQuery = (query: StructuredQuery) => {
    // Create structured fields object
    const criteriaFields = {
      intent: query.fields.intent || '',
      assetType: query.fields.assetType || '',
      market: query.fields.market || '',
      units: query.fields.units || '',
      sizeSf: query.fields.sizeSf || '',
      budget: query.fields.budget || '',
      capRate: query.fields.capRate || '',
      timing: query.fields.timing || ''
    };
    
    // Pass both the text and structured fields
    onQuerySelect(query.text, criteriaFields);
  };

  const getFieldLabel = (key: string): string => {
    const labels: Record<string, string> = {
      'assetType': 'Asset Type',
      'market': 'Market',
      'units': 'Units',
      'sizeSf': 'Size (SF)',
      'budget': 'Budget',
      'capRate': 'Cap Rate',
      'timing': 'Timing',
      'intent': 'Intent'
    };
    return labels[key] || key;
  };

  const getExampleValue = (key: string): string => {
    const examples: Record<string, string> = {
      'assetType': 'multifamily',
      'market': 'Atlanta',
      'units': '50-100',
      'sizeSf': '≥ 25k SF',
      'budget': '≤ $20M',
      'capRate': '≥ 6%',
      'timing': 'within 90 days',
      'intent': 'acquisition'
    };
    return examples[key] || 'TBD';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-foreground">Structured Queries</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {queries.map((query) => (
          <div key={query.id} className="cosmic-card rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="space-y-4 flex-grow">
              {/* Header */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{query.emoji}</span>
                <h4 className="text-lg font-medium text-foreground">{query.title}</h4>
              </div>

              {/* Structured Fields Display */}
              <div className="grid grid-cols-1 gap-y-2 text-sm">
                {Object.entries(query.fields).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-muted-foreground font-medium min-w-[80px]">
                      {getFieldLabel(key)}:
                    </span>
                    <span className="text-foreground">
                      {value || <span className="text-muted-foreground italic">—</span>}
                    </span>
                  </div>
                ))}
              </div>

              {/* Two bullet points - 2 per row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {query.bullets.map((bullet, index) => (
                  <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Missing field chips */}
              {query.missingKeys.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {query.missingKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => onAddFragment(getExampleValue(key))}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full 
                                 bg-amber-100 text-amber-800 hover:bg-amber-200 
                                 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50
                                 transition-colors"
                    >
                      🔸 Add {getFieldLabel(key)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Use This Query button - Always at bottom */}
            <Button 
              onClick={() => handleUseQuery(query)}
              className="w-full mt-4"
              variant="default"
            >
              Use This Query
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}