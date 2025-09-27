import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Set your OpenAI API key in Supabase Edge Function Secrets as OPENAI_API_KEY
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

interface FirmIntelRequest {
  firmName: string;
  fallbackUrl?: string;
}

interface FirmTransaction {
  type: string;
  asset_type: string;
  market: string;
  size?: string;
  value?: string;
  date?: string;
  headline: string;
  url?: string;
}

interface FirmCriteria {
  role: string;
  assets: string[];
  markets: string[];
  size_bands: string[];
  price_bands: string[];
  timing_hints: string[];
}

interface FirmIntelResponse {
  firmUrl?: string | null;
  logoUrl?: string | null;
  brandColor?: string | null;
  snapshot: string[];
  transactions: FirmTransaction[];
  criteria: FirmCriteria;
  queries: string[];
  needsInput?: "url";
  error?: string | null;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, authorization",
};

async function fetchWithTimeout(url: string, timeout = 5000): Promise<Response | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FirmIntel/1.0)",
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

function normalizeFirmName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

async function resolveFirmUrl(firmName: string, fallbackUrl?: string): Promise<string | null> {
  if (fallbackUrl) {
    // Validate the fallback URL
    try {
      new URL(fallbackUrl);
      return fallbackUrl;
    } catch {
      return null;
    }
  }

  const normalized = normalizeFirmName(firmName);
  const candidates = [
    `https://${normalized}.com`,
    `https://www.${normalized}.com`,
  ];

  for (const url of candidates) {
    const response = await fetchWithTimeout(url, 3000);
    if (response?.ok) {
      return url;
    }
  }

  return null;
}

function extractLogoUrl(html: string, baseUrl: string): string | null {
  const logoPatterns = [
    /<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["']/i,
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
  ];

  for (const pattern of logoPatterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      try {
        return new URL(match[1], baseUrl).href;
      } catch {
        continue;
      }
    }
  }

  // Try favicon.ico as fallback
  try {
    const faviconUrl = new URL("/favicon.ico", baseUrl).href;
    return faviconUrl;
  } catch {
    return null;
  }
}

async function scrapeFirmData(firmUrl: string): Promise<{ html: string; logoUrl: string | null }> {
  const pages = [
    firmUrl,
    `${firmUrl}/news`,
    `${firmUrl}/press`,
    `${firmUrl}/about`,
    `${firmUrl}/company`,
  ];

  let combinedHtml = "";
  let logoUrl: string | null = null;

  for (let i = 0; i < Math.min(pages.length, 3); i++) {
    const response = await fetchWithTimeout(pages[i], 4000);
    if (response?.ok) {
      const html = await response.text();
      combinedHtml += `\n\n--- Page: ${pages[i]} ---\n${html}`;
      
      // Extract logo from first successful page
      if (!logoUrl) {
        logoUrl = extractLogoUrl(html, firmUrl);
      }
    }
  }

  return { html: combinedHtml, logoUrl };
}

function createTextBundle(html: string, firmUrl: string): string {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch?.[1]?.trim() || "";

  // Extract visible text (simplified)
  const textContent = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return `URL: ${firmUrl}\nTitle: ${title}\nContent: ${textContent.substring(0, 8000)}`;
}

const ANALYSIS_SCHEMA = {
  type: "object",
  properties: {
    transactions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string" },
          asset_type: { type: "string" },
          market: { type: "string" },
          size: { type: "string" },
          value: { type: "string" },
          date: { type: "string" },
          headline: { type: "string" },
          url: { type: "string" }
        },
        required: ["type", "asset_type", "market", "headline"]
      }
    },
    criteria: {
      type: "object",
      properties: {
        role: { type: "string" },
        assets: { type: "array", items: { type: "string" } },
        markets: { type: "array", items: { type: "string" } },
        size_bands: { type: "array", items: { type: "string" } },
        price_bands: { type: "array", items: { type: "string" } },
        timing_hints: { type: "array", items: { type: "string" } }
      },
      required: ["role", "assets", "markets", "size_bands", "price_bands", "timing_hints"]
    },
    snapshot: {
      type: "array",
      items: { type: "string" }
    },
    queries: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["transactions", "criteria", "snapshot", "queries"]
};

async function analyzeWithOpenAI(textBundle: string): Promise<any> {
  if (!OPENAI_API_KEY) {
    throw new Error("llm_unavailable");
  }

  const prompt = `Analyze this real estate firm's website data and extract:

1. Recent transactions/deals (up to 5) with details
2. Investment criteria and preferences 
3. A 2-3 bullet snapshot of recent activity
4. 4-6 personalized query suggestions for deal sourcing

Focus on actual deals, press releases, and transaction history. Each snapshot bullet should end with "(source: domain.com)".

Website data:
${textBundle}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a real estate market analyst. Extract structured data about firms' transactions and preferences. Always return valid JSON matching the exact schema."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "firm_analysis",
          schema: ANALYSIS_SCHEMA
        }
      },
      temperature: 0.3,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    throw new Error("llm_unavailable");
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const body: FirmIntelRequest = await req.json();
    const { firmName, fallbackUrl } = body;

    if (!firmName?.trim()) {
      return Response.json(
        { error: "firmName is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Resolve firm URL
    const firmUrl = await resolveFirmUrl(firmName, fallbackUrl);
    if (!firmUrl) {
      return Response.json(
        { needsInput: "url" },
        { headers: corsHeaders }
      );
    }

    // Scrape firm data
    const { html, logoUrl } = await scrapeFirmData(firmUrl);
    if (!html.trim()) {
      return Response.json(
        { error: "Could not access website" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create text bundle and analyze
    const textBundle = createTextBundle(html, firmUrl);
    const analysis = await analyzeWithOpenAI(textBundle);

    const response: FirmIntelResponse = {
      firmUrl,
      logoUrl,
      brandColor: null, // Could be extracted from CSS/images in future
      snapshot: analysis.snapshot || [],
      transactions: analysis.transactions || [],
      criteria: analysis.criteria || {
        role: "investor",
        assets: ["office", "industrial"],
        markets: ["major metros"],
        size_bands: ["50k-200k SF"],
        price_bands: ["$10M-$50M"],
        timing_hints: ["immediate"]
      },
      queries: analysis.queries || [
        `${firmName} target assets in primary markets`,
        "Off-market opportunities matching recent deals"
      ]
    };

    return Response.json(response, { headers: corsHeaders });

  } catch (error: any) {
    console.error("Error in firm-intel function:", error);
    
    const errorResponse: FirmIntelResponse = {
      error: error.message === "llm_unavailable" ? "llm_unavailable" : "processing_error",
      snapshot: [],
      transactions: [],
      criteria: {
        role: "",
        assets: [],
        markets: [],
        size_bands: [],
        price_bands: [],
        timing_hints: []
      },
      queries: []
    };

    return Response.json(errorResponse, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});