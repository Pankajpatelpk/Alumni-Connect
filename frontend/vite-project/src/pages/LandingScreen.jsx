import React from 'react';

export default function LandingScreen({
  onNavigate,
  onOpenAuth,
  currentUser
}) {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-16">
      
      {}
      {}
      {}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f4f0] border border-[#e4e2da] text-xs font-semibold text-secondary mb-5 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>IIIT Delhi · Official Verified Alumni Network</span>
          </div>

          {}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-on-surface tracking-tight leading-[1.2] mb-5">
            Connect with Verified <span className="text-primary font-serif">IIIT Delhi</span> Alumni
          </h1>

          {}
          <p className="text-sm sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl mb-8 font-normal">
            A trusted network connecting IIIT Delhi students with alumni at Google, Stripe, Microsoft, and top tech companies for 1-on-1 mentorship, mock interviews, and career guidance.
          </p>

          {}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <button
              onClick={() => onNavigate('discover')}
              className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(4,68,48,0.2)] flex items-center gap-2 group"
            >
              <span>Explore Alumni Directory</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => onNavigate('recommendations')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#f5f4f0] text-on-surface border border-[#e4e2da] text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">psychology</span>
              <span>AI Match Engine</span>
            </button>

            <button
              onClick={() => onNavigate('pro')}
              className="px-5 py-3.5 rounded-2xl bg-[#f6f2e8] hover:bg-[#ede5d5] text-[#7d571b] border border-[#dfd5c0] text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#b88b4a]">toll</span>
              <span>Pro Pass & Pricing</span>
            </button>

            {!currentUser && (
              <button
                onClick={onOpenAuth}
                className="px-5 py-3.5 rounded-2xl bg-[#faf9f5] hover:bg-[#efeeea] text-on-surface-variant border border-[#e4e2da] text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>Sign In / Join</span>
              </button>
            )}
          </div>

          {}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 bg-white rounded-3xl border border-[#e4e2da] shadow-[0_1px_8px_rgba(24,37,31,0.03)] text-left">
            <div className="border-r border-[#e4e2da] pr-4">
              <div className="font-serif text-2xl sm:text-3xl font-normal text-on-surface">500+</div>
              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider mt-0.5">
                Verified Alumni
              </div>
            </div>
            <div className="border-r border-[#e4e2da] pr-4">
              <div className="font-serif text-2xl sm:text-3xl font-normal text-primary">100%</div>
              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider mt-0.5">
                Registrar Audited
              </div>
            </div>
            <div className="border-r border-[#e4e2da] pr-4">
              <div className="font-serif text-2xl sm:text-3xl font-normal text-secondary">95%</div>
              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider mt-0.5">
                Match Relevance
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-normal text-on-surface">&lt; 24h</div>
              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider mt-0.5">
                Response Time
              </div>
            </div>
          </div>

        </div>
      </section>

      {}
      {}
      {}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto w-full">
        <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 sm:p-10 shadow-[0_1px_12px_rgba(24,37,31,0.03)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#e4e2da] pb-6 mb-8">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-widest bg-secondary-fixed/40 px-2 py-0.5 rounded">
                Editorial Spotlight
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-on-surface mt-1.5">
                Featured Alumni Mentor of the Month
              </h2>
            </div>
            <button
              onClick={() => onNavigate('discover')}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View all 500+ profiles in directory</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Marcus Vance"
                  className="w-28 h-28 sm:w-36 sm:sm:h-36 rounded-2xl object-cover border border-[#e4e2da] shadow-sm"
                />
                <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-on-surface">
                Marcus Vance
              </h3>
              <p className="text-xs font-semibold text-primary mt-0.5">
                Principal Infrastructure Engineer @ Stripe
              </p>
              <p className="text-xs text-on-surface-variant font-medium mt-1">
                Computer Science & Engineering · Class of 2018
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#b5efd2] text-[#002115] border border-primary/20 text-[11px] font-bold mt-3">
                <span className="material-symbols-outlined text-[14px]">school</span>
                College Identity Verified
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <blockquote className="font-serif text-base sm:text-xl text-on-surface italic leading-relaxed pl-4 border-l-2 border-primary">
                "When I was a sophomore at IIIT Delhi, finding alumni who actually understood distributed systems was difficult. AlumniConnect gives students a direct line to ask real architectural questions and get honest mock interviews."
              </blockquote>

              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-outline">
                  Offering Mentorship In:
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Mock System Design', 'Distributed Systems & Go', 'Resume Review', 'Career Strategy'].map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-[#faf9f5] border border-[#e4e2da] text-xs font-semibold text-on-surface"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e4e2da] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Currently Accepting Student Sessions this Term</span>
                </div>
                <button
                  onClick={() => onNavigate('discover')}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span>Request Mentorship</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      {}
      {}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold text-secondary uppercase tracking-widest bg-secondary-fixed/40 px-2 py-0.5 rounded">
            Designed for Trust
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-on-surface mt-2">
            Why AlumniConnect AI is Different
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            Traditional social networks are cluttered with unverified claims and ignored cold outreach. We built a structured, academic-first ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {}
          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 shadow-xs hover:border-[#c0c9c2] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#faf9f5] border border-[#e4e2da] text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-on-surface mb-2">
                Registrar Identity Audit
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Every alumnus profile is cross-checked against university degree records. College verification and employment claims remain strictly separated.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4e2da] text-[11px] font-bold text-primary flex items-center gap-1">
              <span>Zero Fake Accounts</span>
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
          </div>

          {}
          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 shadow-xs hover:border-[#c0c9c2] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#faf9f5] border border-[#e4e2da] text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">contact_mail</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-on-surface mb-2">
                Structured Mentorship
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No awkward open-ended cold emails. Students submit structured requests specifying goals, meeting slots, and topic tracks with clear outcomes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4e2da] text-[11px] font-bold text-primary flex items-center gap-1">
              <span>High Response Rates</span>
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
          </div>

          {}
          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 shadow-xs hover:border-[#c0c9c2] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#faf9f5] border border-[#e4e2da] text-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">psychology</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-on-surface mb-2">
                Explainable Match Engine
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Our 40/25/20/15 deterministic scoring algorithm matches students to mentors based on topic relevance, technology overlap, and sector expertise.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4e2da] text-[11px] font-bold text-secondary flex items-center gap-1">
              <span>Transparent Criteria</span>
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
          </div>

          {}
          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 shadow-xs hover:border-[#c0c9c2] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#faf9f5] border border-[#e4e2da] text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">fact_check</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-on-surface mb-2">
                Registrar Audit Queue
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                College administrators maintain an active review queue to inspect transcripts, approve candidate profiles, or request more evidence.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4e2da] text-[11px] font-bold text-primary flex items-center gap-1">
              <span>Administrative Oversight</span>
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
          </div>

        </div>
      </section>

      {}
      {}
      {}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto w-full">
        <div className="bg-[#f5f4f0] rounded-3xl border border-[#e4e2da] p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-[#e4e2da]">
              Simple Workflow
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-on-surface mt-2">
              From Inquiry to Mentorship
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-[#e4e2da] relative">
              <span className="font-serif text-3xl font-normal text-outline/50 block mb-2">01</span>
              <h4 className="font-serif text-base font-medium text-on-surface mb-1">Discover Alumni</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Search by department, skills, company, or use the AI Match Engine to find relevant guides.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#e4e2da] relative">
              <span className="font-serif text-3xl font-normal text-outline/50 block mb-2">02</span>
              <h4 className="font-serif text-base font-medium text-on-surface mb-1">Inspect Credentials</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Review verified graduation year, department, and past institutional accomplishments.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#e4e2da] relative">
              <span className="font-serif text-3xl font-normal text-outline/50 block mb-2">03</span>
              <h4 className="font-serif text-base font-medium text-on-surface mb-1">Submit Request</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Choose mock interview, resume review, or tech advice. Specify your goal and proposed times.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#e4e2da] relative">
              <span className="font-serif text-3xl font-normal text-outline/50 block mb-2">04</span>
              <h4 className="font-serif text-base font-medium text-on-surface mb-1">Engage & Grow</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Alumni accept or propose times. Connect 1-on-1 and receive tailored, actionable feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      {}
      {}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 flex flex-col justify-between shadow-xs">
            <blockquote className="font-serif text-sm sm:text-base text-on-surface italic leading-relaxed mb-4">
              "The ability to filter alumni who are explicitly accepting mock interviews saved me weeks of sending unanswered cold messages on social media."
            </blockquote>
            <div className="flex items-center gap-3 pt-3 border-t border-[#e4e2da]">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div>
                <div className="text-xs font-semibold text-on-surface">Alex Rivera</div>
                <div className="text-[10px] text-on-surface-variant">CS Senior · IIIT Delhi Class of '24</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 flex flex-col justify-between shadow-xs">
            <blockquote className="font-serif text-sm sm:text-base text-on-surface italic leading-relaxed mb-4">
              "As a research scientist, I wanted to guide students considering PhDs and AI lab careers. The structured request format makes it easy to say yes."
            </blockquote>
            <div className="flex items-center gap-3 pt-3 border-t border-[#e4e2da]">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                E
              </div>
              <div>
                <div className="text-xs font-semibold text-on-surface">Dr. Elena Rostova</div>
                <div className="text-[10px] text-on-surface-variant">Principal Scientist @ DeepMind</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 flex flex-col justify-between shadow-xs">
            <blockquote className="font-serif text-sm sm:text-base text-on-surface italic leading-relaxed mb-4">
              "Separating college identity verification from employer claims protects institutional integrity while creating a trusted alumni community."
            </blockquote>
            <div className="flex items-center gap-3 pt-3 border-t border-[#e4e2da]">
              <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs">
                E
              </div>
              <div>
                <div className="text-xs font-semibold text-on-surface">Dean Eleanor Vance</div>
                <div className="text-[10px] text-on-surface-variant">Office of the Registrar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      {}
      {}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto w-full">
        <div className="bg-primary-container text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-[11px] font-bold tracking-widest uppercase text-on-primary-container bg-primary/40 px-3 py-1 rounded-full border border-white/10">
              Institutional Network
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Ready to Connect with Your Institution's Alumni?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              Whether you are an undergraduate preparing for technical interviews or an alumnus giving back to your alma mater, join the IIIT Delhi network today.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('discover')}
                className="px-6 py-3 bg-white hover:bg-[#faf9f5] text-primary text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Enter Alumni Directory
              </button>
              {!currentUser && (
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-3 bg-primary hover:bg-[#002115] text-white border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  Create Your Account
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
