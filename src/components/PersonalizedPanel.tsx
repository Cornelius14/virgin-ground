import React, { useState } from "react";
import type { FirmIntelResponse, StructuredQuery } from "../lib/firmIntelClient";
import { fetchFirmQueries } from "../lib/firmIntelClient";
import SuggestedQueries from "./SuggestedQueries";
import { Button } from "./ui/button";

interface PersonalizedPanelProps {
  intel: FirmIntelResponse;
  onQuerySelect: (query: string, fields?: any) => void;
}

export default function PersonalizedPanel({ intel, onQuerySelect }: PersonalizedPanelProps) {
  const [structuredQueries, setStructuredQueries] = useState<StructuredQuery[]>([]);
  const [loadingQueries, setLoadingQueries] = useState(false);
  const [queriesError, setQueriesError] = useState<string | null>(null);

  const getInitials = (firmName: string) => {
    return firmName
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getDomainFromUrl = (url?: string) => {
    if (!url) return '';
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const firmName = intel.firmUrl ? getDomainFromUrl(intel.firmUrl) : 'Firm';
  const initials = getInitials(firmName);

  const handleGetQueries = async () => {
    setLoadingQueries(true);
    setQueriesError(null);
    
    try {
      const response = await fetchFirmQueries({
        firmName: intel.firmName,
        snapshot: intel.snapshot
      });
      
      if (response.success) {
        setStructuredQueries(response.structuredQueries);
      } else {
        setQueriesError(response.error || "Failed to generate queries");
      }
    } catch (error: any) {
      console.error("Error fetching queries:", error);
      setQueriesError("Network error or function unreachable");
    } finally {
      setLoadingQueries(false);
    }
  };

  return (
    <div className="cosmic-card rounded-2xl p-6 mb-6 shadow-lg cosmic-glow">
      <h2 className="text-xl font-medium text-foreground mb-6">
        Personalized for {firmName}
      </h2>
      
      {/* Main content row */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="cosmic-card rounded-2xl p-6 w-32 h-32 flex items-center justify-center shadow-sm">
            {intel.logoUrl ? (
              <img
                src={intel.logoUrl}
                alt={`${firmName} logo`}
                className="max-h-20 max-w-20 rounded-xl object-contain"
                style={intel.brandColor ? { 
                  backgroundColor: intel.brandColor,
                  padding: '8px'
                } : {}}
              />
            ) : (
              <div
                className="flex h-20 w-20 items-center justify-center rounded-xl text-xl font-semibold text-white shadow-inner"
                style={{
                  backgroundColor: intel.brandColor || 'hsl(var(--muted))',
                }}
              >
                {initials}
              </div>
            )}
          </div>
          {intel.firmUrl && (
            <a
              href={intel.firmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              {getDomainFromUrl(intel.firmUrl)}
            </a>
          )}
        </div>

        {/* Snapshot Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Recent Deals</h3>
          <div className="space-y-3">
            {intel.snapshot.slice(0, 8).map((bullet, index) => {
              const parts = bullet.split('(source: ');
              const text = parts[0].trim();
              const source = parts[1]?.replace(')', '');
              
              return (
                <div key={index} className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-foreground">•</span> {text}
                  {source && (
                    <a
                      href={`https://${source}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                    >
                      ({source})
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Get Queries Section */}
      <div className="space-y-4">
        {structuredQueries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Button 
              onClick={handleGetQueries}
              disabled={loadingQueries}
              size="lg"
              className="px-8"
            >
              {loadingQueries ? "Generating Queries..." : "Get Queries"}
            </Button>
            {queriesError && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {queriesError}
              </div>
            )}
          </div>
        ) : (
          <SuggestedQueries 
            queries={structuredQueries} 
            onQuerySelect={onQuerySelect}
            onAddFragment={(fragment) => {
              console.log('Add fragment:', fragment);
            }}
          />
        )}
      </div>
    </div>
  );
}