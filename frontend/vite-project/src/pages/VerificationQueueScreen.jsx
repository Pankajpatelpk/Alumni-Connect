import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function VerificationQueueScreen({ currentUser }) {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  

  const [activeItem, setActiveItem] = useState(null);
  const [reviewStatus, setReviewStatus] = useState('verified');
  const [reviewNote, setReviewNote] = useState('');
  const [submittingDecision, setSubmittingDecision] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.verification.getAdminQueue({ status: statusFilter });
      setQueue(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load verification queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, [statusFilter]);

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    if (!activeItem) return;

    if (['rejected', 'needs_more_info'].includes(reviewStatus) && !reviewNote.trim()) {
      alert('A review note is required when rejecting or requesting more information.');
      return;
    }

    try {
      setSubmittingDecision(true);
      await api.verification.reviewDecision(activeItem._id, {
        status: reviewStatus,
        reviewNote: reviewNote.trim()
      });

      setActionMessage(`Request for ${activeItem.userId?.name} set to '${reviewStatus}'`);
      setActiveItem(null);
      setReviewNote('');
      fetchQueue();

      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      alert(`Error submitting decision: ${err.message}`);
    } finally {
      setSubmittingDecision(false);
    }
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12 text-center">
        <div className="bg-white border border-[#e4e2da] rounded-2xl p-10 max-w-md mx-auto flex flex-col items-center gap-3 shadow-sm">
          <span className="material-symbols-outlined text-[40px] text-secondary">admin_panel_settings</span>
          <h2 className="font-serif text-xl font-medium text-on-surface">Administrator Access Required</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            The Registrar Credential Audit Workspace is restricted to authorized college administrators.
          </p>
          <div className="mt-2 text-xs font-mono bg-[#f5f4f0] p-2 rounded text-on-surface-variant border border-[#e4e2da]">
            Switch to Dean Alistair Vance via the top-right account dropdown to audit records.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      
      {}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e4e2da] pb-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-secondary tracking-widest uppercase bg-secondary-fixed/40 px-2 py-0.5 rounded">
              REGISTRAR CONSOLE
            </span>
            <span className="text-xs text-outline">•</span>
            <span className="text-xs text-on-surface-variant font-mono">
              IIITD-REGISTRAR-SECURE // v4.11
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-on-surface tracking-tight">
            Institutional Credential Verification & Audit Workspace
          </h1>
          <p className="text-xs text-on-surface-variant max-w-2xl font-sans">
            Independent audit queue separating graduation confirmation from employment claims. Review submitted credentials, enrollment records, and issue verifiable badges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchQueue}
            className="flex items-center gap-1.5 bg-[#f5f4f0] hover:bg-[#efeeea] border border-[#e4e2da] text-on-surface px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Sync SIS Records
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="bg-[#b5efd2]/50 border border-primary/30 text-[#002115] text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
          <span>{actionMessage}</span>
        </div>
      )}

      {}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e4e2da] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Audit</span>
            <span className="material-symbols-outlined text-[18px] text-secondary">pending_actions</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-medium text-primary">
              {queue.filter((r) => r.status === 'pending').length}
            </span>
            <span className="text-[11px] text-secondary font-medium">Priority Queue</span>
          </div>
        </div>

        <div className="bg-white border border-[#e4e2da] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-[11px] font-bold uppercase tracking-wider">Clarification Needed</span>
            <span className="material-symbols-outlined text-[18px] text-on-secondary-container">mark_email_unread</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-medium text-on-surface">
              {queue.filter((r) => r.status === 'needs_more_info').length}
            </span>
            <span className="text-[11px] text-on-surface-variant">Awaiting applicant proof</span>
          </div>
        </div>

        <div className="bg-white border border-[#e4e2da] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-[11px] font-bold uppercase tracking-wider">Audit Throughput</span>
            <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-medium text-primary">100%</span>
            <span className="text-[11px] text-emerald-700 font-medium">SIS Connected</span>
          </div>
        </div>

        <div className="bg-white border border-[#e4e2da] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-[11px] font-bold uppercase tracking-wider">Employment Separation</span>
            <span className="material-symbols-outlined text-[18px] text-outline">lock</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-medium text-on-surface">Strict</span>
            <span className="text-[11px] text-on-surface-variant font-medium">No Auto-Claims</span>
          </div>
        </div>
      </div>

      {}
      <div className="bg-white border border-[#e4e2da] rounded-2xl overflow-hidden shadow-sm">
        
        {}
        <div className="px-5 py-3 border-b border-[#e4e2da] flex items-center justify-between bg-[#faf9f5]">
          <div className="flex items-center gap-1.5">
            {[
              { id: '', label: 'All Audits' },
              { id: 'pending', label: 'Pending Queue' },
              { id: 'needs_more_info', label: 'Clarification Needed' },
              { id: 'verified', label: 'Verified Records' },
              { id: 'rejected', label: 'Rejected' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  statusFilter === tab.id
                    ? 'bg-primary-container text-white shadow-sm'
                    : 'text-on-surface-variant hover:bg-[#efeeea]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-on-surface-variant font-mono">
            {queue.length} Submissions Logged
          </span>
        </div>

        {}
        {loading && (
          <div className="p-8 text-center text-xs text-on-surface-variant font-medium">
            Fetching registrar records...
          </div>
        )}

        {error && (
          <div className="p-4 text-xs text-red-600 bg-red-50 border-b border-red-200">
            {error}
          </div>
        )}

        {}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f5f4f0] text-on-surface-variant border-b border-[#e4e2da] uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Candidate / Applicant</th>
                  <th className="px-5 py-3.5">Department & Cohort</th>
                  <th className="px-5 py-3.5">Audit Method & Evidence</th>
                  <th className="px-5 py-3.5">Audit Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e2da]">
                {queue.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-on-surface-variant italic">
                      No verification requests currently matching filter '{statusFilter || 'all'}'.
                    </td>
                  </tr>
                ) : (
                  queue.map((req) => (
                    <tr key={req._id} className="hover:bg-[#faf9f5] transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-on-surface text-sm">
                          {req.userId?.name || 'Unknown Candidate'}
                        </div>
                        <div className="text-[11px] text-on-surface-variant font-mono">
                          {req.userId?.email}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="text-on-surface font-medium">
                          {req.alumniProfileId?.department || 'General Studies'}
                        </div>
                        <div className="text-[11px] text-on-surface-variant font-mono">
                          Class of {req.alumniProfileId?.graduationYear || '—'}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="text-on-surface font-medium capitalize">
                          {req.verificationMethod?.replace(/_/g, ' ')}
                        </div>
                        <div className="text-[11px] text-secondary font-mono">
                          Ref: {req.evidenceRefs[0]?.referenceId || 'N/A'} ({req.evidenceRefs[0]?.label || 'Record'})
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {req.status === 'verified' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#b5efd2] text-[#002115]">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            VERIFIED
                          </span>
                        )}
                        {req.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#fdc981]/50 text-[#785216]">
                            <span className="material-symbols-outlined text-[13px]">pending</span>
                            PENDING AUDIT
                          </span>
                        )}
                        {req.status === 'needs_more_info' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
                            <span className="material-symbols-outlined text-[13px]">help</span>
                            NEEDS INFO
                          </span>
                        )}
                        {req.status === 'rejected' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-900">
                            REJECTED
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => {
                            setActiveItem(req);
                            setReviewStatus(req.status === 'pending' ? 'verified' : req.status);
                            setReviewNote(req.reviewNote || '');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-primary hover:bg-[#1b4434] text-white font-semibold text-xs shadow-sm transition-all"
                        >
                          Audit Record
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e4e2da] rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#e4e2da] pb-3">
              <h3 className="font-serif text-lg font-medium text-on-surface">
                Audit Credential: {activeItem.userId?.name}
              </h3>
              <button
                onClick={() => setActiveItem(null)}
                className="w-7 h-7 rounded hover:bg-[#f5f4f0] flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-[#faf9f5] border border-[#e4e2da] p-3.5 rounded-xl flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Applicant:</span>
                <span className="font-semibold text-on-surface">{activeItem.userId?.name} ({activeItem.userId?.email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Claimed Cohort:</span>
                <span className="font-semibold text-on-surface">{activeItem.alumniProfileId?.department} • Class of {activeItem.alumniProfileId?.graduationYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Evidence Ref:</span>
                <span className="font-mono text-secondary font-bold">{activeItem.evidenceRefs[0]?.referenceId || 'N/A'}</span>
              </div>
            </div>

            <form onSubmit={handleAuditSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                  Registrar Audit Decision
                </label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="w-full bg-[#faf9f5] border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary font-medium"
                >
                  <option value="verified">Approve & Grant Verified College Badge</option>
                  <option value="needs_more_info">Request Additional SIS / Transcript Proof</option>
                  <option value="rejected">Reject Submission (Unverified Claim)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                  Registrar Audit Memo / Note
                </label>
                <textarea
                  rows={3}
                  required={['rejected', 'needs_more_info'].includes(reviewStatus)}
                  placeholder="Record audit memo e.g. 'Verified enrollment ID NS-2017-CS-084 against Northstar Registrar archive.'"
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  className="w-full bg-white border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e4e2da]">
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-[#efeeea]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDecision}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-[#1b4434] text-white shadow-sm transition-all"
                >
                  {submittingDecision ? 'Recording...' : 'Commit Audit Decision'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
