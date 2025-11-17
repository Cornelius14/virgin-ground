import React from 'react';
const HowItWorks = () => {
  return (
    <section id="how" className="w-full py-16 lg:py-20 px-6 md:px-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            How it Works — Step by Step
          </h2>
        </div>

        <div className="space-y-8">
          {/* Step 01 */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
              01
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">Tell Us What You're Looking For</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Specify your criteria using natural language — location, property type, price range, or any other requirements.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted text-muted-foreground flex items-center justify-center font-bold text-xl">
              02
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">AI Sources Prospects and Captures Inbound Interest</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                We identify thousands of prospects from multiple data sources and filter them to match your exact specifications. Plus, we capture inbound interest from owners who call, text, or fill forms.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted text-muted-foreground flex items-center justify-center font-bold text-xl">
              03
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">Multi-Channel Outreach + Live Call Answering</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Realflow's AI agent calls, texts, leaves voicemails, and emails every lead — and answers inbound calls as they come in — qualifying against your criteria in real time.
              </p>
            </div>
          </div>

          {/* Step 04 */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted text-muted-foreground flex items-center justify-center font-bold text-xl">
              04
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">Qualified Meetings Booked</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Once a lead is qualified and expresses interest, the AI books a meeting directly on your calendar with all context included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;