import { useState, useRef } from 'react'
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
  FolderOpen,
} from 'lucide-react'

const initialAssignments = [
  {
    id: 1,
    title: 'Agile Architecture & Sprint Backlog Specification',
    subject: '24CSC2T351',
    subjectName: 'Software Engineering',
    dueDate: 'Tomorrow, 11:59 PM',
    dueDays: 1,
    status: 'pending',
    points: 100,
    description: 'Design software architecture for an enterprise system using Microservices and MVC patterns. Provide user stories and GitHub Actions CI workflow config.',
    rubric: 'Architecture diagrams (40%), backlog user stories (30%), CI/CD pipeline spec (30%)',
  },
  {
    id: 2,
    title: 'Vector Atom Model & Zeeman Transition Proofs',
    subject: '24PHY2T351',
    subjectName: 'Atomic, Molecular and Nuclear Physics',
    dueDate: 'Sep 30, 2026',
    dueDays: 2,
    status: 'pending',
    points: 100,
    description: 'Derive Lande g-factor for 2P3/2 and 2S1/2 states. Calculate Zeeman energy splitting in a 1.5 Tesla magnetic field.',
    rubric: 'Analytical derivations (50%), transition energy calculations (30%), diagram accuracy (20%)',
  },
  {
    id: 3,
    title: 'Systematic Literature Review Matrix & Methodology Draft',
    subject: '24CPL2T451',
    subjectName: 'Research Methodology',
    dueDate: 'Oct 04, 2026',
    dueDays: 6,
    status: 'pending',
    points: 50,
    description: 'Formulate research problem and hypothesis for your term paper. Synthesize at least 15 Scopus/IEEE peer-reviewed papers.',
    rubric: 'Research gap clarity (40%), literature synthesis matrix (40%), citation ethics (20%)',
  },
  {
    id: 4,
    title: 'ESP32 MQTT Sensor Telemetry Firmware Suite',
    subject: '24ELE2T351',
    subjectName: 'Microcontroller and IoT',
    dueDate: 'Oct 08, 2026',
    dueDays: 10,
    status: 'pending',
    points: 100,
    description: 'Develop C/C++ firmware on ESP32 to read environmental sensors via I2C and stream data over MQTT to an IoT cloud dashboard.',
    rubric: 'Firmware code quality (50%), reliable MQTT reconnection (30%), dashboard setup (20%)',
  },
  {
    id: 5,
    title: 'UML Class Diagram & SOLID Principles Case Study',
    subject: '24CSC2T351',
    subjectName: 'Software Engineering',
    dueDate: 'Sep 15, 2026',
    status: 'graded',
    submittedAt: 'Sep 14, 2026',
    grade: '98/100',
    letterGrade: 'A+',
    feedback: 'Exceptional application of SOLID principles and design patterns. Clean, industry-standard UML class diagrams.',
    gradedBy: 'Prof. Sara Okafor',
    points: 100,
  },
  {
    id: 6,
    title: 'Nuclear Semi-Empirical Mass Formula Verification',
    subject: '24PHY2T351',
    subjectName: 'Atomic, Molecular and Nuclear Physics',
    dueDate: 'Sep 10, 2026',
    status: 'graded',
    submittedAt: 'Sep 09, 2026',
    grade: '95/100',
    letterGrade: 'A',
    feedback: 'Accurate binding energy calculations across isobaric parabolas. Well-structured physics lab report.',
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
  const fileInputRef = useRef(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const subjects = ['ALL', '24CSC2T351', '24PHY2T351', '24CPL2T451', '24ELE2T351']

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
      <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-8 max-w-7xl mx-auto space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-4 sm:right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500 text-xs sm:text-sm font-medium animate-bounce max-w-[90vw]">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-100 shadow-sm">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 sm:px-3 py-1 rounded-full border border-indigo-100">
              Deliverables & Tasks
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              My Assignments
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track course problem sets, term papers, submission status, and instructor feedback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-left md:text-right">
              <span className="text-xs font-medium text-slate-500">Upcoming Due</span>
              <p className="text-sm sm:text-base font-bold text-rose-600">{pendingCount} deliverables pending</p>
            </div>
          </div>
        </div>

        {/* Talk to ur Homie AI Banner */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-lg shadow-sm shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                Talk to ur Homie · GPT-4o Vision Solver
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Stuck on <strong>Agile Architecture</strong> or <strong>Zeeman splitting</strong>? Snap a photo or upload your notes to get instant solutions!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('open-ai-mentor', {
                  detail: { query: 'Yo Homie! What assignments do I have due soon?' },
                })
              )
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={15} /> Talk to ur Homie
          </button>
        </div>

        {/* Tabs & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 sm:p-1.5 rounded-2xl border border-indigo-100 shadow-xs overflow-x-auto">
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
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block font-medium">Deadline</span>
                          <span className="text-xs font-bold text-slate-800">{task.dueDate}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            window.dispatchEvent(
                              new CustomEvent('open-ai-mentor', {
                                detail: {
                                  query: `Yo Homie! How do I solve the assignment "${task.title}" for ${task.subjectName} (${task.subject})? Please give me step-by-step guidance, formulas, or code.`,
                                },
                              })
                            )
                          }}
                          className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                          title="Ask Homie AI for assignment hints"
                        >
                          <Sparkles size={13} className="text-emerald-600" />
                          <span>Ask Homie</span>
                        </button>
                        <button
                          onClick={() => handleOpenSubmit(task)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-lg w-full shadow-2xl border border-indigo-100 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Submit Deliverable</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">{targetAssignment.subject} · {targetAssignment.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmitModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleConfirmSubmit} className="mt-4 sm:mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Upload Solution File (.pdf, .zip, .py)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFileName(e.target.files[0].name)
                      }
                    }}
                  />
                  <div
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-2xl p-4 sm:p-6 text-center bg-indigo-50/20 cursor-pointer transition-colors"
                  >
                    <FolderOpen size={28} className="mx-auto text-indigo-500 mb-2" />
                    <p className="text-xs font-semibold text-indigo-700">
                      Click to choose file from File Explorer
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Supports PDF, DOCX, ZIP, Code files up to 25MB
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. assignment_submission.pdf"
                      value={uploadFileName}
                      onClick={(e) => e.stopPropagation()}
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

                <div className="flex items-center justify-end gap-3 pt-3.5 sm:pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-md w-full shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Grading Feedback</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">{selectedTask.subject}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4 sm:mt-5 space-y-4">
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      Final Score Awarded
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-emerald-800">{selectedTask.grade}</p>
                  </div>
                  <span className="text-base sm:text-lg font-black text-emerald-700 bg-emerald-200/60 px-3 py-1.5 rounded-xl">
                    Grade {selectedTask.letterGrade}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">Instructor Review:</h4>
                  <div className="p-3 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 leading-relaxed italic">
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
