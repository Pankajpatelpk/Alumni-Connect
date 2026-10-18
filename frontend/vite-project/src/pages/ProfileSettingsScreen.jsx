import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const MENTORSHIP_OPTIONS = [
  { id: 'resume_review', label: 'Resume Review' },
  { id: 'mock_interview', label: 'Mock Interview' },
  { id: 'technical_guidance', label: 'Technical Guidance' },
  { id: 'career_advice', label: 'Career Strategy' },
  { id: 'higher_studies', label: 'Higher Studies & PhD' },
  { id: 'startup_advice', label: 'Startup & Foundership' }
];

export default function ProfileSettingsScreen({ currentUser, onProfileUpdated }) {
  const [profile, setProfile] = useState(null);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submittingVerification, setSubmittingVerification] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

 
  const [bio, setBio] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [employer, setEmployer] = useState('');
  const [industry, setIndustry] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [availability, setAvailability] = useState('available');
  const [mentorshipTopics, setMentorshipTopics] = useState([]);

 
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('college_record_match');
  const [evidenceRef, setEvidenceRef] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

     
      const meRes = await api.auth.getMe();
      if (meRes.success && meRes.data.profile) {
        const p = meRes.data.profile;
        setProfile(p);
        setBio(p.bio || '');
        setCurrentRole(p.currentRole || '');
        setEmployer(p.employer || '');
        setIndustry(p.industry || '');
        setSkillsStr((p.skills || []).join(', '));
        setAvailability(p.availability || 'available');
        setMentorshipTopics(p.mentorshipTopics || []);
      }

     
      try {
        const vRes = await api.verification.getMyHistory();
        if (vRes.success && Array.isArray(vRes.data)) {
          setVerificationHistory(vRes.data);
        }
      } catch (vErr) {
      
      }
    } catch (err) {
      setError(err.message || 'Failed to load profile details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleTopicToggle = (topicId) => {
    setMentorshipTopics((prev) =>
      prev.includes(topicId) ? prev.filter((t) => t !== topicId) : [...prev, topicId]
    );
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const parsedSkills = skillsStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await api.alumni.updateMe({
        bio,
        currentRole,
        employer,
        industry,
        skills: parsedSkills,
        availability,
        mentorshipTopics
      });

      if (res.success && res.data) {
        setProfile(res.data);
        setSuccessMsg('Alumni profile updated successfully!');
        if (onProfileUpdated) onProfileUpdated();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitVerification = async (e) => {
    e.preventDefault();
    if (!evidenceRef.trim()) {
      setError('Please provide your Institutional Registration Number or Degree Reference ID.');
      return;
    }

    try {
      setSubmittingVerification(true);
      setError(null);
      const res = await api.verification.submit({
        type: 'college_identity',
        verificationMethod: verificationMethod,
        evidenceRefs: [
          {
            type: 'enrollment_id',
            referenceId: evidenceRef.trim(),
            label: 'Institutional Registration Number / Roll No'
          }
        ],
        notes: evidenceNotes.trim()
      });

      if (res.success) {
        setSuccessMsg('College identity verification submitted to the Registrar Queue!');
        setShowVerificationForm(false);
        setEvidenceRef('');
        setEvidenceNotes('');
        await loadData();
        setTimeout(() => setSuccessMsg(null), 3500);
      }
    } catch (err) {
      setError(err.message || 'Unable to submit verification request.');
    } finally {
      setSubmittingVerification(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-16 text-center">
        <span className="material-symbols-outlined text-[36px] text-primary animate-spin">progress_activity</span>
        <p className="text-xs text-on-surface-variant mt-2 font-medium">Loading profile credentials...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {}
      <div className="border-b border-[#e4e2da] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-secondary uppercase tracking-widest bg-secondary-fixed/40 px-2 py-0.5 rounded">
            Alumni Credential & Profile Manager
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-on-surface mt-2 tracking-tight">
            Academic Identity & Practice
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Manage your public alumni listing, mentorship offerings, and institutional verification evidence.
          </p>
        </div>

        {}
        {profile && (
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
              Institutional Standing
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
                  profile.collegeVerificationStatus === 'verified'
                    ? 'bg-[#b5efd2] text-[#002115] border-primary/20'
                    : profile.collegeVerificationStatus === 'pending'
                    ? 'bg-[#fdc981]/40 text-secondary border-[#b88b4a]/30'
                    : 'bg-[#f5f4f0] text-on-surface-variant border-[#e4e2da]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {profile.collegeVerificationStatus === 'verified' ? 'verified' : 'pending_actions'}
                </span>
                College ID: {profile.collegeVerificationStatus.toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>

      {}
      {error && (
        <div className="mb-6 bg-[#ffdad6] text-[#ba1a1a] p-4 rounded-2xl border border-[#ba1a1a]/20 text-xs flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 bg-[#b5efd2] text-[#002115] p-4 rounded-2xl border border-primary/20 text-xs flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[18px] shrink-0">check_circle</span>
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {}
        <div className="lg:col-span-4 space-y-6">
          
          {}
          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[20px] text-primary">account_balance</span>
              <h3 className="font-serif text-lg font-medium text-on-surface">
                College Identity Claim
              </h3>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              IIIT Delhi awards verified status after cross-referencing degree records or enrollment registries.
            </p>

            <div className="space-y-3 bg-[#faf9f5] rounded-2xl p-4 border border-[#e4e2da] mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-outline">College Record:</span>
                <span className="font-semibold text-on-surface">
                  {profile ? `${profile.department} ('${profile.graduationYear})` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Identity Review:</span>
                <span className="font-semibold capitalize text-on-surface">
                  {profile ? profile.collegeVerificationStatus : 'unverified'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Employment Claim:</span>
                <span className="font-semibold text-secondary">
                  {profile ? profile.employmentVerificationStatus.toUpperCase() : 'UNVERIFIED'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-outline italic mb-4">
              *Notice: College identity and employment verifications are kept strictly separate.
            </p>

            {profile && profile.collegeVerificationStatus !== 'verified' && profile.collegeVerificationStatus !== 'pending' && (
              <button
                type="button"
                onClick={() => setShowVerificationForm(!showVerificationForm)}
                className="w-full py-2.5 bg-primary text-white hover:bg-primary-container rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">upload_file</span>
                Submit Identity Evidence
              </button>
            )}

            {profile && profile.collegeVerificationStatus === 'pending' && (
              <div className="p-3 bg-[#fdc981]/30 rounded-xl border border-secondary/30 text-xs text-secondary font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                Submission is awaiting Registrar review.
              </div>
            )}
          </div>

          {}
          {showVerificationForm && (
            <div className="bg-white rounded-3xl border border-primary p-6 shadow-md animate-fade-in">
              <h4 className="font-serif text-base font-medium text-on-surface mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
                Submit Verification Proof
              </h4>
              <form onSubmit={handleSubmitVerification} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Verification Method
                  </label>
                  <select
                    value={verificationMethod}
                    onChange={(e) => setVerificationMethod(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-on-surface"
                  >
                    <option value="college_record_match">Registrar Record Match (Roll No)</option>
                    <option value="document_review">Institutional ID Card / Transcript</option>
                    <option value="approved_email_method">Institutional Alumni Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Evidence Reference / Roll No
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NS-2018-CS-042"
                    value={evidenceRef}
                    onChange={(e) => setEvidenceRef(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-on-surface"
                  />
                  <p className="text-[10px] text-outline mt-1">
                    Evidence references remain strictly confidential and are visible only to the Registrar.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Additional Review Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Completed thesis under Dr. Vance."
                    value={evidenceNotes}
                    onChange={(e) => setEvidenceNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-on-surface resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={submittingVerification}
                    className="flex-1 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold uppercase rounded-xl transition-colors disabled:opacity-50"
                  >
                    {submittingVerification ? 'Submitting...' : 'Send to Registrar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVerificationForm(false)}
                    className="px-3 py-2 bg-[#f5f4f0] text-on-surface text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {}
          {verificationHistory.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 shadow-xs">
              <h4 className="font-serif text-base font-medium text-on-surface mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-outline">history</span>
                Audit Activity Ledger
              </h4>
              <div className="space-y-3">
                {verificationHistory.map((item) => (
                  <div key={item._id} className="p-3 bg-[#faf9f5] rounded-xl border border-[#e4e2da] text-xs">
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span className="capitalize">
                        {(item.type || item.verificationType || 'college_identity').replace(/_/g, ' ')}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.status === 'verified' ? 'bg-[#b5efd2] text-[#002115]' : 'bg-[#fdc981]/50 text-secondary'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    {item.reviewNote && (
                      <p className="text-on-surface-variant text-[11px] italic mt-1">
                        Note: "{item.reviewNote}"
                      </p>
                    )}
                    <span className="text-[10px] text-outline block mt-1">
                      Ref: {item.evidenceRefs?.[0]?.referenceId || item.evidenceReference || item.verificationMethod?.replace(/_/g, ' ') || 'Institutional Record'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-[#e4e2da] p-6 sm:p-8 shadow-xs">
            <h3 className="font-serif text-xl font-medium text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-primary">badge</span>
              Public Profile & Mentorship Preferences
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                    Current Professional Role
                  </label>
                  <input
                    type="text"
                    required
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="e.g. Principal Systems Architect"
                    className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                    Current Employer / Organization
                  </label>
                  <input
                    type="text"
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}
                    placeholder="e.g. Datamesh Cloud Labs"
                    className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                    Industry Sector
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Cloud Infrastructure & Deep Tech"
                    className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                    Mentorship Capacity & Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white"
                  >
                    <option value="available">🟢 Available (Accepting Student Requests)</option>
                    <option value="busy">🟡 Busy (Limited Term Engagement)</option>
                    <option value="paused">⚪ Paused (Hidden from Active Feed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                  Professional Bio & Editorial Statement
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your journey, academic background, and what advice you are glad to provide..."
                  className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                  Skills & Technology Expertise (Comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  placeholder="e.g. Distributed Systems, Go, Kubernetes, Cloud Architecture"
                  className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2.5">
                  Mentorship Tracks Offered
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {MENTORSHIP_OPTIONS.map((opt) => {
                    const isSelected = mentorshipTopics.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleTopicToggle(opt.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-primary-container text-on-primary border-primary shadow-xs'
                            : 'bg-[#faf9f5] text-on-surface border-[#e4e2da] hover:bg-[#efeeea]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className="material-symbols-outlined text-[16px]">
                          {isSelected ? 'check_circle' : 'add_circle'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e4e2da] flex items-center justify-between">
                <span className="text-[11px] text-outline">
                  Changes update immediately across the live Alumni Directory.
                </span>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      Update Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
