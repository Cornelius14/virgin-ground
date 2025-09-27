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
      <div className="mb-6 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3">
        <div className="text-sm text-amber-200">
          Set <code>VITE_FIRM_INTEL_URL</code> to enable firm personalization.
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
        <div className="mb-3 text-sm font-medium text-neutral-100">Personalize for my firm</div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type firm name…"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-600"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-neutral-400">
              <input
                type="checkbox"
                checked={showUrlInput}
                onChange={(e) => setShowUrlInput(e.target.checked)}
                className="rounded border-neutral-700"
              />
              paste website URL
            </label>
            
            <button
              onClick={handlePersonalize}
              disabled={!firmName.trim() || !!loadingStep}
              className="rounded-lg bg-neutral-100 px-4 py-2 text-sm text-neutral-900 hover:bg-white disabled:opacity-50"
            >
              {loadingStep ? "Processing…" : "Personalize"}
            </button>
          </div>
        </div>

        {showUrlInput && (
          <div className="mt-3">
            <input
              type="url"
              placeholder="https://yourfirm.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-600"
            />
          </div>
        )}

        {loadingStep && (
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs text-neutral-400">
              <span>Processing: {loadingStep}</span>
              <span>{currentStepIndex + 1}/3</span>
            </div>
            <div className="h-1 rounded-full bg-neutral-800">
              <div
                className="h-full rounded-full bg-neutral-100 transition-all duration-500"
                style={{ width: `${((currentStepIndex + 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-3 text-sm text-red-300">{error}</div>
        )}

        {needsUrl && (
          <div className="mt-3 text-sm text-amber-300">
            We couldn't confirm the website—paste a URL and try again.
          </div>
        )}
      </div>
    </div>
  );
}