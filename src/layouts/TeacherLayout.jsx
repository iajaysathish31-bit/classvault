import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/AuthContext.jsx'
import {
  ShieldAlert,
  GraduationCap,
  Layers,
  Award,
  BellRing,
  Settings,
  LogOut,
  FolderTree,
  UserCheck,
  CalendarDays,
  Sparkles,
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
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      {/* Clean White & Forest Emerald Sidebar */}
      <aside className="w-68 shrink-0 bg-white border-r border-emerald-100 flex flex-col justify-between h-screen sticky top-0 shadow-sm">
        <div>
          {/* Faculty Header */}
          <div className="p-6 border-b border-emerald-100/80">
            <Link to="/teacher/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                <ShieldAlert size={22} />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-lg tracking-tight block leading-tight">
                  ClassVault
                </span>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1">
                  Faculty Console
                </span>
              </div>
            </Link>

            {/* Academic Term Badge */}
            <div className="mt-4 flex items-center justify-between bg-emerald-50/70 px-3 py-1.5 rounded-xl border border-emerald-200/80 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <CalendarDays size={13} className="text-emerald-700" /> Fall Term 2026
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
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
              className="w-full text-xs font-medium py-2 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 text-slate-600 transition-all flex items-center justify-between group"
              title="Switch to the Student portal"
            >
              <span className="flex items-center gap-1.5 font-semibold text-slate-700 group-hover:text-indigo-700">
                <GraduationCap size={14} className="text-indigo-600" />
                Switch to Student View
              </span>
              <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold group-hover:border-indigo-300">
                Switch
              </span>
            </button>
          </div>

          {/* Faculty Navigation */}
          <nav className="p-3 space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
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
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200 font-semibold'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
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
        <div className="p-4 border-t border-emerald-100 bg-emerald-50/40 m-3 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-sm font-bold shadow-sm shadow-emerald-200">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">
                Prof. {user?.name || 'Faculty Member'}
              </p>
              <p className="text-xs text-emerald-700 font-medium">Senior Instructor</p>
            </div>
          </div>

          <Link
            to="/"
            onClick={logout}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors pt-2 border-t border-emerald-100"
          >
            <LogOut size={14} />
            Sign out of Console
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas in Clean White / Soft Slate */}
      <main className="flex-1 bg-slate-50 min-h-screen overflow-x-hidden text-slate-800 p-8">
        {children}
      </main>
    </div>
  )
}
