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
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Cosmic grid background */}
      <div className="absolute inset-0 cosmic-grid opacity-30"></div>
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-20">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Deal Finder — Live Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            Type your criteria and find qualified targets instantly
          </p>
        </div>

        <PersonalizeBar onIntelReceived={setFirmIntel} />

        {firmIntel && (
          <PersonalizedPanel intel={firmIntel} onQuerySelect={handleQuerySelect} />
        )}

        {/* Deal Input Section */}
        <div className="cosmic-card rounded-2xl p-6 mb-6 shadow-lg">
          <label className="block text-sm font-medium text-foreground mb-3">
            Deal Criteria
          </label>
          <textarea 
            value={text} 
            onChange={(e)=>setText(e.target.value)}
            placeholder='Type any mandate. Examples: "Multifamily 80–100 units in Austin; loan maturing ≤6 months; budget ≤ $20M" • "Industrial warehouses in Atlanta; 60k–120k SF; cap ≥ 6%" • "Construction vendor: owners with recent land permits in Dallas".'
            className="w-full h-28 rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
          />

          <div className="mt-4 flex items-center gap-3">
            <button 
              onClick={onParse} 
              disabled={busy} 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
            >
              {busy? "Parsing…" : "Parse Criteria"}
            </button>
            {err && <div className="text-sm text-destructive">{err}</div>}
            {diag && <div className="text-xs text-muted-foreground">Diagnostics: {diag}</div>}
          </div>
        </div>

        <RefineBanner plan={plan} onInsert={onInsert} />

        {/* Parsed Results */}
        <div className="cosmic-card rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-medium text-foreground mb-4">Parsed Buy-Box</h2>
          {parsed ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div><span className="font-medium text-foreground">Intent:</span> <span className="text-muted-foreground">{parsed.intent ?? "-"}</span></div>
              <div><span className="font-medium text-foreground">Asset Type:</span> <span className="text-muted-foreground">{parsed.asset_type ?? parsed.asset ?? "-"}</span></div>
              <div><span className="font-medium text-foreground">Market:</span> <span className="text-muted-foreground">{parsed.market?.city ? `${parsed.market.city}${parsed.market?.state? ", "+parsed.market.state:""}${parsed.market?.country? ", "+parsed.market.country:""}` : "-"}</span></div>
              <div><span className="font-medium text-foreground">Units:</span> <span className="text-muted-foreground">{parsed.units ? `${parsed.units.min ?? ""}${parsed.units.min?"–":""}${parsed.units.max ?? ""}` : "-"}</span></div>
              <div><span className="font-medium text-foreground">Size (SF):</span> <span className="text-muted-foreground">{parsed.size_sf ? `${parsed.size_sf.min ?? ""}${parsed.size_sf.min?"–":""}${parsed.size_sf.max ?? ""}` : "-"}</span></div>
              <div><span className="font-medium text-foreground">Budget:</span> <span className="text-muted-foreground">{parsed.budget?.max ? `≤ $${Number(parsed.budget.max).toLocaleString()}` : (parsed.budget?.min ? `$${Number(parsed.budget.min).toLocaleString()}+` : "-")}</span></div>
              <div><span className="font-medium text-foreground">Cap Rate:</span> <span className="text-muted-foreground">{parsed.cap_rate?.min ? `≥ ${parsed.cap_rate.min}%` : (parsed.cap_rate?.max ? `≤ ${parsed.cap_rate.max}%` : "-")}</span></div>
              <div><span className="font-medium text-foreground">Timing/Notes:</span> <span className="text-muted-foreground">{parsed.timing ?? "-"}</span></div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Nothing parsed yet.</div>
          )}
        </div>

        {/* CRM Pipeline */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-foreground mb-2">Deal Pipeline</h2>
            <p className="text-muted-foreground">Prospects → Qualified Targets → Meetings Booked</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">Prospected</h3>
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{rows.prospects.length}</span>
              </div>
              <div className="space-y-3">
                {rows.prospects.map((p:any,i:number)=>(
                  <div key={`p-${i}`} className="cosmic-card rounded-xl p-4 shadow-sm">
                    <div className="text-sm font-medium text-foreground">{p.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.subtitle}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{p.contact?.name} — {p.contact?.email} — {p.contact?.phone}</div>
                    <div className="mt-3 flex gap-1">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.email ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>email</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.sms ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>sms</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.vm ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>vm</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.call ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>call</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">Qualified Target</h3>
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{rows.qualified.length}</span>
              </div>
              <div className="space-y-3">
                {rows.qualified.map((p:any,i:number)=>(
                  <div key={`q-${i}`} className="cosmic-card rounded-xl p-4 shadow-sm">
                    <div className="text-sm font-medium text-foreground">{p.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.subtitle}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{p.contact?.name} — {p.contact?.email} — {p.contact?.phone}</div>
                    <div className="mt-3 flex gap-1">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.email ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>email</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.sms ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>sms</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.vm ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>vm</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.call ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>call</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">Meeting Booked</h3>
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{rows.booked.length}</span>
              </div>
              <div className="space-y-3">
                {rows.booked.map((p:any,i:number)=>(
                  <div key={`b-${i}`} className="cosmic-card rounded-xl p-4 shadow-sm">
                    <div className="text-sm font-medium text-foreground">{p.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.subtitle}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{p.contact?.name} — {p.contact?.email} — {p.contact?.phone}</div>
                    <div className="mt-3 flex gap-1">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.email ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>email</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.sms ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>sms</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.vm ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>vm</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.channels.call ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>call</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CRM Action */}
        <div className="mt-8 text-center">
          <button 
            disabled={!isReadyForCRM(parsed)} 
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 ${isReadyForCRM(parsed) ? "bg-green-600 text-white hover:bg-green-700" : "bg-muted text-muted-foreground"}`}
          >
            Send to CRM
          </button>
          {!isReadyForCRM(parsed) && (
            <div className="mt-3 text-xs text-muted-foreground max-w-md mx-auto">
              Need: intent + market + asset + (units or SF) + (budget or cap). Use the refine chips above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}