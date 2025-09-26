import { createClient } from "@supabase/supabase-js";

export type ParsedBuyBox = {
  intent?: string; role?: string;
  market?: { city?: string; state?: string|null; country?: string|null } | null;
  asset_type?: string; asset?: string;
  units?: { min?: number|null; max?: number|null } | null;
  size_sf?: { min?: number|null; max?: number|null } | null;
  budget?: { min?: number|null; max?: number|null } | null;
  cap_rate?: { min?: number|null; max?: number|null } | null;
  timing?: string | null;
  missing?: string[];
};

function getSupabase() {
  // Lovable's Supabase integration usually injects these envs; if not, user must set them.
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("supabase_not_configured");
  }
  return createClient(url, anon);
}

function withTimeout<T>(p: Promise<T>, ms = 12000) {
  return Promise.race([
    p,
    new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
  ]);
}

export async function parseBuyBox(text: string): Promise<ParsedBuyBox> {
  const supabase = getSupabase();
  const { data, error } = await withTimeout(
    supabase.functions.invoke("parseBuyBox", { body: { text } }),
    12000
  );
  if (error) {
    // Bubble up descriptive error codes
    throw new Error(error.message || `http-${error.status || 500}`);
  }
  return (data ?? {}) as ParsedBuyBox;
}

export async function checkHealth(): Promise<string> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.functions.invoke("parseBuyBox", { method: "GET" });
    if (error) return `Health error: ${error.message || error.status}`;
    return data?.ok ? "Health OK" : "Health unknown";
  } catch (e:any) {
    const msg = String(e?.message || e);
    if (msg === "supabase_not_configured") return "Supabase not configured (set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).";
    if (msg.includes("timeout")) return "Function timeout";
    return `Network error: ${msg}`;
  }
}