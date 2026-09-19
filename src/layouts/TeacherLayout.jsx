import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/AuthContext.jsx'
import {
  ShieldAlert,
  GraduationCap,
  Layers,
  Award,
  FileCheck2,
  BellRing,
  Settings,
  LogOut,
  FolderTree,
  UserCheck,
  CalendarDays,
} from 'lucide-react'

export default function TeacherLayout({ children }) {
  const location = useLocation()
  const { user, initials, logout, updateUser } = useUser()

  const navItems = [
    { label: 'Command Center', icon: Layers, path: '/teacher/dashboard' },
    { label: 'Teaching Cohorts', icon: UserCheck, path: '/teacher/classes' },
    { label: 'Gradebook & Scoring', icon: Award, path: '/teacher/gradebook' },
    { label: 'Curriculum Vault', icon: FolderTree, path: '/teacher/materials' },
    { label: 'Announcements', icon: BellRing, path: '/teacher/broadcast' },
    { label: 'Faculty Settings', icon: Settings, path: '/settings' },
  ]

  return (
    <div className="flex min-h-screen bg-slate-900 font-sans text-slate-100 antialiased">
      {/* Executive Emerald & Slate Sidebar */}
      <aside className="w-68 shrink-0 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 shadow-2xl">
        <div>
          {/* Faculty Header */}
          <div className="p-6 border-b border-slate-800/70">
            <Link to="/teacher/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-950">
                <ShieldAlert size={22} />
              </div>
              <div>
                <span className="font-bold text-white text-lg tracking-tight block leading-tight">
                  ClassVault
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  Faculty Console
                </span>
              </div>
            </Link>

            {/* Academic Term Badge */}
            <div className="mt-4 flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CalendarDays size={13} className="text-emerald-400" /> Fall Term 2026
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                Active
              </span>
            </div>
          </div>

          {/* Switch to Student Portal Button */}
          <div className="p-4 pb-2">
            <button
              onClick={() => {
                updateUser({ role: 'Student' })
                window.location.href = '/student/dashboard'
              }}
              className="w-full text-xs font-medium py-2 px-3 rounded-xl bg-slate-900 hover:bg-indigo-950/60 hover:text-indigo-300 hover:border-indigo-700/60 border border-slate-800 text-slate-400 transition-all flex items-center justify-between group"
              title="Switch back to the Student portal"
            >
              <span className="flex items-center gap-1.5 font-semibold text-slate-300 group-hover:text-indigo-300">
                <GraduationCap size={14} className="text-indigo-400" />
                Switch to Student View
              </span>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-bold group-hover:border-indigo-600">
                Switch
              </span>
            </button>
          </div>

          {/* Faculty Navigation */}
          <nav className="p-3 space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">
              ADMINISTRATION
            </p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/60 font-semibold'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-emerald-400'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Instructor Profile Card & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 m-3 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-emerald-950">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">
                Prof. {user?.name || 'Faculty Member'}
              </p>
              <p className="text-xs text-emerald-400 font-medium">Senior Instructor</p>
            </div>
          </div>

          <Link
            to="/"
            onClick={logout}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-400 transition-colors pt-2 border-t border-slate-800"
          >
            <LogOut size={14} />
            Sign out of Console
          </Link>
        </div>
      </aside>

      {/* Main Content Area in Dark Slate Theme */}
      <main className="flex-1 bg-slate-900 min-h-screen overflow-x-hidden text-slate-100">
        {children}
      </main>
    </div>
  )
}
