import React, { useState, useEffect } from "react";
import { parseBuyBox, checkHealth, type ParsedBuyBox } from "../lib/parserClient";
import { buildRefinePlan } from "../lib/buildRefinePlan";
import RefineBanner from "../components/RefineBanner";
import { generateProspects } from "../lib/generateProspects";
import PersonalizeBar from "../components/PersonalizeBar";
import PersonalizedPanel from "../components/PersonalizedPanel";
import type { FirmIntelResponse } from "../lib/firmIntelClient";

function isReadyForCRM(p: ParsedBuyBox | null) {
  if (!p) return false;
  const hasCore = !!p.intent && !!p.market && !!p.asset_type;
  const hasSize = !!p.units || !!p.size_sf;
  const hasMoney= !!p.budget || !!p.cap_rate;
  return hasCore && hasSize && hasMoney;
}

export default function Demo(){
  const [text,setText]=useState("");
  const [parsed,setParsed]=useState<ParsedBuyBox|null>(null);
  const [plan,setPlan]=useState<any>(null);
  const [busy,setBusy]=useState(false);
  const [err,setErr]=useState<string|null>(null);
  const [diag,setDiag]=useState<string|null>(null);
  const [rows,setRows]=useState({prospects:[],qualified:[],booked:[]});
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [firmIntel, setFirmIntel] = useState<FirmIntelResponse | null>(null);

  // Check for demo access on component mount
  useEffect(() => {
    const checkAccess = () => {
      try {
        const access = sessionStorage.getItem('demoAccess');
        if (access === 'granted') {
          setHasAccess(true);
        } else {
          // Redirect to home page if no access
          window.location.href = '/';
          return;
        }
      } catch (error) {
        // If sessionStorage is not available, redirect to home
        window.location.href = '/';
        return;
      }
      setIsChecking(false);
    };

    checkAccess();
  }, []);

  // Show loading while checking access
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  // Don't render the demo if user doesn't have access
  if (!hasAccess) {
    return null;
  }

  async function onParse(){
    setBusy(true); setErr(null); setDiag(null); setPlan(null); setParsed(null); setRows({prospects:[],qualified:[],booked:[]});
    try{
      const res = await parseBuyBox(text);       // LLM-first (server-side)
      setParsed(res);
      const rp = buildRefinePlan(res);
      setPlan(rp.items.length ? rp : null);
      if (isReadyForCRM(res)) setRows(generateProspects(res, text, 12));
    }catch(e:any){
      const m = String(e?.message||e);
      setErr(m === "supabase_not_configured" ? "Supabase not configured. Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY." :
             m.startsWith("http-") ? `Server ${m.replace("http-","")}` :
             m.includes("timeout") ? "Function timeout." : "Network error or function unreachable.");
      const h = await checkHealth(); setDiag(h);
    }finally{ setBusy(false); }
  }

  function onInsert(snippet:string){ setText(prev => (prev?.trim()? `${prev.trim()} ${snippet}` : snippet)); }

  function handleQuerySelect(query: string) {
    setText(query);
    // Auto-run the parser after selecting a query
    setTimeout(() => onParse(), 100);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-semibold">Deal Finder — Live Demo</h1>

      <PersonalizeBar onIntelReceived={setFirmIntel} />

      {firmIntel && (
        <PersonalizedPanel intel={firmIntel} onQuerySelect={handleQuerySelect} />
      )}

      <textarea value={text} onChange={(e)=>setText(e.target.value)}
        placeholder='Type any mandate. Examples: "Multifamily 80–100 units in Austin; loan maturing ≤6 months; budget ≤ $20M" • "Industrial warehouses in Atlanta; 60k–120k SF; cap ≥ 6%" • "Construction vendor: owners with recent land permits in Dallas".'
        className="h-28 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100 outline-none" />

      <div className="mt-3 flex items-center gap-3">
        <button onClick={onParse} disabled={busy} className="rounded-lg bg-neutral-100 px-4 py-2 text-neutral-900 hover:bg-white disabled:opacity-50">
          {busy? "Parsing…" : "Parse Criteria"}
        </button>
        {err && <div className="text-sm text-red-300">{err}</div>}
        {diag && <div className="text-xs text-neutral-400">Diagnostics: {diag}</div>}
      </div>

      <RefineBanner plan={plan} onInsert={onInsert} />

      <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
        <div className="mb-3 text-lg font-medium text-neutral-100">Parsed Buy-Box</div>
        {parsed ? (
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-neutral-300">
            <div><b>Intent:</b> {parsed.intent ?? "-"}</div>
            <div><b>Asset Type:</b> {parsed.asset_type ?? parsed.asset ?? "-"}</div>
            <div><b>Market:</b> {parsed.market?.city ? `${parsed.market.city}${parsed.market?.state? ", "+parsed.market.state:""}${parsed.market?.country? ", "+parsed.market.country:""}` : "-"}</div>
            <div><b>Units:</b> {parsed.units ? `${parsed.units.min ?? ""}${parsed.units.min?"–":""}${parsed.units.max ?? ""}` : "-"}</div>
            <div><b>Size (SF):</b> {parsed.size_sf ? `${parsed.size_sf.min ?? ""}${parsed.size_sf.min?"–":""}${parsed.size_sf.max ?? ""}` : "-"}</div>
            <div><b>Budget:</b> {parsed.budget?.max ? `≤ $${Number(parsed.budget.max).toLocaleString()}` : (parsed.budget?.min ? `$${Number(parsed.budget.min).toLocaleString()}+` : "-")}</div>
            <div><b>Cap Rate:</b> {parsed.cap_rate?.min ? `≥ ${parsed.cap_rate.min}%` : (parsed.cap_rate?.max ? `≤ ${parsed.cap_rate.max}%` : "-")}</div>
            <div><b>Timing/Notes:</b> {parsed.timing ?? "-"}</div>
          </div>
        ) : <div className="text-sm text-neutral-400">Nothing parsed yet.</div>}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div>
          <div className="mb-2 text-sm font-semibold text-neutral-200">Prospected</div>
          <div className="space-y-2">
            {rows.prospects.map((p:any,i:number)=>(
              <div key={`p-${i}`} className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                <div className="text-sm font-medium text-neutral-100">{p.title}</div>
                <div className="text-xs text-neutral-400">{p.subtitle}</div>
                <div className="mt-1 text-[11px] text-neutral-400">{p.contact?.name} — {p.contact?.email} — {p.contact?.phone}</div>
                <div className="mt-2 text-xs">
                  <span className={p.channels.email ? "text-green-400":"text-red-400"}>email</span> ·
                  <span className={p.channels.sms   ? "text-green-400":"text-red-400"}> sms</span> ·
                  <span className={p.channels.vm    ? "text-green-400":"text-red-400"}> vm</span> ·
                  <span className={p.channels.call  ? "text-green-400":"text-red-400"}> call</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold text-neutral-200">Qualified Target</div>
          <div className="space-y-2">
            {rows.qualified.map((p:any,i:number)=>(
              <div key={`q-${i}`} className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                <div className="text-sm font-medium text-neutral-100">{p.title}</div>
                <div className="text-xs text-neutral-400">{p.subtitle}</div>
                <div className="mt-1 text-[11px] text-neutral-400">{p.contact?.name} — {p.contact?.email} — {p.contact?.phone}</div>
                <div className="mt-2 text-xs">
                  <span className={p.channels.email ? "text-green-400":"text-red-400"}>email</span> ·
                  <span className={p.channels.sms   ? "text-green-400":"text-red-400"}> sms</span> ·
                  <span className={p.channels.vm    ? "text-green-400":"text-red-400"}> vm</span> ·
                  <span className={p.channels.call  ? "text-green-400":"text-red-400"}> call</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold text-neutral-200">Meeting Booked</div>
          <div className="space-y-2">
            {rows.booked.map((p:any,i:number)=>(
              <div key={`b-${i}`} className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                <div className="text-sm font-medium text-neutral-100">{p.title}</div>
                <div className="text-xs text-neutral-400">{p.subtitle}</div>
                <div className="mt-1 text-[11px] text-neutral-400">{p.contact?.name} — {p.contact?.email} — {p.contact?.phone}</div>
                <div className="mt-2 text-xs">
                  <span className={p.channels.email ? "text-green-400":"text-red-400"}>email</span> ·
                  <span className={p.channels.sms   ? "text-green-400":"text-red-400"}> sms</span> ·
                  <span className={p.channels.vm    ? "text-green-400":"text-red-400"}> vm</span> ·
                  <span className={p.channels.call  ? "text-green-400":"text-red-400"}> call</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button disabled={!isReadyForCRM(parsed)} className={`rounded-lg px-4 py-2 ${isReadyForCRM(parsed) ? "bg-green-500 text-neutral-900 hover:bg-green-400" : "bg-neutral-800 text-neutral-500"}`}>
          Send to CRM
        </button>
        {!isReadyForCRM(parsed) && <div className="mt-2 text-xs text-neutral-500">Need: intent + market + asset + (units or SF) + (budget or cap). Use the refine chips above.</div>}
      </div>
    </div>
  );
}