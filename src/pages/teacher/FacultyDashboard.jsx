import { useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import {
  Users,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Plus,
  Send,
  Sparkles,
  TrendingUp,
  FileCheck2,
  Calendar,
  Check,
  X,
  ShieldCheck,
  Layers,
} from 'lucide-react'

const initialSubmissions = [
  {
    id: 1,
    student: 'Liam Nakamura',
    avatar: 'LN',
    cohort: 'PHYS 401',
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
    cohort: 'CS 302',
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
    cohort: 'PHYS 401',
    assignment: 'First & Second Laws Lab Verification',
    submittedAt: 'Yesterday',
    file: 'MBell_LabReport_v2.pdf',
    suggestedGrade: '88',
    status: 'pending',
  },
  {
    id: 4,
    student: 'Aria Montgomery',
    avatar: 'AM',
    cohort: 'MATH 201',
    assignment: 'Eigenvalue Decomposition Proofs',
    submittedAt: 'Yesterday',
    file: 'Montgomery_Math201_Proof.pdf',
    suggestedGrade: '92',
    status: 'pending',
  },
]

export default function FacultyDashboard() {
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
    setEnteredFeedback('Strong analytical approach. All test cases matched the theoretical curve.')
    setGradingModalOpen(true)
  }

  const handleSubmitGrade = (e) => {
    e.preventDefault()
    if (!enteredGrade) return

    setSubmissions((prev) => prev.filter((item) => item.id !== activeItem.id))
    setGradingModalOpen(false)
    showToast(`Graded ${activeItem.student} (${activeItem.cohort}): ${enteredGrade}/100 recorded!`)
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

        {/* Executive Header Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-md">
                  Faculty Operations Console
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Realtime Sync Active
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Academic Command Center
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                Overview of active student cohorts, grading backlog, curriculum distribution, and term metrics.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/teacher/classes"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
              >
                <Users size={15} /> Manage Cohorts
              </Link>
              <Link
                to="/teacher/gradebook"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition-all"
              >
                <Award size={15} /> Open Gradebook
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/80 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Total Enrolled</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white mt-3">118</p>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp size={12} /> Across 4 active courses
            </span>
          </div>

          <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/80 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Pending Evaluation</span>
              <div className="w-8 h-8 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/60 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white mt-3">{submissions.length}</p>
            <span className="text-[11px] text-amber-400 flex items-center gap-1 mt-1 font-semibold">
              <AlertCircle size={12} /> 2 submissions priority
            </span>
          </div>

          <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/80 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Mean Term Grade</span>
              <div className="w-8 h-8 rounded-xl bg-teal-950/80 text-teal-400 border border-teal-800/60 flex items-center justify-center">
                <Award size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white mt-3">88.4%</p>
            <span className="text-[11px] text-teal-400 flex items-center gap-1 mt-1 font-semibold">
              +3.2% vs previous term
            </span>
          </div>

          <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/80 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Vault Materials</span>
              <div className="w-8 h-8 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/60 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white mt-3">24</p>
            <span className="text-[11px] text-blue-400 flex items-center gap-1 mt-1 font-semibold">
              100% syllabi published
            </span>
          </div>
        </div>

        {/* Two-Column Working Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions Queue (2 cols) */}
          <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileCheck2 size={18} className="text-emerald-400" />
                    Pending Evaluation Queue
                  </h3>
                  <p className="text-xs text-slate-400">
                    Student work awaiting rubric review and final score entry
                  </p>
                </div>
                <Link
                  to="/teacher/gradebook"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  Full Gradebook <ArrowRight size={13} />
                </Link>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <ShieldCheck size={36} className="mx-auto text-emerald-400 mb-2" />
                  <p className="text-sm font-bold text-white">Grading Queue Empty!</p>
                  <p className="text-xs text-slate-500 mt-1">All student submissions are up to date.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 font-black text-xs flex items-center justify-center border border-slate-700">
                          {sub.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{sub.student}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                              {sub.cohort}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5">{sub.assignment}</p>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock size={11} /> {sub.submittedAt} · {sub.file}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenGrade(sub)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950 transition-all flex items-center justify-center gap-1.5 self-end sm:self-center"
                      >
                        <Award size={14} /> Review & Grade
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Rubric auto-weighting enabled</span>
              <span className="text-emerald-400 font-semibold">Ready for Fall 2026</span>
            </div>
          </div>

          {/* Today's Teaching Schedule (1 col) */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar size={18} className="text-emerald-400" />
                Teaching Schedule
              </h3>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Today
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900/90 border-l-4 border-emerald-500 p-4 rounded-2xl border-y border-r border-slate-800">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                  PHYS 401 · Lecture 14
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  Carnot Cycle Derivations & Refrigerators
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-slate-500" /> 10:00 AM – 11:30 AM
                  </span>
                  <span>·</span>
                  <span>Science Hall 302</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">28 Students Enrolled</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded">
                    In Progress
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/90 border-l-4 border-teal-500 p-4 rounded-2xl border-y border-r border-slate-800">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wide">
                  CS 302 · Practical Lab
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  Red-Black Insertion Rotations Lab
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-slate-500" /> 2:00 PM – 3:45 PM
                  </span>
                  <span>·</span>
                  <span>Turing Hall 104</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">35 Students Enrolled</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                    Upcoming
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Faculty Actions
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/teacher/materials"
                  className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-center text-xs font-bold text-slate-200 transition-colors"
                >
                  Upload Syllabus
                </Link>
                <Link
                  to="/teacher/broadcast"
                  className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-center text-xs font-bold text-slate-200 transition-colors"
                >
                  Broadcast Notice
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grading Evaluation Modal */}
        {gradingModalOpen && activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Grading Assessment</h3>
                    <p className="text-xs text-slate-400">
                      {activeItem.student} · {activeItem.cohort}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setGradingModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitGrade} className="mt-5 space-y-4">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Assignment Deliverable</div>
                  <div className="text-sm font-bold text-white">{activeItem.assignment}</div>
                  <div className="text-xs text-emerald-400 mt-1 font-mono">{activeItem.file}</div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Score (out of 100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={enteredGrade}
                    onChange={(e) => setEnteredGrade(e.target.value)}
                    className="w-full text-lg font-bold px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Feedback / Instructor Review Note
                  </label>
                  <textarea
                    rows={3}
                    value={enteredFeedback}
                    onChange={(e) => setEnteredFeedback(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setGradingModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950"
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
