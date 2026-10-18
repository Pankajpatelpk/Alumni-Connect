import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function MentorshipsScreen({ currentUser, onNavigate }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  
  
  const [selectedReq, setSelectedReq] = useState(null);
  const [responseStatus, setResponseStatus] = useState('accepted');
  const [responseMessage, setResponseMessage] = useState('');
  const [acceptedSlot, setAcceptedSlot] = useState('');
  const [submitting, setSubmitting] = useState(false);

  
  const [reportModalReq, setReportModalReq] = useState(null);
  const [reportReason, setReportReason] = useState('Student did not show up on the scheduled Google Meet / Zoom session without prior notice.');
  const [reporting, setReporting] = useState(false);

  
  const [statusFilter, setStatusFilter] = useState('all');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.mentorship.getMyRequests();
      setRequests(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch mentorship requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentUser]);

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    if (!selectedReq) return;

    try {
      setSubmitting(true);
      await api.mentorship.updateStatus(selectedReq._id, {
        status: responseStatus,
        responseMessage: responseMessage.trim(),
        acceptedSlot: acceptedSlot.trim()
      });

      setActionSuccess(`Request status updated to '${responseStatus}'`);
      setSelectedReq(null);
      setResponseMessage('');
      setAcceptedSlot('');
      fetchRequests();

      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      alert(`Error updating request: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReportNoShow = async (e) => {
    e.preventDefault();
    if (!reportModalReq) return;

    try {
      setReporting(true);
      await api.mentorship.updateStatus(reportModalReq._id, {
        status: 'no_show_reported',
        reportReason: reportReason.trim()
      });

      setActionSuccess('No-show incident reported to TPO. Student has been issued an institutional strike.');
      setReportModalReq(null);
      setReportReason('Student did not show up on the scheduled Google Meet / Zoom session without prior notice.');
      fetchRequests();

      setTimeout(() => setActionSuccess(null), 4000);
    } catch (err) {
      alert(`Failed to submit report: ${err.message}`);
    } finally {
      setReporting(false);
    }
  };

  const incomingPendingCount = requests.filter((r) => r.status === 'pending').length;
  const upcomingConfirmedCount = requests.filter((r) => r.status === 'accepted').length;
  const completedCount = requests.filter((r) => r.status === 'completed').length;
  const totalRevenue = completedCount * 75; 
  const noShowCount = requests.filter((r) => r.status === 'no_show_reported').length;
  const activeStudentRequestsCount = requests.filter((r) =>
    ['pending', 'time_proposed'].includes(r.status)
  ).length;

  const filteredRequests = requests.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      
      {}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e4e2da] pb-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-secondary tracking-widest uppercase bg-secondary-fixed/40 px-2 py-0.5 rounded">
              {currentUser?.role === 'alumni'
                ? 'ALUMNI MENTOR COMMAND CENTER'
                : currentUser?.role === 'admin'
                ? 'INSTITUTION AUDIT CONSOLE'
                : 'STUDENT MENTORSHIP CONSOLE'}
            </span>
            <span className="text-xs text-outline">•</span>
            <span className="text-xs text-on-surface-variant font-mono">
              ROLE: {currentUser ? currentUser.role.toUpperCase() : 'GUEST'}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-on-surface tracking-tight">
            {currentUser?.role === 'alumni'
              ? 'Session Workspace & Honorarium Revenue'
              : currentUser?.role === 'admin'
              ? 'Institutional Mentorship Oversight & Incident Ledger'
              : 'Mentorship Engagements & Session Ledger'}
          </h1>
          <p className="text-xs text-on-surface-variant max-w-2xl font-sans">
            {currentUser?.role === 'alumni'
              ? 'Manage incoming student requests, schedule mock interviews, track completed sessions, and disburse token honorarium.'
              : 'Review active requests, confirm meeting times, and track institutional fair-use compliance.'}
          </p>
        </div>

        <button
          onClick={fetchRequests}
          className="flex items-center gap-1.5 bg-[#f5f4f0] hover:bg-[#efeeea] border border-[#e4e2da] text-on-surface px-3 py-1.5 rounded-xl text-xs font-semibold self-start md:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          Refresh Engagements
        </button>
      </div>

      {actionSuccess && (
        <div className="bg-[#b5efd2]/50 border border-primary/30 text-[#002115] text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
          <span>{actionSuccess}</span>
        </div>
      )}

      {}
      {currentUser?.role === 'student' && (
        <div className="bg-white border border-[#e4e2da] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-semibold text-on-surface">
                  IIIT Delhi Student Standing & Fair-Use Quota
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    (currentUser?.strikes || 0) > 0
                      ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30'
                      : 'bg-[#b5efd2] text-[#002115] border border-primary/20'
                  }`}
                >
                  {(currentUser?.strikes || 0) > 0
                    ? `⚠️ ${currentUser.strikes} Strike(s) Active`
                    : '✓ Good Standing (0 Strikes)'}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 max-w-xl font-sans">
                Under IIITD TPO guidelines, every student can hold up to <strong>2 active mentorship requests</strong> simultaneously to prevent spam. Unexcused no-shows are penalized with institutional strikes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={() => onNavigate && onNavigate('pro')}
              className="flex items-center gap-2 bg-[#f6f2e8] hover:bg-[#ece5d5] border border-[#dfd5c0] px-3 py-2 rounded-xl shadow-2xs cursor-pointer transition-all text-left group"
              title="Open Pro Pass Hub & Token Economics"
            >
              <span className="material-symbols-outlined text-[#b88b4a] text-[18px] group-hover:rotate-12 transition-transform">toll</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d571b] font-mono">
                  Monthly Tokens
                </span>
                <span className="text-xs font-bold text-on-surface font-mono flex items-center gap-1">
                  <span>2 Available (₹199 Pro)</span>
                  <span className="material-symbols-outlined text-[13px] text-primary">arrow_forward</span>
                </span>
              </div>
            </button>

            <div className="flex items-center gap-2.5 bg-[#faf9f5] border border-[#e4e2da] px-3 py-2 rounded-xl shadow-2xs">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant font-mono">
                  Active Slots
                </span>
                <span className="text-xs font-bold text-on-surface font-mono">
                  {activeStudentRequestsCount} / 2 Used
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      )}

      {}
      {currentUser?.role === 'alumni' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {}
            <div
              onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
              className={`bg-white border rounded-2xl p-4 flex flex-col justify-between shadow-xs transition-all cursor-pointer ${
                statusFilter === 'pending' ? 'border-primary ring-2 ring-primary/20' : 'border-[#e4e2da] hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-mono">
                  Pending Decision
                </span>
                <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">inbox</span>
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-3xl font-serif font-bold text-on-surface">
                  {incomingPendingCount}
                </div>
                <span className="text-[11px] text-amber-700 font-semibold mt-0.5 block">
                  {incomingPendingCount > 0 ? 'Requires action' : 'Queue cleared'}
                </span>
              </div>
            </div>

            {}
            <div
              onClick={() => setStatusFilter(statusFilter === 'accepted' ? 'all' : 'accepted')}
              className={`bg-white border rounded-2xl p-4 flex flex-col justify-between shadow-xs transition-all cursor-pointer ${
                statusFilter === 'accepted' ? 'border-primary ring-2 ring-primary/20' : 'border-[#e4e2da] hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-mono">
                  Upcoming Sessions
                </span>
                <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">event_available</span>
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-3xl font-serif font-bold text-primary">
                  {upcomingConfirmedCount}
                </div>
                <span className="text-[11px] text-on-surface-variant font-medium mt-0.5 block">
                  Scheduled on Google Meet / Zoom
                </span>
              </div>
            </div>

            {}
            <div
              onClick={() => setStatusFilter(statusFilter === 'completed' ? 'all' : 'completed')}
              className={`bg-white border rounded-2xl p-4 flex flex-col justify-between shadow-xs transition-all cursor-pointer ${
                statusFilter === 'completed' ? 'border-primary ring-2 ring-primary/20' : 'border-[#e4e2da] hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-mono">
                  Total Completed
                </span>
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-3xl font-serif font-bold text-on-surface">
                  {completedCount}
                </div>
                <span className="text-[11px] text-on-surface-variant font-medium mt-0.5 block">
                  Mentorship calls delivered
                </span>
              </div>
            </div>

            {}
            <div className="bg-gradient-to-br from-[#faf8f4] to-[#f4eee2] border border-[#dfd5c0] rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#7d571b] uppercase tracking-wider font-mono">
                  Honorarium Balance
                </span>
                <span className="w-8 h-8 rounded-xl bg-[#7d571b]/15 text-[#7d571b] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-3xl font-serif font-bold text-[#7d571b]">
                  ₹{totalRevenue}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="px-2.5 py-1 bg-primary hover:bg-[#1b4434] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-xs transition-all cursor-pointer"
                  >
                    Withdraw UPI
                  </button>
                  <button
                    onClick={() => {
                      setActionSuccess(`Donated ₹${totalRevenue} to IIIT Delhi Student Welfare Fund! Thank you!`);
                      setTimeout(() => setActionSuccess(null), 3500);
                    }}
                    className="px-2 py-1 bg-[#eadecb] hover:bg-[#dfd0ba] text-[#7d571b] text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                  >
                    Donate Fund
                  </button>
                </div>
              </div>
            </div>

          </div>

          {}
          <div className="bg-[#f4f2ea] border border-[#e4e2da] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 text-secondary">
                <span className="material-symbols-outlined text-[24px]">shield_person</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-semibold text-on-surface">
                    Alumni Protection & Anti-Misuse Protocol
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary-fixed/50 text-secondary font-bold">
                    TPO BACKED
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl font-sans">
                  Your voluntary time is protected by IIIT Delhi's fair-use cap. If a student fails to show up or behaves unprofessionally, you can report them to the Training & Placement Cell directly with 1-click below.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#e4e2da] pb-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-[#f5f4f0] text-on-surface-variant hover:bg-[#efeeea]'
          }`}
        >
          All Engagements ({requests.length})
        </button>
        {currentUser?.role === 'alumni' && (
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-[#f5f4f0] text-on-surface-variant hover:bg-[#efeeea]'
            }`}
          >
            Action Needed ({incomingPendingCount})
          </button>
        )}
        <button
          onClick={() => setStatusFilter('accepted')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            statusFilter === 'accepted'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-[#f5f4f0] text-on-surface-variant hover:bg-[#efeeea]'
          }`}
        >
          Confirmed Upcoming ({upcomingConfirmedCount})
        </button>
        <button
          onClick={() => setStatusFilter('completed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            statusFilter === 'completed'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-[#f5f4f0] text-on-surface-variant hover:bg-[#efeeea]'
          }`}
        >
          Completed ({completedCount})
        </button>
        {noShowCount > 0 && (
          <button
            onClick={() => setStatusFilter('no_show_reported')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === 'no_show_reported'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-50 text-red-800 hover:bg-red-100'
            }`}
          >
            TPO Incident Reports ({noShowCount})
          </button>
        )}
      </div>

      {loading && (
        <div className="p-12 text-center text-xs text-on-surface-variant font-medium">
          Loading active mentorship engagements...
        </div>
      )}

      {error && (
        <div className="p-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      )}

      {!loading && !error && filteredRequests.length === 0 && (
        <div className="bg-white border border-[#e4e2da] rounded-2xl p-12 text-center flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[48px] text-outline">forum</span>
          <h3 className="font-serif text-xl text-on-surface font-medium">No Matching Requests</h3>
          <p className="text-xs text-on-surface-variant max-w-sm">
            {statusFilter !== 'all'
              ? `There are no sessions currently in '${statusFilter}' status.`
              : currentUser?.role === 'alumni'
              ? 'You do not have any pending mentorship requests from students right now.'
              : 'You have not submitted any mentorship requests yet. Browse the alumni directory to connect with a mentor!'}
          </p>
        </div>
      )}

      {}
      {!loading && !error && filteredRequests.length > 0 && (
        <div className="flex flex-col gap-4">
          {filteredRequests.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-[#e4e2da] rounded-2xl p-5 flex flex-col sm:flex-row items-start justify-between gap-5 shadow-[0_1px_8px_rgba(24,37,31,0.02)]"
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary-fixed/30 text-secondary px-2 py-0.5 rounded">
                    {item.requestType?.replace(/_/g, ' ')}
                  </span>

                  {item.status === 'accepted' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#b5efd2] text-[#002115]">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span>
                      CONFIRMED SESSION
                    </span>
                  )}
                  {item.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#fdc981]/50 text-[#785216]">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      AWAITING MENTOR
                    </span>
                  )}
                  {item.status === 'declined' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-900">
                      DECLINED
                    </span>
                  )}
                  {item.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                      COMPLETED
                    </span>
                  )}
                  {item.status === 'no_show_reported' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30">
                      <span className="material-symbols-outlined text-[12px]">warning</span>
                      NO-SHOW REPORTED (TPO AUDIT FILED)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-on-surface-variant font-medium">Student:</span>
                  <span className="font-semibold text-on-surface">{item.studentId?.name}</span>
                  <span className="text-outline">•</span>
                  <span className="text-on-surface-variant font-medium">Mentor:</span>
                  <span className="font-semibold text-primary">{item.alumniId?.name}</span>
                  {item.alumniProfileId?.employer && (
                    <span className="text-on-surface-variant font-mono">({item.alumniProfileId?.employer})</span>
                  )}
                </div>

                <div className="bg-[#faf9f5] border border-[#e4e2da] p-3 rounded-xl text-xs flex flex-col gap-1 mt-1">
                  <div className="font-semibold text-on-surface">Goal: {item.studentGoal}</div>
                  <p className="text-on-surface-variant italic">"{item.message}"</p>
                  {item.proposedSlots && item.proposedSlots.length > 0 && (
                    <div className="text-[11px] text-secondary font-mono mt-1">
                      Proposed Slots: {item.proposedSlots.join(', ')}
                    </div>
                  )}
                </div>

                {item.responseMessage && (
                  <div className="bg-[#f5f4f0] border-l-2 border-primary p-2.5 rounded-r-xl text-xs mt-1">
                    <span className="font-bold text-primary block text-[10px] uppercase tracking-wider mb-0.5">
                      Mentor Response:
                    </span>
                    <span className="text-on-surface">{item.responseMessage}</span>
                    {item.acceptedSlot && (
                      <span className="block text-[11px] font-bold text-secondary mt-1">
                        Confirmed Time: {item.acceptedSlot}
                      </span>
                    )}
                  </div>
                )}

                {item.reportReason && (
                  <div className="bg-[#ffdad6]/40 border-l-2 border-[#ba1a1a] p-2.5 rounded-r-xl text-xs mt-1">
                    <span className="font-bold text-[#ba1a1a] block text-[10px] uppercase tracking-wider mb-0.5">
                      TPO Incident Record:
                    </span>
                    <span className="text-[#410002]">{item.reportReason}</span>
                  </div>
                )}
              </div>

              {}
              <div className="shrink-0 flex sm:flex-col items-end gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-[#e4e2da]">
                {currentUser?.role === 'alumni' && item.status === 'pending' && (
                  <button
                    onClick={() => {
                      setSelectedReq(item);
                      setResponseStatus('accepted');
                      setAcceptedSlot(item.proposedSlots[0] || '');
                    }}
                    className="px-4 py-2 bg-primary hover:bg-[#1b4434] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                  >
                    Respond to Student
                  </button>
                )}

                {currentUser?.role === 'alumni' && item.status === 'accepted' && (
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={async () => {
                        if (confirm('Mark this mentorship session as completed?')) {
                          await api.mentorship.updateStatus(item._id, { status: 'completed' });
                          fetchRequests();
                        }
                      }}
                      className="px-3.5 py-1.5 bg-[#efeeea] hover:bg-[#e4e2da] text-on-surface text-xs font-semibold rounded-lg transition-colors text-center"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => {
                        setReportModalReq(item);
                        setReportReason('Student did not show up on the scheduled Google Meet / Zoom session without prior notice.');
                      }}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg border border-red-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">flag</span>
                      Report No-Show to TPO
                    </button>
                  </div>
                )}

                {currentUser?.role === 'student' && item.status === 'pending' && (
                  <button
                    onClick={async () => {
                      if (confirm('Cancel this pending request?')) {
                        await api.mentorship.updateStatus(item._id, { status: 'cancelled' });
                        fetchRequests();
                      }
                    }}
                    className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {}
      {selectedReq && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e4e2da] rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#e4e2da] pb-3">
              <h3 className="font-serif text-lg font-medium text-on-surface">
                Respond to {selectedReq.studentId?.name}
              </h3>
              <button
                onClick={() => setSelectedReq(null)}
                className="w-7 h-7 rounded hover:bg-[#f5f4f0] flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleResponseSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                  Your Decision
                </label>
                <select
                  value={responseStatus}
                  onChange={(e) => setResponseStatus(e.target.value)}
                  className="w-full bg-[#faf9f5] border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary font-medium"
                >
                  <option value="accepted">Accept & Schedule Session</option>
                  <option value="time_proposed">Propose Alternative Time</option>
                  <option value="declined">Decline Request (Politely)</option>
                </select>
              </div>

              {responseStatus === 'accepted' && (
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                    Confirmed Time Slot
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tuesday 4:00 PM EST"
                    value={acceptedSlot}
                    onChange={(e) => setAcceptedSlot(e.target.value)}
                    className="w-full bg-white border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                  Message for Student
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share meeting link or preparation instructions..."
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  className="w-full bg-white border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e4e2da]">
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-[#efeeea]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-[#1b4434] text-white shadow-sm transition-all"
                >
                  {submitting ? 'Transmitting...' : 'Send Response'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {reportModalReq && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e4e2da] rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#e4e2da] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600 text-[20px]">report</span>
                <h3 className="font-serif text-lg font-medium text-on-surface">
                  Report Student Misuse / No-Show
                </h3>
              </div>
              <button
                onClick={() => setReportModalReq(null)}
                className="w-7 h-7 rounded hover:bg-[#f5f4f0] flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-900 leading-relaxed font-sans">
              <strong>IIIT Delhi TPO Oversight:</strong> Filing this report marks the session as unfulfilled and increments the student's institutional strikes. Students with 3 strikes are automatically placed on a booking cooldown.
            </div>

            <form onSubmit={handleReportNoShow} className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                  Incident Reason & Notes
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail what occurred (e.g. Student did not attend the scheduled meeting, unreachable on email)..."
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-white border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-red-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e4e2da]">
                <button
                  type="button"
                  onClick={() => setReportModalReq(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-[#efeeea]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reporting}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all"
                >
                  {reporting ? 'Filing Incident...' : 'Submit Report to TPO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e4e2da] rounded-2xl max-w-md w-full p-6 shadow-2xl relative flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#e4e2da] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">account_balance_wallet</span>
                <h3 className="font-serif text-lg font-semibold text-on-surface">
                  Withdraw Mentorship Honorarium
                </h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#f5f4f0] flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-[#faf8f4] border border-[#dfd5c0] rounded-xl p-4 text-center">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                Available Honorarium Balance
              </span>
              <div className="text-3xl font-serif font-bold text-[#7d571b] mt-0.5">
                ₹{totalRevenue}
              </div>
              <span className="text-[11px] text-[#245c46] font-semibold mt-1 block">
                Accumulated from {completedCount} verified sessions (₹75 per token)
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWithdrawing(true);
                setTimeout(() => {
                  setWithdrawing(false);
                  setShowWithdrawModal(false);
                  setActionSuccess(`Instant payout of ₹${totalRevenue} dispatched to ${upiId || 'marcus@okhdfcbank'} via IMPS.`);
                  setTimeout(() => setActionSuccess(null), 4000);
                }, 1000);
              }}
              className="flex flex-col gap-3"
            >
              <div>
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                  Enter Your UPI ID (VPA) / Bank Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. marcus.vance@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-[#faf9f5] border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Transfers are processed in partnership with IIIT Delhi Alumni Relations Office. Instant credit via IMPS/UPI.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e4e2da]">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-[#efeeea]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={withdrawing || totalRevenue === 0}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-[#1b4434] text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {withdrawing ? 'Transferring...' : `Disburse ₹${totalRevenue} via UPI`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
