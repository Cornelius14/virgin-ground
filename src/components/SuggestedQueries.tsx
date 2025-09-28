import React from 'react';
import type { FirmIntelResponse } from '../lib/firmIntelClient';

interface StructuredQuery {
  id: string;
  title: string;
  emoji: string;
  bullets: string[];
  fields: {
    intent?: string;
    assetType?: string;
    market?: string;
    units?: string;
    sizeSf?: string;
    budget?: string;
    capRate?: string;
    timing?: string;
    [key: string]: string | undefined;
  };
  text: string;
  missingKeys: string[];
}

interface SuggestedQueriesProps {
  intel: FirmIntelResponse | null;
  onQuerySelect: (query: string) => void;
  onAddFragment: (fragment: string) => void;
}

// Helper to infer firm type from snapshot and URL
function inferFirmType(intel: FirmIntelResponse): string {
  const snapshot = intel.snapshot.join(' ').toLowerCase();
  const url = intel.firmUrl?.toLowerCase() || '';
  
  // Check for builder/developer keywords
  if (snapshot.includes('development') || snapshot.includes('construction') || 
      snapshot.includes('builder') || snapshot.includes('contractor') ||
      snapshot.includes('permits') || snapshot.includes('ground') ||
      url.includes('construction') || url.includes('build')) {
    return 'builder';
  }
  
  // Check for lender/mortgage keywords
  if (snapshot.includes('financing') || snapshot.includes('mortgage') || 
      snapshot.includes('lending') || snapshot.includes('loan') ||
      snapshot.includes('refinanc') || url.includes('capital') ||
      url.includes('mortgage') || url.includes('lending')) {
    return 'lender';
  }
  
  // Check for brokerage keywords
  if (snapshot.includes('brokerage') || snapshot.includes('advisory') || 
      snapshot.includes('investment sales') || snapshot.includes('broker') ||
      snapshot.includes('transaction') || url.includes('advisors') ||
      url.includes('realty') || url.includes('broker')) {
    return 'brokerage';
  }
  
  // Default to owner/operator
  return 'owner';
}

// Generate market suggestions based on firm intel
function getMarketSuggestions(intel: FirmIntelResponse): string[] {
  const snapshot = intel.snapshot.join(' ');
  const markets = [];
  
  // Extract mentioned cities/regions from snapshot
  const cityRegex = /(New York|NYC|Atlanta|Chicago|Dallas|Austin|Houston|Miami|Los Angeles|San Francisco|Seattle|Boston|Denver|Phoenix|Las Vegas|Orlando|Tampa|Charlotte|Nashville|Washington DC|Philadelphia)/gi;
  const matches = snapshot.match(cityRegex);
  
  if (matches) {
    markets.push(...matches.slice(0, 2));
  } else {
    // Default major markets
    markets.push('Atlanta', 'Dallas', 'Miami');
  }
  
  return markets;
}

function getStructuredQueries(intel: FirmIntelResponse | null): StructuredQuery[] {
  if (!intel) return [];
  
  const firmType = inferFirmType(intel);
  const markets = getMarketSuggestions(intel);
  const queries: StructuredQuery[] = [];
  
  switch (firmType) {
    case 'brokerage':
      queries.push(
        {
          id: 'brokerage-1',
          title: 'Multifamily Acquisition Deal',
          emoji: '🏢',
          bullets: [
            'Mid-size multifamily acquisition opportunity',
            'Strong cap rate requirement for investor'
          ],
          fields: {
            intent: 'acquisition',
            assetType: 'multifamily',
            market: markets[0],
            units: '50-120',
            budget: '≤ $25M',
            capRate: '≥ 6%'
          },
          text: `Intent: acquisition • Asset Type: multifamily • Market: ${markets[0]} • Units: 50-120 • Budget: ≤ $25M • Cap Rate: ≥ 6% • Timing/Notes: Ready to close within 90 days`,
          missingKeys: []
        },
        {
          id: 'brokerage-2',
          title: 'Industrial Sale Mandate',
          emoji: '🏭',
          bullets: [
            'Large industrial property disposition',
            'Seller timeline Q1 2024'
          ],
          fields: {
            intent: 'disposition',
            assetType: 'industrial',
            market: markets[1] || markets[0],
            sizeSf: '≥ 100k SF',
            capRate: '≥ 5.5%'
          },
          text: `Intent: disposition • Asset Type: industrial • Market: ${markets[1] || markets[0]} • Size (SF): ≥ 100k SF • Cap Rate: ≥ 5.5% • Timing/Notes: Seller wants to close Q1 2024`,
          missingKeys: ['budget']
        }
      );
      break;
      
    case 'lender':
      queries.push(
        {
          id: 'lender-1',
          title: 'Refinancing Opportunity',
          emoji: '💼',
          bullets: [
            'Loan maturity creating refinance need',
            'Stable multifamily asset'
          ],
          fields: {
            intent: 'refinancing',
            assetType: 'multifamily',
            market: markets[0],
            units: '80-150',
            budget: '$30-60M',
            timing: 'loan maturing ≤ 6 months'
          },
          text: `Intent: refinancing • Asset Type: multifamily • Market: ${markets[0]} • Units: 80-150 • Budget: $30-60M • Timing/Notes: loan maturing ≤ 6 months`,
          missingKeys: ['capRate']
        },
        {
          id: 'lender-2',
          title: 'Construction Financing',
          emoji: '🏗️',
          bullets: [
            'Development site acquisition financing',
            'Ready for construction loan'
          ],
          fields: {
            intent: 'acquisition financing',
            assetType: 'development sites',
            market: markets[1] || markets[0],
            sizeSf: '≥ 5 acres',
            budget: '≤ $50M'
          },
          text: `Intent: acquisition financing • Asset Type: development sites • Market: ${markets[1] || markets[0]} • Size (SF): ≥ 5 acres • Budget: ≤ $50M • Timing/Notes: Ready for construction loan`,
          missingKeys: ['units', 'capRate']
        }
      );
      break;
      
    case 'builder':
      queries.push(
        {
          id: 'builder-1',
          title: 'Development Sites',
          emoji: '🧱',
          bullets: [
            'Entitled land for development',
            'Recent permits and approvals'
          ],
          fields: {
            intent: 'acquisition',
            assetType: 'land/development',
            market: markets[0],
            sizeSf: '≥ 10 acres',
            timing: 'recent permits/entitlements'
          },
          text: `Intent: acquisition • Asset Type: land/development • Market: ${markets[0]} • Size (SF): ≥ 10 acres • Timing/Notes: recent permits/entitlements, ready for development`,
          missingKeys: ['units', 'budget', 'capRate']
        },
        {
          id: 'builder-2',
          title: 'Large SF Projects',
          emoji: '🏗️',
          bullets: [
            'Major commercial construction opportunity',
            'Permits recently pulled'
          ],
          fields: {
            intent: 'construction services',
            assetType: 'commercial',
            market: markets[1] || markets[0],
            sizeSf: '≥ 100k SF',
            timing: 'permits pulled ≤ 90 days'
          },
          text: `Intent: construction services • Asset Type: commercial • Market: ${markets[1] || markets[0]} • Size (SF): ≥ 100k SF • Timing/Notes: permits pulled ≤ 90 days, need general contractor`,
          missingKeys: ['units', 'budget', 'capRate']
        }
      );
      break;
      
    default: // owner/operator
      queries.push(
        {
          id: 'owner-1',
          title: 'Value-Add Acquisition',
          emoji: '📈',
          bullets: [
            'Small to mid-size multifamily value-add',
            'Quick close capability'
          ],
          fields: {
            intent: 'acquisition',
            assetType: 'multifamily',
            market: markets[0],
            units: '20-60',
            budget: '≤ $15M',
            capRate: '≥ 7%'
          },
          text: `Intent: acquisition • Asset Type: multifamily • Market: ${markets[0]} • Units: 20-60 • Budget: ≤ $15M • Cap Rate: ≥ 7% • Timing/Notes: value-add opportunity, can close in 60 days`,
          missingKeys: []
        },
        {
          id: 'owner-2',
          title: 'Retail Portfolio Sale',
          emoji: '🏪',
          bullets: [
            'Mid-size retail portfolio disposition',
            'Flexible timing for seller'
          ],
          fields: {
            intent: 'disposition',
            assetType: 'retail',
            market: markets[1] || markets[0],
            sizeSf: '10k-50k SF',
            capRate: '≥ 6.5%'
          },
          text: `Intent: disposition • Asset Type: retail • Market: ${markets[1] || markets[0]} • Size (SF): 10k-50k SF • Cap Rate: ≥ 6.5% • Timing/Notes: portfolio sale, flexible timing`,
          missingKeys: ['units', 'budget']
        }
      );
  }
  
  // Add a generic distressed opportunity
  queries.push({
    id: 'generic-1',
    title: 'Distressed Assets',
    emoji: '⏱️',
    bullets: [
      'Motivated seller situations',
      'Aging ownership or loan maturity'
    ],
    fields: {
      intent: 'acquisition',
      market: markets[0],
      timing: 'owner over 65 OR loan maturity ≤ 6 months'
    },
    text: `Intent: acquisition • Market: ${markets[0]} • Timing/Notes: owner over 65 OR loan maturity ≤ 6 months, motivated sellers`,
    missingKeys: ['assetType', 'units', 'sizeSf', 'budget', 'capRate']
  });
  
  return queries.slice(0, 6); // Return max 6 suggestions
}

export default function SuggestedQueries({ intel, onQuerySelect, onAddFragment }: SuggestedQueriesProps) {
  // This component is no longer used as requested - remove the old "Structured Queries" section
  return null;
}