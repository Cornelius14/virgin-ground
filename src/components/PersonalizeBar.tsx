import React, { useState } from "react";
import { fetchFirmIntel, type FirmIntelResponse } from "../lib/firmIntelClient";

interface PersonalizeBarProps {
  onIntelReceived: (intel: FirmIntelResponse) => void;
}

export default function PersonalizeBar({ onIntelReceived }: PersonalizeBarProps) {
  const [firmName, setFirmName] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loadingStep, setLoadingStep] = useState<"logo" | "snapshot" | "queries" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [needsUrl, setNeedsUrl] = useState(false);

  const handlePersonalize = async () => {
    if (!firmName.trim()) return;

    setError(null);
    setNeedsUrl(false);
    setLoadingStep("logo");

    try {
      const request = {
        firmName: firmName.trim(),
        ...(websiteUrl.trim() && { fallbackUrl: websiteUrl.trim() }),
      };

      setLoadingStep("snapshot");
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate logo extraction
      
      setLoadingStep("queries");
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate snapshot building

      const intel = await fetchFirmIntel(request);
      
      if (intel.needsInput === "url") {
        setNeedsUrl(true);
        setShowUrlInput(true);
        setLoadingStep(null);
        return;
      }

      if (intel.error) {
        setError(intel.error === "llm_unavailable" ? "Model temporarily unavailable—try again." : "Error processing firm data.");
        setLoadingStep(null);
        return;
      }

      setLoadingStep(null);
      onIntelReceived(intel);
    } catch (err: any) {
      setError("Network error or function unreachable.");
      setLoadingStep(null);
    }
  };

  const progressSteps = ["logo", "snapshot", "queries"];
  const currentStepIndex = loadingStep ? progressSteps.indexOf(loadingStep) : -1;

  // Check if function URL is configured
  const isConfigured = !import.meta.env.VITE_FIRM_INTEL_URL?.includes("YOUR-PROJECT");

  if (!isConfigured) {
    return (
      <div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3">
        <div className="text-sm text-amber-600">
          Set <code className="bg-amber-100/20 px-1 rounded">VITE_FIRM_INTEL_URL</code> to enable firm personalization.
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="cosmic-card rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-medium text-foreground mb-4">Personalize for my firm</h3>
        
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Firm Name
            </label>
            <input
              type="text"
              placeholder="Type firm name…"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <input
                type="checkbox"
                checked={showUrlInput}
                onChange={(e) => setShowUrlInput(e.target.checked)}
                className="rounded border-input accent-primary"
              />
              paste website URL
            </label>
            
            <button
              onClick={handlePersonalize}
              disabled={!firmName.trim() || !!loadingStep}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
            >
              {loadingStep ? "Processing…" : "Personalize"}
            </button>
          </div>
        </div>

        {showUrlInput && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://yourfirm.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        )}

        {loadingStep && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                <span>Processing: {loadingStep}</span>
              </div>
              <span>{currentStepIndex + 1}/3</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((currentStepIndex + 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {needsUrl && (
          <div className="mt-4 text-sm text-amber-600 bg-amber-50/10 rounded-lg px-3 py-2">
            We couldn't confirm the website—paste a URL and try again.
          </div>
        )}
      </div>
    </div>
  );
}