import React, { useState, useEffect } from "react";
import { parseBuyBox, checkHealth, type ParsedBuyBox } from "../lib/parserClient";
import { buildRefinePlan } from "../lib/buildRefinePlan";
import RefineBanner from "../components/RefineBanner";
import { generateProspects } from "../lib/generateProspects";
import PersonalizeBar from "../components/PersonalizeBar";
import PersonalizedPanel from "../components/PersonalizedPanel";
import SuggestedQueries from "../components/SuggestedQueries";
import VerifyBuyBox from "../components/VerifyBuyBox";
import PipelineBoard from "../components/PipelineBoard";
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
  const [needsVerify, setNeedsVerify] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
    setBusy(true); setErr(null); setDiag(null); setPlan(null); setParsed(null); setRows({prospects:[],qualified:[],booked:[]}); setNeedsVerify(false); setConfirmed(false);
    try{
      const res = await parseBuyBox(text);       // LLM-first (server-side)
      setParsed(res);
      const rp = buildRefinePlan(res);
      setPlan(rp.items.length ? rp : null);
      
      // Check if verification is needed
      const missingCore = !res.intent || !res.market?.city || !res.asset_type || (!res.units && !res.size_sf) || (!res.budget && !res.cap_rate);
      setNeedsVerify(missingCore);
      
      // Only generate prospects if not missing core fields
      if (!missingCore) {
        setConfirmed(true);
        setRows(generateProspects(res, text, 12));
      }
    }catch(e:any){
      const m = String(e?.message||e);
      if (m.includes("llm_unavailable") || m.includes("llm") || m.includes("model")) {
        setErr("LLM unavailable. Try again in a moment.");
      } else {
        setErr(m === "supabase_not_configured" ? "Supabase not configured. Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY." :
               m.startsWith("http-") ? `Server ${m.replace("http-","")}` :
               m.includes("timeout") ? "Function timeout." : "Network error or function unreachable.");
      }
      const h = await checkHealth(); setDiag(h);
    }finally{ setBusy(false); }
  }

  function onInsert(snippet:string){ setText(prev => (prev?.trim()? `${prev.trim()} ${snippet}` : snippet)); }

  function handleQuerySelect(query: string) {
    setText(query);
    // Auto-run the parser after selecting a query
    setTimeout(() => onParse(), 100);
  }

  function handleAddFragment(fragment: string) {
    setText(prev => prev ? `${prev} • ${fragment}` : fragment);
  }

  function handleConfirmParsed() {
    setConfirmed(true);
    setNeedsVerify(false);
    if (parsed) {
      setRows(generateProspects(parsed, text, 12));
    }
  }

  function handleEditParsed(updatedParsed: ParsedBuyBox) {
    setParsed(updatedParsed);
    // Check if still needs verification
    const missingCore = !updatedParsed.intent || !updatedParsed.market?.city || !updatedParsed.asset_type || (!updatedParsed.units && !updatedParsed.size_sf) || (!updatedParsed.budget && !updatedParsed.cap_rate);
    setNeedsVerify(missingCore);
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Cosmic grid background */}
      <div className="absolute inset-0 cosmic-grid opacity-30"></div>
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-20">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground">
            Deal Finder — Live Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            Type your criteria and find qualified targets instantly
          </p>
        </div>

        <PersonalizeBar onIntelReceived={setFirmIntel} />

        {firmIntel && (
          <div className="space-y-6 mb-8">
            <PersonalizedPanel intel={firmIntel} onQuerySelect={handleQuerySelect} />
            <SuggestedQueries 
              intel={firmIntel} 
              onQuerySelect={handleQuerySelect}
              onAddFragment={handleAddFragment}
            />
          </div>
        )}

        {/* Deal Input Section */}
        <div className="cosmic-card rounded-2xl p-6 mb-6 shadow-lg">
          <label className="block text-lg font-medium text-foreground mb-3">
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
            {err && (
              <div className="cosmic-card rounded-lg p-3 border-l-4 border-l-destructive bg-destructive/5">
                <div className="text-sm text-destructive">{err}</div>
                {diag && <div className="text-xs text-muted-foreground mt-1">Diagnostics: {diag}</div>}
              </div>
            )}
          </div>
        </div>

        <RefineBanner plan={plan} onInsert={onInsert} />

        {/* Verification Flow */}
        {parsed && needsVerify && !confirmed && (
          <VerifyBuyBox
            parsed={parsed}
            onConfirm={handleConfirmParsed}
            onEdit={handleEditParsed}
            onReparse={onParse}
          />
        )}

        {/* Parsed Results */}
        {parsed && (
          <div className="cosmic-card rounded-2xl p-6 mb-8 shadow-lg">
            <h2 className="text-xl font-medium text-foreground mb-4">Parsed Buy-Box</h2>
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
          </div>
        )}

        {/* Pipeline Board - Only show if confirmed */}
        {confirmed && rows.prospects.length > 0 && (
          <PipelineBoard rows={rows} onUpdateRows={setRows} />
        )}
      </div>
    </div>
  );
}