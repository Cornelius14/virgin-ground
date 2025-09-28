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
import CriteriaEditModal from "../components/CriteriaEditModal";
import { Button } from "../components/ui/button";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [finalCriteriaText, setFinalCriteriaText] = useState("");

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

  function onParse(){
    // Don't call API - just show verification step
    setBusy(false); setErr(null); setDiag(null); setPlan(null); setRows({prospects:[],qualified:[],booked:[]}); setNeedsVerify(true); setConfirmed(false);
    
    // Create mock parsed data from text for verification
    const mockParsed: ParsedBuyBox = {
      intent: extractField(text, ['intent:', 'Intent:']),
      market: { 
        city: extractField(text, ['market:', 'Market:', 'in ']),
        state: null,
        country: null
      },
      asset_type: extractField(text, ['asset type:', 'Asset Type:', 'asset:']),
      units: parseRange(extractField(text, ['units:', 'Units:'])),
      size_sf: parseRange(extractField(text, ['size:', 'Size:', 'sf:', 'SF:'])),
      budget: parseRange(extractField(text, ['budget:', 'Budget:', '$'])),
      cap_rate: parseRange(extractField(text, ['cap rate:', 'Cap Rate:', 'cap:', '≥', '>='])),
      timing: extractField(text, ['timing:', 'Timing:', 'notes:', 'Notes:']),
      missing: []
    };
    
    setParsed(mockParsed);
    const rp = buildRefinePlan(mockParsed);
    setPlan(rp.items.length ? rp : null);
  }
  
  function extractField(text: string, patterns: string[]): string | undefined {
    for (const pattern of patterns) {
      const regex = new RegExp(`${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*([^•]+)`, 'i');
      const match = text.match(regex);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    return undefined;
  }
  
  function parseRange(text: string | undefined): { min?: number | null; max?: number | null } | null {
    if (!text) return null;
    
    // Look for ranges like "50-100", "≤ $20M", "≥ 6%"
    const rangeMatch = text.match(/(\d+)\s*[-–]\s*(\d+)/);
    if (rangeMatch) {
      return { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
    }
    
    const maxMatch = text.match(/[≤<=]\s*\$?(\d+)/);
    if (maxMatch) {
      return { min: null, max: parseInt(maxMatch[1]) };
    }
    
    const minMatch = text.match(/[≥>=]\s*(\d+)/);
    if (minMatch) {
      return { min: parseInt(minMatch[1]), max: null };
    }
    
    const singleMatch = text.match(/(\d+)/);
    if (singleMatch) {
      return { min: parseInt(singleMatch[1]), max: null };
    }
    
    return null;
  }

  function onInsert(snippet:string){ setText(prev => (prev?.trim()? `${prev.trim()} ${snippet}` : snippet)); }

  function handleQuerySelect(query: string) {
    setText(query);
    // Don't auto-run parser - user needs to click Parse
  }

  function handleAddFragment(fragment: string) {
    setText(prev => prev ? `${prev} • ${fragment}` : fragment);
  }

  async function handleConfirmParsed() {
    setBusy(true);
    try {
      // Now call the actual API with the verified data
      const res = await parseBuyBox(text);
      setParsed(res);
      setConfirmed(true);
      setNeedsVerify(false);
      setRows(generateProspects(res, text, 12));
    } catch(e:any) {
      const m = String(e?.message||e);
      if (m.includes("llm_unavailable") || m.includes("llm") || m.includes("model")) {
        setErr("LLM unavailable. Try again in a moment.");
      } else {
        setErr(m === "supabase_not_configured" ? "Supabase not configured. Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY." :
               m.startsWith("http-") ? `Server ${m.replace("http-","")}` :
               m.includes("timeout") ? "Function timeout." : "Network error or function unreachable.");
      }
      const h = await checkHealth(); 
      setDiag(h);
    } finally {
      setBusy(false);
    }
  }

  function handleEditParsed(updatedParsed: ParsedBuyBox) {
    setParsed(updatedParsed);
    // Check if still needs verification
    const missingCore = !updatedParsed.intent || !updatedParsed.market?.city || !updatedParsed.asset_type || (!updatedParsed.units && !updatedParsed.size_sf) || (!updatedParsed.budget && !updatedParsed.cap_rate);
    setNeedsVerify(missingCore);
  }

  function handleModalConfirm(criteriaText: string, parsed: ParsedBuyBox) {
    setFinalCriteriaText(criteriaText);
    setParsed(parsed);
    setConfirmed(true);
    setNeedsVerify(false);
    setRows(generateProspects(parsed, criteriaText, 12));
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Cosmic grid background */}
      <div className="absolute inset-0 cosmic-grid opacity-30"></div>
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-20">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground">
            Deal Finder — Live Demo
          </h1>
          <p className="text-muted-foreground text-xl">
            Type your criteria and find qualified targets instantly
          </p>
        </div>

        <PersonalizeBar onIntelReceived={setFirmIntel} />

        {firmIntel && (
          <div className="space-y-6 mb-8">
            <PersonalizedPanel intel={firmIntel} onQuerySelect={handleQuerySelect} />
          </div>
        )}

        {/* Deal Criteria Display Section */}
        <div className="cosmic-card rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground">Deal Criteria</h2>
            <Button 
              onClick={() => setModalOpen(true)}
              variant="outline"
              className="text-sm"
            >
              Edit/Confirm Criteria
            </Button>
          </div>
          
          {finalCriteriaText ? (
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-line bg-muted/50 rounded-xl p-4">
              {finalCriteriaText.replace(/•/g, '\n•')}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">
              Click "Edit/Confirm Criteria" to set your deal parameters
            </div>
          )}
        </div>

        {/* Verification Flow */}
        {parsed && needsVerify && !confirmed && (
          <VerifyBuyBox
            parsed={parsed}
            onConfirm={handleConfirmParsed}
            onEdit={handleEditParsed}
            onReparse={onParse}
          />
        )}

        {/* Parsed Results - Only show grid after confirmation */}
        {parsed && confirmed && (
          <div className="cosmic-card rounded-2xl p-6 mb-8 shadow-lg">
            <h2 className="text-2xl font-medium tracking-tight text-foreground mb-6">Parsed Buy-Box</h2>
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

        {/* Criteria Edit Modal */}
        <CriteriaEditModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialCriteria={text}
          onConfirm={handleModalConfirm}
        />
      </div>
    </div>
  );
}