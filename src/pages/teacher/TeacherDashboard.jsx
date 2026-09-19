import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import {
  BookOpen,
  Users,
  FileText,
  CheckCircle2,
  Upload,
  Plus,
  ArrowRight,
  Clock,
  Check,
  X,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

const teacherClasses = [
  {
    code: 'PHYS 401',
    name: 'Advanced Thermodynamics',
    students: 28,
    submissions: 3,
    resources: 4,
    schedule: 'Mon, Wed, Fri · 10:00 AM',
    color: 'bg-vault-blue',
  },
  {
    code: 'CS 302',
    name: 'Data Structures & Algorithms',
    students: 35,
    submissions: 2,
    resources: 5,
    schedule: 'Tue, Thu · 2:00 PM',
    color: 'bg-indigo-500',
  },
  {
    code: 'MATH 201',
    name: 'Linear Algebra',
    students: 32,
    submissions: 2,
    resources: 3,
    schedule: 'Mon, Wed · 11:30 AM',
    color: 'bg-blue-600',
  },
]

const pendingSubmissions = [
  {
    id: 1,
    student: 'Liam Nakamura',
    initial: 'LN',
    classCode: 'PHYS 401',
    assignment: 'Problem Set 5: Carnot Engines',
    submittedAt: '2h ago',
    urgent: true,
  },
  {
    id: 2,
    student: 'Elena Rostova',
    initial: 'ER',
    classCode: 'CS 302',
    assignment: 'Final Project Proposal: Graph Visualizer',
    submittedAt: '4h ago',
    urgent: false,
  },
  {
    id: 3,
    student: 'Marcus Brody',
    initial: 'MB',
    classCode: 'PHYS 401',
    assignment: 'Problem Set 5: Carnot Engines',
    submittedAt: 'Yesterday',
    urgent: false,
  },
  {
    id: 4,
    student: 'Sofia Alvarez',
    initial: 'SA',
    classCode: 'MATH 201',
    assignment: 'Homework 4: Basis & Dimension',
    submittedAt: 'Yesterday',
    urgent: false,
  },
]

export default function TeacherDashboard() {
  const { user, firstName } = useUser()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [classesList, setClassesList] = useState(teacherClasses)
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newSchedule, setNewSchedule] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const handleCreateClass = (e) => {
    e.preventDefault()
    if (!newName.trim()) return

    const newCls = {
      code: newCode.trim() || 'NEW 101',
      name: newName.trim(),
      students: 0,
      submissions: 0,
      resources: 0,
      schedule: newSchedule.trim() || 'Mon, Wed · 10:00 AM',
      color: 'bg-vault-blue',
    }

    setClassesList([...classesList, newCls])
    setNewCode('')
    setNewName('')
    setNewSchedule('')
    setShowCreateModal(false)
    setToastMsg(`Class "${newCls.name}" created successfully!`)
    setTimeout(() => setToastMsg(''), 3000)
  }

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider bg-vault-blue/10 text-vault-blue px-2.5 py-0.5 rounded-md">
                Educator Portal
              </span>
              <p className="text-xs text-gray-400">Semester: Fall 2026</p>
            </div>
            <h1 className="text-xl font-semibold text-vault-navy mt-1">Instructor Dashboard</h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-vault-blue text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors shadow-sm"
            >
              <Plus size={16} /> Create Class
            </button>
            <Link
              to="/upload"
              className="flex items-center gap-2 bg-white border border-gray-200 text-vault-navy text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Upload size={16} /> Upload Resource
            </Link>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-vault-navy to-vault-blue-dark text-white rounded-2xl p-6 mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
                <Sparkles size={14} className="text-amber-400" />
                <span>TEACHER CONTROL CENTER</span>
              </div>
              <h2 className="text-2xl font-serif font-semibold">
                Welcome back, Prof. {firstName || 'Instructor'} 👋
              </h2>
              <p className="text-sm text-white/80 mt-1 max-w-xl">
                You have <strong>7 student submissions</strong> waiting for your review and grade across your 3 active courses.
              </p>
            </div>
            <Link
              to="/teacher/grading"
              className="bg-white text-vault-navy hover:bg-gray-100 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shrink-0 flex items-center gap-2"
            >
              Open Grading Queue <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-vault-blue/10 text-vault-blue flex items-center justify-center mb-3">
              <BookOpen size={20} />
            </div>
            <p className="text-2xl font-bold text-vault-navy">{classesList.length}</p>
            <p className="text-sm text-gray-500 font-medium">Classes Teaching</p>
            <p className="text-xs text-gray-400 mt-0.5">Fall 2026 roster</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Users size={20} />
            </div>
            <p className="text-2xl font-bold text-vault-navy">95</p>
            <p className="text-sm text-gray-500 font-medium">Enrolled Students</p>
            <p className="text-xs text-gray-400 mt-0.5">Across all classes</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
              <FileText size={20} />
            </div>
            <p className="text-2xl font-bold text-vault-navy">18</p>
            <p className="text-sm text-gray-500 font-medium">Shared Materials</p>
            <p className="text-xs text-gray-400 mt-0.5">In class vaults</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-3">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-2xl font-bold text-vault-navy">7</p>
            <p className="text-sm text-gray-500 font-medium">Submissions to Grade</p>
            <p className="text-xs text-red-500 mt-0.5 font-medium">3 due soon</p>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Managed Classes */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-vault-navy">Classes You Teach</h2>
              <Link to="/teacher/classes" className="text-sm text-vault-blue font-medium hover:underline">
                Manage all →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {classesList.map((cls) => (
                <div
                  key={cls.code}
                  className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-vault-blue/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600">
                        {cls.code}
                      </span>
                      <span className="text-xs text-vault-blue font-medium bg-vault-blue/10 px-2 py-0.5 rounded-full">
                        {cls.students} students
                      </span>
                    </div>

                    <h3 className="font-semibold text-vault-navy text-base leading-snug mb-1">
                      {cls.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
                      <Clock size={13} /> {cls.schedule}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <Link
                      to={`/classes/${cls.code.replace(/\s+/g, '-')}`}
                      className="text-vault-blue font-medium hover:underline"
                    >
                      View syllabus & materials
                    </Link>
                    <Link
                      to="/teacher/grading"
                      className="text-gray-500 hover:text-vault-navy font-medium"
                    >
                      Gradebook ({cls.submissions})
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Submissions Queue */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-vault-navy">Pending Submissions</h2>
              <Link to="/teacher/grading" className="text-sm text-vault-blue font-medium hover:underline">
                Grade all →
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100 shadow-sm">
              {pendingSubmissions.map((sub) => (
                <div key={sub.id} className="p-4 hover:bg-gray-50/70 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-vault-blue text-white flex items-center justify-center text-xs font-semibold">
                        {sub.initial}
                      </div>
                      <p className="text-sm font-medium text-vault-navy">{sub.student}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {sub.classCode}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-medium line-clamp-1">{sub.assignment}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                    <span className="text-[11px] text-gray-400">Submitted {sub.submittedAt}</span>
                    <Link
                      to="/teacher/grading"
                      className="text-xs font-semibold text-vault-blue hover:underline"
                    >
                      Grade Work →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Class Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>

              <h2 className="text-lg font-semibold text-vault-navy mb-1">Create New Class</h2>
              <p className="text-xs text-gray-400 mb-5">
                Set up a new course vault for your enrolled students.
              </p>

              <form onSubmit={handleCreateClass} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">
                    Course Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CS 405"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Machine Learning & Neural Networks"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">
                    Class Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tue, Thu · 10:00 AM – 11:30 AM"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-vault-blue text-white rounded-xl text-sm font-medium hover:bg-vault-blue-dark transition-colors"
                  >
                    Publish Course
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
