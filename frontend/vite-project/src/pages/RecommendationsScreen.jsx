import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const MENTORSHIP_TOPICS = [
  { id: 'resume_review', label: 'Resume Review', icon: 'description' },
  { id: 'mock_interview', label: 'Mock Interview', icon: 'videocam' },
  { id: 'technical_guidance', label: 'Tech Guidance', icon: 'code' },
  { id: 'career_advice', label: 'Career Strategy', icon: 'explore' },
  { id: 'higher_studies', label: 'Higher Studies & PhD', icon: 'school' },
  { id: 'startup_advice', label: 'Foundership & Venture', icon: 'rocket_launch' }
];

export default function RecommendationsScreen({ onSelectAlumni }) {
  const [requestType, setRequestType] = useState('technical_guidance');
  const [skills, setSkills] = useState('Distributed Systems, Kubernetes, Cloud');
  const [industry, setIndustry] = useState('Enterprise Cloud');
  const [goal, setGoal] = useState('Staff Engineer');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.recommendations.getMentors({
        requestType,
        skills,
        industry,
        goal,
        limit: 8
      });
      if (res.success && Array.isArray(res.data)) {
        setRecommendations(res.data);
      }
    } catch (err) {
      setError(err.message || 'Unable to generate mentor recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchRecommendations();
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f4f0] border border-[#e4e2da] text-xs font-semibold text-secondary mb-3">
          <span className="material-symbols-outlined text-[16px]">psychology</span>
          Deterministic Match Engine (Phase 15)
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-on-surface tracking-tight leading-tight mb-3">
          Explainable Mentor Intelligence
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Our match engine scores verified alumni using clear, transparent criteria: topic alignment (40%), technology overlap (25%), industry sector (20%), and mentor capacity (15%). No black-box AI.
        </p>
      </div>

      {}
      <div className="bg-white rounded-2xl border border-[#e4e2da] p-6 sm:p-8 shadow-[0_1px_6px_rgba(24,37,31,0.03)] mb-12">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2.5">
              1. What guidance track are you seeking?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {MENTORSHIP_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setRequestType(topic.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    requestType === topic.id
                      ? 'bg-primary-container text-on-primary border-primary shadow-[0_2px_8px_rgba(4,68,48,0.15)] font-semibold'
                      : 'bg-[#faf9f5] hover:bg-[#f5f4f0] text-on-surface border-[#e4e2da]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[22px] mb-1.5 ${requestType === topic.id ? 'text-on-primary' : 'text-primary'}`}>
                    {topic.icon}
                  </span>
                  <span className="text-xs leading-tight">{topic.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                2. Target Skills / Tech Stack
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Distributed Systems, Kubernetes, React"
                className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                3. Industry or Sector
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Enterprise Cloud, AI & Robotics"
                className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                4. Target Role / Long-Term Goal
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Staff Engineer, Principal, Founder"
                className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#e4e2da]">
            <p className="text-xs text-on-surface-variant">
              Showing top verified alumni actively offering guidance in this track.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold tracking-wide uppercase flex items-center gap-2 transition-all shadow-[0_2px_8px_rgba(4,68,48,0.2)] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Scoring Mentors...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Recalculate Matches
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-[#ffdad6] text-[#ba1a1a] p-4 rounded-xl border border-[#ba1a1a]/20 mb-8 flex items-center gap-3 text-sm">
          <span className="material-symbols-outlined">error</span>
          <span>{error}</span>
        </div>
      )}

      {}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e4e2da] p-6 animate-pulse space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#efeeea]"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-[#efeeea] rounded w-1/3"></div>
                  <div className="h-3 bg-[#efeeea] rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-3 bg-[#efeeea] rounded w-full"></div>
              <div className="h-3 bg-[#efeeea] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}

      {}
      {!loading && recommendations.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-normal text-on-surface">
              Ranked Mentor Candidates ({recommendations.length})
            </h2>
            <span className="text-xs text-on-surface-variant font-medium">
              Ranked by deterministic score
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((mentor, index) => {
              const score = mentor.matchScore || 50;
              const isTopPick = index === 0;

              return (
                <div
                  key={mentor.id || mentor._id}
                  className={`bg-white rounded-2xl border transition-all p-6 relative flex flex-col justify-between ${
                    isTopPick
                      ? 'border-primary ring-1 ring-primary/20 shadow-[0_4px_16px_rgba(4,68,48,0.08)]'
                      : 'border-[#e4e2da] hover:border-[#c0c9c2] shadow-[0_1px_6px_rgba(24,37,31,0.03)]'
                  }`}
                >
                  <div>
                    {}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-13 h-13 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg font-serif">
                          {(mentor.name || mentor.fullName || 'A')[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-serif text-lg font-medium text-on-surface leading-snug">
                              {mentor.name || mentor.fullName}
                            </h3>
                            {mentor.collegeVerificationStatus === 'verified' && (
                              <span
                                className="material-symbols-outlined text-[16px] text-secondary"
                                title="Registrar Verified Alumnus"
                              >
                                verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-on-surface-variant font-medium">
                            {mentor.currentRole} {mentor.employer && mentor.employer !== 'Not provided' ? `@ ${mentor.employer}` : ''}
                          </p>
                          <p className="text-[11px] text-outline">
                            Class of {mentor.graduationYear} · {mentor.department}
                          </p>
                        </div>
                      </div>

                      {}
                      <div className="flex flex-col items-end">
                        <div
                          className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 ${
                            score >= 80
                              ? 'bg-primary-container text-on-primary'
                              : score >= 60
                              ? 'bg-[#fdc981]/30 text-secondary'
                              : 'bg-[#f5f4f0] text-on-surface-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {score >= 80 ? 'stars' : 'offline_bolt'}
                          </span>
                          {score}% Match
                        </div>
                        {isTopPick && (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-primary mt-1">
                            Best Match
                          </span>
                        )}
                      </div>
                    </div>

                    {}
                    {mentor.bio && (
                      <p className="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-2">
                        "{mentor.bio}"
                      </p>
                    )}

                    {}
                    <div className="bg-[#faf9f5] rounded-xl p-3 border border-[#e4e2da] mb-4">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-outline mb-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-secondary">
                          fact_check
                        </span>
                        Match Reasoning (Why this mentor fits)
                      </div>
                      <ul className="space-y-1.5">
                        {mentor.matchReasons && mentor.matchReasons.map((reason, rIdx) => (
                          <li
                            key={rIdx}
                            className="text-xs text-on-surface flex items-start gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[14px] text-primary shrink-0 mt-0.5">
                              check_circle
                            </span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {mentor.skills && mentor.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-[#f5f4f0] border border-[#e4e2da] text-[11px] text-on-surface font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {}
                  <div className="pt-3 border-t border-[#e4e2da] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-outline flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          mentor.availability === 'available' ? 'bg-primary' : 'bg-[#fdc981]'
                        }`}
                      ></span>
                      {mentor.availability === 'available' ? 'Accepting Sessions' : 'Limited Seats'}
                    </span>
                    <button
                      onClick={() => onSelectAlumni(mentor)}
                      className="px-4 py-1.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>View & Request</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {}
      {!loading && recommendations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#e4e2da] p-8">
          <div className="w-14 h-14 rounded-full bg-[#f5f4f0] flex items-center justify-center text-outline mx-auto mb-3">
            <span className="material-symbols-outlined text-[28px]">search_off</span>
          </div>
          <h3 className="font-serif text-lg font-medium text-on-surface mb-1">
            No matching mentors found
          </h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto mb-4">
            Try adjusting your search criteria, selecting another track, or broadening your skills filter.
          </p>
          <button
            onClick={() => {
              setRequestType('career_advice');
              setSkills('');
              setIndustry('');
              setGoal('');
              fetchRecommendations();
            }}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
