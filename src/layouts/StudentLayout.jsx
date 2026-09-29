import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/AuthContext.jsx'
import {
  LayoutDashboard,
  BookOpen,
  CheckCircle2,
  Bookmark,
  User,
  LogOut,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  Zap,
} from 'lucide-react'
import AICompanionWidget from '../components/AICompanionWidget.jsx'

export default function StudentLayout({ children }) {
  const location = useLocation()
  const { user, initials, logout, updateUser } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Study Hub', icon: LayoutDashboard, path: '/student/dashboard' },
    { label: 'My Subjects', icon: BookOpen, path: '/student/classes' },
    { label: 'Assignments', icon: CheckCircle2, path: '/student/assignments' },
    { label: 'Study Vault', icon: Bookmark, path: '/student/vault' },
    { label: 'My Profile', icon: User, path: '/profile' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row">
      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-indigo-100/80 px-4 py-3 flex items-center justify-between shadow-xs">
        <Link to="/student/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-200">
            <GraduationCap size={18} />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base tracking-tight block leading-none">
              ClassVault
            </span>
            <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={9} /> Student
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/profile"
            className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-200/60"
          >
            {initials}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
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

          {/* Drawer Menu */}
          <div className="relative w-72 max-w-[82vw] bg-white h-full flex flex-col justify-between shadow-2xl z-10 border-r border-indigo-100 p-4">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-200">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-base tracking-tight block leading-tight">
                      ClassVault
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      Student Portal
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

              <nav className="space-y-1">
                <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                  LEARNING MENU
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

              {/* Mobile Homie AI Launcher Button */}
              <div className="mt-4 px-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    window.dispatchEvent(
                      new CustomEvent('open-ai-mentor', {
                        detail: { query: 'Yo Homie! What assignments do I have due soon?' },
                      })
                    )
                  }}
                  className="w-full p-3 rounded-2xl bg-slate-900 border border-slate-700 text-left transition-all group flex items-center justify-between shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        Talk to ur Homie
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        GPT-4o Vision & Camera Solver
                      </span>
                    </div>
                  </div>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </button>
              </div>
            </div>

            {/* Drawer User Card */}
            <div className="pt-3.5 border-t border-slate-100 bg-slate-50/60 p-3 rounded-2xl">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 mb-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {initials}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {user?.name || 'Student'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{user?.email || 'Enrolled Student'}</p>
                </div>
              </Link>
              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false)
                  logout()
                }}
                className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors pt-2 border-t border-slate-200/60"
              >
                <LogOut size={14} />
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Student Indigo Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-white border-r border-indigo-100/80 flex-col justify-between h-screen sticky top-0 shadow-sm">
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

          {/* Desktop Homie AI Callout Card */}
          <div className="mx-3 mt-4">
            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('open-ai-mentor', {
                    detail: { query: 'Yo Homie! What assignments do I have due soon?' },
                  })
                )
              }}
              className="w-full p-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group cursor-pointer shadow-md"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Talk to ur Homie
                  </span>
                </div>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                GPT-4o Vision & Academic Solver. Snap a photo or solve assignments.
              </p>
            </button>
          </div>
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
      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>

      {/* AI Hero Companion Widget (Available across all student views) */}
      <AICompanionWidget />
    </div>
  )
}
