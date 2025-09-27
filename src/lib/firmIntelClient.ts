// Firm intelligence client for fetching company data and generating personalized queries
// Set VITE_FIRM_INTEL_URL in your environment to the Supabase Edge Function URL
// Format: https://YOUR-PROJECT.functions.supabase.co/firm-intel

const FN_URL = import.meta.env.VITE_FIRM_INTEL_URL || "https://YOUR-PROJECT.functions.supabase.co/firm-intel";

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

export type FirmIntelResponse = {
  firmUrl?: string | null;
  logoUrl?: string | null;
  brandColor?: string | null;
  snapshot: string[];
  transactions: FirmTransaction[];
  criteria: FirmCriteria;
  queries: string[];
  needsInput?: "url";
  error?: string | null;
};

export async function fetchFirmIntel(body: FirmIntelRequest): Promise<FirmIntelResponse> {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    mode: "cors",
  });
  
  if (!res.ok) {
    throw new Error(`firm-intel ${res.status}`);
  }
  
  return res.json();
}