import React, { useState } from 'react';

export default function ProScreen({ currentUser, onNavigate, onTokensRecharged }) {
  const [tokens, setTokens] = useState(2);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showSimModal, setShowSimModal] = useState(false);
  const [simStep, setSimStep] = useState('select_method');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [simulatedPlan, setSimulatedPlan] = useState({ name: 'Student Pro Pass', price: '₹199', tokensAdded: 2 });
  const [actionNotice, setActionNotice] = useState(null);

  const handleOpenSimModal = (planName, price, tokensToAdd) => {
    setSimulatedPlan({ name: planName, price, tokensAdded: tokensToAdd });
    setSimStep('select_method');
    setShowSimModal(true);
  };

  const handleExecutePaymentSimulation = () => {
    setSimStep('processing');
    setTimeout(() => {
      setTokens((prev) => prev + simulatedPlan.tokensAdded);
      setSimStep('success');
      if (onTokensRecharged) {
        onTokensRecharged(simulatedPlan.tokensAdded);
      }
    }, 1200);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e4e2da] pb-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-secondary tracking-widest uppercase bg-secondary-fixed/40 px-2.5 py-0.5 rounded">
              Monetization & Token Economics
            </span>
            <span className="text-xs text-outline">•</span>
            <span className="text-xs text-on-surface-variant font-mono">
              IIITD CAREER ACCELERATOR
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-medium text-on-surface tracking-tight">
            AlumniConnect Pro & Mentorship Token Hub
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl font-sans leading-relaxed">
            Sustainable student pricing meets dignified alumni honorarium. Built to eliminate cold outreach spam while keeping FAANG & startup mentorship accessible at ₹99.
          </p>
        </div>

        <button
          onClick={() => onNavigate('discover')}
          className="flex items-center gap-1.5 bg-[#f5f4f0] hover:bg-[#efeeea] border border-[#e4e2da] text-on-surface px-3.5 py-2 rounded-xl text-xs font-semibold self-start md:self-auto cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Directory
        </button>
      </div>

      {actionNotice && (
        <div className="bg-[#b5efd2]/60 border border-primary/30 text-[#002115] text-xs p-3.5 rounded-xl flex items-center justify-between font-medium animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-xs text-primary font-bold">
            Dismiss
          </button>
        </div>
      )}

      {}
      <div className="bg-gradient-to-br from-[#faf8f4] to-[#f4eee2] border border-[#dfd5c0] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 border border-secondary/25 flex items-center justify-center text-secondary shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[32px]">toll</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-mono">
                Student Wallet Balance
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary text-white">
                Active Pro Plan
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-serif font-bold text-[#7d571b]">{tokens}</span>
              <span className="text-sm font-semibold text-on-surface">Available Mentorship Tokens</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1 max-w-xl font-sans">
              Each token unlocks one 1-on-1 session (30-45 mins) with verified IIIT Delhi alumni. Mentors receive a ₹75 honorarium per completed session.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto border-t md:border-t-0 md:border-l border-[#dfd5c0] pt-4 md:pt-0 md:pl-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant font-mono">
              Effective Cost
            </span>
            <span className="text-sm font-bold text-primary font-mono">
              ₹99 / Session
            </span>
            <span className="text-[10px] text-on-surface-variant">vs ₹1,500 market rate</span>
          </div>

          <button
            onClick={() => handleOpenSimModal('Pro Token Top-up', '₹99', 1)}
            className="px-4 py-2 bg-primary hover:bg-[#1b4434] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            Add 1 Token (₹99)
          </button>
        </div>
      </div>

      {}
      <div>
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="font-serif text-2xl font-medium text-on-surface">
            Choose Your Mentorship Plan
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Fair student pricing backed by IIIT Delhi Placement & Training Cell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {}
          <div className="bg-white border border-[#e4e2da] rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-mono">
                  Alma-Mater Free
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#efeeea] text-on-surface-variant">
                  Standard
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif font-bold text-on-surface">₹0</span>
                <span className="text-xs text-on-surface-variant">/ semester</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Basic institutional connection funded by the college placement committee.
              </p>

              <div className="border-t border-[#e4e2da] my-4 pt-4 flex flex-col gap-2.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check</span>
                  <span>1 Free mentorship request per semester</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check</span>
                  <span>Public alumni directory search</span>
                </div>
                <div className="flex items-start gap-2 text-on-surface-variant/60">
                  <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">close</span>
                  <span>No AI resume & skill-gap matching</span>
                </div>
                <div className="flex items-start gap-2 text-on-surface-variant/60">
                  <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">close</span>
                  <span>No priority scheduling with FAANG alumni</span>
                </div>
              </div>
            </div>

            <button
              disabled
              className="w-full py-2.5 bg-[#efeeea] text-on-surface-variant text-xs font-semibold rounded-xl cursor-default"
            >
              Default Campus Plan
            </button>
          </div>

          {}
          <div className="bg-white border-2 border-primary rounded-2xl p-6 flex flex-col justify-between shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
              Most Popular · Recommended
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                  Student Pro Pass
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary">
                  Active
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif font-bold text-primary">₹199</span>
                <span className="text-xs text-on-surface-variant">/ month</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                The perfect cadence: 2 high-impact mock interviews every 15 days with senior engineers.
              </p>

              <div className="border-t border-[#e4e2da] my-4 pt-4 flex flex-col gap-2.5 text-xs">
                <div className="flex items-start gap-2 font-medium text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">verified</span>
                  <span><strong>2 Mentorship Tokens</strong> credited monthly (₹99/session)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check</span>
                  <span>Unlimited AI match engine & target role diagnosis</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check</span>
                  <span>Priority booking with Stripe, Google, & Microsoft alumni</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check</span>
                  <span>TPO Anti-Ghosting protection & session recording notes</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenSimModal('Student Pro Pass Renewal', '₹199', 2)}
              className="w-full py-2.5 bg-primary hover:bg-[#1b4434] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              Simulate Recharge (Add 2 Tokens · ₹199)
            </button>
          </div>

          {}
          <div className="bg-white border border-[#e4e2da] rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7d571b] font-mono">
                  Placement Sprint Pack
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-secondary-fixed/40 text-secondary">
                  Intensive
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif font-bold text-on-surface">₹499</span>
                <span className="text-xs text-on-surface-variant">/ one-time pack</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Designed for final-year placement season: 5 intensive mock rounds and direct referral pipeline.
              </p>

              <div className="border-t border-[#e4e2da] my-4 pt-4 flex flex-col gap-2.5 text-xs">
                <div className="flex items-start gap-2 font-medium text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">token</span>
                  <span><strong>5 Instant Mentorship Tokens</strong> (Valid for 90 days)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check</span>
                  <span>Full DSA & System Design mock feedback dossier</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check</span>
                  <span>Direct alumni internal job referral recommendation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check</span>
                  <span>24-hour expedited alumni response SLA</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenSimModal('Placement Sprint Pack', '₹499', 5)}
              className="w-full py-2.5 bg-[#f6f2e8] hover:bg-[#ede5d5] text-[#7d571b] border border-[#dfd5c0] text-xs font-semibold rounded-xl shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              Simulate Sprint (Add 5 Tokens · ₹499)
            </button>
          </div>

        </div>
      </div>

      {}
      <div className="bg-white border border-[#e4e2da] rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2.5 border-b border-[#e4e2da] pb-3">
          <span className="material-symbols-outlined text-primary text-[22px]">analytics</span>
          <h3 className="font-serif text-lg sm:text-xl font-medium text-on-surface">
            How AlumniConnect AI Unit Economics Work (Judge Defense)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-on-surface font-sans">
          <div className="bg-[#faf9f5] border border-[#e4e2da] p-4 rounded-xl flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant font-mono">
              1. Student Economics
            </span>
            <div className="text-base font-serif font-bold text-primary">₹99 Effective Cost</div>
            <p className="text-on-surface-variant leading-relaxed">
              Student pays ₹199/month and gets 2 session credits. This is 90% cheaper than external interview platforms (₹1,500 - ₹3,000), making it affordable for every engineering student.
            </p>
          </div>

          <div className="bg-[#faf9f5] border border-[#e4e2da] p-4 rounded-xl flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant font-mono">
              2. Mentor Honorarium
            </span>
            <div className="text-base font-serif font-bold text-[#7d571b]">₹75 Payout / Token</div>
            <p className="text-on-surface-variant leading-relaxed">
              The mentor receives a symbolic ₹75 honorarium per call via instant UPI or can donate it to the IIITD Student Fund. More importantly, the token requirement prevents students from sending blind spam.
            </p>
          </div>

          <div className="bg-[#faf9f5] border border-[#e4e2da] p-4 rounded-xl flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant font-mono">
              3. Platform Net Margin
            </span>
            <div className="text-base font-serif font-bold text-[#245c46]">25% - 40% Margin</div>
            <p className="text-on-surface-variant leading-relaxed">
              Platform earns ₹49/month per active subscriber plus breakage revenue (30% of students do not use both credits every month), generating predictable recurring revenue.
            </p>
          </div>
        </div>
      </div>

      {}
      {showSimModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e4e2da] rounded-2xl max-w-md w-full p-6 shadow-2xl relative flex flex-col gap-4 animate-fade-in">
            
            {}
            <div className="flex items-center justify-between border-b border-[#e4e2da] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b88b4a] text-[24px]">payments</span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-on-surface">
                    Demo Payment Sandbox
                  </h3>
                  <span className="text-[10px] text-secondary font-mono uppercase tracking-wider font-bold">
                    Judge Simulation Mode
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSimModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#f5f4f0] flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {}
            {simStep === 'select_method' && (
              <div className="flex flex-col gap-4">
                <div className="bg-[#faf8f4] border border-[#dfd5c0] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Selected Package
                    </span>
                    <div className="text-base font-serif font-bold text-on-surface mt-0.5">
                      {simulatedPlan.name}
                    </div>
                    <span className="text-xs text-primary font-semibold">
                      +{simulatedPlan.tokensAdded} Mentorship Tokens
                    </span>
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#7d571b]">
                    {simulatedPlan.price}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">
                    Select Simulated Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-[#e4e2da] bg-white text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                      <span>Instant UPI / VPA</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('campus_card')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                        paymentMethod === 'campus_card'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-[#e4e2da] bg-white text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">badge</span>
                      <span>IIITD Student Card</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#f5f4f0] rounded-xl border border-[#e4e2da] text-[11px] text-on-surface-variant leading-relaxed">
                  <strong>Demo Mode Note:</strong> This simulates the Razorpay/Stripe checkout flow without requiring a live credit card during judge evaluation.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e4e2da]">
                  <button
                    type="button"
                    onClick={() => setShowSimModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-[#efeeea] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExecutePaymentSimulation}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-[#1b4434] text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Confirm & Pay {simulatedPlan.price}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Processing Simulation */}
            {simStep === 'processing' && (
              <div className="p-8 text-center flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div className="font-serif text-base font-semibold text-on-surface">
                  Processing Instant IMPS / UPI Sandbox...
                </div>
                <p className="text-xs text-on-surface-variant font-mono">
                  Allocating {simulatedPlan.tokensAdded} Mentorship Tokens to student wallet...
                </p>
              </div>
            )}

            {/* Step 3: Success Screen */}
            {simStep === 'success' && (
              <div className="p-4 text-center flex flex-col items-center gap-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-[#b5efd2] text-[#002115] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h4 className="font-serif text-xl font-medium text-on-surface">
                  Payment Simulation Successful!
                </h4>
                <p className="text-xs text-on-surface-variant max-w-xs font-sans">
                  <strong>{simulatedPlan.tokensAdded} Mentorship Tokens</strong> have been credited to your account. Your new balance is <strong>{tokens} Tokens</strong>.
                </p>
                <div className="bg-[#faf8f4] border border-[#dfd5c0] p-3 rounded-xl text-xs text-[#7d571b] font-mono w-full">
                  TXN: IIITD-SIM-{Math.floor(100000 + Math.random() * 900000)} · STATUS: COMPLETED
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowSimModal(false);
                    setActionNotice(`Successfully added ${simulatedPlan.tokensAdded} tokens! Ready to book mock interviews.`);
                  }}
                  className="w-full mt-2 py-2.5 bg-primary hover:bg-[#1b4434] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Return to Mentorship Hub
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
