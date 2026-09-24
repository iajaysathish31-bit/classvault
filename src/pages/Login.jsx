import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { GraduationCap, ShieldAlert, ArrowLeft, Check, Sparkles, Lock, Mail } from 'lucide-react'
import { useUser } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams()
  const roleParam = searchParams.get('role')

  const [role, setRole] = useState(roleParam === 'teacher' ? 'teacher' : 'student')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { updateUser } = useUser()
  const { teachers, students } = useData()
  const navigate = useNavigate()

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
    setErrorMessage('')
  }

  const STUDENT_ROLL_REGEX = /^[0-9]{2}[a-z]{2,8}[0-9]{1,5}$/i

  const cleanId = identifier.trim().toLowerCase()
  const isGmail = cleanId.includes('@gmail.com') || cleanId.endsWith('@gmail')
  const hasAt = cleanId.includes('@')
  const isAllowedDomain = cleanId.endsWith('@kristujayanti.com') && cleanId.split('@')[0].length > 0
  const hasInvalidOtherDomain = hasAt && !cleanId.endsWith('@kristujayanti.com')

  const studentPrefix = cleanId.split('@')[0]
  const isStudentRollFormat = STUDENT_ROLL_REGEX.test(studentPrefix)

  const handleAppendDomain = () => {
    const prefix = cleanId.includes('@') ? cleanId.split('@')[0] : cleanId
    if (prefix) {
      setIdentifier(`${prefix}@kristujayanti.com`)
      setErrorMessage('')
    }
  }

  const handleDemoLogin = (demoRole) => {
    setErrorMessage('')
    if (demoRole === 'teacher') {
      const demoTeacher = teachers[0] || {
        name: 'Prof. Chen Wei',
        email: 'chen.wei@kristujayanti.com',
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
        email: '24cpeb27@kristujayanti.com',
        student_id: '24CPEB27',
        department: 'Computer Science & Engineering',
        year: 'Year 1 (Freshman)',
        phone: '+91 98765 43210',
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
    setErrorMessage('')

    // 1. Explicit check: @gmail.com is strictly forbidden
    if (cleanId.includes('@gmail.com') || cleanId.endsWith('@gmail')) {
      setErrorMessage(
        'Login Blocked: @gmail.com accounts are not allowed. You must log in using your official @kristujayanti.com email address.'
      )
      return
    }

    // 2. Enforce @kristujayanti.com if an email is provided
    if (cleanId.includes('@') && !cleanId.endsWith('@kristujayanti.com')) {
      setErrorMessage(
        'Domain Restricted: Only institutional @kristujayanti.com accounts are permitted to log in.'
      )
      return
    }

    // 3. For students, enforce College Roll ID format (e.g. 24cpeb27@kristujayanti.com)
    if (role === 'student') {
      if (!isStudentRollFormat) {
        setErrorMessage(
          'Invalid Student Email: Students must sign in using their official College Registration ID (e.g. 24cpeb27@kristujayanti.com). Personal names like name@kristujayanti.com are not permitted.'
        )
        return
      }
    }

    // 4. Resolve final email
    const finalEmail = cleanId.includes('@') ? cleanId : `${cleanId}@kristujayanti.com`

    if (role === 'teacher') {
      const matchedTeacher = teachers.find(
        (t) => t.email.toLowerCase() === finalEmail || t.teacher_id.toLowerCase() === cleanId
      )
      updateUser({
        name: matchedTeacher?.name || (cleanId.startsWith('tch') ? 'Faculty Member' : cleanId.split('@')[0]),
        email: finalEmail,
        role: 'Teacher',
        teacher_id: matchedTeacher?.teacher_id || (cleanId.startsWith('tch') ? cleanId.toUpperCase() : 'TCH-101'),
        department: matchedTeacher?.department || 'Physics & Applied Sciences',
      })
      navigate('/teacher/dashboard')
    } else {
      const rollNumber = studentPrefix.toUpperCase()
      const matchedStudent = students.find(
        (s) => s.email.toLowerCase() === finalEmail || s.student_id.toLowerCase() === rollNumber.toLowerCase()
      )
      updateUser({
        name: matchedStudent?.name || `Student (${rollNumber})`,
        email: finalEmail,
        role: 'Student',
        student_id: matchedStudent?.student_id || rollNumber,
        department: matchedStudent?.department || 'Computer Science & Engineering',
      })
      navigate('/student/dashboard')
    }
  }

  const isTeacher = role === 'teacher'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12 font-sans text-slate-800">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-2.5 mb-8 group">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 ${isTeacher ? 'bg-emerald-700 shadow-emerald-200' : 'bg-indigo-600 shadow-indigo-200'}`}>
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
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-200'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
            }`}
          >
            <ShieldAlert size={16} /> Teacher Portal
          </button>
        </div>

        {/* Title & Context */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${isTeacher ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
              {isTeacher ? 'Teacher / Faculty Access' : 'Student Access'}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isTeacher ? 'Faculty Console Login' : 'Student Study Hub Login'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isTeacher
              ? 'Enter your official @kristujayanti.com faculty email address.'
              : 'Enter your College Registration Email ID (e.g. 24cpeb27@kristujayanti.com). Names are not accepted.'}
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5 animate-bounce shadow-sm">
            <span className="text-base">🚫</span>
            <div>
              <strong className="block text-rose-900">Access Denied</strong>
              <span className="text-rose-700 font-normal">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {isTeacher ? 'Faculty Email ID' : 'College Roll Email ID (e.g. 24cpeb27@kristujayanti.com)'}
              </label>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                {isTeacher ? '@kristujayanti.com' : 'Roll No Format'}
              </span>
            </div>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value)
                  setErrorMessage('')
                }}
                placeholder={isTeacher ? 'e.g. chen.wei@kristujayanti.com' : 'e.g. 24cpeb27@kristujayanti.com'}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  isGmail || hasInvalidOtherDomain || (!isTeacher && cleanId.length > 3 && !isStudentRollFormat)
                    ? 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/20'
                    : isAllowedDomain && (isTeacher || isStudentRollFormat)
                    ? 'border-emerald-400 focus:border-emerald-600 focus:ring-emerald-500/20 bg-emerald-50/20'
                    : isTeacher
                    ? 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/20'
                }`}
                required
              />
            </div>

            {/* Dynamic Live Domain & Roll Feedback */}
            <div className="mt-1.5 space-y-1">
              {isGmail && (
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center gap-1.5">
                  <span>❌</span>
                  <span><strong>@gmail.com is not allowed!</strong> Please use your college email ID.</span>
                </div>
              )}

              {!isGmail && hasInvalidOtherDomain && (
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold flex items-center justify-between gap-1.5">
                  <span>⚠️ Only <strong>@kristujayanti.com</strong> domain is permitted.</span>
                  <button
                    type="button"
                    onClick={handleAppendDomain}
                    className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-300 text-[10px] font-bold hover:bg-emerald-50"
                  >
                    Use @kristujayanti.com
                  </button>
                </div>
              )}

              {!isTeacher && cleanId.length > 2 && !isStudentRollFormat && !isGmail && (
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center gap-1.5">
                  <span>❌</span>
                  <span>
                    Must be in College Roll format (e.g. <strong>24cpeb27@kristujayanti.com</strong>). Names are not permitted.
                  </span>
                </div>
              )}

              {isAllowedDomain && (isTeacher || isStudentRollFormat) && (
                <div className="p-1.5 px-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5">
                  <span>✅</span>
                  <span>Verified {isTeacher ? 'Faculty' : 'Student Roll'} account: {cleanId}</span>
                </div>
              )}
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
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  isTeacher ? 'focus:ring-emerald-500/20 focus:border-emerald-600' : 'focus:ring-indigo-500/20 focus:border-indigo-600'
                }`}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGmail}
            className={`w-full text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2 ${
              isGmail
                ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
                : isTeacher
                ? 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-200'
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
            Instant Demo Access: {isTeacher ? 'Prof. Chen Wei (chen.wei@kristujayanti.com)' : 'Student User (student@kristujayanti.com)'}
          </button>
        </div>

        {/* Sign Up Redirect */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Don&apos;t have an account yet?{' '}
          <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-800">
            Register with @kristujayanti.com
          </Link>
        </p>
      </div>

      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 mt-6 font-medium">
        <ArrowLeft size={13} /> Return to homepage
      </Link>
    </div>
  )
}
