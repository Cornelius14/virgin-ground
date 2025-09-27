import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Set your OpenAI API key in Supabase Edge Function Environment Variables
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
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    console.log(`Failed to fetch ${url}:`, error);
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
    try {
      new URL(fallbackUrl);
      // Test if fallback URL is accessible
      const response = await fetchWithTimeout(fallbackUrl, 5000);
      if (response?.ok) {
        return fallbackUrl;
      }
    } catch (error) {
      console.log("Fallback URL invalid:", error);
    }
  }

  const normalized = normalizeFirmName(firmName);
  const candidates = [
    `https://${normalized}.com`,
    `https://www.${normalized}.com`,
    `https://${normalized}.net`,
    `https://www.${normalized}.net`,
  ];

  for (const url of candidates) {
    try {
      const response = await fetchWithTimeout(url, 3000);
      if (response?.ok) {
        console.log(`Successfully resolved: ${url}`);
        return url;
      }
    } catch (error) {
      console.log(`Failed to resolve ${url}:`, error);
    }
  }

  return null;
}

function extractLogoUrl(html: string, baseUrl: string): string | null {
  const logoPatterns = [
    /<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["']/i,
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i,
  ];

  for (const pattern of logoPatterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      try {
        const logoUrl = new URL(match[1], baseUrl).href;
        return logoUrl;
      } catch (error) {
        console.log("Invalid logo URL:", match[1]);
        continue;
      }
    }
  }

  // Try favicon.ico as fallback
  try {
    return new URL("/favicon.ico", baseUrl).href;
  } catch {
    return null;
  }
}

async function scrapeFirmData(firmUrl: string): Promise<{ html: string; logoUrl: string | null }> {
  const pages = [
    firmUrl,
    `${firmUrl}/about`,
    `${firmUrl}/news`,
    `${firmUrl}/press`,
    `${firmUrl}/company`,
  ];

  let combinedHtml = "";
  let logoUrl: string | null = null;
  let successfulPages = 0;

  for (const pageUrl of pages) {
    if (successfulPages >= 3) break; // Limit to 3 pages max
    
    try {
      const response = await fetchWithTimeout(pageUrl, 6000);
      if (response?.ok) {
        const html = await response.text();
        if (html && html.length > 100) { // Basic validation
          combinedHtml += `\n\n--- Page: ${pageUrl} ---\n${html.substring(0, 10000)}`;
          successfulPages++;
          
          // Extract logo from first successful page
          if (!logoUrl) {
            logoUrl = extractLogoUrl(html, firmUrl);
          }
        }
      }
    } catch (error) {
      console.log(`Error scraping ${pageUrl}:`, error);
    }
  }

  return { html: combinedHtml, logoUrl };
}

function createTextBundle(html: string, firmUrl: string): string {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch?.[1]?.trim() || "";

  // Extract meta description
  const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const description = metaMatch?.[1]?.trim() || "";

  // Extract visible text (more robust cleaning)
  let textContent = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-zA-Z0-9#]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Limit content size to prevent token overflow
  textContent = textContent.substring(0, 12000);

  return `URL: ${firmUrl}\nTitle: ${title}\nDescription: ${description}\nContent: ${textContent}`;
}

// Simplified schema to avoid complex nested validation
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

async function analyzeWithOpenAI(textBundle: string, firmName: string): Promise<any> {
  if (!OPENAI_API_KEY) {
    console.error("OpenAI API key not found");
    throw new Error("llm_unavailable");
  }

  const prompt = `Analyze this real estate firm's website data for "${firmName}" and extract:

1. Recent transactions/deals (up to 5) with specific details
2. Investment criteria and preferences based on their activity
3. A 2-3 bullet snapshot of recent notable activity
4. 4-6 personalized search queries for deal sourcing

Focus on concrete deals, press releases, and transaction history. Each snapshot bullet should reference the source domain.

Website data:
${textBundle}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-1106", // More stable model
        messages: [
          {
            role: "system",
            content: "You are a real estate market analyst. Extract structured data about firms' transactions and investment preferences. Always return valid JSON matching the exact schema. If information is not available, use reasonable defaults or empty arrays."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: {
          type: "json_object"
        },
        temperature: 0.2,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      throw new Error("llm_unavailable");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in OpenAI response");
    }

    return JSON.parse(content);
    
  } catch (error) {
    console.error("Error in OpenAI analysis:", error);
    throw new Error("llm_unavailable");
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }), 
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    let body: FirmIntelRequest;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Invalid JSON in request:", error);
      return Response.json(
        { error: "Invalid JSON in request body" },
        { status: 400, headers: corsHeaders }
      );
    }

    const { firmName, fallbackUrl } = body;

    if (!firmName?.trim()) {
      return Response.json(
        { error: "firmName is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log(`Processing request for firm: ${firmName}`);

    // Resolve firm URL
    const firmUrl = await resolveFirmUrl(firmName, fallbackUrl);
    if (!firmUrl) {
      console.log(`Could not resolve URL for firm: ${firmName}`);
      return Response.json(
        { 
          needsInput: "url",
          error: "Could not find firm website automatically. Please provide a fallbackUrl."
        },
        { headers: corsHeaders }
      );
    }

    console.log(`Resolved firm URL: ${firmUrl}`);

    // Scrape firm data
    const { html, logoUrl } = await scrapeFirmData(firmUrl);
    if (!html.trim()) {
      console.log(`No content scraped from: ${firmUrl}`);
      return Response.json(
        { error: "Could not access or parse website content" },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log(`Successfully scraped content (${html.length} chars) from: ${firmUrl}`);

    // Create text bundle and analyze
    const textBundle = createTextBundle(html, firmUrl);
    const analysis = await analyzeWithOpenAI(textBundle, firmName);

    console.log("OpenAI analysis completed successfully");

    const response: FirmIntelResponse = {
      firmUrl,
      logoUrl,
      brandColor: null,
      snapshot: analysis.snapshot || [`${firmName} investment activity analysis (source: ${new URL(firmUrl).hostname})`],
      transactions: analysis.transactions || [],
      criteria: analysis.criteria || {
        role: "investor",
        assets: ["office", "industrial", "retail"],
        markets: ["major metros"],
        size_bands: ["50K-200K SF"],
        price_bands: ["$10M-$50M"],
        timing_hints: ["6-12 months"]
      },
      queries: analysis.queries || [
        `${firmName} preferred asset types`,
        `Off-market opportunities in ${firmName} target markets`,
        `Value-add deals matching ${firmName} criteria`,
        `Industrial properties for institutional buyers`
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