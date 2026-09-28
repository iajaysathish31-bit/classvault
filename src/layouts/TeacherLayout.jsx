import { useState } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { useUser } from '../context/AuthContext.jsx'
import {
  ShieldAlert,
  Layers,
  Award,
  BellRing,
  Settings,
  LogOut,
  FolderTree,
  UserCheck,
  CalendarDays,
  Menu,
  X,
} from 'lucide-react'

export default function TeacherLayout({ children }) {
  const location = useLocation()
  const { user, initials, logout, updateUser } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Strict Role Security Guard
  if (user?.role !== 'Teacher') {
    return <Navigate to="/student/dashboard" replace />
  }

  const navItems = [
    { label: 'Command Center', icon: Layers, path: '/teacher/dashboard' },
    { label: 'Teaching Cohorts', icon: UserCheck, path: '/teacher/classes' },
    { label: 'Gradebook & Scoring', icon: Award, path: '/teacher/gradebook' },
    { label: 'Curriculum Vault', icon: FolderTree, path: '/teacher/materials' },
    { label: 'Announcements', icon: BellRing, path: '/teacher/broadcast' },
    { label: 'Faculty Settings', icon: Settings, path: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col md:flex-row">
      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-emerald-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <Link to="/teacher/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm shadow-emerald-200">
            <ShieldAlert size={18} />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base tracking-tight block leading-none">
              ClassVault
            </span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
              Faculty Console
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
            {initials}
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[82vw] bg-white h-full flex flex-col justify-between shadow-2xl z-10 border-r border-emerald-100 p-4">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-emerald-100 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm shadow-emerald-200">
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-base tracking-tight block leading-tight">
                      ClassVault
                    </span>
                    <span className="text-[10px] font-bold text-emerald-750 uppercase tracking-widest text-emerald-700">
                      Faculty Console
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Term Badge */}
              <div className="mb-4 flex items-center justify-between bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-200/80 text-xs">
                <span className="flex items-center gap-1.5 text-slate-800 font-semibold text-[11px]">
                  <CalendarDays size={13} className="text-emerald-700" /> Fall Term 2026
                </span>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                  Active
                </span>
              </div>

              {/* Nav Links */}
              <nav className="space-y-1">
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
                      onClick={() => setMobileMenuOpen(false)}
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
            <div className="pt-3.5 border-t border-emerald-100 bg-emerald-50/50 p-3 rounded-2xl">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-emerald-200">
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
                onClick={() => {
                  setMobileMenuOpen(false)
                  logout()
                }}
                className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors pt-2 border-t border-emerald-105 border-emerald-100"
              >
                <LogOut size={14} />
                Sign out of Console
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Clean White & Forest Emerald Sidebar */}
      <aside className="hidden md:flex w-68 shrink-0 bg-white border-r border-emerald-100 flex-col justify-between h-screen sticky top-0 shadow-sm">
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
      <main className="flex-1 min-w-0 bg-slate-50 min-h-screen overflow-x-hidden text-slate-800 p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
