// Firm intelligence client for fetching company data and generating personalized queries
// Set VITE_FIRM_INTEL_URL in your environment to the Supabase Edge Function URL
// Format: https://YOUR-PROJECT.functions.supabase.co/firm-intel

const FN_URL = import.meta.env.VITE_FIRM_INTEL_URL || "https://bwvvahpaszgpoedhlkxy.supabase.co/functions/v1/firm-intel";

export type FirmIntelRequest = { 
  firmName: string; 
  fallbackUrl?: string; 
};

export type FirmTransaction = {
  type: string;
  asset_type: string;
  market: string;
  size?: string;
  value?: string;
  date?: string;
  headline: string;
  url?: string;
};

export type FirmCriteria = {
  role: string;
  assets: string[];
  markets: string[];
  size_bands: string[];
  price_bands: string[];
  timing_hints: string[];
};

export type StructuredQuery = {
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
  };
  text: string;
  missingKeys: string[];
};

export type FirmIntelResponse = {
  success: boolean;
  firmName: string;
  firmUrl?: string | null;
  logoUrl?: string | null;
  brandColor?: string | null;
  snapshot: string[];
  structuredQueries: StructuredQuery[];
  needsInput?: "url" | null;
  error?: string | null;
};

export async function fetchFirmIntel(body: FirmIntelRequest): Promise<FirmIntelResponse> {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: 'no-store',
    mode: "cors",
  });
  
  if (!res.ok) {
    throw new Error(`firm-intel ${res.status}`);
  }
  
  return res.json();
}