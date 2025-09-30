// Deno Edge Function (server-side)
// Calls OpenAI and returns strict JSON with buyBox + prospects; never expose the key to browser.
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

function generateRandomContact() {
  const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Lisa", "James", "Maria"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
  };
}

function generateProspect(address: string, market: any) {
  const channels = {
    email: Math.random() > 0.2,
    sms: Math.random() > 0.5,
    call: Math.random() > 0.3,
    vm: Math.random() > 0.6
  };
  
  const notes = [
    "High-quality property in prime location",
    "Recently renovated with modern amenities",
    "Strong rental history and occupancy rates",
    "Excellent investment opportunity",
    "Well-maintained building with potential upside",
    "Strategic location near major transportation",
    "Value-add opportunity with proven track record"
  ];
  
  return {
    title: address,
    subtitle: address.split(',')[0] || address,
    market: market?.city || "Unknown",
    channels,
    note: notes[Math.floor(Math.random() * notes.length)],
    contact: generateRandomContact()
  };
}

function generateAddresses(market: any, count: number): string[] {
  const city = market?.city || "Unknown City";
  const state = market?.state || "";
  const country = market?.country || "";
  
  const streetNumbers = Array.from({ length: count }, () => Math.floor(Math.random() * 9000) + 1000);
  const streetNames = ["Main St", "Oak Ave", "Park Blvd", "Market St", "Broadway", "First Ave", "Second St", "Commerce Dr", "Industrial Way", "Harbor Rd"];
  const postalCodes = Array.from({ length: count }, () => Math.floor(Math.random() * 90000) + 10000);
  
  return streetNumbers.map((num, i) => {
    const street = streetNames[i % streetNames.length];
    const postal = postalCodes[i];
    return `${num} ${street}, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''} ${postal}`;
  });
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
  const buyBox = JSON.parse(content);
  
  // Generate prospects with addresses and random data
  const prospectAddresses = generateAddresses(buyBox.market, 3);
  const qualifiedAddresses = generateAddresses(buyBox.market, 2);
  const bookedAddresses = generateAddresses(buyBox.market, 1);
  
  const response = {
    buyBox,
    prospects: {
      prospects: prospectAddresses.map(addr => generateProspect(addr, buyBox.market)),
      qualified: qualifiedAddresses.map(addr => generateProspect(addr, buyBox.market)),
      booked: bookedAddresses.map(addr => generateProspect(addr, buyBox.market))
    }
  };
  
  return new Response(JSON.stringify(response), { status: 200, headers: { ...cors, "Content-Type": "application/json" } });
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