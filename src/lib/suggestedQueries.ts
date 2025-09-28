import type { FirmIntelResponse } from './firmIntelClient';

export interface SuggestedQuery {
  id: string;
  title: string;
  bullets: string[];
  text: string;
  fields: Record<string, string>;
  missingKeys: string[];
}

// Infer firm type from intel data
function inferFirmType(intel: FirmIntelResponse | null): 'brokerage' | 'lender' | 'developer' | 'vendor' | 'owner' {
  if (!intel) return 'owner';
  
  const description = intel.snapshot.join(' ').toLowerCase();
  const url = intel.firmUrl?.toLowerCase() || '';
  
  // Check for brokerage keywords
  if (description.includes('investment sales') || description.includes('brokerage') || 
      description.includes('advisor') || description.includes('broker') ||
      url.includes('capital') || url.includes('realty')) {
    return 'brokerage';
  }
  
  // Check for lender keywords
  if (description.includes('financing') || description.includes('lending') || 
      description.includes('mortgage') || description.includes('capital') ||
      description.includes('loan') || url.includes('capital')) {
    return 'lender';
  }
  
  // Check for developer/builder keywords
  if (description.includes('development') || description.includes('builder') || 
      description.includes('construction') || description.includes('permit') ||
      description.includes('concrete') || description.includes('contractor')) {
    return 'developer';
  }
  
  return 'owner';
}

// Extract markets from intel
function getMarketSuggestions(intel: FirmIntelResponse | null): string[] {
  if (!intel) return ['Atlanta', 'Dallas', 'Miami'];
  
  const description = intel.snapshot.join(' ');
  const markets: string[] = [];
  
  // Common US markets regex
  const marketRegex = /(Atlanta|Dallas|Miami|Austin|Houston|Phoenix|Denver|Seattle|Portland|Nashville|Charlotte|Tampa|Orlando|Jacksonville|San Antonio|Fort Worth|El Paso|Memphis|Oklahoma City|Louisville|Baltimore|Las Vegas|Albuquerque|Tucson|Fresno|Sacramento|Long Beach|Kansas City|Mesa|Virginia Beach|Omaha|Colorado Springs|Raleigh|Tulsa|Minneapolis|Cleveland|Wichita|Arlington)/gi;
  
  const matches = description.match(marketRegex);
  if (matches) {
    markets.push(...matches.slice(0, 3));
  }
  
  // Default markets if none found
  if (markets.length === 0) {
    return ['Atlanta', 'Dallas', 'Miami'];
  }
  
  return markets;
}

export function getSuggestedQueries(intel: FirmIntelResponse | null): SuggestedQuery[] {
  const firmType = inferFirmType(intel);
  const markets = getMarketSuggestions(intel);
  const queries: SuggestedQuery[] = [];
  
  switch (firmType) {
    case 'brokerage':
      queries.push(
        {
          id: 'brok-mf-acq',
          title: '🏢 Multifamily Acquisition',
          bullets: ['50-120 units in target markets', 'Cap rate ≥ 6% with value-add potential'],
          text: `Intent: acquisition • Asset Type: multifamily • Market: ${markets[0]} • Units: 50-120 • Cap Rate: ≥ 6% • Timing/Notes: closing within 90 days`,
          fields: {
            intent: 'acquisition',
            assetType: 'multifamily',
            market: markets[0],
            units: '50-120',
            capRate: '≥ 6%',
            timing: 'closing within 90 days'
          },
          missingKeys: ['budget']
        },
        {
          id: 'brok-office-disp',
          title: '💼 Office Disposition',
          bullets: ['Class A/B office buildings', 'Motivated sellers seeking quick close'],
          text: `Intent: disposition • Asset Type: office • Market: ${markets[1] || markets[0]} • Size (SF): 25k-100k • Timing/Notes: expedited sale preferred`,
          fields: {
            intent: 'disposition',
            assetType: 'office',
            market: markets[1] || markets[0],
            sizeSf: '25k-100k SF',
            timing: 'expedited sale preferred'
          },
          missingKeys: ['budget', 'capRate']
        }
      );
      break;
      
    case 'lender':
      queries.push(
        {
          id: 'lend-refi',
          title: '📈 Refinancing Opportunities',
          bullets: ['Maturing loans seeking rate relief', 'Stabilized assets with strong NOI'],
          text: `Intent: refinancing • Asset Type: multifamily • Market: ${markets[0]} • Budget: ≤ $50M • Cap Rate: ≥ 5% • Timing/Notes: loan maturing within 12 months`,
          fields: {
            intent: 'refinancing',
            assetType: 'multifamily',
            market: markets[0],
            budget: '≤ $50M',
            capRate: '≥ 5%',
            timing: 'loan maturing within 12 months'
          },
          missingKeys: ['units']
        },
        {
          id: 'lend-acq-fin',
          title: '🏗️ Acquisition Financing',
          bullets: ['Value-add opportunities needing capital', 'Experienced sponsors preferred'],
          text: `Intent: acquisition financing • Asset Type: industrial • Market: ${markets[1] || markets[0]} • Size (SF): 100k-500k • Budget: ≤ $75M • Timing/Notes: 75% LTV preferred`,
          fields: {
            intent: 'acquisition financing',
            assetType: 'industrial',
            market: markets[1] || markets[0],
            sizeSf: '100k-500k SF',
            budget: '≤ $75M',
            timing: '75% LTV preferred'
          },
          missingKeys: ['capRate']
        }
      );
      break;
      
    case 'developer':
      queries.push(
        {
          id: 'dev-land',
          title: '🧱 Development Sites',
          bullets: ['Entitled land or permit-ready parcels', 'Multifamily or mixed-use zoning'],
          text: `Intent: land acquisition • Asset Type: development site • Market: ${markets[0]} • Size (SF): ≥ 2 acres • Timing/Notes: permits issued or entitled`,
          fields: {
            intent: 'land acquisition',
            assetType: 'development site',
            market: markets[0],
            sizeSf: '≥ 2 acres',
            timing: 'permits issued or entitled'
          },
          missingKeys: ['budget', 'units']
        },
        {
          id: 'dev-owners',
          title: '🏗️ Owner Prospects',
          bullets: ['Recent permit holders for ground-up', 'Projects ≥100k SF seeking contractors'],
          text: `Intent: construction services • Asset Type: ground-up development • Market: ${markets[0]} • Size (SF): ≥ 100k • Timing/Notes: permits issued within 6 months`,
          fields: {
            intent: 'construction services',
            assetType: 'ground-up development',
            market: markets[0],
            sizeSf: '≥ 100k SF',
            timing: 'permits issued within 6 months'
          },
          missingKeys: ['budget', 'capRate']
        }
      );
      break;
      
    default: // owner
      queries.push(
        {
          id: 'own-acq',
          title: '🏢 Portfolio Acquisition',
          bullets: ['Stabilized income-producing assets', 'Markets with population growth'],
          text: `Intent: acquisition • Asset Type: multifamily • Market: ${markets[0]} • Units: 100-200 • Cap Rate: ≥ 6% • Timing/Notes: 1031 exchange preferred`,
          fields: {
            intent: 'acquisition',
            assetType: 'multifamily',
            market: markets[0],
            units: '100-200',
            capRate: '≥ 6%',
            timing: '1031 exchange preferred'
          },
          missingKeys: ['budget']
        },
        {
          id: 'own-disp',
          title: '💰 Asset Disposition',
          bullets: ['Non-core assets for portfolio optimization', 'Seeking maximum proceeds'],
          text: `Intent: disposition • Asset Type: retail • Market: ${markets[1] || markets[0]} • Size (SF): 15k-50k • Timing/Notes: off-market preferred`,
          fields: {
            intent: 'disposition',
            assetType: 'retail',
            market: markets[1] || markets[0],
            sizeSf: '15k-50k SF',
            timing: 'off-market preferred'
          },
          missingKeys: ['budget', 'capRate']
        }
      );
  }
  
  // Add generic distressed assets query
  queries.push({
    id: 'distressed',
    title: '⚠️ Distressed Assets',
    bullets: ['Foreclosure or bankruptcy opportunities', 'Below-market pricing potential'],
    text: `Intent: acquisition • Asset Type: distressed • Market: ${markets[0]} • Budget: ≤ $25M • Timing/Notes: quick close capability`,
    fields: {
      intent: 'acquisition',
      assetType: 'distressed',
      market: markets[0],
      budget: '≤ $25M',
      timing: 'quick close capability'
    },
    missingKeys: ['units', 'capRate']
  });
  
  return queries.slice(0, 6); // Return max 6 suggestions
}