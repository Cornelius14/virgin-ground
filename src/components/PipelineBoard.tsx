import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PipelineCardProps {
  prospect: any;
  stage: 'prospects' | 'qualified' | 'booked';
  onMove?: (prospect: any, newStage: string) => void;
}

function PipelineCard({ prospect, stage, onMove }: PipelineCardProps) {
  // Check if this is a wholesaling card (has trigger field)
  const isWholesaling = !!prospect.trigger;
  
  const getCardTitle = () => {
    // For wholesaling, title already includes emoji
    if (isWholesaling && prospect.title) {
      return prospect.title;
    }
    
    let emoji = '💬';
    if (stage === 'qualified') emoji = '🎯';
    if (stage === 'booked') emoji = '📅';

    const title = typeof prospect === 'string' ? prospect : (prospect.title || '');
    if (title) return `${emoji} ${title}`;

    const asset = prospect.assetType || prospect.asset_type || 'Asset';
    const units = prospect.units || prospect.size_sf || 'Units';
    const market = prospect.market || 'Market';
    return `${emoji} ${asset} — ${units} (${market})`;
  };
  
  const getInteractionNote = () => {
    // For wholesaling, use subtitle if available
    if (isWholesaling && prospect.subtitle) {
      return prospect.subtitle;
    }
    
    const notes = [
      "✅ Expressed urgency to transact this quarter",
      "🕒 Asked for financing options and cap rate details", 
      "📞 Call returned; wants 80–100 units in target area",
      "📧 Replied by email; shared offering memorandum",
      "🔍 Requested additional property details and financials",
      "⏰ Meeting scheduled for property tour next week",
      "💰 Discussed pricing and terms; very interested",
      "📋 Submitted LOI; waiting on seller response"
    ];
    
    // Use a deterministic index based on title or string
    const key = typeof prospect === 'string' ? prospect : (prospect.title || '');
    const index = (key.length || 0) % notes.length;
    return notes[index];
  };
  
  const handleMoveToNext = () => {
    if (!onMove) return;
    
    if (stage === 'prospects') {
      onMove(prospect, 'qualified');
    } else if (stage === 'qualified') {
      onMove(prospect, 'booked');
    }
  };
  
  const canMove = stage === 'prospects' || stage === 'qualified';
  const buttonText = stage === 'prospects' ? 'Qualify →' : 'Book Meeting →';
  
  return (
    <div className="cosmic-card rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="space-y-3">
        {/* Title */}
        <div className="text-sm font-medium text-foreground">
          {getCardTitle()}
        </div>
        
        {/* Subtitle / Interaction note */}
        <div className="text-xs text-muted-foreground leading-relaxed">
          {getInteractionNote()}
        </div>
        
        {/* Contact info */}
        {prospect.contact && (
          <div className="text-xs text-muted-foreground">
            {prospect.contact.name} — {prospect.contact.email} — {prospect.contact.phone}
          </div>
        )}
        
        {/* Wholesaling trigger pill with context */}
        {isWholesaling && prospect.trigger && (
          <div className="space-y-2">
            <div className="inline-block">
              <div className="bg-accent/20 text-accent border border-accent/30 px-2 py-1 rounded-md text-xs font-medium">
                {prospect.trigger}
              </div>
              {prospect.triggerContext && (
                <div className="text-xs text-muted-foreground mt-1">
                  {prospect.triggerContext}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Property snapshot (wholesaling only) */}
        {isWholesaling && prospect.propertySnapshot && (
          <div className="text-xs text-muted-foreground border-t border-border pt-2">
            {prospect.propertySnapshot}
          </div>
        )}
        
        {/* Lead disposition + readiness (wholesaling) */}
        {isWholesaling && prospect.disposition && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                prospect.disposition === 'good' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : prospect.disposition === 'risky'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {prospect.disposition === 'good' ? 'Good' : prospect.disposition === 'risky' ? 'Risky' : 'Neutral'}
              </span>
            </div>
            {prospect.readiness && (
              <div className="text-xs text-muted-foreground">
                {prospect.readiness}
              </div>
            )}
          </div>
        )}
        
        {/* Motivation note (wholesaling) */}
        {prospect.note && (
          <div className="text-xs text-foreground border-l-2 border-accent/30 pl-2">
            {prospect.note}
          </div>
        )}
        
        {/* Action pills with tri-state indicators */}
        <div className="flex gap-1 flex-wrap">
          {['email', 'sms', 'vm', 'call'].map((channel) => {
            const channelData = prospect.channels?.[channel];
            const outcome = channelData?.outcome || 'amber';
            const status = channelData?.status || 'No data';
            const icon = channel === 'email' ? '✉️' : channel === 'sms' ? '📱' : channel === 'vm' ? '🎤' : '📞';
            const indicator = outcome === 'green' ? '✓' : outcome === 'red' ? '×' : '•';
            const isDisabled = outcome === 'red' && (status.includes('DNC') || status.includes('Wrong number'));
            
            return (
              <span
                key={channel}
                className={`px-2 py-1 rounded-md text-xs font-medium cursor-help ${
                  outcome === 'green'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : outcome === 'red'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                } ${isDisabled ? 'opacity-50' : ''}`}
                title={status}
                aria-disabled={isDisabled}
              >
                {icon} {channel} {indicator}
              </span>
            );
          })}
        </div>
        
        {/* Primary CTA button */}
        {canMove ? (
          <div className="space-y-1">
            <Button
              onClick={handleMoveToNext}
              size="sm"
              className="w-full mt-3 text-xs"
              variant={prospect.isDNC ? "ghost" : "outline"}
              disabled={prospect.isDNC}
            >
              {prospect.isDNC ? 'Respect DNC' : buttonText}
            </Button>
            {prospect.disposition === 'neutral' && !prospect.isDNC && (
              <div className="text-[10px] text-muted-foreground text-center">
                Follow up via preferred channel
              </div>
            )}
          </div>
        ) : stage === 'booked' && isWholesaling ? (
          <Button
            size="sm"
            className="w-full mt-3 text-xs"
            variant="outline"
            disabled
          >
            View Details →
          </Button>
        ) : null}
      </div>
    </div>
  );
}

interface PipelineBoardProps {
  rows: {
    prospects: any[];
    qualified: any[];
    booked: any[];
  };
  onUpdateRows: (newRows: any) => void;
}

export default function PipelineBoard({ rows, onUpdateRows }: PipelineBoardProps) {
  const handleMoveProspect = (prospect: any, newStage: string) => {
    const newRows = { ...rows };
    
    // Remove from current stage
    newRows.prospects = newRows.prospects.filter(p => p !== prospect);
    newRows.qualified = newRows.qualified.filter(p => p !== prospect);
    newRows.booked = newRows.booked.filter(p => p !== prospect);
    
    // Add to new stage
    if (newStage === 'qualified') {
      newRows.qualified.push(prospect);
    } else if (newStage === 'booked') {
      newRows.booked.push(prospect);
    }
    
    onUpdateRows(newRows);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
          Deal Pipeline
        </h2>
        <p className="text-muted-foreground text-lg">
          Prospects → Qualified Targets → Meetings Booked
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prospected Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
              📋 Prospected
            </h3>
            <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground font-medium">
              {rows.prospects.length}
            </span>
          </div>
          <div className="space-y-3">
            {rows.prospects.map((prospect: any, i: number) => (
              <PipelineCard
                key={`p-${i}`}
                prospect={prospect}
                stage="prospects"
                onMove={handleMoveProspect}
              />
            ))}
            {rows.prospects.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No prospects yet
              </div>
            )}
          </div>
        </div>

        {/* Qualified Target Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
              🎯 Qualified Target
            </h3>
            <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground font-medium">
              {rows.qualified.length}
            </span>
          </div>
          <div className="space-y-3">
            {rows.qualified.map((prospect: any, i: number) => (
              <PipelineCard
                key={`q-${i}`}
                prospect={prospect}
                stage="qualified"
                onMove={handleMoveProspect}
              />
            ))}
            {rows.qualified.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No qualified targets yet
              </div>
            )}
          </div>
        </div>

        {/* Meeting Booked Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
              📅 Meeting Booked
            </h3>
            <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground font-medium">
              {rows.booked.length}
            </span>
          </div>
          <div className="space-y-3">
            {rows.booked.map((prospect: any, i: number) => (
              <PipelineCard
                key={`b-${i}`}
                prospect={prospect}
                stage="booked"
              />
            ))}
            {rows.booked.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No meetings booked yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}