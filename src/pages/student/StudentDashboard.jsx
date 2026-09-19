import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StudentLayout from '../../layouts/StudentLayout.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  AlertCircle,
  ArrowRight,
  Bookmark,
  Sparkles,
  BookOpen,
  Send,
  Flame,
} from 'lucide-react'

const todayClasses = [
  {
    code: 'PHYS 401',
    name: 'Advanced Thermodynamics',
    time: '10:00 AM – 11:30 AM',
    room: 'Science Hall 302',
    prof: 'Prof. Chen Wei',
    color: 'border-l-indigo-600 bg-indigo-50/40',
  },
  {
    code: 'CS 302',
    name: 'Data Structures & Algorithms',
    time: '2:00 PM – 3:45 PM',
    room: 'Alan Turing Hall 104',
    prof: 'Prof. Sara Okafor',
    color: 'border-l-violet-600 bg-violet-50/40',
  },
]

const studentSubjects = [
  {
    code: 'PHYS 401',
    name: 'Advanced Thermodynamics',
    prof: 'Prof. Chen Wei',
    done: 3,
    total: 5,
    nextDue: 'Problem Set 5 · 7d left',
    urgent: true,
  },
  {
    code: 'CS 302',
    name: 'Data Structures & Algorithms',
    prof: 'Prof. Sara Okafor',
    done: 4,
    total: 4,
    nextDue: 'Project Proposal · 11d left',
    urgent: false,
  },
  {
    code: 'MATH 201',
    name: 'Linear Algebra',
    prof: 'Prof. James Erikson',
    done: 4,
    total: 6,
    nextDue: 'Midterm Review · 14d left',
    urgent: false,
  },
  {
    code: 'HIST 210',
    name: 'Modern World History',
    prof: 'Prof. Anita Reyes',
    done: 2,
    total: 3,
    nextDue: 'Research Essay · 26d left',
    urgent: false,
  },
]

const upcomingTasks = [
  {
    id: 1,
    title: 'Problem Set 5: Carnot Engines & Entropy',
    subject: 'PHYS 401',
    due: 'Due in 7 days',
    urgent: true,
  },
  {
    id: 2,
    title: 'Final Project Proposal: Graph Visualizer',
    subject: 'CS 302',
    due: 'Due in 11 days',
    urgent: false,
  },
  {
    id: 3,
    title: 'Homework 5: Diagonalization Practice',
    subject: 'MATH 201',
    due: 'Due in 14 days',
    urgent: false,
  },
]

export default function StudentDashboard() {
  const { firstName } = useUser()
  const [scratchpad, setScratchpad] = useState(() => {
    return localStorage.getItem('classvault_student_notes') || '• Review Carnot theorem derivation before 10 AM\n• Submit CS 302 code draft'
  })
  const [noteSaved, setNoteSaved] = useState(false)

  const handleSaveNotes = (e) => {
    e.preventDefault()
    localStorage.setItem('classvault_student_notes', scratchpad)
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 2000)
  }

  return (
    <StudentLayout>
      <div className="px-8 py-8 max-w-7xl mx-auto space-y-8">
        {/* Welcome Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold mb-2 tracking-wide uppercase">
                <Sparkles size={14} className="text-amber-300" />
                <span>Personal Study Workspace</span>
              </div>
              <h1 className="text-3xl font-serif font-bold">
                Good morning, {firstName || 'Student'} 👋
              </h1>
              <p className="text-sm text-indigo-100/90 mt-1.5 max-w-xl leading-relaxed">
                You have <strong>2 lectures today</strong> and <strong>1 urgent assignment</strong> due this week. Keep your study streak alive!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/student/assignments"
                className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-5 py-3 rounded-2xl text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
              >
                <span>View Tasks</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/student/vault"
                className="bg-indigo-800/60 hover:bg-indigo-800 text-white font-semibold px-4 py-3 rounded-2xl text-sm transition-all border border-indigo-400/30 shrink-0"
              >
                Browse Vault
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Study Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border border-indigo-100/80 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <BookOpen size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">4 Subjects</p>
            <p className="text-xs text-slate-400 mt-0.5">Enrolled this term</p>
          </div>

          <div className="bg-white rounded-2xl border border-indigo-100/80 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">13 / 18</p>
            <p className="text-xs text-slate-400 mt-0.5">Assignments completed (72%)</p>
          </div>

          <div className="bg-white rounded-2xl border border-indigo-100/80 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
              <Flame size={20} className="fill-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900">5-Day Streak</p>
            <p className="text-xs text-slate-400 mt-0.5">Active study habits</p>
          </div>

          <div className="bg-white rounded-2xl border border-indigo-100/80 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
              <Bookmark size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">24 Files</p>
            <p className="text-xs text-slate-400 mt-0.5">Saved in study vault</p>
          </div>
        </div>

        {/* 2-Column Section */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Cols: Today's Schedule & Subjects */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-indigo-600" />
                  <h2 className="text-base font-bold text-slate-900">Today&apos;s Lecture Schedule</h2>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  Monday, October 7
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {todayClasses.map((cls) => (
                  <div
                    key={cls.code}
                    className={`border-l-4 rounded-2xl p-4 border border-slate-100 shadow-2xs ${cls.color}`}
                  >
                    <span className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                      {cls.code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-2">{cls.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Clock size={13} /> {cls.time}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                      <MapPin size={13} /> {cls.room} · {cls.prof}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled Subjects with Progress */}
            <div className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Enrolled Subjects</h2>
                  <p className="text-xs text-slate-400">Track your coursework progression</p>
                </div>
                <Link
                  to="/student/classes"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  View All Subjects →
                </Link>
              </div>

              <div className="space-y-4">
                {studentSubjects.map((sub) => {
                  const pct = Math.round((sub.done / sub.total) * 100)
                  return (
                    <Link
                      key={sub.code}
                      to={`/classes/${sub.code.replace(/\s+/g, '-')}`}
                      className="block p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {sub.code}
                            </span>
                            <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {sub.name}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{sub.prof}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                            sub.urgent
                              ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {sub.nextDue}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{pct}%</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Col: Tasks & Quick Scratchpad */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">Upcoming Deadlines</h2>
                <Link to="/student/assignments" className="text-xs font-bold text-indigo-600 hover:underline">
                  All Tasks →
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {t.subject}
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          t.urgent ? 'text-rose-600 font-bold' : 'text-slate-500'
                        }`}
                      >
                        {t.due}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 line-clamp-1">{t.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Study Scratchpad */}
            <div className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-slate-900">Study Scratchpad</h2>
                {noteSaved && (
                  <span className="text-[11px] font-bold text-emerald-600">Saved!</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">Quick notes & personal reminders</p>

              <form onSubmit={handleSaveNotes} className="space-y-3">
                <textarea
                  rows={4}
                  value={scratchpad}
                  onChange={(e) => setScratchpad(e.target.value)}
                  placeholder="Jot down quick thoughts or homework ideas..."
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none font-mono"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  Save Notes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
