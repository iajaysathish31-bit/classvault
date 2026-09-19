import { Link } from 'react-router-dom'
import {
  GraduationCap,
  ShieldAlert,
  BookOpen,
  Users,
  Award,
  CalendarClock,
  Sparkles,
  ArrowRight,
  Flame,
  FileCheck2,
  FolderTree,
  BellRing,
} from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <GraduationCap size={22} />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-slate-950 block leading-none">
              ClassVault
            </span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
              Academic Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login?role=student"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <GraduationCap size={14} /> Student Portal
          </Link>
          <Link
            to="/login?role=teacher"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            <ShieldAlert size={14} /> Teacher Portal
          </Link>
          <Link
            to="/login"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-20 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold mb-6">
          <Sparkles size={14} /> Redesigned Fall 2026 Academic Portals
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 max-w-3xl mx-auto leading-[1.15]">
          Two Dedicated Portals.<br />
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
            Built Specifically For You.
          </span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          Select your campus role to enter either the student study environment or the faculty administrative console.
        </p>

        {/* Dual Gateways Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          {/* Gateway 1: Student Portal */}
          <div className="relative group bg-white rounded-3xl p-8 border-2 border-indigo-100 shadow-xl shadow-indigo-100/50 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-100 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 mb-6">
                <GraduationCap size={28} />
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  Student Environment
                </span>
                <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
                  <Flame size={13} className="fill-amber-500 text-amber-500" /> Daily Streaks
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Student Study Hub
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Focused study desk featuring personalized class timetables, enrolled subjects progress, problem set submission manager, and searchable study notes.
              </p>

              <div className="mt-6 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Interactive class schedule & lecture room locator</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Deliverable submissions with professor rubric reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Study Vault notes library with formula cheatsheets</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link
                to="/login?role=student"
                className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 group-hover:gap-3 transition-all"
              >
                Enter Student Portal <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Gateway 2: Faculty Portal */}
          <div className="relative group bg-slate-950 rounded-3xl p-8 border-2 border-slate-800 shadow-xl shadow-slate-950/40 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-950/50 transition-all flex flex-col justify-between overflow-hidden text-slate-100">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-950 mb-6">
                <ShieldAlert size={28} />
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                  Faculty Console
                </span>
                <span className="text-xs text-slate-400 font-bold">Fall Term 2026</span>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight">
                Faculty Operations Center
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Executive dark command console designed for professors and instructors to manage student cohorts, compute weighted gradebooks, and publish resources.
              </p>

              <div className="mt-6 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Teaching cohorts, capacity meters & join code generator</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Spreadsheet-style gradebook with live curve recalculation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Instant student broadcast and urgent alert dispatcher</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <Link
                to="/login?role=teacher"
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 group-hover:gap-3 transition-all"
              >
                Enter Faculty Portal <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Comparison */}
      <section className="bg-white py-16 border-t border-slate-200/80 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Tailored Experiences
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              Designed Differently For Different Needs
            </h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <BookOpen size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Clear Visual Distinction</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Students enjoy a soft indigo, low-fatigue study space. Teachers operate a high-density, dark slate administrative console.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Award size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Realtime Gradebook Sync</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Scores and feedback awarded in the faculty gradebook immediately reflect in student assignment reviews.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <FolderTree size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Integrated Curriculum Vault</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Professors publish course syllabi and lecture presentations directly into the student study vault repository.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-8 py-6 text-center text-xs text-slate-400 bg-white">
        <p>© 2026 ClassVault Inc. All academic modules active.</p>
      </footer>
    </div>
  )
}
