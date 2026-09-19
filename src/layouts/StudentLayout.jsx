import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/AuthContext.jsx'
import {
  LayoutDashboard,
  BookOpen,
  CheckCircle2,
  Bookmark,
  User,
  LogOut,
  Flame,
  Presentation,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

export default function StudentLayout({ children }) {
  const location = useLocation()
  const { user, initials, logout, updateUser } = useUser()

  const navItems = [
    { label: 'Study Hub', icon: LayoutDashboard, path: '/student/dashboard' },
    { label: 'My Subjects', icon: BookOpen, path: '/student/classes' },
    { label: 'Assignments', icon: CheckCircle2, path: '/student/assignments' },
    { label: 'Study Vault', icon: Bookmark, path: '/student/vault' },
    { label: 'My Profile', icon: User, path: '/profile' },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Student Indigo Sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-indigo-100/80 flex flex-col justify-between h-screen sticky top-0 shadow-sm">
        <div>
          {/* Logo Header */}
          <div className="p-6 pb-4">
            <Link to="/student/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
                <GraduationCap size={22} />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-lg tracking-tight block leading-tight">
                  ClassVault
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={11} /> Student Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Study Streak Pill */}
          <div className="px-5 mb-3">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Flame size={18} className="fill-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-900 leading-tight">5-Day Streak</p>
                  <p className="text-[10px] text-amber-700">Daily study goal met!</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-white px-2 py-0.5 rounded-lg border border-amber-200">
                +40 XP
              </span>
            </div>
          </div>

          {/* Switch View to Faculty Button */}
          <div className="px-5 mb-4">
            <button
              onClick={() => {
                updateUser({ role: 'Teacher' })
                window.location.href = '/teacher/dashboard'
              }}
              className="w-full text-xs font-medium py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent text-slate-600 transition-all flex items-center justify-between group"
              title="Switch to the Faculty/Teacher console"
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <Presentation size={14} className="text-emerald-600" />
                Switch to Faculty View
              </span>
              <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold group-hover:border-emerald-300">
                Switch
              </span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1">
            <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
              LEARNING MENU
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
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 font-semibold'
                      : 'text-slate-600 hover:bg-indigo-50/60 hover:text-indigo-600'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 m-2 rounded-2xl">
          <Link to="/profile" className="flex items-center gap-3 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                {user?.name || 'Student'}
              </p>
              <p className="text-xs text-slate-400">Enrolled Student</p>
            </div>
          </Link>

          <Link
            to="/"
            onClick={logout}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors pt-2 border-t border-slate-200/60"
          >
            <LogOut size={14} />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  )
}
