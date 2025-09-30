import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

interface FirmQueriesRequest {
  firmName: string;
  snapshot: string[];
}

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
  };
  text: string;
  missingKeys: string[];
}

interface FirmQueriesResponse {
  success: boolean;
  structuredQueries: StructuredQuery[];
  error?: string | null;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, authorization",
};

async function generateQueriesWithOpenAI(firmName: string, snapshot: string[]): Promise<StructuredQuery[]> {
  if (!OPENAI_API_KEY) {
    console.error("OpenAI API key not found");
    throw new Error("llm_unavailable");
  }

  const snapshotText = snapshot.join('\n');
  
  const prompt = `Based on this firm's recent activity, generate 3-4 structured real estate search queries.

Firm: ${firmName}
Recent Deals:
${snapshotText}

For each query, provide:
1. A title (short, descriptive)
2. An emoji representing the query type
3. Two bullet points highlighting key aspects
4. Structured fields (intent, assetType, market, units, sizeSf, budget, capRate, timing)
5. A natural language text version of the query
6. Missing keys that would improve the query

Return a JSON array of queries matching this schema:
{
  "queries": [
    {
      "id": "string (unique)",
      "title": "string",
      "emoji": "string (single emoji)",
      "bullets": ["string", "string"],
      "fields": {
        "intent": "string (acquisition/disposition/lease)",
        "assetType": "string (multifamily/office/industrial/retail/etc)",
        "market": "string (city or region)",
        "units": "string (range like 50-100)",
        "sizeSf": "string (range like ≥ 25k SF)",
        "budget": "string (range like ≤ $20M)",
        "capRate": "string (range like ≥ 6%)",
        "timing": "string (timeframe)"
      },
      "text": "string (natural language query)",
      "missingKeys": ["string array of field names that are empty/missing"]
    }
  ]
}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-1106",
        messages: [
          {
            role: "system",
            content: "You are a real estate analyst generating personalized search queries based on firm activity. Always return valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: {
          type: "json_object"
        },
        temperature: 0.3,
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

    const parsed = JSON.parse(content);
    return parsed.queries || [];
    
  } catch (error) {
    console.error("Error in OpenAI query generation:", error);
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
    let body: FirmQueriesRequest;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Invalid JSON in request:", error);
      return Response.json(
        { success: false, error: "Invalid JSON in request body", structuredQueries: [] },
        { status: 400, headers: corsHeaders }
      );
    }

    const { firmName, snapshot } = body;

    if (!firmName?.trim()) {
      return Response.json(
        { success: false, error: "firmName is required", structuredQueries: [] },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!snapshot || snapshot.length === 0) {
      return Response.json(
        { success: false, error: "snapshot is required", structuredQueries: [] },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log(`Generating queries for firm: ${firmName}`);

    const queries = await generateQueriesWithOpenAI(firmName, snapshot);

    console.log(`Generated ${queries.length} queries successfully`);

    const response: FirmQueriesResponse = {
      success: true,
      structuredQueries: queries,
      error: null
    };

    return Response.json(response, { headers: corsHeaders });

  } catch (error: any) {
    console.error("Error in firm-queries function:", error);
    
    const errorResponse: FirmQueriesResponse = {
      success: false,
      error: error.message === "llm_unavailable" ? "llm_unavailable" : "processing_error",
      structuredQueries: []
    };

    return Response.json(errorResponse, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
