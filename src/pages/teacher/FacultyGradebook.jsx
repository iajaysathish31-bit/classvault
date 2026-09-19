import { useState } from 'react'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import {
  Award,
  Download,
  Filter,
  Search,
  Check,
  X,
  Edit2,
  TrendingUp,
  Percent,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react'

const initialStudents = [
  {
    id: 1,
    name: 'Liam Nakamura',
    email: 'liam.n@univ.edu',
    course: 'CLS-401',
    ps1: 94,
    ps2: 90,
    midterm: 88,
    project: 95,
  },
  {
    id: 2,
    name: 'Chloe Laurent',
    email: 'chloe.l@univ.edu',
    course: 'CLS-401',
    ps1: 88,
    ps2: 92,
    midterm: 85,
    project: 91,
  },
  {
    id: 3,
    name: 'Marcus Bell',
    email: 'marcus.b@univ.edu',
    course: 'CLS-401',
    ps1: 76,
    ps2: 80,
    midterm: 74,
    project: 82,
  },
  {
    id: 4,
    name: 'Sophia Martinez',
    email: 'sophia.m@univ.edu',
    course: 'CLS-401',
    ps1: 98,
    ps2: 96,
    midterm: 94,
    project: 97,
  },
  {
    id: 5,
    name: 'Elena Rostov',
    email: 'elena.r@univ.edu',
    course: 'CLS-302',
    ps1: 99,
    ps2: 98,
    midterm: 95,
    project: 100,
  },
  {
    id: 6,
    name: 'Devon King',
    email: 'devon.k@univ.edu',
    course: 'CLS-302',
    ps1: 82,
    ps2: 85,
    midterm: 80,
    project: 88,
  },
  {
    id: 7,
    name: 'Aria Montgomery',
    email: 'aria.m@univ.edu',
    course: 'CLS-201',
    ps1: 92,
    ps2: 95,
    midterm: 90,
    project: 94,
  },
]

function calculateOverall(s) {
  const avg = s.ps1 * 0.2 + s.ps2 * 0.2 + s.midterm * 0.3 + s.project * 0.3
  return Math.round(avg * 10) / 10
}

function getLetter(score) {
  if (score >= 93) return 'A'
  if (score >= 90) return 'A-'
  if (score >= 87) return 'B+'
  if (score >= 83) return 'B'
  if (score >= 80) return 'B-'
  if (score >= 70) return 'C'
  return 'D'
}

export default function FacultyGradebook() {
  const [students, setStudents] = useState(initialStudents)
  const [selectedCourse, setSelectedCourse] = useState('CLS-401')
  const [searchQuery, setSearchQuery] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [targetStudent, setTargetStudent] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // Edit Form Fields
  const [editPs1, setEditPs1] = useState(0)
  const [editPs2, setEditPs2] = useState(0)
  const [editMidterm, setEditMidterm] = useState(0)
  const [editProject, setEditProject] = useState(0)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const courses = ['CLS-401', 'CLS-302', 'CLS-201']

  const filtered = students.filter((s) => {
    const matchCourse = s.course === selectedCourse
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCourse && matchSearch
  })

  const cohortScores = filtered.map((s) => calculateOverall(s))
  const avgCohort =
    cohortScores.length > 0
      ? (cohortScores.reduce((a, b) => a + b, 0) / cohortScores.length).toFixed(1)
      : '0.0'
  const maxCohort = cohortScores.length > 0 ? Math.max(...cohortScores) : 0

  const handleOpenEdit = (student) => {
    setTargetStudent(student)
    setEditPs1(student.ps1)
    setEditPs2(student.ps2)
    setEditMidterm(student.midterm)
    setEditProject(student.project)
    setEditModalOpen(true)
  }

  const handleSaveGrade = (e) => {
    e.preventDefault()
    setStudents((prev) =>
      prev.map((s) =>
        s.id === targetStudent.id
          ? {
              ...s,
              ps1: Number(editPs1),
              ps2: Number(editPs2),
              midterm: Number(editMidterm),
              project: Number(editProject),
            }
          : s
      )
    )
    setEditModalOpen(false)
    showToast(`Updated grades for ${targetStudent.name}!`)
  }

  const handleExportCSV = () => {
    showToast(`Exported ${selectedCourse} Gradebook to CSV successfully!`)
  }

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-rose-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-rose-500 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 md:p-8 rounded-3xl border border-rose-950/60 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950 px-2.5 py-1 rounded-md border border-rose-800/60">
              Evaluation Matrix
            </span>
            <h1 className="text-2xl font-black text-white mt-2 tracking-tight">
              Gradebook & Term Evaluations
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live grade calculations with weighted assignments, exams, and grading rubric curves.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-750 transition-all"
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Grade Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-5 rounded-3xl border border-rose-950/40">
            <span className="text-xs font-bold text-slate-400">Class Average</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-white">{avgCohort}%</span>
              <span className="text-xs text-rose-400 font-bold">
                {getLetter(Number(avgCohort))} Average
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-3xl border border-rose-950/40">
            <span className="text-xs font-bold text-slate-400">Top Benchmark</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-rose-400">{maxCohort}%</span>
              <span className="text-xs text-slate-400 font-bold">Highest Standing</span>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-3xl border border-rose-950/40">
            <span className="text-xs font-bold text-slate-400">Passing Standing</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-white">100%</span>
              <span className="text-xs text-rose-300 font-bold">All Above 70%</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-3xl border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Cohort:</span>
            {courses.map((crs) => (
              <button
                key={crs}
                onClick={() => setSelectedCourse(crs)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCourse === crs
                    ? 'bg-rose-700 text-white shadow-md shadow-rose-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
                }`}
              >
                {crs}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-slate-200 focus:outline-none focus:border-rose-500 w-full sm:w-60"
            />
          </div>
        </div>

        {/* Interactive Spreadsheet Table */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold">
                  <th className="py-3.5 px-5">Student</th>
                  <th className="py-3.5 px-4 text-center">PSet 1 (20%)</th>
                  <th className="py-3.5 px-4 text-center">PSet 2 (20%)</th>
                  <th className="py-3.5 px-4 text-center">Midterm (30%)</th>
                  <th className="py-3.5 px-4 text-center">Project (30%)</th>
                  <th className="py-3.5 px-4 text-center">Overall</th>
                  <th className="py-3.5 px-4 text-center">Grade</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.map((student) => {
                  const overall = calculateOverall(student)
                  const letter = getLetter(overall)

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-900/40 transition-colors text-slate-200"
                    >
                      <td className="py-3.5 px-5 font-semibold text-white">
                        <div>{student.name}</div>
                        <div className="text-[11px] text-slate-500 font-normal">{student.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono">{student.ps1}</td>
                      <td className="py-3.5 px-4 text-center font-mono">{student.ps2}</td>
                      <td className="py-3.5 px-4 text-center font-mono">{student.midterm}</td>
                      <td className="py-3.5 px-4 text-center font-mono">{student.project}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-rose-400 text-sm font-mono">
                        {overall}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            letter.startsWith('A')
                              ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                              : 'bg-slate-900 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {letter}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-750 font-bold text-xs inline-flex items-center gap-1.5 transition-all"
                        >
                          <Edit2 size={12} /> Edit Scores
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Scores Modal */}
        {editModalOpen && targetStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-950/80 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800/60 flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Adjust Evaluation Scores</h3>
                    <p className="text-xs text-slate-400">{targetStudent.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveGrade} className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Problem Set 1 (20%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editPs1}
                      onChange={(e) => setEditPs1(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Problem Set 2 (20%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editPs2}
                      onChange={(e) => setEditPs2(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500 font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Midterm Exam (30%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editMidterm}
                      onChange={(e) => setEditMidterm(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Final Project (30%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editProject}
                      onChange={(e) => setEditProject(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500 font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Recalculated Average:</span>
                  <span className="text-base font-bold text-rose-400">
                    {calculateOverall({
                      ps1: Number(editPs1),
                      ps2: Number(editPs2),
                      midterm: Number(editMidterm),
                      project: Number(editProject),
                    })}
                    %
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white shadow-lg shadow-rose-950"
                  >
                    Save Changes
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
