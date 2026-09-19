import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import { useUser } from '../context/AuthContext.jsx'
import {
  Upload,
  Bell,
  GraduationCap,
  Paperclip,
  AlarmClock,
  Users,
  FileText,
  Download,
} from 'lucide-react'

const overviewCards = [
  { icon: GraduationCap, value: '4', label: 'Enrolled Classes', sub: '+1 this semester' },
  { icon: Paperclip, value: '12', label: 'Recent Uploads', sub: '4 this week' },
  { icon: AlarmClock, value: '3', label: 'Due This Week', sub: 'Next: Oct 14' },
  { icon: Users, value: '136', label: 'Classmates', sub: 'Across all classes' },
]

const classes = [
  { code: 'PHYS 401', name: 'Advanced Thermodynamics', prof: 'Prof. Chen Wei', students: 28, due: 'Due Oct 14', initial: 'A', color: 'bg-vault-blue' },
  { code: 'CS 302', name: 'Data Structures & Algorithms', prof: 'Prof. Sara Okafor', students: 35, due: 'Due Oct 18', initial: 'D', color: 'bg-indigo-500' },
  { code: 'MATH 201', name: 'Linear Algebra', prof: '', students: null, due: '', initial: 'L', color: 'bg-blue-600' },
  { code: 'HIST 210', name: 'Modern World History', prof: '', students: null, due: '', initial: 'M', color: 'bg-purple-500' },
]

const deadlines = [
  { title: 'Problem Set 5', sub: 'PHYS 401 · Due Oct 14', left: '7d left', urgent: true },
  { title: 'Final Project Proposal', sub: 'CS 302 · Due Oct 18', left: '11d left' },
  { title: 'Midterm Exam Review', sub: 'MATH 201 · Due Oct 21', left: '14d left' },
]

const uploads = [
  { name: 'Lecture 8 — Thermodynamics Laws.pdf', sub: 'PHYS 401 · 2.4 MB', when: '2h ago', tag: 'PDF', color: 'bg-red-100 text-red-500' },
  { name: 'Assignment 3 — Sorting Algorithms.docx', sub: 'CS 302 · 188 KB', when: 'Yesterday', tag: 'DOC', color: 'bg-blue-100 text-blue-500' },
  { name: 'Chapter 5 Summary Notes.pdf', sub: 'MATH 201 · 940 KB', when: '2 days ago', tag: 'PDF', color: 'bg-red-100 text-red-500' },
  { name: 'WWI Primary Sources Collection.zip', sub: 'HIST 210 · 81 MB', when: '3 days ago', tag: 'ZIP', color: 'bg-amber-100 text-amber-600' },
]

export default function Dashboard() {
  const { firstName } = useUser()

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-vault-navy">Dashboard</h1>
            <p className="text-sm text-gray-400">Monday, October 7, 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/upload"
              className="flex items-center gap-2 bg-vault-blue text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors shadow-sm"
            >
              <Upload size={16} /> Upload resource
            </Link>
            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white">
              <Bell size={17} className="text-gray-500" />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>
          </div>
        </div>

        <h2 className="text-lg font-serif font-semibold text-vault-navy">Good morning, {firstName} 👋</h2>
        <p className="text-sm text-gray-400 mb-6">You have 3 upcoming deadlines this week.</p>

        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {overviewCards.map((c) => {
            const Icon = c.icon
            return (
              <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-5">
                <Icon size={18} className="text-vault-blue mb-3" />
                <p className="text-2xl font-semibold text-vault-navy">{c.value}</p>
                <p className="text-sm text-gray-500">{c.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* My Classes */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-vault-navy">My Classes</h3>
              <Link to="/classes" className="text-sm text-vault-blue font-medium hover:underline">View all →</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {classes.map((c) => (
                <Link
                  key={c.code}
                  to={`/classes/${c.code.replace(/\s+/g, '-')}`}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:border-vault-blue/40 hover:shadow-md transition-all group block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg ${c.color} text-white flex items-center justify-center font-semibold text-sm group-hover:scale-105 transition-transform`}>
                      {c.initial}
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{c.code}</span>
                  </div>
                  <h4 className="font-medium text-vault-navy mb-1 group-hover:text-vault-blue transition-colors">{c.name}</h4>
                  {c.prof && <p className="text-xs text-gray-400 mb-3">{c.prof}</p>}
                  {c.students && (
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{c.students} students</span>
                      <span className="text-vault-blue font-medium">{c.due}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-vault-navy">Upcoming Deadlines</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              {deadlines.map((d) => (
                <div key={d.title} className="p-4 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-vault-navy">{d.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{d.sub}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap ${
                      d.urgent ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'
                    }`}
                  >
                    {d.left}
                  </span>
                </div>
              ))}
              <div className="p-4">
                <a href="#" className="text-sm text-vault-blue font-medium hover:underline">See all deadlines →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-vault-navy">Recent Uploads</h3>
            <a href="#" className="text-sm text-vault-blue font-medium hover:underline">Browse all →</a>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            {uploads.map((u) => (
              <div key={u.name} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold ${u.color}`}>
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-vault-navy">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">{u.when}</span>
                  <button className="text-gray-400 hover:text-vault-blue">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
