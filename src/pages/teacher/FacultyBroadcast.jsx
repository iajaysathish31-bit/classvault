import { useState } from 'react'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import {
  BellRing,
  Send,
  Plus,
  AlertTriangle,
  Users,
  Check,
  X,
  MessageSquare,
  Clock,
  Pin,
  Trash2,
} from 'lucide-react'

const initialBroadcasts = [
  {
    id: 1,
    title: 'Midterm 1 Examination Logistics & Approved Formula Sheets',
    cohort: 'PHYS 401',
    timestamp: 'Today at 8:45 AM',
    pinned: true,
    urgent: true,
    views: 26,
    totalEnrolled: 28,
    content:
      'Midterm 1 is scheduled for next Wednesday at 10:00 AM in Science Hall 302. Please bring an approved TI-84 or equivalent non-programmable calculator. Only the official formula sheet posted in the Curriculum Vault is permitted.',
  },
  {
    id: 2,
    title: 'Red-Black Tree Assignment Extension (24 Hours)',
    cohort: 'CS 302',
    timestamp: 'Yesterday at 3:15 PM',
    pinned: false,
    urgent: false,
    views: 34,
    totalEnrolled: 35,
    content:
      'Due to maintenance on the automated unit test runner, the deadline for PSet 2 (Red-Black Trees) has been extended by 24 hours to Friday at 11:59 PM. Please verify your tests against edge case inputs.',
  },
  {
    id: 3,
    title: 'Office Hours Relocated to Turing 104 Lab',
    cohort: 'ALL COHORTS',
    timestamp: 'Sep 14, 2026',
    pinned: false,
    urgent: false,
    views: 98,
    totalEnrolled: 118,
    content:
      'Thursday faculty office hours will take place in the computer lab rather than the faculty annex to accommodate coding questions directly on student laptops.',
  },
]

export default function FacultyBroadcast() {
  const [broadcasts, setBroadcasts] = useState(initialBroadcasts)
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Form
  const [newTitle, setNewTitle] = useState('')
  const [newCohort, setNewCohort] = useState('ALL COHORTS')
  const [newContent, setNewContent] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleDelete = (id) => {
    setBroadcasts((prev) => prev.filter((b) => b.id !== id))
    showToast('Announcement removed.')
  }

  const handleCreateBroadcast = (e) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    const newPost = {
      id: Date.now(),
      title: newTitle,
      cohort: newCohort,
      timestamp: 'Just now',
      pinned: isUrgent,
      urgent: isUrgent,
      views: 1,
      totalEnrolled: newCohort === 'ALL COHORTS' ? 118 : 35,
      content: newContent,
    }

    setBroadcasts([newPost, ...broadcasts])
    setModalOpen(false)
    setNewTitle('')
    setNewContent('')
    setIsUrgent(false)
    showToast(`Broadcast sent to ${newPost.cohort}!`)
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
              Direct Communication
            </span>
            <h1 className="text-2xl font-black text-white mt-2 tracking-tight">
              Class Announcements & Broadcasts
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Dispatch real-time urgent updates, assignment deadline modifications, and exam announcements to students.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition-all self-start md:self-auto"
          >
            <Plus size={16} /> New Broadcast
          </button>
        </div>

        {/* Feed of Broadcasts */}
        <div className="space-y-4">
          {broadcasts.map((b) => (
            <div
              key={b.id}
              className={`bg-slate-950 rounded-3xl p-6 border transition-all shadow-md ${
                b.urgent
                  ? 'border-rose-900/60 bg-gradient-to-br from-slate-950 to-rose-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-850">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                      b.cohort === 'ALL COHORTS'
                        ? 'bg-purple-950 text-purple-300 border-purple-800/60'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                    }`}
                  >
                    {b.cohort}
                  </span>

                  {b.urgent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/60 flex items-center gap-1">
                      <AlertTriangle size={11} /> High Priority
                    </span>
                  )}

                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {b.timestamp}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400">
                    Read by <strong className="text-emerald-400">{b.views}</strong> /{' '}
                    {b.totalEnrolled} students
                  </span>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">{b.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New Broadcast Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                    <BellRing size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">New Broadcast Notice</h3>
                    <p className="text-xs text-slate-400">Push directly to student dashboards</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateBroadcast} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Announcement Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Schedule Change: Friday Lab Moved to 2:30 PM"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Target Cohort
                  </label>
                  <select
                    value={newCohort}
                    onChange={(e) => setNewCohort(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="ALL COHORTS">All Enrolled Cohorts (Entire Term)</option>
                    <option value="PHYS 401">PHYS 401 - Advanced Thermodynamics</option>
                    <option value="CS 302">CS 302 - Data Structures</option>
                    <option value="MATH 201">MATH 201 - Linear Algebra</option>
                    <option value="HIST 210">HIST 210 - Modern World History</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Notice Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write detailed instructions or notices..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="urgentCheck"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="rounded text-emerald-500 focus:ring-0 bg-slate-950 border-slate-700 w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="urgentCheck"
                    className="text-xs text-slate-300 font-medium cursor-pointer"
                  >
                    Mark as Urgent / Priority Notification (highlights in red)
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950 flex items-center gap-1.5"
                  >
                    <Send size={14} /> Send Broadcast
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
