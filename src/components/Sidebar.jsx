import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/AuthContext.jsx'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  User,
  Settings,
  LogOut,
  Library,
  CheckSquare,
  GraduationCap,
  Presentation,
} from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()
  const { user, initials, logout, updateUser } = useUser()

  const isTeacher = user?.role === 'Teacher'

  const studentNavItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Classes', icon: BookOpen, path: '/classes' },
    { label: 'Resources', icon: FileText, path: '/resources' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ]

  const teacherNavItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
    { label: 'Classes Taught', icon: BookOpen, path: '/teacher/classes' },
    { label: 'Submissions & Grading', icon: CheckSquare, path: '/teacher/grading' },
    { label: 'Resources Vault', icon: FileText, path: '/resources' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ]

  const navItems = isTeacher ? teacherNavItems : studentNavItems

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col justify-between h-screen sticky top-0">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="w-8 h-8 rounded-lg bg-vault-blue flex items-center justify-center">
            <Library size={18} className="text-white" />
          </div>
          <div>
            <span className="font-semibold text-vault-navy text-lg block leading-none">ClassVault</span>
            <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">
              {isTeacher ? 'Teacher Portal' : 'Student Portal'}
            </span>
          </div>
        </div>

        {/* Quick Role Switcher Pill */}
        <div className="px-4 mb-2">
          <button
            type="button"
            onClick={() => updateUser({ role: isTeacher ? 'Student' : 'Teacher' })}
            className="w-full text-xs font-semibold py-1.5 px-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-vault-blue/10 hover:text-vault-blue hover:border-vault-blue/30 text-gray-600 transition-colors flex items-center justify-between"
            title="Toggle between Student and Teacher module views"
          >
            <span className="flex items-center gap-1.5">
              {isTeacher ? <Presentation size={13} className="text-vault-blue" /> : <GraduationCap size={13} className="text-vault-blue" />}
              {isTeacher ? 'Teacher View' : 'Student View'}
            </span>
            <span className="text-[10px] text-vault-blue font-bold underline">Switch</span>
          </button>
        </div>

        <div className="px-6 pt-2 pb-2">
          <span className="text-xs font-medium tracking-wide text-gray-400">MENU</span>
        </div>

        <nav className="px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-vault-blue/10 text-vault-blue font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-gray-100 px-6 py-4">
        <Link to="/profile" className="flex items-center gap-3 mb-4 group">
          <div className="w-9 h-9 rounded-full bg-vault-blue text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-vault-navy truncate group-hover:text-vault-blue transition-colors">
              {user.name}
            </p>
            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
          </div>
        </Link>
        <Link
          to="/"
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <LogOut size={16} />
          Log out
        </Link>
      </div>
    </aside>
  )
}
