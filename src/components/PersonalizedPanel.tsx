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
    <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
      <div className="mb-4 text-lg font-medium text-neutral-100">
        Personalized for {firmName}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            {intel.logoUrl ? (
              <img
                src={intel.logoUrl}
                alt={`${firmName} logo`}
                className="h-16 w-16 rounded-lg object-contain"
                style={intel.brandColor ? { backgroundColor: intel.brandColor } : {}}
              />
            ) : (
              <div
                className="flex h-16 w-16 items-center justify-center rounded-lg text-lg font-semibold text-neutral-100"
                style={{
                  backgroundColor: intel.brandColor || '#404040',
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
              className="mt-2 text-xs text-neutral-400 hover:text-neutral-300"
            >
              {getDomainFromUrl(intel.firmUrl)}
            </a>
          )}
        </div>

        {/* Snapshot Section */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-neutral-200">Recent Activity</div>
          <div className="space-y-2">
            {intel.snapshot.slice(0, 3).map((bullet, index) => {
              const parts = bullet.split('(source: ');
              const text = parts[0].trim();
              const source = parts[1]?.replace(')', '');
              
              return (
                <div key={index} className="text-sm text-neutral-300">
                  • {text}
                  {source && (
                    <a
                      href={`https://${source}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-xs text-neutral-500 hover:text-neutral-400"
                    >
                      ({source})
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Query Chips Section */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-neutral-200">Suggested Queries</div>
          <div className="space-y-2">
            {intel.queries.slice(0, 6).map((query, index) => (
              <button
                key={index}
                onClick={() => onQuerySelect(query)}
                className="block w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-700 hover:border-neutral-600 transition-colors"
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