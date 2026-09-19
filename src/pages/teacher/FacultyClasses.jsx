import { useState } from 'react'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import {
  Users,
  Plus,
  Copy,
  Check,
  Search,
  BookOpen,
  GraduationCap,
  Calendar,
  MoreVertical,
  X,
  ExternalLink,
  ShieldAlert,
  Percent,
} from 'lucide-react'

const initialCohorts = [
  {
    code: 'PHYS 401',
    name: 'Advanced Thermodynamics',
    section: 'Section 01',
    term: 'Fall 2026',
    enrolledCount: 28,
    capacity: 35,
    attendanceRate: 94,
    joinCode: 'PHYS-7821',
    schedule: 'Mon, Wed, Fri · 10:00 AM – 11:30 AM',
    room: 'Science Hall 302',
    color: 'border-emerald-500',
    roster: [
      { name: 'Liam Nakamura', email: 'liam.n@univ.edu', grade: '92%', status: 'Active' },
      { name: 'Chloe Laurent', email: 'chloe.l@univ.edu', grade: '89%', status: 'Active' },
      { name: 'Marcus Bell', email: 'marcus.b@univ.edu', grade: '78%', status: 'Active' },
      { name: 'Sophia Martinez', email: 'sophia.m@univ.edu', grade: '96%', status: 'Active' },
    ],
  },
  {
    code: 'CS 302',
    name: 'Data Structures & Algorithms',
    section: 'Section 03',
    term: 'Fall 2026',
    enrolledCount: 35,
    capacity: 40,
    attendanceRate: 97,
    joinCode: 'CS30-9941',
    schedule: 'Tue, Thu · 2:00 PM – 3:45 PM',
    room: 'Alan Turing Hall 104',
    color: 'border-teal-500',
    roster: [
      { name: 'Elena Rostov', email: 'elena.r@univ.edu', grade: '98%', status: 'Active' },
      { name: 'Devon King', email: 'devon.k@univ.edu', grade: '84%', status: 'Active' },
      { name: 'Aaliyah Khan', email: 'aaliyah.k@univ.edu', grade: '91%', status: 'Active' },
    ],
  },
  {
    code: 'MATH 201',
    name: 'Linear Algebra',
    section: 'Section 02',
    term: 'Fall 2026',
    enrolledCount: 32,
    capacity: 35,
    attendanceRate: 91,
    joinCode: 'MATH-4412',
    schedule: 'Mon, Wed · 11:30 AM – 1:00 PM',
    room: 'Euler Complex 201',
    color: 'border-blue-500',
    roster: [
      { name: 'Aria Montgomery', email: 'aria.m@univ.edu', grade: '93%', status: 'Active' },
      { name: 'Kevin Zhang', email: 'kevin.z@univ.edu', grade: '87%', status: 'Active' },
    ],
  },
  {
    code: 'HIST 210',
    name: 'Modern World History',
    section: 'Section 01',
    term: 'Fall 2026',
    enrolledCount: 23,
    capacity: 30,
    attendanceRate: 88,
    joinCode: 'HIST-3390',
    schedule: 'Fri · 1:00 PM – 4:00 PM',
    room: 'Humanities Wing 110',
    color: 'border-purple-500',
    roster: [
      { name: 'Maya Lin', email: 'maya.lin@univ.edu', grade: '95%', status: 'Active' },
      { name: 'Tariq Al-Mansoor', email: 'tariq.a@univ.edu', grade: '86%', status: 'Active' },
    ],
  },
]

export default function FacultyClasses() {
  const [cohorts, setCohorts] = useState(initialCohorts)
  const [activeRoster, setActiveRoster] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // New Cohort Form
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newSchedule, setNewSchedule] = useState('')
  const [newRoom, setNewRoom] = useState('')
  const [newCapacity, setNewCapacity] = useState('35')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    showToast(`Class join code ${code} copied to clipboard!`)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleCreateCohort = (e) => {
    e.preventDefault()
    if (!newCode.trim() || !newName.trim()) return

    const randomJoin = `${newCode.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`

    const newCohort = {
      code: newCode.toUpperCase(),
      name: newName,
      section: 'Section 01',
      term: 'Fall 2026',
      enrolledCount: 0,
      capacity: parseInt(newCapacity, 10) || 35,
      attendanceRate: 100,
      joinCode: randomJoin,
      schedule: newSchedule || 'Mon, Wed · 10:00 AM',
      room: newRoom || 'Main Campus Hall',
      color: 'border-emerald-500',
      roster: [],
    }

    setCohorts([newCohort, ...cohorts])
    setCreateModalOpen(false)
    setNewCode('')
    setNewName('')
    setNewSchedule('')
    setNewRoom('')
    showToast(`Created cohort "${newCohort.code}: ${newCohort.name}"!`)
  }

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800/60">
              Department Cohorts
            </span>
            <h1 className="text-2xl font-black text-white mt-2 tracking-tight">
              Teaching Cohorts & Rosters
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage course rosters, distribution join codes, seating capacities, and student standing.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition-all self-start md:self-auto"
          >
            <Plus size={16} /> Create New Cohort
          </button>
        </div>

        {/* Cohort Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cohorts.map((cohort) => (
            <div
              key={cohort.code}
              className={`bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between border-t-4 ${cohort.color}`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-white">{cohort.code}</span>
                      <span className="text-xs text-slate-400">· {cohort.section}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{cohort.name}</h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-bold">
                      Join Code
                    </span>
                    <button
                      onClick={() => handleCopyCode(cohort.joinCode)}
                      className="mt-0.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-emerald-400 text-xs font-mono font-bold transition-all"
                      title="Click to copy join code"
                    >
                      {cohort.joinCode}
                      {copiedCode === cohort.joinCode ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-850 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Class Meeting:</span>
                    <span className="text-slate-300 font-medium">{cohort.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300 font-medium">{cohort.room}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Term Attendance:</span>
                    <span className="text-emerald-400 font-bold">{cohort.attendanceRate}%</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Cohort Capacity</span>
                    <span className="text-slate-300 font-semibold">
                      {cohort.enrolledCount} / {cohort.capacity} Students
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(cohort.enrolledCount / cohort.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">{cohort.term}</span>
                <button
                  onClick={() => setActiveRoster(cohort)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-750 transition-all flex items-center gap-1.5"
                >
                  <Users size={14} className="text-emerald-400" />
                  View Enrolled Roster
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Student Roster Modal */}
        {activeRoster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {activeRoster.code} Student Roster
                    </h3>
                    <p className="text-xs text-slate-400">
                      {activeRoster.name} · {activeRoster.enrolledCount} Registered Students
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveRoster(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-5 max-h-80 overflow-y-auto space-y-2 pr-1">
                {activeRoster.roster.length === 0 ? (
                  <p className="text-center py-6 text-xs text-slate-500">
                    No students currently enrolled in this cohort.
                  </p>
                ) : (
                  activeRoster.roster.map((student, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 font-bold flex items-center justify-center">
                          {student.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white">{student.name}</div>
                          <div className="text-[11px] text-slate-500">{student.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">Standing</span>
                          <span className="font-bold text-emerald-400">{student.grade}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800/60">
                          {student.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveRoster(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700"
                >
                  Close Roster
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Cohort Modal */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Create Teaching Cohort</h3>
                    <p className="text-xs text-slate-400">Fall Term 2026</p>
                  </div>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateCohort} className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Course Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ENGR 310"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Capacity</label>
                    <input
                      type="number"
                      value={newCapacity}
                      onChange={(e) => setNewCapacity(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Course Title / Subject Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fluid Mechanics & Aerodynamics"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Lecture Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tue, Thu · 10:00 AM – 11:30 AM"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Room / Hall</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering Hall 204"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950"
                  >
                    Generate Cohort
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  )
}
