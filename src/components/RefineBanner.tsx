// src/components/RefineBanner.tsx
import React from "react";
import type { RefinePlan } from "../lib/buildRefinePlan";

export default function RefineBanner({
  plan,
  onInsert,
}: {
  plan: RefinePlan | null;
  onInsert: (snippet: string) => void;
}) {
  if (!plan || !plan.items.length) return null;

  return (
    <div className="mt-6 cosmic-card rounded-2xl px-6 py-4 shadow-lg border-amber-400/30 bg-amber-500/5">
      <div className="mb-4 text-lg font-medium text-amber-600">Refine your criteria</div>

      <div className="space-y-4">
        {plan.items.map((it) => (
          <div key={it.key}>
            <div className="text-sm font-medium text-foreground mb-1">{it.title}</div>
            <div className="text-sm text-muted-foreground mb-3">{it.message}</div>
            <div className="flex flex-wrap gap-2">
              {it.examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => onInsert(ex)}
                  className="inline-flex items-center gap-1 rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 hover:bg-amber-500/20 hover:border-amber-400/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  <span className="text-amber-500">+</span>
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-muted-foreground bg-amber-50/5 rounded-lg px-3 py-2">
        <strong className="text-amber-600">Tip:</strong> Click a chip to insert, then press Parse again.
      </div>
    </div>
  );
}