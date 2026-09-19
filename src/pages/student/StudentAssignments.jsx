import { useState } from 'react'
import StudentLayout from '../../layouts/StudentLayout.jsx'
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  ExternalLink,
  Award,
  ChevronRight,
  Filter,
  Check,
  X,
  FileCheck2,
  Sparkles,
} from 'lucide-react'

const initialAssignments = [
  {
    id: 1,
    title: 'Problem Set 5: Carnot Engines & Entropy',
    subject: 'PHYS 401',
    subjectName: 'Advanced Thermodynamics',
    dueDate: 'Tomorrow, 11:59 PM',
    dueDays: 1,
    status: 'pending',
    points: 100,
    description: 'Calculate thermodynamic efficiency across Carnot and Rankine cycles. Show step-by-step integrals for reversible paths.',
    rubric: 'Clear derivations (40%), accurate PV diagrams (30%), conclusion & error analysis (30%)',
  },
  {
    id: 2,
    title: 'Self-Balancing Red-Black Tree Implementation',
    subject: 'CS 302',
    subjectName: 'Data Structures & Algorithms',
    dueDate: 'Sep 25, 2026',
    dueDays: 6,
    status: 'pending',
    points: 100,
    description: 'Implement insertion and rotation operations in Java or C++ with automated unit tests for black-height preservation.',
    rubric: 'Code correctness & test coverage (60%), asymptotic complexity analysis (40%)',
  },
  {
    id: 3,
    title: 'Eigenvalues & Diagonalization Proofs',
    subject: 'MATH 201',
    subjectName: 'Linear Algebra',
    dueDate: 'Oct 02, 2026',
    dueDays: 13,
    status: 'pending',
    points: 50,
    description: 'Complete problem sets 4.1 through 4.4 from Chapter 4 of Axler Linear Algebra Done Right.',
    rubric: 'Rigorous proof steps and justification for invertible matrices',
  },
  {
    id: 4,
    title: 'Decolonization Movements Comparative Essay',
    subject: 'HIST 210',
    subjectName: 'Modern World History',
    dueDate: 'Sep 18, 2026',
    status: 'submitted',
    submittedAt: 'Sep 17, 2026 at 4:32 PM',
    points: 100,
    fileSubmitted: 'Hist210_Comparative_Essay_Final.pdf',
    description: '2,500 word comparative study of post-WWII decolonization in South Asia vs East Africa.',
    statusNote: 'Under Faculty Review by Prof. Anita Reyes',
  },
  {
    id: 5,
    title: 'Graph Traversal & Dijkstra Benchmark Suite',
    subject: 'CS 302',
    subjectName: 'Data Structures & Algorithms',
    dueDate: 'Sep 10, 2026',
    status: 'graded',
    submittedAt: 'Sep 09, 2026',
    grade: '96/100',
    letterGrade: 'A',
    feedback: 'Outstanding implementation of Fibonacci heaps for priority queue optimization! Benchmarks were thorough and well-documented.',
    gradedBy: 'Prof. Sara Okafor',
    points: 100,
  },
  {
    id: 6,
    title: 'First & Second Laws Lab Report',
    subject: 'PHYS 401',
    subjectName: 'Advanced Thermodynamics',
    dueDate: 'Sep 05, 2026',
    status: 'graded',
    submittedAt: 'Sep 04, 2026',
    grade: '92/100',
    letterGrade: 'A-',
    feedback: 'Good experimental work. Be cautious of temperature sensor calibration offsets in Section 3.',
    gradedBy: 'Prof. Chen Wei',
    points: 100,
  },
]

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [activeTab, setActiveTab] = useState('pending')
  const [filterSubject, setFilterSubject] = useState('ALL')
  const [selectedTask, setSelectedTask] = useState(null)
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  const [targetAssignment, setTargetAssignment] = useState(null)
  const [uploadFileName, setUploadFileName] = useState('')
  const [submissionNotes, setSubmissionNotes] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const subjects = ['ALL', 'PHYS 401', 'CS 302', 'MATH 201', 'HIST 210']

  const filtered = assignments.filter((a) => {
    const matchTab = a.status === activeTab
    const matchSubject = filterSubject === 'ALL' || a.subject === filterSubject
    return matchTab && matchSubject
  })

  const pendingCount = assignments.filter((a) => a.status === 'pending').length
  const submittedCount = assignments.filter((a) => a.status === 'submitted').length
  const gradedCount = assignments.filter((a) => a.status === 'graded').length

  const handleOpenSubmit = (assignment) => {
    setTargetAssignment(assignment)
    setUploadFileName('')
    setSubmissionNotes('')
    setSubmitModalOpen(true)
  }

  const handleConfirmSubmit = (e) => {
    e.preventDefault()
    if (!uploadFileName.trim()) return

    setAssignments((prev) =>
      prev.map((item) =>
        item.id === targetAssignment.id
          ? {
              ...item,
              status: 'submitted',
              submittedAt: 'Just now',
              fileSubmitted: uploadFileName,
              statusNote: 'Queued for grading',
            }
          : item
      )
    )

    setSubmitModalOpen(false)
    showToast(`Successfully submitted "${targetAssignment.title}"!`)
    setActiveTab('submitted')
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-indigo-100 shadow-sm">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Deliverables & Tasks
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
              My Assignments
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track course problem sets, term papers, submission status, and instructor feedback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-medium text-slate-500">Upcoming Due</span>
              <p className="text-base font-bold text-rose-600">{pendingCount} deliverables pending</p>
            </div>
          </div>
        </div>

        {/* Tabs & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-indigo-100 shadow-xs">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pending'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Clock size={15} />
              To Do
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === 'pending'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-indigo-50 text-indigo-700'
                }`}
              >
                {pendingCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('submitted')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'submitted'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileCheck2 size={15} />
              Submitted
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === 'submitted'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {submittedCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('graded')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'graded'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award size={15} />
              Graded & Feedback
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === 'graded'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {gradedCount}
              </span>
            </button>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-indigo-100">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">Course:</span>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="text-xs font-bold text-indigo-700 bg-transparent focus:outline-none cursor-pointer"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Assignments List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-indigo-100 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">All caught up in this section!</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No assignments matching your selected filter. Great work staying on top of coursework!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Task Left Info */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        task.status === 'graded'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : task.status === 'submitted'
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : task.dueDays <= 2
                          ? 'bg-rose-50 text-rose-600 border border-rose-100'
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}
                    >
                      {task.status === 'graded' ? (
                        <Award size={22} />
                      ) : task.status === 'submitted' ? (
                        <FileCheck2 size={22} />
                      ) : (
                        <FileText size={22} />
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {task.subject}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {task.subjectName}
                        </span>

                        {task.status === 'pending' && task.dueDays <= 2 && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                            <AlertCircle size={10} /> Due Soon
                          </span>
                        )}
                        {task.status === 'submitted' && (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            Submitted on Time
                          </span>
                        )}
                        {task.status === 'graded' && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Evaluated
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {task.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions & Meta */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    {task.status === 'pending' && (
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block font-medium">Deadline</span>
                          <span className="text-xs font-bold text-slate-800">{task.dueDate}</span>
                        </div>
                        <button
                          onClick={() => handleOpenSubmit(task)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all hover:scale-105 active:scale-95"
                        >
                          <Upload size={14} /> Submit Work
                        </button>
                      </div>
                    )}

                    {task.status === 'submitted' && (
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block font-medium">Uploaded</span>
                          <span className="text-xs font-bold text-slate-700">{task.submittedAt}</span>
                        </div>
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                          {task.fileSubmitted}
                        </span>
                      </div>
                    )}

                    {task.status === 'graded' && (
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                            Score
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg font-black text-emerald-600">
                              {task.grade}
                            </span>
                            <span className="text-xs font-black text-white bg-emerald-600 px-1.5 py-0.5 rounded">
                              {task.letterGrade}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-all"
                        >
                          View Feedback
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rubric snippet if pending */}
                {task.status === 'pending' && task.rubric && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-indigo-500" />
                      <strong className="text-slate-700">Grading Focus:</strong> {task.rubric}
                    </span>
                    <span className="font-bold text-indigo-600">{task.points} pts max</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit Assignment Modal */}
        {submitModalOpen && targetAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-indigo-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Submit Deliverable</h3>
                    <p className="text-xs text-slate-500">{targetAssignment.subject} · {targetAssignment.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmitModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleConfirmSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Upload Solution File (.pdf, .zip, .py)
                  </label>
                  <div className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-2xl p-6 text-center bg-indigo-50/20 cursor-pointer transition-colors">
                    <FileText size={28} className="mx-auto text-indigo-500 mb-2" />
                    <p className="text-xs font-medium text-slate-700">
                      Drag and drop your file, or specify filename below
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. thermodynamics_pset5_final.pdf"
                      value={uploadFileName}
                      onChange={(e) => setUploadFileName(e.target.value)}
                      className="mt-3 w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Comments / Notes for Professor (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g. Completed questions 1-6. Placed special attention on the Carnot heat pump graph."
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSubmitModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
                  >
                    Confirm Submission
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Graded Feedback Modal */}
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Grading Feedback</h3>
                    <p className="text-xs text-slate-500">{selectedTask.subject}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      Final Score Awarded
                    </span>
                    <p className="text-2xl font-black text-emerald-800">{selectedTask.grade}</p>
                  </div>
                  <span className="text-lg font-black text-emerald-700 bg-emerald-200/60 px-3 py-1.5 rounded-xl">
                    Grade {selectedTask.letterGrade}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">Instructor Review:</h4>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 leading-relaxed italic">
                    "{selectedTask.feedback}"
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 text-right font-medium">
                    Evaluated by {selectedTask.gradedBy}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  )
}
