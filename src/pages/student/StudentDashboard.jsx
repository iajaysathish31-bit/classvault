import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StudentLayout from '../../layouts/StudentLayout.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import { useData } from '../../context/DataContext.jsx'
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
  Check,
  ListOrdered,
} from 'lucide-react'

export default function StudentDashboard() {
  const { user, firstName } = useUser()
  const { classes, topics, getClassProgress, getTeacherForClass, contents } = useData()

  const [scratchpad, setScratchpad] = useState(() => {
    return (
      localStorage.getItem('classvault_student_notes') ||
      '• Review Carnot theorem derivation before 10 AM\n• Check Dijkstra priority queue benchmark suite'
    )
  })
  const [noteSaved, setNoteSaved] = useState(false)

  const handleSaveNotes = (e) => {
    e.preventDefault()
    localStorage.setItem('classvault_student_notes', scratchpad)
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 2000)
  }

  // Calculate student overall topic progress
  const totalTopics = topics.length
  let totalReviewed = 0
  classes.forEach((cls) => {
    const p = getClassProgress(cls.class_id, user?.student_id)
    totalReviewed += p.reviewed
  })
  const overallRate = totalTopics > 0 ? Math.round((totalReviewed / totalTopics) * 100) : 0

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
                <span>Personal Study Workspace · {user?.department || 'Computer Science'}</span>
              </div>
              <h1 className="text-3xl font-serif font-bold">
                Hello, {user?.name || firstName || 'Student'}
              </h1>
              <p className="text-sm text-indigo-100/90 mt-1.5 max-w-xl leading-relaxed">
                You have reviewed <strong>{totalReviewed} of {totalTopics} syllabus topics</strong> ({overallRate}%) across your university classes. Keep your study streak alive!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/student/classes"
                className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-5 py-3 rounded-2xl text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
              >
                <ListOrdered size={16} /> Review Topics
              </Link>
              <Link
                to="/student/vault"
                className="bg-white/15 hover:bg-white/25 border border-white/20 text-white font-medium px-4 py-3 rounded-2xl text-sm transition-all shrink-0 flex items-center gap-2"
              >
                <BookOpen size={16} /> Open Vault
              </Link>
            </div>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-indigo-100/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Enrolled Classes</span>
              <BookOpen size={18} className="text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{classes.length}</p>
            <span className="text-[11px] text-indigo-600 font-medium mt-0.5 block">
              Active Cohorts
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-indigo-100/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Topics Reviewed</span>
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {totalReviewed} / {totalTopics}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">
              {overallRate}% Course Progress
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-indigo-100/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Vault Resources</span>
              <FileText size={18} className="text-violet-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{contents.length}</p>
            <span className="text-[11px] text-violet-600 font-medium mt-0.5 block">
              Materials Published
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-indigo-100/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Daily Study Streak</span>
              <Flame size={18} className="text-amber-500 fill-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">5 Days</p>
            <span className="text-[11px] text-amber-600 font-medium mt-0.5 block">
              Top 10% on Campus
            </span>
          </div>
        </div>

        {/* 2-Column Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Classes */}
            <div className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Lecture Timetable</h2>
                  <p className="text-xs text-slate-400">Classes and lecture halls</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  Fall Term 2026
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {classes.slice(0, 2).map((cls) => {
                  const teacher = getTeacherForClass(cls.teacher_id)
                  return (
                    <div
                      key={cls.class_id}
                      className="border-l-4 border-indigo-600 rounded-2xl p-4 border border-slate-100 bg-indigo-50/20 shadow-2xs"
                    >
                      <span className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                        {cls.class_id}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-2">{cls.subject}</h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <Clock size={13} /> {cls.class_date}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <MapPin size={13} /> Campus Hall · {teacher.name}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Enrolled Subjects with TOPIC_PROGRESS */}
            <div className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Enrolled Classes</h2>
                  <p className="text-xs text-slate-400">Track your topic progression in real-time</p>
                </div>
                <Link
                  to="/student/classes"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  View All Classes →
                </Link>
              </div>

              <div className="space-y-4">
                {classes.map((cls) => {
                  const progress = getClassProgress(cls.class_id, user?.student_id)
                  const teacher = getTeacherForClass(cls.teacher_id)

                  return (
                    <Link
                      key={cls.class_id}
                      to="/student/classes"
                      className="block p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                              {cls.class_id}
                            </span>
                            <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {cls.subject}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{teacher.name} · {teacher.department}</p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                          {progress.reviewed}/{progress.total} topics reviewed
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 shrink-0">
                          {progress.percent}%
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar (1 col) */}
          <div className="space-y-6">
            {/* Quick Study Scratchpad */}
            <div className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <FileText size={16} className="text-indigo-600" />
                  Study Scratchpad
                </h3>
                {noteSaved && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check size={12} /> Saved
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Quick study reminders, formulas, or lecture thoughts.
              </p>
              <textarea
                rows={4}
                value={scratchpad}
                onChange={(e) => setScratchpad(e.target.value)}
                placeholder="Type your notes here..."
                className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 resize-none font-sans"
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>

            {/* Recent Vault Additions */}
            <div className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Bookmark size={16} className="text-amber-500" />
                  New in Study Vault
                </h3>
                <Link to="/student/vault" className="text-xs text-indigo-600 font-bold hover:underline">
                  Browse All
                </Link>
              </div>

              <div className="space-y-3">
                {contents.slice(0, 3).map((cnt) => (
                  <div
                    key={cnt.content_id}
                    className="p-3 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors bg-slate-50/50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-mono">
                        {cnt.type}
                      </span>
                      <span className="text-[10px] text-slate-400">{cnt.created_at}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">{cnt.title}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {cnt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
