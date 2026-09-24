import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  ShieldAlert,
  Building2,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react'
import { useUser } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'

const ALLOWED_DOMAIN = '@kristujayanti.com'

export default function Signup() {
  const [role, setRole] = useState('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('Computer Science & Engineering')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const { signup } = useUser()
  const { registerMember } = useData()
  const navigate = useNavigate()

  const isTeacher = role === 'teacher'

  const STUDENT_ROLL_REGEX = /^[0-9]{2}[a-z]{2,8}[0-9]{1,5}$/i

  // Validate email domain in real time
  const trimmedEmail = email.trim().toLowerCase()
  const hasInput = trimmedEmail.length > 0
  const isGmail = trimmedEmail.includes('@gmail.com') || trimmedEmail.endsWith('@gmail')
  const emailPrefix = trimmedEmail.split('@')[0]
  const isAllowedDomain = trimmedEmail.endsWith(ALLOWED_DOMAIN) && emailPrefix.length > 0
  const hasInvalidOtherDomain =
    hasInput &&
    trimmedEmail.includes('@') &&
    !trimmedEmail.endsWith(ALLOWED_DOMAIN)

  const isStudentRollFormat = STUDENT_ROLL_REGEX.test(emailPrefix)

  const handleAppendDomain = () => {
    const prefix = trimmedEmail.includes('@') ? trimmedEmail.split('@')[0] : trimmedEmail
    if (prefix) {
      setEmail(`${prefix}@kristujayanti.com`)
      setErrorMessage('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    const cleanEmail = email.trim().toLowerCase()

    // 1. Explicit check against @gmail.com
    if (cleanEmail.includes('@gmail.com') || cleanEmail.endsWith('@gmail')) {
      setErrorMessage(
        'Registration Blocked: Accounts cannot be created with @gmail.com. You must use your official @kristujayanti.com email address.'
      )
      return
    }

    // 2. Enforce only @kristujayanti.com
    if (!cleanEmail.endsWith(ALLOWED_DOMAIN)) {
      setErrorMessage(
        'Domain Restricted: Only institutional emails ending in @kristujayanti.com are allowed to register.'
      )
      return
    }

    const cleanPrefix = cleanEmail.split('@')[0]
    if (!cleanPrefix || cleanPrefix.length < 2) {
      setErrorMessage('Please provide a valid username before @kristujayanti.com.')
      return
    }

    // 3. For students, enforce College Roll ID format (e.g. 24cpeb27@kristujayanti.com)
    if (!isTeacher) {
      if (!STUDENT_ROLL_REGEX.test(cleanPrefix)) {
        setErrorMessage(
          'Invalid Student Email: Students must register using their official College Registration ID format (e.g. 24cpeb27@kristujayanti.com). Personal names like name@kristujayanti.com are not permitted.'
        )
        return
      }
    }

    const formattedRole = isTeacher ? 'Teacher' : 'Student'
    const studentId = !isTeacher ? cleanPrefix.toUpperCase() : ''
    const teacherId = isTeacher ? `TCH-${Math.floor(100 + Math.random() * 900)}` : ''

    // Register user in AuthContext
    signup({
      name: name.trim() || (!isTeacher ? `Student (${studentId})` : 'Faculty Instructor'),
      email: cleanEmail,
      role: formattedRole,
      department: department.trim() || (isTeacher ? 'Physics & Applied Sciences' : 'Computer Science & Engineering'),
      student_id: studentId,
      teacher_id: teacherId,
    })

    // Register user in DataContext database
    if (registerMember) {
      registerMember({
        name: name.trim() || (!isTeacher ? `Student (${studentId})` : 'Faculty Instructor'),
        email: cleanEmail,
        role: formattedRole,
        department: department.trim() || (isTeacher ? 'Physics & Applied Sciences' : 'Computer Science & Engineering'),
        student_id: studentId,
        teacher_id: teacherId,
      })
    }

    setSuccessMessage(`Account registered successfully with ${cleanEmail}! Redirecting...`)

    setTimeout(() => {
      if (isTeacher) {
        navigate('/teacher/dashboard')
      } else {
        navigate('/student/dashboard')
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      {/* Left Institutional Branding Panel */}
      <div
        className={`md:w-5/12 p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden transition-colors duration-300 ${
          isTeacher
            ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900'
            : 'bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900'
        }`}
      >
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-xl" />
        <div className="absolute -left-12 bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none blur-xl" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
              {isTeacher ? <ShieldAlert size={22} /> : <GraduationCap size={22} />}
            </div>
            <div>
              <span className="font-black text-xl tracking-tight block leading-tight">
                ClassVault
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">
                Academic Management Suite
              </span>
            </div>
          </Link>

          <div className="mt-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-4 text-emerald-200">
              <Building2 size={13} /> Kristu Jayanti College (Autonomous)
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Official Campus<br />Registration Portal
            </h1>
            <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-md">
              Create your verified academic account to access university lecture vaults, course cohorts, real-time gradebooks, and assignment evaluation pipelines.
            </p>
          </div>
        </div>

        {/* Institutional Domain Restriction Card */}
        <div className="relative z-10 my-8 bg-black/25 backdrop-blur-md p-5 rounded-2xl border border-white/15">
          <div className="flex items-start gap-3">
            <ShieldCheck size={22} className="text-emerald-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Strict Institutional Domain Security
              </h4>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                Registration is restricted <strong>only to verified @kristujayanti.com</strong> email addresses.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold">
                  ✓ @kristujayanti.com allowed
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-200 border border-rose-400/30 text-[10px] font-bold">
                  ✕ @gmail.com blocked
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-white/60">
          <p>© 2026 Kristu Jayanti College & ClassVault. All rights reserved.</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="md:w-7/12 p-6 sm:p-10 md:p-12 flex flex-col justify-center max-w-xl mx-auto w-full">
        <div>
          {/* Role Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                setRole('student')
                setDepartment('Computer Science & Engineering')
                setErrorMessage('')
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !isTeacher
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap size={16} /> Student Registration
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('teacher')
                setDepartment('Physics & Applied Sciences')
                setErrorMessage('')
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isTeacher
                  ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldAlert size={16} /> Faculty / Teacher Registration
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isTeacher
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}
              >
                {isTeacher ? 'Faculty Portal Registration' : 'Student Study Hub Registration'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Create Your Academic Account
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Already registered with your @kristujayanti.com email?{' '}
              <Link
                to={isTeacher ? '/login?role=teacher' : '/login?role=student'}
                className={`font-bold hover:underline ${
                  isTeacher ? 'text-emerald-700' : 'text-indigo-600'
                }`}
              >
                Log in here
              </Link>
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Explicit Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5 animate-bounce shadow-sm">
              <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block">Registration Restricted</strong>
                <span className="text-rose-700 font-normal">{errorMessage}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    isTeacher
                      ? 'focus:ring-emerald-500/20 focus:border-emerald-600'
                      : 'focus:ring-indigo-500/20 focus:border-indigo-600'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Email with Strict @kristujayanti.com Validation */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {isTeacher ? 'Institutional Faculty Email' : 'College Roll Email ID (e.g. 24cpeb27@kristujayanti.com)'}
                </label>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  {isTeacher ? '@kristujayanti.com' : 'Roll No Format'}
                </span>
              </div>

              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrorMessage('')
                  }}
                  placeholder={isTeacher ? 'e.g. chen.wei@kristujayanti.com' : 'e.g. 24cpeb27@kristujayanti.com'}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    isGmail || hasInvalidOtherDomain || (!isTeacher && trimmedEmail.length > 3 && !isStudentRollFormat)
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

              {/* Dynamic Live Domain Feedback */}
              <div className="mt-1.5 space-y-1">
                {isGmail && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center gap-2">
                    <AlertCircle size={14} className="text-rose-600 shrink-0" />
                    <span>
                      <strong>@gmail.com is not allowed!</strong> Please register with your college email ending in <strong>@kristujayanti.com</strong>.
                    </span>
                  </div>
                )}

                {!isGmail && hasInvalidOtherDomain && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-amber-600 shrink-0" />
                      <span>Only <strong>@kristujayanti.com</strong> domain is permitted.</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAppendDomain}
                      className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-300 text-[10px] font-bold hover:bg-emerald-50"
                    >
                      Use @kristujayanti.com
                    </button>
                  </div>
                )}

                {!isTeacher && trimmedEmail.length > 2 && !isStudentRollFormat && !isGmail && (
                  <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-rose-600 shrink-0" />
                    <span>
                      Students must register using their Roll ID format (e.g. <strong>24cpeb27@kristujayanti.com</strong>). Names are not permitted.
                    </span>
                  </div>
                )}

                {isAllowedDomain && (isTeacher || isStudentRollFormat) && (
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                    <span>Verified {isTeacher ? 'Faculty' : 'Student Roll'} account: {trimmedEmail}</span>
                  </div>
                )}

                {!hasInput && (
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{isTeacher ? 'e.g. faculty.name@kristujayanti.com' : 'e.g. 24cpeb27@kristujayanti.com'}</span>
                    <button
                      type="button"
                      onClick={() => setEmail(isTeacher ? 'chen.wei@kristujayanti.com' : '24cpeb27@kristujayanti.com')}
                      className="text-[10px] text-indigo-600 hover:underline font-semibold"
                    >
                      Fill sample {isTeacher ? 'faculty' : 'student roll'} ID
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Department / Program
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                  isTeacher
                    ? 'focus:ring-emerald-500/20 focus:border-emerald-600'
                    : 'focus:ring-indigo-500/20 focus:border-indigo-600'
                }`}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Computer Applications (MCA/BCA)">Computer Applications (MCA/BCA)</option>
                <option value="Data Science & Artificial Intelligence">Data Science & Artificial Intelligence</option>
                <option value="Physics & Applied Sciences">Physics & Applied Sciences</option>
                <option value="Mathematics & Statistics">Mathematics & Statistics</option>
                <option value="Management Studies">Management Studies</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  minLength={6}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    isTeacher
                      ? 'focus:ring-emerald-500/20 focus:border-emerald-600'
                      : 'focus:ring-indigo-500/20 focus:border-indigo-600'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGmail || (!isTeacher && trimmedEmail.length > 2 && !isStudentRollFormat)}
              className={`w-full text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md mt-4 flex items-center justify-center gap-2 ${
                isGmail || (!isTeacher && trimmedEmail.length > 2 && !isStudentRollFormat)
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
                  : isTeacher
                  ? 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
              }`}
            >
              {isTeacher ? <ShieldAlert size={15} /> : <GraduationCap size={15} />}
              Register as {isTeacher ? 'Faculty Member' : 'Student'} & Enter Portal
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Quick fill @kristujayanti.com:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setName('Student User')
                  setEmail('24cpeb27@kristujayanti.com')
                  setPassword('password123')
                  setRole('student')
                  setErrorMessage('')
                }}
                className="text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200"
              >
                Sample Student (24cpeb27)
              </button>
              <button
                type="button"
                onClick={() => {
                  setName('Dr. Priya Nair')
                  setEmail('priya.nair@kristujayanti.com')
                  setPassword('password123')
                  setRole('teacher')
                  setErrorMessage('')
                }}
                className="text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200"
              >
                Sample Teacher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
