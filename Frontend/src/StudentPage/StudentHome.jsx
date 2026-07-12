import React from 'react';
import {
  FaHistory, FaExclamationCircle, FaUserGraduate, FaClipboardList,
  FaSearch, FaCalendarAlt, FaRupeeSign, FaFileAlt, FaBell,
  FaQuestionCircle, FaHandPaper, FaChevronRight, FaThumbtack, FaQrcode
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdEventNote } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import LayoutStu from '../Components/LayoutStu';

const importantMessage = "Staff meeting scheduled for 28th August at 2:00 PM in the conference hall.";

// Tickets are grouped by purpose (not just a flat wall of icons) so the
// page reads like sections of a student planner rather than a generic grid.
const sections = [
  {
    label: "Academics",
    accent: "amber",
    items: [
      { key: "attendance", label: "Attendance", icon: FaClipboardList, route: "/student-attendance" },
      { key: "timetable", label: "Timetable", icon: FaCalendarAlt, alert: "Timetable functionality coming soon!" },
      { key: "result", label: "Result", icon: FaHandPaper, route: "/student-result" },
      { key: "seating", label: "Seating plan", icon: MdEventNote, alert: "Seating Plan functionality coming soon!" },
      { key: "test", label: "Student test", icon: FaQuestionCircle, route: "/student-test" },
    ],
  },
  {
    label: "Finance",
    accent: "sage",
    items: [
      { key: "fees", label: "Fees", icon: FaRupeeSign, route: "/fee-submit" },
      { key: "feeshistory", label: "Fees history", icon: FaHistory, alert: "Fees History functionality coming soon!" },
    ],
  },
  {
    label: "Campus & alerts",
    accent: "coral",
    items: [
      { key: "holidays", label: "Holidays", icon: FaBell, alert: "Holidays functionality coming soon!" },
      { key: "notification", label: "Notification", icon: FaBell, alert: "Notifications functionality coming soon!" },
      { key: "registration", label: "Registration", icon: FaFileAlt, alert: "Registration functionality coming soon!" },
      { key: "admitcard", label: "Admit card", icon: FaQuestionCircle, alert: "Admit Card functionality coming soon!" },
    ],
  },
];

const accentStyles = {
  amber: { bg: "bg-amber-50", ring: "border-amber-200", icon: "text-amber-600", chip: "bg-amber-100 text-amber-800" },
  sage: { bg: "bg-emerald-50", ring: "border-emerald-200", icon: "text-emerald-700", chip: "bg-emerald-100 text-emerald-800" },
  coral: { bg: "bg-orange-50", ring: "border-orange-200", icon: "text-orange-600", chip: "bg-orange-100 text-orange-800" },
};

const StudentHomePage = () => {
  const navigate = useNavigate();

  const handleTile = (item) => {
    if (item.route) navigate(item.route);
    else if (item.alert) alert(item.alert);
  };

  return (
    <LayoutStu>
      <div className="min-h-screen w-full pt-16 md:pt-20 pb-10 px-3 sm:px-6 lg:px-10 bg-[#FBF7EE]">
        <div className="w-full mx-auto">

          {/* Search */}
          <div className="relative block lg:hidden mb-5 lg:mb-8 lg:max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-[#8B8578]" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E7E0CF] rounded-xl text-[#2B2B2B] placeholder-[#8B8578] focus:outline-none focus:ring-2 focus:ring-[#F4A73C]/40 focus:border-[#F4A73C] shadow-sm text-sm"
              placeholder="Search modules..."
            />
          </div>

          {/* ID badge hero — the signature element */}
          <div className="relative flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(31,42,68,0.18)] mb-6 lg:mb-10">
            {/* perforated stub */}
            <div className="hidden sm:flex flex-col justify-between items-center bg-[#182036] w-10 lg:w-12 py-6 border-r border-dashed border-white/20">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#FBF7EE]/25" />
              ))}
            </div>

            <div className="flex-1 bg-[#1F2A44] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 relative">
              <div className="absolute top-4 right-5 flex items-center gap-1.5 text-[#F4A73C]/80">
                <FaQrcode className="text-lg" />
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F4A73C] flex items-center justify-center flex-shrink-0">
                  <FaUserGraduate className="text-3xl sm:text-4xl text-[#1F2A44]" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#F4A73C] font-semibold mb-1">Student ID</p>
                  <h1 className="text-2xl sm:text-3xl font-bold leading-tight">Durgesh</h1>
                  <p className="font-mono text-xs text-white/50 mt-1 tracking-wide">REG · 2026-CS-0142</p>
                </div>
              </div>

              <div className="sm:ml-auto flex items-center gap-3">
                <button
                  onClick={() => navigate("/student-profile")}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition text-sm font-semibold px-4 py-2.5 rounded-full border border-white/15"
                >
                  View profile
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          </div>

          {/* Section tickets, grouped by purpose */}
          <div className="space-y-8 lg:space-y-10">
            {sections.map((section) => {
              const a = accentStyles[section.accent];
              return (
                <div key={section.label}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md ${a.chip}`}>
                      {section.label}
                    </span>
                    <span className="flex-1 h-px bg-[#E7E0CF]" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.key}
                          onClick={() => handleTile(item)}
                          className={`group relative flex flex-col items-start gap-3 text-left p-4 rounded-2xl bg-white border ${a.ring} hover:-translate-y-0.5 hover:shadow-md transition-all`}
                        >
                          <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.bg}`}>
                            <Icon className={`text-lg ${a.icon}`} />
                          </span>
                          <span className="text-sm font-semibold text-[#2B2B2B] leading-snug">{item.label}</span>
                          {/* ticket notch */}
                          <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FBF7EE] border border-inherit hidden lg:block" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback + Request Center */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:mt-10">
            <button className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#E7E0CF] hover:shadow-md transition text-left">
              <span className="w-11 h-11 rounded-xl bg-[#F1EFE8] flex items-center justify-center flex-shrink-0">
                <VscFeedback className="text-xl text-[#5F5E5A]" />
              </span>
              <div>
                <h3 className="font-semibold text-[#2B2B2B] text-sm">Feedback</h3>
                <p className="text-xs text-[#8B8578] mt-0.5">Tell us what's working</p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#CBD9EE] hover:shadow-md transition text-left">
              <span className="w-11 h-11 rounded-xl bg-[#E6F1FB] flex items-center justify-center flex-shrink-0">
                <FaUserGraduate className="text-xl text-[#185FA5]" />
              </span>
              <div>
                <h3 className="font-semibold text-[#2B2B2B] text-sm">Request center</h3>
                <p className="text-xs text-[#8B8578] mt-0.5">Raise a request or query</p>
              </div>
            </button>
          </div>

          {/* Notice board — pinned note styling */}
          <div className="relative mt-8 lg:mt-10 bg-[#FDF3D8] border border-[#F0DFA0] rounded-2xl p-5 sm:p-6 max-w-3xl">
            <div className="absolute -top-2.5 left-6 w-5 h-5 rounded-full bg-[#E2593B] shadow-sm flex items-center justify-center">
              <FaThumbtack className="text-white text-[10px]" />
            </div>
            <div className="flex items-start gap-3">
              <FaExclamationCircle className="text-[#C9821F] text-lg mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-[#5F4A1A] text-sm mb-1">Important message</h4>
                <p className="text-[#6B5A2C] text-sm leading-relaxed">{importantMessage}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </LayoutStu>
  );
};

export default StudentHomePage;