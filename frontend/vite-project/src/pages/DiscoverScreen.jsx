import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function DiscoverScreen({ onSelectAlumni }) {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('');
  const [availability, setAvailability] = useState('');
  const [topic, setTopic] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.alumni.getDirectory({
        search,
        department,
        collegeVerificationStatus: verificationFilter,
        availability,
        mentorshipTopic: topic,
        sortBy
      });
      setAlumniList(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch alumni directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAlumni();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, department, verificationFilter, availability, topic, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setDepartment('');
    setVerificationFilter('');
    setAvailability('');
    setTopic('');
    setSortBy('createdAt');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e4e2da] pb-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-secondary tracking-widest uppercase bg-secondary-fixed/40 px-2 py-0.5 rounded">
              Institutional Network
            </span>
            <span className="text-xs text-outline">•</span>
            <span className="text-xs text-on-surface-variant font-mono">
              IIIT DELHI ALUMNI REGISTRY
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-on-surface tracking-tight">
            Discover Alumni & Mentorship Fellows
          </h1>
          <p className="text-sm text-on-surface-variant max-w-2xl font-sans mt-0.5">
            Connect with verified graduates across global research institutions and engineering organizations. Structured help requests, mock interviews, and career guidance.
          </p>
        </div>

        {}
        {(search || department || verificationFilter || availability || topic) && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-secondary hover:underline self-start md:self-auto flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            Reset Filters
          </button>
        )}
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {}
        <aside className="lg:col-span-4 bg-white border border-[#e4e2da] rounded-2xl p-5 flex flex-col gap-5 shadow-[0_1px_8px_rgba(24,37,31,0.02)] sticky top-24">
          <div className="flex items-center justify-between border-b border-[#e4e2da] pb-3">
            <h3 className="font-serif text-lg font-medium text-on-surface">
              Filter Directory
            </h3>
            <span className="material-symbols-outlined text-outline text-[18px]">tune</span>
          </div>

          {}
          <div>
            <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
              Keywords & Skills
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Go, Stripe, AI, name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#f5f4f0] border border-[#e4e2da] text-xs rounded-xl pl-9 pr-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[18px] text-outline">search</span>
            </div>
          </div>

          {}
          <div>
            <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
              Identity Verification
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setVerificationFilter('')}
                className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                  verificationFilter === ''
                    ? 'bg-primary-container text-white border-primary-container'
                    : 'bg-[#faf9f5] border-[#e4e2da] text-on-surface-variant hover:bg-[#efeeea]'
                }`}
              >
                All Statuses
              </button>
              <button
                onClick={() => setVerificationFilter('verified')}
                className={`text-xs px-3 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                  verificationFilter === 'verified'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-[#faf9f5] border-[#e4e2da] text-on-surface-variant hover:bg-[#efeeea]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">verified</span>
                Verified Only
              </button>
            </div>
          </div>

          {}
          <div>
            <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
              Academic Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-[#faf9f5] border border-[#e4e2da] text-xs rounded-xl px-3 py-2 text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="">All Departments</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Mathematics & Computer Science">Mathematics & Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Electrical & Computer Engineering">Electrical & Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>

          {}
          <div>
            <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
              Mentorship Offerings
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: '', label: 'Any' },
                { id: 'mock_interview', label: 'Mock Interview' },
                { id: 'resume_review', label: 'Resume Review' },
                { id: 'technical_guidance', label: 'Tech Guidance' },
                { id: 'higher_studies', label: 'Higher Studies' },
                { id: 'startup_advice', label: 'Startup Advice' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTopic(item.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    topic === item.id
                      ? 'bg-secondary text-white border-secondary'
                      : 'bg-[#faf9f5] border-[#e4e2da] text-on-surface-variant hover:bg-[#efeeea]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {}
          <div>
            <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
              Availability Status
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setAvailability(availability === 'available' ? '' : 'available')}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  availability === 'available'
                    ? 'bg-[#245c46] text-white border-[#245c46]'
                    : 'bg-[#faf9f5] border-[#e4e2da] text-on-surface-variant hover:bg-[#efeeea]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Accepting Sessions
              </button>
            </div>
          </div>
        </aside>

        {}
        <section className="lg:col-span-8 flex flex-col gap-4">
          
          {}
          <div className="flex items-center justify-between bg-white border border-[#e4e2da] rounded-xl px-4 py-3">
            <span className="text-xs font-semibold text-on-surface">
              Showing <span className="text-primary font-bold">{alumniList.length}</span> verified profiles
            </span>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#f5f4f0] border border-[#e4e2da] text-xs rounded-lg px-2 py-1 text-on-surface focus:outline-none"
              >
                <option value="createdAt">Recent Additions</option>
                <option value="graduationYear">Graduation Year</option>
                <option value="name">Alumni Name</option>
              </select>
            </div>
          </div>

          {}
          {loading && (
            <div className="flex flex-col gap-4 py-8 items-center justify-center bg-white border border-[#e4e2da] rounded-2xl">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-on-surface-variant font-medium">
                Querying verified registrar database...
              </span>
            </div>
          )}

          {}
          {error && !loading && (
            <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#ba1a1a] p-4 rounded-xl text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{error}</span>
            </div>
          )}

          {}
          {!loading && !error && alumniList.length === 0 && (
            <div className="bg-white border border-[#e4e2da] rounded-2xl p-12 text-center flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-[48px] text-outline">person_search</span>
              <h3 className="font-serif text-xl text-on-surface font-medium">No Alumni Found</h3>
              <p className="text-xs text-on-surface-variant max-w-sm">
                No verified alumni matched your current filter criteria. Try adjusting keywords or clearing specific constraints.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {}
          {!loading && !error && alumniList.length > 0 && (
            <div className="flex flex-col gap-4">
              {alumniList.map((alumni) => (
                <div
                  key={alumni.id}
                  className="bg-white border border-[#e4e2da] hover:border-primary/50 transition-all rounded-2xl p-5 flex flex-col sm:flex-row items-start justify-between gap-5 shadow-[0_1px_8px_rgba(24,37,31,0.02)] group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={alumni.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                      alt={alumni.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#e4e2da] shrink-0"
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-lg font-medium text-on-surface group-hover:text-primary transition-colors">
                          {alumni.name}
                        </h3>
                        {alumni.collegeVerificationStatus === 'verified' && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#b5efd2] text-[#002115] border border-primary/20">
                            <span className="material-symbols-outlined text-[12px]">verified</span>
                            COLLEGE VERIFIED
                          </span>
                        )}
                        {alumni.collegeVerificationStatus === 'pending' && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#fdc981]/50 text-[#785216]">
                            AUDIT PENDING
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-primary">
                        {alumni.currentRole} {alumni.employer !== 'Not provided' && `@ ${alumni.employer}`}
                      </div>

                      <div className="text-xs text-on-surface-variant font-medium">
                        {alumni.department} • Class of {alumni.graduationYear}
                      </div>

                      <p className="text-xs text-on-surface-variant/90 line-clamp-2 mt-1 leading-relaxed">
                        {alumni.bio}
                      </p>

                      {/* Skills Badges */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {alumni.skills && alumni.skills.slice(0, 4).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] bg-[#f5f4f0] text-on-surface px-2 py-0.5 rounded border border-[#e4e2da]"
                          >
                            {skill}
                          </span>
                        ))}
                        {alumni.skills && alumni.skills.length > 4 && (
                          <span className="text-[10px] text-on-surface-variant self-center font-medium">
                            +{alumni.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#e4e2da]">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                        Availability
                      </span>
                      <span className={`text-xs font-semibold flex items-center gap-1 mt-0.5 ${
                        alumni.availability === 'available' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          alumni.availability === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}></span>
                        {alumni.availability === 'available' ? 'Accepting Requests' : 'Limited Hours'}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectAlumni(alumni)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-[#1b4434] text-white transition-all shadow-sm active:scale-[0.98]"
                    >
                      View Profile & Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
