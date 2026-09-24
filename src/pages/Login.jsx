import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { GraduationCap, Shield, ArrowLeft, Sparkles, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useUser } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams()
  const roleParam = searchParams.get('role')

  const [role, setRole] = useState(roleParam === 'teacher' ? 'teacher' : 'student')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
        '@gmail.com accounts are not allowed. You must sign in with your official @kristujayanti.com account.'
      )
      return
    }

    // 2. Enforce @kristujayanti.com if an email is provided
    if (cleanId.includes('@') && !cleanId.endsWith('@kristujayanti.com')) {
      setErrorMessage(
        'Only institutional @kristujayanti.com accounts are permitted to sign in.'
      )
      return
    }

    // 3. For students, enforce College Roll ID format (e.g. 24cpeb27@kristujayanti.com)
    if (role === 'student') {
      if (!isStudentRollFormat) {
        setErrorMessage(
          'Students must sign in using their College Roll ID (e.g. 24cpeb27@kristujayanti.com). Personal names are not accepted.'
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
  const isInputInvalid = isGmail || hasInvalidOtherDomain || (!isTeacher && cleanId.length > 3 && !isStudentRollFormat)
  const isInputValid = isAllowedDomain && (isTeacher || isStudentRollFormat)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Brand Logo & Name */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 ${
              isTeacher ? 'bg-emerald-700 shadow-emerald-200' : 'bg-indigo-600 shadow-indigo-200'
            }`}
          >
            {isTeacher ? <Shield size={20} /> : <GraduationCap size={20} />}
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-serif">ClassVault</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-3xl sm:px-8 border border-slate-200/70">
          
          {/* Segmented Role Switcher */}
          <div className="flex bg-slate-100/90 p-1 rounded-2xl mb-6 border border-slate-200/50">
            <button
              type="button"
              onClick={() => handleRoleTabChange('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                !isTeacher
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap size={15} />
              <span>Student Portal</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('teacher')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                isTeacher
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield size={15} />
              <span>Teacher Portal</span>
            </button>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {isTeacher ? 'Faculty Portal Sign In' : 'Student Portal Sign In'}
            </h1>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {isTeacher
                ? 'Sign in with your official Kristu Jayanti faculty email.'
                : 'Sign in with your official College Roll ID (e.g. 24cpeb27@kristujayanti.com).'}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <span className="font-semibold block mb-0.5">Authentication Error</span>
                <span className="text-rose-700">{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  {isTeacher ? 'Faculty Email' : 'College Roll Email'}
                </label>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  @kristujayanti.com
                </span>
              </div>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value)
                    setErrorMessage('')
                  }}
                  placeholder={isTeacher ? 'chen.wei@kristujayanti.com' : '24cpeb27@kristujayanti.com'}
                  className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white rounded-xl border transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    isInputInvalid
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100 bg-rose-50/20'
                      : isInputValid
                      ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-100 bg-emerald-50/20'
                      : isTeacher
                      ? 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                  }`}
                  required
                />
              </div>

              {/* Dynamic Live Feedback */}
              <div className="mt-1.5 space-y-1">
                {isGmail && (
                  <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-rose-600 shrink-0" />
                    <span>@gmail.com accounts are not allowed. Please use your college email.</span>
                  </div>
                )}

                {!isGmail && hasInvalidOtherDomain && (
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium flex items-center justify-between gap-1.5">
                    <span>Only @kristujayanti.com domain is permitted.</span>
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
                  <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-rose-600 shrink-0" />
                    <span>Students must use Roll ID format (e.g. 24cpeb27@kristujayanti.com).</span>
                  </div>
                )}

                {isInputValid && (
                  <div className="p-1.5 px-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                    <span>Verified {isTeacher ? 'Faculty' : 'Student Roll'} ID: {cleanId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Demo mode: you can enter any password (e.g. password123)')
                  }}
                  className="text-[11px] text-slate-400 hover:text-slate-600 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    isTeacher
                      ? 'focus:border-emerald-600 focus:ring-emerald-100'
                      : 'focus:border-indigo-600 focus:ring-indigo-100'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGmail || (!isTeacher && cleanId.length > 2 && !isStudentRollFormat)}
              className={`w-full text-white text-xs sm:text-sm font-semibold py-2.5 rounded-xl transition-all shadow-sm mt-3 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] ${
                isGmail || (!isTeacher && cleanId.length > 2 && !isStudentRollFormat)
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
                  : isTeacher
                  ? 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
              }`}
            >
              Sign In
            </button>
          </form>

          {/* Quick Demo Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
              <span className="bg-white px-2.5 text-slate-400 font-semibold">Demo Access</span>
            </div>
          </div>

          {/* 1-Click Fast Demo Login Pill */}
          <button
            type="button"
            onClick={() => handleDemoLogin(role)}
            className={`w-full py-2 px-3 rounded-xl text-xs font-medium transition-all border flex items-center justify-center gap-2 ${
              isTeacher
                ? 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200/80 text-emerald-800'
                : 'bg-indigo-50/70 hover:bg-indigo-100/70 border-indigo-200/80 text-indigo-700'
            }`}
          >
            <Sparkles size={13} className="shrink-0" />
            <span>
              1-Click Demo: <strong>{isTeacher ? 'Prof. Chen Wei' : '24cpeb27@kristujayanti.com'}</strong>
            </span>
          </button>

          {/* Sign Up Redirect */}
          <p className="text-center text-xs text-slate-500 mt-5">
            Don&apos;t have an account yet?{' '}
            <Link
              to={`/signup?role=${role}`}
              className={`font-semibold hover:underline ${isTeacher ? 'text-emerald-700' : 'text-indigo-600'}`}
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Back to Homepage */}
        <div className="text-center mt-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors"
          >
            <ArrowLeft size={13} /> Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
