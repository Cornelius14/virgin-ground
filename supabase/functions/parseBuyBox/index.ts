// Deno Edge Function (server-side)
// Calls OpenAI and returns strict JSON; never expose the key to browser.
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
};

function schemaPrompt(text: string) {
  return `
Turn the following real-estate mandate into STRICT JSON. Only return JSON, no prose.

Schema (nulls allowed):
{
  "intent": "acquisition|refinance|lease|ground_lease|sale_leaseback|mezz|equity|construction|title|management|other|null",
  "role": "buyer|seller|borrower|lender|developer|tenant|landlord|broker|null",
  "market": {"city": null, "state": null, "country": null},
  "asset_type": "multifamily|industrial|warehouse|retail|office|land|hotel|self_storage|data_center|mixed_use|single_family|other|null",
  "units": {"min": null, "max": null},
  "size_sf": {"min": null, "max": null},
  "budget": {"min": null, "max": null},
  "cap_rate": {"min": null, "max": null},
  "timing": "string|null",
  "missing": [] // list only the fields you could not infer (e.g. ["market","budget"])
}

Input: """${text}"""
If ambiguous, fill what you can and list missing fields in "missing".
`.trim();
}

async function openai(text: string) {
  const key = Deno.env.get("OPENAI_API_KEY");
  if (!key) {
    return new Response(JSON.stringify({ error: "missing_openai_key" }), { status: 500, headers: cors });
  }

  const body = {
    model: "gpt-4o-mini",
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "You convert real-estate mandates into strict JSON. Output JSON only." },
      { role: "user",   content: schemaPrompt(text) }
    ]
  };

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const err = await r.text();
    return new Response(JSON.stringify({ error: "openai_error", detail: err }), { status: 502, headers: cors });
  }

  const data = await r.json();
  const content = data?.choices?.[0]?.message?.content || "{}";
  return new Response(content, { status: 200, headers: { ...cors, "Content-Type": "application/json" } });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const url = new URL(req.url);
  if (req.method === "GET" && url.pathname === "/") {
    return new Response(JSON.stringify({ ok: true, service: "parseBuyBox" }), { headers: { ...cors, "Content-Type": "application/json" } });
  }
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers: cors });

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "text_required" }), { status: 400, headers: cors });
    }
    return await openai(text);
  } catch (e) {
    return new Response(JSON.stringify({ error: "server_error", detail: String(e) }), { status: 500, headers: cors });
  }
});