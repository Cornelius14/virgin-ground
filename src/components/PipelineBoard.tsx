import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PipelineCardProps {
  prospect: any;
  stage: 'prospects' | 'qualified' | 'booked';
  onMove?: (prospect: any, newStage: string) => void;
}

function PipelineCard({ prospect, stage, onMove }: PipelineCardProps) {
  const getCardTitle = () => {
    const asset = prospect.assetType || prospect.asset_type || 'Asset';
    const units = prospect.units || prospect.size_sf || 'Units';
    const market = prospect.market || 'Market';
    
    let emoji = '💬';
    if (stage === 'qualified') emoji = '🎯';
    if (stage === 'booked') emoji = '📅';
    
    return `${emoji} ${asset} — ${units} (${market})`;
  };
  
  const getInteractionNote = () => {
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
    
    // Use a deterministic index based on prospect title
    const index = (prospect.title?.length || 0) % notes.length;
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
    <div className="cosmic-card rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border">
      <div className="space-y-4">
        <div className="text-sm font-semibold text-foreground">
          {getCardTitle()}
        </div>
        
        <div className="text-xs text-muted-foreground leading-relaxed">
          {getInteractionNote()}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {prospect.contact?.name} — {prospect.contact?.email} — {prospect.contact?.phone}
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <span className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            prospect.channels?.email 
              ? "bg-green-500/20 text-green-400 border-green-500/30" 
              : "bg-red-500/20 text-red-400 border-red-500/30"
          }`}>
            ✉️ email
          </span>
          <span className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            prospect.channels?.sms 
              ? "bg-green-500/20 text-green-400 border-green-500/30" 
              : "bg-red-500/20 text-red-400 border-red-500/30"
          }`}>
            📱 sms
          </span>
          <span className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            prospect.channels?.vm 
              ? "bg-green-500/20 text-green-400 border-green-500/30" 
              : "bg-red-500/20 text-red-400 border-red-500/30"
          }`}>
            🎤 vm
          </span>
          <span className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            prospect.channels?.call 
              ? "bg-green-500/20 text-green-400 border-green-500/30" 
              : "bg-red-500/20 text-red-400 border-red-500/30"
          }`}>
            📞 call
          </span>
        </div>
        
        {canMove && (
          <Button
            onClick={handleMoveToNext}
            size="sm"
            className="w-full mt-4 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
          >
            {buttonText}
          </Button>
        )}
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
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-foreground lg:text-6xl">
          Deal Pipeline
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Prospects → Qualified Targets → Meetings Booked
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prospected Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
              📋 Prospected
            </h3>
            <span className="text-sm bg-muted px-3 py-1.5 rounded-full text-muted-foreground font-medium">
              {rows.prospects.length}
            </span>
          </div>
          <div className="space-y-4">
            {rows.prospects.map((prospect: any, i: number) => (
              <div key={`p-${i}`} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <PipelineCard
                  prospect={prospect}
                  stage="prospects"
                  onMove={handleMoveProspect}
                />
              </div>
            ))}
            {rows.prospects.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No prospects yet
              </div>
            )}
          </div>
        </div>

        {/* Qualified Target Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
              🎯 Qualified Target
            </h3>
            <span className="text-sm bg-muted px-3 py-1.5 rounded-full text-muted-foreground font-medium">
              {rows.qualified.length}
            </span>
          </div>
          <div className="space-y-4">
            {rows.qualified.map((prospect: any, i: number) => (
              <div key={`q-${i}`} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <PipelineCard
                  prospect={prospect}
                  stage="qualified"
                  onMove={handleMoveProspect}
                />
              </div>
            ))}
            {rows.qualified.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No qualified targets yet
              </div>
            )}
          </div>
        </div>

        {/* Meeting Booked Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
              📅 Meeting Booked
            </h3>
            <span className="text-sm bg-muted px-3 py-1.5 rounded-full text-muted-foreground font-medium">
              {rows.booked.length}
            </span>
          </div>
          <div className="space-y-4">
            {rows.booked.map((prospect: any, i: number) => (
              <div key={`b-${i}`} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <PipelineCard
                  prospect={prospect}
                  stage="booked"
                />
              </div>
            ))}
            {rows.booked.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No meetings booked yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}