import { useState } from 'react'
import { Link } from 'react-router-dom'
import StudentLayout from '../../layouts/StudentLayout.jsx'
import {
  Search,
  Plus,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  BookOpen,
  X,
  Check,
  Download,
} from 'lucide-react'

const initialStudentClasses = [
  {
    code: 'PHYS 401',
    name: 'Advanced Thermodynamics',
    initial: 'A',
    prof: 'Prof. Chen Wei',
    time: 'Mon, Wed, Fri · 10:00 AM – 11:30 AM',
    location: 'Science Hall 302',
    progress: 60,
    done: 3,
    total: 5,
    materialsCount: 4,
    color: 'bg-indigo-600',
  },
  {
    code: 'CS 302',
    name: 'Data Structures & Algorithms',
    initial: 'D',
    prof: 'Prof. Sara Okafor',
    time: 'Tue, Thu · 2:00 PM – 3:45 PM',
    location: 'Alan Turing Building 104',
    progress: 100,
    done: 4,
    total: 4,
    materialsCount: 5,
    color: 'bg-violet-600',
  },
  {
    code: 'MATH 201',
    name: 'Linear Algebra',
    initial: 'L',
    prof: 'Prof. James Erikson',
    time: 'Mon, Wed · 11:30 AM – 1:00 PM',
    location: 'Euler Hall 204',
    progress: 66,
    done: 4,
    total: 6,
    materialsCount: 3,
    color: 'bg-blue-600',
  },
  {
    code: 'HIST 210',
    name: 'Modern World History',
    initial: 'M',
    prof: 'Prof. Anita Reyes',
    time: 'Tue, Thu · 9:30 AM – 11:00 AM',
    location: 'Humanities Hall 112',
    progress: 66,
    done: 2,
    total: 3,
    materialsCount: 2,
    color: 'bg-purple-600',
  },
]

export default function StudentClasses() {
  const [classesList, setClassesList] = useState(initialStudentClasses)
  const [search, setSearch] = useState('')
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joinCode, setJoinCode] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const handleJoin = (e) => {
    e.preventDefault()
    if (!joinCode.trim()) return

    const newClass = {
      code: joinCode.trim().toUpperCase(),
      name: `Course (${joinCode.trim().toUpperCase()})`,
      initial: joinCode.trim().charAt(0).toUpperCase(),
      prof: 'Course Faculty',
      time: 'Mon, Wed · 10:00 AM',
      location: 'Science Hall 101',
      progress: 0,
      done: 0,
      total: 4,
      materialsCount: 1,
      color: 'bg-indigo-600',
    }

    setClassesList([...classesList, newClass])
    setJoinCode('')
    setShowJoinModal(false)
    setToastMsg(`Successfully enrolled in ${newClass.code}!`)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const filtered = classesList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.prof.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <StudentLayout>
      <div className="px-8 py-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Enrolled Subjects</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Access syllabus materials, lecture notes, and assignment dropboxes
            </p>
          </div>

          <button
            onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-2xl shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            <Plus size={16} /> Join Subject with Code
          </button>
        </div>

        {/* Search Box */}
        <div className="relative max-w-md">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subjects or instructors..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-2xs"
          />
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((cls) => (
            <div
              key={cls.code}
              className="bg-white rounded-3xl border border-indigo-100/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${cls.color} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm`}
                    >
                      {cls.initial}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                        {cls.code}
                      </span>
                      <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">
                        {cls.name}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg">
                    {cls.materialsCount} Vault Files
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 mb-6 bg-slate-50/60 p-3.5 rounded-2xl">
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-indigo-600 shrink-0" />
                    <span>{cls.time}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-indigo-600 shrink-0" />
                    <span>{cls.location} · {cls.prof}</span>
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-500">Assignments Completed</span>
                    <span className="text-indigo-600 font-bold">{cls.done}/{cls.total} ({cls.progress}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${cls.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/student/vault"
                  className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1"
                >
                  <BookOpen size={13} /> View Notes
                </Link>

                <Link
                  to={`/classes/${cls.code.replace(/\s+/g, '-')}`}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Enter Course Room <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Join Class Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setShowJoinModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>

              <h2 className="text-lg font-bold text-slate-900 mb-1">Enroll in a Subject</h2>
              <p className="text-xs text-slate-400 mb-4">
                Enter the class code given by your course professor (e.g. PHYS401-FALL26).
              </p>

              <form onSubmit={handleJoin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Class Code / Enrollment Key <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS302-FALL26"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowJoinModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    Enroll Subject
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm z-50 animate-in slide-in-from-bottom">
            <Check size={16} className="text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>
    </StudentLayout>
  )
}
