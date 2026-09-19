import { useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import {
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  FileText,
  X,
  Check,
  Award,
} from 'lucide-react'

const initialSubmissions = [
  {
    id: 1,
    student: 'Liam Nakamura',
    email: 'liam.n@university.edu',
    initial: 'LN',
    classCode: 'PHYS 401',
    assignment: 'Problem Set 5: Carnot Engines',
    file: 'PS5_Liam_Nakamura.pdf',
    submittedAt: 'Today, 8:15 AM',
    status: 'Pending',
    score: null,
    feedback: '',
  },
  {
    id: 2,
    student: 'Elena Rostova',
    email: 'elena.r@university.edu',
    initial: 'ER',
    classCode: 'CS 302',
    assignment: 'Final Project Proposal: Graph Visualizer',
    file: 'Project_Proposal_Elena.docx',
    submittedAt: 'Today, 6:30 AM',
    status: 'Pending',
    score: null,
    feedback: '',
  },
  {
    id: 3,
    student: 'Marcus Brody',
    email: 'marcus.b@university.edu',
    initial: 'MB',
    classCode: 'PHYS 401',
    assignment: 'Problem Set 5: Carnot Engines',
    file: 'Thermodynamics_HW5_Marcus.pdf',
    submittedAt: 'Yesterday, 11:20 PM',
    status: 'Pending',
    score: null,
    feedback: '',
  },
  {
    id: 4,
    student: 'Sofia Alvarez',
    email: 'sofia.a@university.edu',
    initial: 'SA',
    classCode: 'MATH 201',
    assignment: 'Homework 4: Basis & Dimension',
    file: 'LinearAlg_HW4_Sofia.pdf',
    submittedAt: 'Yesterday, 4:45 PM',
    status: 'Pending',
    score: null,
    feedback: '',
  },
  {
    id: 5,
    student: 'David Kim',
    email: 'david.k@university.edu',
    initial: 'DK',
    classCode: 'CS 302',
    assignment: 'Programming Assignment 3: Dijkstra & A*',
    file: 'dijkstra_source_david.zip',
    submittedAt: 'Oct 1, 2026',
    status: 'Graded',
    score: 98,
    feedback: 'Optimal priority queue implementation. Excellent code comments.',
  },
  {
    id: 6,
    student: 'Ananya Sharma',
    email: 'ananya.s@university.edu',
    initial: 'AS',
    classCode: 'CS 302',
    assignment: 'Programming Assignment 3: Dijkstra & A*',
    file: 'sharma_shortest_path.zip',
    submittedAt: 'Oct 1, 2026',
    status: 'Graded',
    score: 95,
    feedback: 'Very clean graphs implementation. Edge cases well-handled.',
  },
]

export default function TeacherGrading() {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedSub, setSelectedSub] = useState(null)
  const [gradeScore, setGradeScore] = useState('')
  const [gradeFeedback, setGradeFeedback] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const handleOpenGradeModal = (sub) => {
    setSelectedSub(sub)
    setGradeScore(sub.score !== null ? String(sub.score) : '95')
    setGradeFeedback(sub.feedback || '')
  }

  const handleSaveGrade = (e) => {
    e.preventDefault()
    if (!selectedSub) return

    setSubmissions(
      submissions.map((s) =>
        s.id === selectedSub.id
          ? {
              ...s,
              status: 'Graded',
              score: Number(gradeScore),
              feedback: gradeFeedback,
            }
          : s
      )
    )

    setToastMsg(`Grade submitted for ${selectedSub.student}!`)
    setSelectedSub(null)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const filtered = submissions.filter((s) => {
    const matchesSearch =
      s.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.assignment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.classCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = classFilter === 'All' || s.classCode === classFilter
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter
    return matchesSearch && matchesClass && matchesStatus
  })

  const pendingCount = submissions.filter((s) => s.status === 'Pending').length
  const gradedCount = submissions.filter((s) => s.status === 'Graded').length

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-vault-navy">Submissions & Grading</h1>
            <p className="text-sm text-gray-400">Review student coursework and submit evaluated scores</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/50">
              {pendingCount} Pending Review
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/50">
              {gradedCount} Evaluated
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, task, or course..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-medium">
              {['All', 'PHYS 401', 'CS 302', 'MATH 201'].map((c) => (
                <button
                  key={c}
                  onClick={() => setClassFilter(c)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    classFilter === c ? 'bg-white text-vault-blue shadow-sm font-semibold' : 'text-gray-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-medium">
              {['All', 'Pending', 'Graded'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    statusFilter === st ? 'bg-white text-vault-blue shadow-sm font-semibold' : 'text-gray-600'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submissions Table / Cards */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              No submissions match the selected filters.
            </div>
          ) : (
            filtered.map((sub) => (
              <div
                key={sub.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-vault-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {sub.initial}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-vault-navy">{sub.student}</p>
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {sub.classCode}
                      </span>
                    </div>
                    <p className="text-xs text-vault-blue font-medium mt-0.5">{sub.assignment}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <span>Submitted: {sub.submittedAt}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <FileText size={12} /> {sub.file}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  {sub.status === 'Graded' ? (
                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        {sub.score} / 100
                      </span>
                      <p className="text-[11px] text-gray-400 mt-1">Feedback posted</p>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      Awaiting Score
                    </span>
                  )}

                  <button
                    onClick={() => handleOpenGradeModal(sub)}
                    className="px-4 py-2 rounded-xl bg-vault-blue text-white text-xs font-medium hover:bg-vault-blue-dark transition-colors shadow-sm"
                  >
                    {sub.status === 'Graded' ? 'Edit Grade' : 'Grade Submission'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Grade Modal */}
        {selectedSub && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setSelectedSub(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Award className="text-vault-blue" size={20} />
                <h2 className="text-lg font-semibold text-vault-navy">Grade Submission</h2>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Evaluate student coursework and provide constructive feedback.
              </p>

              {/* Student info card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2 border border-gray-100">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Student:</span>
                  <span className="font-semibold text-vault-navy">{selectedSub.student}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Course & Task:</span>
                  <span className="font-medium text-vault-navy">
                    {selectedSub.classCode} — {selectedSub.assignment}
                  </span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-gray-200/60">
                  <span className="text-gray-400">Attached File:</span>
                  <button
                    onClick={() => alert(`Opening ${selectedSub.file}`)}
                    className="text-vault-blue hover:underline font-medium flex items-center gap-1"
                  >
                    <Download size={12} /> {selectedSub.file}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveGrade} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">
                    Score (out of 100) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={gradeScore}
                    onChange={(e) => setGradeScore(e.target.value)}
                    placeholder="e.g. 95"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-vault-navy focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">
                    Instructor Feedback & Notes
                  </label>
                  <textarea
                    rows={4}
                    value={gradeFeedback}
                    onChange={(e) => setGradeFeedback(e.target.value)}
                    placeholder="Write detailed observations, commendations, or areas to improve..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSub(null)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-vault-blue text-white rounded-xl text-sm font-medium hover:bg-vault-blue-dark transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Check size={16} /> Return Grade to Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 bg-vault-navy text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm z-50 animate-in slide-in-from-bottom duration-200">
            <Check size={16} className="text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}
      </main>
    </div>
  )
}
