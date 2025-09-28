import React from "react";
import type { FirmIntelResponse } from "../lib/firmIntelClient";

interface PersonalizedPanelProps {
  intel: FirmIntelResponse;
  onQuerySelect: (query: string) => void;
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

  const firmName = intel.firmUrl ? getDomainFromUrl(intel.firmUrl) : 'Firm';
  const initials = getInitials(firmName);

  return (
    <div className="cosmic-card rounded-2xl p-6 mb-6 shadow-lg cosmic-glow">
      <h2 className="text-xl font-medium text-foreground mb-6">
        Personalized for {firmName}
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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

        {/* Basic Queries Section - Keep simple queries here */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-foreground">Basic Queries</h3>
          <div className="space-y-2">
            {intel.queries.slice(0, 3).map((query, index) => (
              <button
                key={index}
                onClick={() => onQuerySelect(query)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}