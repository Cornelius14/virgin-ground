import React from "react";
import type { FirmIntelResponse } from "../lib/firmIntelClient";
import SuggestedQueries from "./SuggestedQueries";

interface PersonalizedPanelProps {
  intel: FirmIntelResponse;
  onQuerySelect: (query: string, fields?: any) => void;
}

export default function PersonalizedPanel({ intel, onQuerySelect }: PersonalizedPanelProps) {
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

  // Utility: chunk a flat array into rows of size n (defaults to 3)
  const chunk = <T,>(arr: T[] = [], size = 3): T[][] => {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  // Try to pull structured queries from intel. If not present or empty, we will render SuggestedQueries as a fallback.
  // Each item can be either a string or an object like { label, query, description, fields }.
  const rawStructured = (intel as any).structuredQueries as any[] | undefined;
  const hasStructured = Array.isArray(rawStructured) && rawStructured.length > 0;
  const structuredRows = hasStructured ? chunk(rawStructured, 3) : [];

  const firmName = intel.firmUrl ? getDomainFromUrl(intel.firmUrl) : 'Firm';
  const initials = getInitials(firmName);

  // Normalize a structured query item into a renderable shape
  const normalizeItem = (item: any) => {
    if (typeof item === "string") {
      return { title: item, query: item, description: "", fields: undefined };
    }
    return {
      title: item.title || item.label || item.query || "Query",
      query: item.query || item.title || item.label || "",
      description: item.description || item.subtitle || "",
      fields: item.fields
    };
  };

  return (
    <div className="cosmic-card rounded-2xl p-6 mb-6 shadow-lg cosmic-glow">
      <h2 className="text-xl font-medium text-foreground mb-6">
        Personalized for {firmName}
      </h2>

      {/* First Row: Logo + Snapshot (2 columns on large screens) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
          <h3 className="text-base font-medium text-foreground">Recent Activity</h3>
          <div className="space-y-3">
            {intel.snapshot.slice(0, 3).map((bullet, index) => {
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

      {/* Second Row: Structured Queries (each row has 3 cards) */}
      <div className="mt-8">
        <h3 className="text-base font-medium text-foreground mb-4">
          Structured Queries
        </h3>

        {hasStructured ? (
          <div className="space-y-6">
            {structuredRows.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {row.map((item, colIdx) => {
                  const normalized = normalizeItem(item);
                  return (
                    <button
                      key={colIdx}
                      type="button"
                      className="cosmic-card rounded-xl p-4 text-left shadow-sm hover:shadow-md transition border border-transparent hover:border-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                      onClick={() => onQuerySelect(normalized.query, normalized.fields)}
                    >
                      <div className="text-sm font-medium text-foreground line-clamp-2">
                        {normalized.title}
                      </div>
                      {normalized.description ? (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-3">
                          {normalized.description}
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          // Fallback: keep existing SuggestedQueries component if intel.structuredQueries isn't provided
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SuggestedQueries 
              intel={intel} 
              onQuerySelect={onQuerySelect}
              onAddFragment={(fragment) => {
                // For now, just append to the query - this should be handled by parent
                console.log('Add fragment:', fragment);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
