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
    title: 'Software Engineering Sprint Review & GitHub Repositories Due',
    cohort: '24CSC2T351',
    timestamp: 'Today at 8:45 AM',
    pinned: true,
    urgent: true,
    views: 28,
    totalEnrolled: 30,
    content:
      'Sprint Review 1 is scheduled for this Friday. All repository pull requests must pass the CI unit test runner before submission. Upload your UML diagrams to the Curriculum Vault.',
  },
  {
    id: 2,
    title: 'Atomic & Nuclear Physics Spectroscopic Lab Guidelines',
    cohort: '24PHY2T351',
    timestamp: 'Yesterday at 3:15 PM',
    pinned: false,
    urgent: false,
    views: 32,
    totalEnrolled: 35,
    content:
      'Please review the Zeeman effect derivation and Lande g-factor formula handbook in the Curriculum Vault prior to Tuesday lab sessions.',
  },
  {
    id: 3,
    title: 'Research Methodology Ethics Committee (IRB) Clearance Notice',
    cohort: '24CPL2T451',
    timestamp: '2 days ago',
    pinned: false,
    urgent: false,
    views: 24,
    totalEnrolled: 26,
    content:
      'Draft proposals must include informed consent forms and plagiarism report from Turnitin (must be below 10% similarity index).',
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
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-600 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Direct Communication
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Class Announcements & Broadcasts
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dispatch real-time urgent updates, assignment deadline modifications, and exam announcements to students.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all self-start md:self-auto"
          >
            <Plus size={16} /> New Broadcast
          </button>
        </div>

        {/* Feed of Broadcasts */}
        <div className="space-y-4">
          {broadcasts.map((b) => (
            <div
              key={b.id}
              className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all shadow-xs ${
                b.urgent
                  ? 'border-amber-300 bg-gradient-to-br from-white to-amber-50/40 shadow-amber-100/50'
                  : 'border-emerald-100/80 hover:border-emerald-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${
                      b.cohort === 'ALL COHORTS'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-teal-50 text-teal-800 border-teal-200'
                    }`}
                  >
                    {b.cohort}
                  </span>

                  {b.urgent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <AlertTriangle size={11} /> High Priority
                    </span>
                  )}

                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {b.timestamp}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500">
                    Read by <strong className="text-emerald-700">{b.views}</strong> /{' '}
                    {b.totalEnrolled} students
                  </span>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">{b.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New Broadcast Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200 text-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                    <BellRing size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">New Broadcast Notice</h3>
                    <p className="text-xs text-slate-500">Push directly to student dashboards</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateBroadcast} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Announcement Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Schedule Change: Friday Lab Moved to 2:30 PM"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Cohort
                  </label>
                  <select
                    value={newCohort}
                    onChange={(e) => setNewCohort(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="ALL COHORTS">All Enrolled Cohorts (Entire Term)</option>
                    <option value="24CSC2T351">24CSC2T351 - Software Engineering</option>
                    <option value="24PHY2T351">24PHY2T351 - Atomic, Molecular and Nuclear Physics</option>
                    <option value="24CPL2T451">24CPL2T451 - Research Methodology</option>
                    <option value="24ELE2T351">24ELE2T351 - Microcontroller and IoT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Notice Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write detailed instructions or notices..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="urgentCheck"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="rounded text-emerald-700 focus:ring-0 bg-slate-50 border-slate-300 w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="urgentCheck"
                    className="text-xs text-slate-700 font-medium cursor-pointer"
                  >
                    Mark as Urgent / High Priority Notification
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-200 flex items-center gap-1.5"
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
