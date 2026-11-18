import { useCallback, useEffect, useState } from "react";
import {
  FaCheck,
  FaChevronDown,
  FaClock,
  FaEnvelope,
  FaInbox,
  FaPhone,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

const statusStyles = {
  pending: {
    label: "Awaiting review",
    badge: "border-amber-200 bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
    accent: "border-l-amber-400",
  },
  accepted: {
    label: "Accepted",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
    accent: "border-l-emerald-400",
  },
  rejected: {
    label: "Rejected",
    badge: "border-rose-200 bg-rose-50 text-rose-800",
    dot: "bg-rose-500",
    accent: "border-l-rose-400",
  },
};

const fieldLabels = {
  name: "Name",
  email: "Email",
  mobileNo: "Mobile",
};

const TeacherProfileUpdateRequests = () => {
  const {
    getTeacherProfileUpdateRequests,
    reviewTeacherProfileUpdateRequest,
  } = UserData();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyRequestId, setBusyRequestId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("pending");
  const [expandedRequestIds, setExpandedRequestIds] = useState([]);
  const [expandedAcceptedDataIds, setExpandedAcceptedDataIds] = useState([]);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setRequests(await getTeacherProfileUpdateRequests());
    setLoading(false);
  }, [getTeacherProfileUpdateRequests]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleReview = async (id, decision) => {
    setBusyRequestId(id);
    const reviewed = await reviewTeacherProfileUpdateRequest(id, decision);
    if (reviewed) {
      setRequests((current) =>
        current.map((request) =>
          request._id === id
            ? {
              ...request,
              status: decision === "accept" ? "accepted" : "rejected",
              teacherId:
                decision === "accept" && request.teacherId
                  ? {
                    ...request.teacherId,
                    ...Object.fromEntries(
                      Object.entries(request.updates || {}).filter(([, value]) => typeof value === "string")
                    ),
                  }
                  : request.teacherId,
            }
            : request
        )
      );
      if (decision === "accept") setActiveFilter("accepted");
    }
    setBusyRequestId(null);
  };

  const toggleRequestDetails = (id) => {
    setExpandedRequestIds((current) =>
      current.includes(id)
        ? current.filter((requestId) => requestId !== id)
        : [...current, id]
    );
  };

  const toggleAcceptedData = (id) => {
    setExpandedAcceptedDataIds((current) =>
      current.includes(id)
        ? current.filter((requestId) => requestId !== id)
        : [...current, id]
    );
  };

  const counts = requests.reduce(
    (result, request) => {
      if (request.status in result) result[request.status] += 1;
      return result;
    },
    { pending: 0, accepted: 0, rejected: 0 }
  );
  const visibleRequests = requests.filter((request) => request.status === activeFilter);

  return (
    <TeacherLayout>
      <div className="h-full bg-gradient-to-br from-slate-50 via-indigo-50/60 to-slate-100 px-3 pb-24 pt-24 sm:px-6 sm:pt-28 md:pb-10">
        <div className="mx-auto w-full">
          <header className="relative mb-5 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-800 p-5 text-white shadow-xl shadow-indigo-950/15 sm:mb-7 sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border-[24px] border-white/5 sm:h-72 sm:w-72" />
            <div className="pointer-events-none absolute -bottom-24 right-1/4 h-44 w-44 rounded-full bg-violet-400/10 blur-2xl" />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl text-indigo-100 ring-1 ring-white/15 sm:h-14 sm:w-14">
                <FaInbox aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                  Staff management
                </p>
                <h1 className="mt-1 text-xl font-black tracking-tight sm:text-3xl">
                  Profile update requests
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-indigo-100/80 sm:text-base">
                  Review each requested change and keep teacher records up to date.
                </p>
              </div>
            </div>
          </header>

          <section aria-label="Request summary" className="mb-5 grid grid-cols-1 gap-3 sm:mb-7 sm:grid-cols-3 sm:gap-4">
            {[
              { label: "Awaiting review", value: counts.pending, color: "text-amber-700", icon: FaClock, iconStyle: "bg-amber-100 text-amber-700" },
              { label: "Accepted", value: counts.accepted, color: "text-emerald-700", icon: FaCheck, iconStyle: "bg-emerald-100 text-emerald-700" },
              { label: "Rejected", value: counts.rejected, color: "text-rose-700", icon: FaTimes, iconStyle: "bg-rose-100 text-rose-700" },
            ].map(({ label, value, color, icon: Icon, iconStyle }) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-white bg-white/90 p-4 shadow-sm shadow-slate-900/5 sm:p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className={`mt-1 text-2xl font-black ${color}`}>{value}</p>
                </div>
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}>
                  <Icon aria-hidden="true" />
                </span>
              </div>
            ))}
          </section>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="px-1 text-base font-bold text-slate-800 sm:text-lg">Profile requests</h2>
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm" role="group" aria-label="Filter profile requests">
              <button
                type="button"
                aria-pressed={activeFilter === "accepted"}
                onClick={() => setActiveFilter("accepted")}
                className={`min-h-10 rounded-xl cursor-pointer px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${activeFilter === "accepted"
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
              >
                Show all accepted <span className="ml-1 opacity-80">({counts.accepted})</span>
              </button>
              <button
                type="button"
                aria-pressed={activeFilter === "pending"}
                onClick={() => setActiveFilter("pending")}
                className={`min-h-10 rounded-xl cursor-pointer px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${activeFilter === "pending"
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-amber-50 hover:text-amber-800"
                  }`}
              >
                Show pending requests <span className="ml-1 opacity-80">({counts.pending})</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3" role="status" aria-label="Loading requests">
              {[0, 1, 2].map((item) => (
                <div key={item} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="h-4 w-40 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-56 max-w-full rounded bg-slate-100" />
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="h-16 rounded-xl bg-slate-100" />
                    <div className="h-16 rounded-xl bg-slate-100" />
                    <div className="h-16 rounded-xl bg-slate-100" />
                  </div>
                </div>
              ))}
              <span className="sr-only">Loading requests...</span>
            </div>
          ) : visibleRequests.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-indigo-200 bg-white/80 px-5 py-12 text-center shadow-sm sm:py-16">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-500">
                <FaInbox aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                {activeFilter === "pending" ? "No pending requests" : "No accepted requests yet"}
              </h3>
              <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-slate-500">
                {activeFilter === "pending"
                  ? "New teacher profile update requests will appear here for review."
                  : "Accepted teacher profile updates will appear here."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleRequests.map((request) => {
                const status = statusStyles[request.status] || statusStyles.pending;
                const teacherName = request.teacherId?.name || "Teacher account";
                const email = request.teacherId?.email || "Account unavailable";
                const requestDetailsId = `request-details-${request._id}`;
                const detailsExpanded = expandedRequestIds.includes(request._id);
                const acceptedDataId = `accepted-data-${request._id}`;
                const acceptedDataExpanded = expandedAcceptedDataIds.includes(request._id);

                return (
                  <article
                    key={request._id}
                    className={`overflow-hidden rounded-2xl border border-slate-200 border-l-4 ${status.accent} bg-white shadow-sm shadow-slate-900/5 transition hover:shadow-md`}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                            <FaUserTie aria-hidden="true" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-bold text-slate-900">{teacherName}</h3>
                            <p className="mt-1 flex min-w-0 items-center gap-2 text-sm text-slate-600" title={email}>
                              <FaEnvelope className="shrink-0 text-slate-400" aria-hidden="true" />
                              <span className="min-w-0 truncate">{email}</span>
                            </p>
                            <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                              <FaPhone className="shrink-0 text-slate-400" aria-hidden="true" />
                              <span>{request.teacherId?.mobileNo || "—"}</span>
                            </p>
                            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                              <FaClock aria-hidden="true" />
                              Submitted {new Date(request.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${status.badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </div>

                      {request.status === "accepted" && (
                        <section className="mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/70">
                          <button
                            type="button"
                            aria-expanded={acceptedDataExpanded}
                            aria-controls={acceptedDataId}
                            onClick={() => toggleAcceptedData(request._id)}
                            className="flex cursor-pointer min-h-12 w-full lg:w-64 items-center justify-between gap-3 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-emerald-800 transition hover:bg-emerald-100/60 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                          >
                            Accepted profile data
                            <FaChevronDown
                              aria-hidden="true"
                              className={`shrink-0 transition-transform ${acceptedDataExpanded ? "rotate-180" : ""}`}
                            />
                          </button>
                          <div id={acceptedDataId} hidden={!acceptedDataExpanded} className="border-t border-emerald-100 p-4">
                            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                              {Object.entries(fieldLabels).map(([field, label]) => (
                                <div key={field} className="min-w-0">
                                  <dt className="text-[11px] font-semibold uppercase text-emerald-700/70">{label}</dt>
                                  <dd className="mt-1 break-all text-sm font-semibold text-emerald-950">
                                    {request.teacherId?.[field] || "—"}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        </section>
                      )}

                      <div className="mt-5 border-t border-slate-100 rounded-2xl pt-4">
                        <button
                          type="button"
                          aria-expanded={detailsExpanded}
                          aria-controls={requestDetailsId}
                          onClick={() => toggleRequestDetails(request._id)}
                          className="flex min-h-10 w-full lg:w-64 items-center justify-between gap-3 rounded-xl px-3 text-left text-sm font-bold text-slate-600 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                        >
                          <span>
                            Requested changes
                            <span className="ml-2 text-xs font-medium text-slate-400">
                              {Object.keys(request.updates || {}).length}
                            </span>
                          </span>
                          <FaChevronDown
                            aria-hidden="true"
                            className={`shrink-0 text-indigo-600 transition-transform ${detailsExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          id={requestDetailsId}
                          hidden={!detailsExpanded}
                          className="pt-3"
                        >
                          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(request.updates || {}).map(([field, value]) => (
                              <div key={field} className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-3 sm:p-4">
                                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                  {fieldLabels[field] || field}
                                </dt>
                                <dd className="mt-2 space-y-1.5 text-sm">
                                  <div className="flex min-w-0 items-start gap-2">
                                    <span className="shrink-0 text-[10px] font-bold uppercase text-slate-400">From</span>
                                    <span className="min-w-0 break-all text-slate-500">
                                      {request.current?.[field] || "—"}
                                    </span>
                                  </div>
                                  <div className="flex min-w-0 items-start gap-2">
                                    <span className="shrink-0 text-[10px] font-bold uppercase text-indigo-500">To</span>
                                    <span className="min-w-0 break-all font-semibold text-slate-900">{value}</span>
                                  </div>
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>

                      {request.status === "pending" && (
                        <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                          <button
                            type="button"
                            disabled={busyRequestId === request._id}
                            onClick={() => handleReview(request._id, "accept")}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-wait disabled:opacity-50 sm:min-w-32"
                          >
                            <FaCheck aria-hidden="true" />
                            Accept
                          </button>
                          <button
                            type="button"
                            disabled={busyRequestId === request._id}
                            onClick={() => handleReview(request._id, "reject")}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100 disabled:cursor-wait disabled:opacity-50 sm:min-w-32"
                          >
                            <FaTimes aria-hidden="true" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherProfileUpdateRequests;
