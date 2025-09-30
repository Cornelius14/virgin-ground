import React, { useState, useEffect } from "react";
import { parseBuyBox, checkHealth, type ParsedBuyBox, type ApiResponse } from "../lib/parserClient";
import { buildRefinePlan } from "../lib/buildRefinePlan";
import RefineBanner from "../components/RefineBanner";
import { generateProspects } from "../lib/generateProspects";
import PersonalizeBar from "../components/PersonalizeBar";
import PersonalizedPanel from "../components/PersonalizedPanel";
import SuggestedQueries from "../components/SuggestedQueries";

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
  
  const [confirmed, setConfirmed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [finalCriteriaText, setFinalCriteriaText] = useState("");
  
  function handleReset() {
    setParsed(null);
    setConfirmed(false);
    setRows({prospects:[],qualified:[],booked:[]});
    setErr(null);
    setDiag(null);
    setPlan(null);
  }

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
    console.log('🔥 CONFIRM BUTTON CLICKED - onParse function started');
    setBusy(true);
    setErr(null);
    setDiag(null);
    setPlan(null);
    setRows({prospects:[],qualified:[],booked:[]});
    
    setConfirmed(false);
    
    try {
      // Build full text from company info + deal criteria
      const segments: string[] = [];
      if (firmIntel) {
        const companySnippet = `Company: ${firmIntel.firmName || ''} ${firmIntel.snapshot?.join(' ') || ''}`.trim();
        if (companySnippet) segments.push(companySnippet);
      }
      if (finalCriteriaText && finalCriteriaText.trim()) {
        segments.push(finalCriteriaText.trim());
      }
      const fullText = segments.join(' • ');
      
      // Validate that we have text to send
      if (!fullText || fullText.trim().length === 0) {
        setErr("Please set your deal criteria before confirming.");
        setBusy(false);
        return;
      }
      
      console.log('📝 Full text to be sent to API:', fullText);
      console.log('📦 Full text length:', fullText.length);
      
      // Call the parseBuyBox API directly
      console.log('🚀 About to call parseBuyBox API...');
      const res = await parseBuyBox(fullText);
      console.log('✅ API response received:', res);
      
      // Handle new API response format with fallback
      let buyBoxData: ParsedBuyBox;
      let prospectsData: { prospects: any[]; qualified: any[]; booked: any[] };
      
      if ('buyBox' in res && res.buyBox) {
        // New format with buyBox and prospects
        buyBoxData = res.buyBox;
        prospectsData = res.prospects || { prospects: [], qualified: [], booked: [] };
        console.log('📊 Using API-generated prospects:', prospectsData);
      } else {
        // Legacy format - just the buyBox data
        buyBoxData = res as ParsedBuyBox;
        prospectsData = generateProspects(buyBoxData, fullText, 12);
        console.log('📊 Using fallback prospect generation');
      }
      
      // Normalize prospect rows: convert address strings to objects with random details
      const firstNames = ["John","Jane","Michael","Sarah","David","Emily","Robert","Lisa","James","Maria"];
      const lastNames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez"];
      const randomContact = () => {
        const fn = firstNames[Math.floor(Math.random()*firstNames.length)];
        const ln = lastNames[Math.floor(Math.random()*lastNames.length)];
        const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`;
        const phone = `(${Math.floor(Math.random()*900)+100}) ${Math.floor(Math.random()*900)+100}-${Math.floor(Math.random()*9000)+1000}`;
        return { name: `${fn} ${ln}`, email, phone };
      };
      const randomChannels = () => ({
        email: Math.random() > 0.2,
        sms: Math.random() > 0.5,
        call: Math.random() > 0.3,
        vm: Math.random() > 0.6,
      });
      const notes = [
        "High-quality property in prime location",
        "Recently renovated with modern amenities",
        "Strong rental history and occupancy rates",
        "Excellent investment opportunity",
        "Well-maintained building with potential upside",
        "Strategic location near major transportation",
        "Value-add opportunity with proven track record",
      ];
      const pickNote = () => notes[Math.floor(Math.random()*notes.length)];
      const toProspectObj = (item: any) => {
        if (typeof item === "string") {
          const address = item;
          return {
            title: address,
            subtitle: address.split(",")[0] || address,
            market: buyBoxData?.market?.city || "Unknown",
            channels: randomChannels(),
            note: pickNote(),
            contact: randomContact(),
          };
        }
        return item;
      };

      const normalizedRows = {
        prospects: (prospectsData.prospects || []).map(toProspectObj),
        qualified: (prospectsData.qualified || []).map(toProspectObj),
        booked: (prospectsData.booked || []).map(toProspectObj),
      };

      setParsed(buyBoxData);
      setConfirmed(true);
      setRows(normalizedRows);
      console.log('🧪 Normalized pipeline rows sample:', normalizedRows.prospects[0]);
      console.log('🎉 Successfully processed API response');
    } catch(e:any) {
      console.error('❌ Error in onParse:', e);
      console.error('❌ Error object details:', { message: e?.message, stack: e?.stack, name: e?.name });
      
      const m = String(e?.message||e);
      if (m.includes("llm_unavailable") || m.includes("llm") || m.includes("model")) {
        setErr("LLM unavailable. Try again in a moment.");
      } else {
        setErr(m === "supabase_not_configured" ? "Supabase not configured. Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY." :
               m.startsWith("http-") ? `Server ${m.replace("http-","")}` :
               m.includes("timeout") ? "Function timeout." : "Network error or function unreachable.");
      }
    } finally {
      setBusy(false);
      console.log('🏁 onParse function completed');
    }
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

  function handleQuerySelect(query: string, fields?: any) {
    setText(query);
    
    // If structured fields are provided, set them directly as final criteria and open modal
    if (fields) {
      setFinalCriteriaText(query);
      setModalOpen(true);
    }
  }

  function handleAddFragment(fragment: string) {
    setText(prev => prev ? `${prev} • ${fragment}` : fragment);
  }


  function handleModalDone(criteriaText: string) {
    setFinalCriteriaText(criteriaText);
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

        <PersonalizeBar onIntelReceived={setFirmIntel} onReset={handleReset} />

        {firmIntel && (
          <div className="space-y-6 mb-8">
            <PersonalizedPanel intel={firmIntel} onQuerySelect={handleQuerySelect} />
          </div>
        )}

        {/* Deal Criteria Display Section */}
        <div className="cosmic-card rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium text-foreground">Deal Criteria</h2>
            <div className="flex gap-2">
              <Button 
                onClick={() => setModalOpen(true)}
                variant="outline"
                className="text-sm"
              >
                Edit
              </Button>
              {finalCriteriaText.trim().length > 0 && (
                <Button 
                  onClick={onParse}
                  variant="default"
                  className="text-sm"
                  disabled={busy || finalCriteriaText.trim().length === 0}
                >
                  {busy ? "Processing..." : "Confirm"}
                </Button>
              )}
            </div>
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

        {/* Error Display */}
        {err && (
          <div className="cosmic-card rounded-2xl p-6 mb-6 shadow-lg border-l-4 border-l-destructive bg-destructive/5">
            <div className="text-sm text-destructive">{err}</div>
            {diag && <div className="text-xs text-muted-foreground mt-2">Diagnostic: {diag}</div>}
          </div>
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
          onDone={handleModalDone}
        />
      </div>
    </div>
  );
}