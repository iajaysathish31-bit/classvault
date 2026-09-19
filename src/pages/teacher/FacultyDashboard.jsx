import { useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import { useData } from '../../context/DataContext.jsx'
import {
  Users,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Plus,
  TrendingUp,
  FileCheck2,
  Calendar,
  Check,
  X,
  ShieldCheck,
  Layers,
  ListOrdered,
  Sparkles,
} from 'lucide-react'

const initialSubmissions = [
  {
    id: 1,
    student: 'Liam Nakamura',
    avatar: 'LN',
    cohort: 'CLS-401',
    assignment: 'Problem Set 5: Carnot Engines & Entropy',
    submittedAt: '2 hours ago',
    file: 'Liam_Nakamura_PSet5.pdf',
    suggestedGrade: '94',
    status: 'pending',
  },
  {
    id: 2,
    student: 'Elena Rostov',
    avatar: 'ER',
    cohort: 'CLS-302',
    assignment: 'Red-Black Tree Self-Balancing Implementation',
    submittedAt: '4 hours ago',
    file: 'elena_rbt_solution.zip',
    suggestedGrade: '98',
    status: 'pending',
  },
  {
    id: 3,
    student: 'Marcus Bell',
    avatar: 'MB',
    cohort: 'CLS-401',
    assignment: 'First & Second Laws Lab Verification',
    submittedAt: 'Yesterday',
    file: 'MBell_LabReport_v2.pdf',
    suggestedGrade: '88',
    status: 'pending',
  },
]

export default function FacultyDashboard() {
  const { user } = useUser()
  const { classes, topics, contents, topicProgress } = useData()

  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [gradingModalOpen, setGradingModalOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const [enteredGrade, setEnteredGrade] = useState('')
  const [enteredFeedback, setEnteredFeedback] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleOpenGrade = (sub) => {
    setActiveItem(sub)
    setEnteredGrade(sub.suggestedGrade)
    setEnteredFeedback('Strong analytical derivation. Accurate diagram equations and thermodynamic boundary conditions.')
    setGradingModalOpen(true)
  }

  const handleSubmitGrade = (e) => {
    e.preventDefault()
    if (!enteredGrade) return

    setSubmissions((prev) => prev.filter((item) => item.id !== activeItem.id))
    setGradingModalOpen(false)
    showToast(`Graded ${activeItem.student} (${activeItem.cohort}): ${enteredGrade}/100 recorded!`)
  }

  const totalReviews = topicProgress.filter((p) => p.status === 'Reviewed').length

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

        {/* Executive Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 md:p-8 rounded-3xl text-white shadow-lg shadow-emerald-900/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-100 bg-white/15 backdrop-blur-xs border border-white/20 px-2.5 py-1 rounded-lg">
                  {user?.department || 'Faculty Console'} · {user?.teacher_id || 'TCH-101'}
                </span>
                <span className="text-xs text-emerald-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Live Sync Active
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Academic Command Center
              </h1>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
                Real-time tracking of created classes, authored syllabus topics, uploaded curriculum content, and student topic review progress.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/teacher/classes"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/25 transition-all"
              >
                <ListOrdered size={15} /> Manage Classes
              </Link>
              <Link
                to="/teacher/materials"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold shadow-md transition-all"
              >
                <Plus size={15} /> Upload Content
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Created Classes</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-3">{classes.length}</p>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp size={12} /> University Classes
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Authored Topics</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center">
                <ListOrdered size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-3">{topics.length}</p>
            <span className="text-[11px] text-teal-700 flex items-center gap-1 mt-1 font-semibold">
              Syllabus Units
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Topic Reviews</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-3">{totalReviews}</p>
            <span className="text-[11px] text-blue-700 flex items-center gap-1 mt-1 font-semibold">
              Student Completions
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Vault Content</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                <Layers size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-3">{contents.length}</p>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-semibold">
              Resources Uploaded
            </span>
          </div>
        </div>

        {/* Two-Column Working Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions Queue (2 cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileCheck2 size={18} className="text-emerald-700" />
                    Pending Student Submissions
                  </h3>
                  <p className="text-xs text-slate-500">
                    Student work awaiting rubric review and evaluation
                  </p>
                </div>
                <Link
                  to="/teacher/gradebook"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  Gradebook <ArrowRight size={13} />
                </Link>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <ShieldCheck size={36} className="mx-auto text-emerald-600 mb-2" />
                  <p className="text-sm font-bold text-slate-800">Grading Queue Clear!</p>
                  <p className="text-xs text-slate-500 mt-1">All submissions evaluated.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-slate-50/70 border border-slate-200/80 hover:border-emerald-300 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-200">
                          {sub.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{sub.student}</h4>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                              {sub.cohort}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{sub.assignment}</p>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                            <Clock size={11} /> {sub.submittedAt} · {sub.file}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenGrade(sub)}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 self-end sm:self-center"
                      >
                        <Award size={14} /> Review & Grade
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Rubric evaluation active</span>
              <span className="text-emerald-700 font-semibold font-mono">Fall 2026 Academic Term</span>
            </div>
          </div>

          {/* Today's Teaching Schedule (1 col) */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar size={18} className="text-emerald-700" />
                Teaching Schedule
              </h3>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">
                Today
              </span>
            </div>

            <div className="space-y-3">
              {classes.slice(0, 2).map((cls) => (
                <div
                  key={cls.class_id}
                  className="bg-emerald-50/40 border-l-4 border-emerald-700 p-4 rounded-2xl border border-emerald-100"
                >
                  <span className="text-[10px] font-bold text-emerald-800 font-mono uppercase tracking-wide">
                    {cls.class_id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{cls.subject}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                    <Clock size={12} className="text-emerald-700 shrink-0" />
                    <span>{cls.class_date}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{topics.filter((t) => t.class_id === cls.class_id).length} Topics Defined</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Panel */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                Quick Actions
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/teacher/classes"
                  className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-center text-xs font-bold text-slate-700 hover:text-emerald-800 transition-colors"
                >
                  + Add Topic
                </Link>
                <Link
                  to="/teacher/materials"
                  className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-center text-xs font-bold text-slate-700 hover:text-emerald-800 transition-colors"
                >
                  + Add Content
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grading Evaluation Modal */}
        {gradingModalOpen && activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200 text-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Grading Assessment</h3>
                    <p className="text-xs text-slate-500">
                      {activeItem.student} · {activeItem.cohort}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setGradingModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitGrade} className="mt-5 space-y-4">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div className="text-xs text-slate-400 mb-1">Assignment Deliverable</div>
                  <div className="text-sm font-bold text-slate-900">{activeItem.assignment}</div>
                  <div className="text-xs text-emerald-700 mt-1 font-mono">{activeItem.file}</div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Score (out of 100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={enteredGrade}
                    onChange={(e) => setEnteredGrade(e.target.value)}
                    className="w-full text-lg font-bold px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-emerald-800 focus:outline-none focus:border-emerald-600 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Feedback / Instructor Review Note
                  </label>
                  <textarea
                    rows={3}
                    value={enteredFeedback}
                    onChange={(e) => setEnteredFeedback(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setGradingModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-200"
                  >
                    Post Evaluation
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
