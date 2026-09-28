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
    name: 'Student User',
    email: '24cpeb27@kristujayanti.com',
    course: '24CSC2T351',
    ps1: 96,
    ps2: 94,
    midterm: 92,
    project: 98,
  },
  {
    id: 2,
    name: 'Liam Nakamura',
    email: '24cpeb28@kristujayanti.com',
    course: '24CSC2T351',
    ps1: 92,
    ps2: 90,
    midterm: 88,
    project: 95,
  },
  {
    id: 3,
    name: 'Elena Rostov',
    email: '23cs0115@kristujayanti.com',
    course: '24PHY2T351',
    ps1: 98,
    ps2: 96,
    midterm: 95,
    project: 100,
  },
  {
    id: 4,
    name: 'Marcus Bell',
    email: '24cpeb30@kristujayanti.com',
    course: '24PHY2T351',
    ps1: 85,
    ps2: 88,
    midterm: 82,
    project: 89,
  },
  {
    id: 5,
    name: 'Chloe Laurent',
    email: '24cpeb31@kristujayanti.com',
    course: '24CPL2T451',
    ps1: 94,
    ps2: 92,
    midterm: 90,
    project: 96,
  },
  {
    id: 6,
    name: 'Devon King',
    email: '24cpeb32@kristujayanti.com',
    course: '24ELE2T351',
    ps1: 88,
    ps2: 91,
    midterm: 86,
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
  const [selectedCourse, setSelectedCourse] = useState('24CSC2T351')
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

  const courses = ['24CSC2T351', '24PHY2T351', '24CPL2T451', '24ELE2T351']

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
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-600 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-emerald-100 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Evaluation Matrix
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Gradebook & Term Evaluations
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Live grade calculations with weighted assignments, exams, and grading rubric curves.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-all"
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Grade Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Class Average</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-slate-900">{avgCohort}%</span>
              <span className="text-xs text-emerald-700 font-bold">
                {getLetter(Number(avgCohort))} Average
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Top Benchmark</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-emerald-700">{maxCohort}%</span>
              <span className="text-xs text-slate-500 font-bold">Highest Standing</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Passing Standing</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-slate-900">100%</span>
              <span className="text-xs text-emerald-700 font-bold">All Above 70%</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Cohort:</span>
            {courses.map((crs) => (
              <button
                key={crs}
                onClick={() => setSelectedCourse(crs)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCourse === crs
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
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
              className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 w-full sm:w-60"
            />
          </div>
        </div>

        {/* Interactive Spreadsheet Table */}
        <div className="bg-white rounded-3xl border border-emerald-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-emerald-100 bg-emerald-50/60 text-slate-700 font-bold">
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
              <tbody className="divide-y divide-slate-100">
                {filtered.map((student) => {
                  const overall = calculateOverall(student)
                  const letter = getLetter(overall)

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/70 transition-colors text-slate-700"
                    >
                      <td className="py-3.5 px-5 font-bold text-slate-900">
                        <div>{student.name}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{student.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium">{student.ps1}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium">{student.ps2}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium">{student.midterm}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium">{student.project}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-800 text-sm font-mono">
                        {overall}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            letter.startsWith('A')
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {letter}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs inline-flex items-center gap-1.5 transition-all"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200 text-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Adjust Evaluation Scores</h3>
                    <p className="text-xs text-slate-500">{targetStudent.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveGrade} className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Problem Set 1 (20%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editPs1}
                      onChange={(e) => setEditPs1(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Problem Set 2 (20%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editPs2}
                      onChange={(e) => setEditPs2(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Midterm Exam (30%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editMidterm}
                      onChange={(e) => setEditMidterm(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Final Project (30%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editProject}
                      onChange={(e) => setEditProject(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">Recalculated Average:</span>
                  <span className="text-base font-bold text-emerald-800">
                    {calculateOverall({
                      ps1: Number(editPs1),
                      ps2: Number(editPs2),
                      midterm: Number(editMidterm),
                      project: Number(editProject),
                    })}
                    %
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-200"
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
