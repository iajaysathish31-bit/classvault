import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { GraduationCap, ShieldAlert, ArrowLeft, Check, Sparkles, Lock, Mail, UserCheck } from 'lucide-react'
import { useUser } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams()
  const roleParam = searchParams.get('role')

  const [role, setRole] = useState(roleParam === 'teacher' ? 'teacher' : 'student')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const { login, updateUser } = useUser()
  const { teachers, students } = useData()
  const navigate = useNavigate()

  // Sync role if query param changes
  useEffect(() => {
    if (roleParam === 'teacher') {
      setRole('teacher')
    } else if (roleParam === 'student') {
      setRole('student')
    }
  }, [roleParam])

  const handleRoleTabChange = (newRole) => {
    setRole(newRole)
    setSearchParams({ role: newRole })
    setIdentifier('')
    setPassword('')
  }

  const handleDemoLogin = (demoRole) => {
    if (demoRole === 'teacher') {
      const demoTeacher = teachers[0] || {
        name: 'Prof. Chen Wei',
        email: 'chen.wei@university.edu',
        teacher_id: 'TCH-101',
        department: 'Physics & Applied Sciences',
      }
      updateUser({
        name: demoTeacher.name,
        email: demoTeacher.email,
        role: 'Teacher',
        teacher_id: demoTeacher.teacher_id,
        department: demoTeacher.department,
      })
      navigate('/teacher/dashboard')
    } else {
      const demoStudent = students[0] || {
        name: 'Student User',
        email: 'student@university.edu',
        student_id: 'STU-8821',
        department: 'Computer Science & Engineering',
        year: 'Year 3 (Junior)',
        phone: '+1 (555) 349-8821',
      }
      updateUser({
        name: demoStudent.name,
        email: demoStudent.email,
        role: 'Student',
        student_id: demoStudent.student_id,
        department: demoStudent.department,
        year: demoStudent.year,
        phone: demoStudent.phone,
      })
      navigate('/student/dashboard')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailVal = identifier.includes('@') ? identifier.trim() : `${identifier.trim().toLowerCase()}@university.edu`

    if (role === 'teacher') {
      updateUser({
        name: identifier.startsWith('TCH') ? 'Faculty Member' : identifier.split('@')[0],
        email: emailVal,
        role: 'Teacher',
        teacher_id: identifier.startsWith('TCH') ? identifier.trim() : 'TCH-101',
        department: 'Physics & Applied Sciences',
      })
      navigate('/teacher/dashboard')
    } else {
      updateUser({
        name: identifier.startsWith('STU') ? 'Student User' : identifier.split('@')[0],
        email: emailVal,
        role: 'Student',
        student_id: identifier.startsWith('STU') ? identifier.trim() : 'STU-8821',
        department: 'Computer Science & Engineering',
      })
      navigate('/student/dashboard')
    }
  }

  const isTeacher = role === 'teacher'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12 font-sans text-slate-800">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-2.5 mb-8 group">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 ${isTeacher ? 'bg-emerald-600 shadow-emerald-200' : 'bg-indigo-600 shadow-indigo-200'}`}>
          {isTeacher ? <ShieldAlert size={22} /> : <GraduationCap size={22} />}
        </div>
        <div>
          <span className="font-black text-xl tracking-tight text-slate-900 block leading-none">ClassVault</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {isTeacher ? 'Faculty Portal Access' : 'Student Portal Access'}
          </span>
        </div>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-8 sm:p-10 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none opacity-20 ${isTeacher ? 'bg-emerald-500' : 'bg-indigo-500'}`} />

        {/* Portal Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => handleRoleTabChange('student')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              !isTeacher
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
            }`}
          >
            <GraduationCap size={16} /> Student Portal
          </button>
          <button
            type="button"
            onClick={() => handleRoleTabChange('teacher')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isTeacher
                ? 'bg-slate-900 text-emerald-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
            }`}
          >
            <ShieldAlert size={16} /> Teacher Portal
          </button>
        </div>

        {/* Title & Context */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${isTeacher ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
              {isTeacher ? 'Teacher / Faculty Access' : 'Student Access'}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isTeacher ? 'Faculty Console Login' : 'Student Study Hub Login'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isTeacher
              ? 'Enter your institutional credentials to manage student cohorts & gradebooks.'
              : 'Enter your student credentials to view enrolled classes, tasks, and notes.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isTeacher ? 'Faculty Email or Teacher ID' : 'Student Email or Student ID'}
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={isTeacher ? 'e.g. chen.wei@university.edu or TCH-101' : 'e.g. student@university.edu or STU-8821'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Demo environment: any password will be accepted.'); }} className="text-xs text-slate-400 hover:text-slate-700">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2 ${
              isTeacher
                ? 'bg-slate-950 hover:bg-slate-900 shadow-slate-900/20'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {isTeacher ? <ShieldAlert size={15} /> : <GraduationCap size={15} />}
            Log In to {isTeacher ? 'Teacher Portal' : 'Student Portal'}
          </button>
        </form>

        {/* 1-Click Fast Demo Login Button */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => handleDemoLogin(role)}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
              isTeacher
                ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800'
            }`}
          >
            <Sparkles size={14} />
            Instant Demo Access: {isTeacher ? 'Prof. Chen Wei (TCH-101)' : 'Student User (STU-8821)'}
          </button>
        </div>

        {/* Sign Up Redirect */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Don&apos;t have an account yet?{' '}
          <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-800">
            Sign up free
          </Link>
        </p>
      </div>

      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 mt-6 font-medium">
        <ArrowLeft size={13} /> Return to homepage
      </Link>
    </div>
  )
}
