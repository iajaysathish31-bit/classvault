import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Library, GraduationCap, Presentation, Building2 } from 'lucide-react'
import { useUser } from '../context/AuthContext.jsx'

const stats = [
  { value: '12,400+', label: 'Active students' },
  { value: '980+', label: 'Educators on board' },
  { value: '48,000+', label: 'Resources shared' },
]

export default function Signup() {
  const [role, setRole] = useState('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('Computer Science & Engineering')
  const { signup } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1)
    signup({
      name: name.trim() || (formattedRole === 'Teacher' ? 'Faculty Instructor' : 'Student User'),
      email: email.trim() || `${role}@university.edu`,
      role: formattedRole,
      department: department.trim() || (formattedRole === 'Teacher' ? 'Physics & Applied Sciences' : 'Computer Science & Engineering'),
    })
    if (formattedRole === 'Teacher') {
      navigate('/teacher/dashboard')
    } else {
      navigate('/student/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel */}
      <div className="relative bg-vault-blue text-white md:w-1/2 px-8 md:px-16 py-12 flex flex-col justify-between overflow-hidden">
        <div className="absolute -right-10 top-1/3 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-24 bottom-16 w-24 h-24 rounded-full bg-white/10" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Library size={18} />
          </div>
          <span className="font-semibold text-lg">ClassVault</span>
        </div>

        <div className="relative z-10 my-16 md:my-0">
          <h1 className="text-4xl font-serif font-semibold leading-tight mb-4">
            Your class,<br />your vault.
          </h1>
          <p className="text-white/80 max-w-sm leading-relaxed">
            Join thousands of students and teachers who keep their class
            materials organized, accessible, and shareable.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-xl font-semibold">{s.value}</span>
              <span className="text-white/70 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="md:w-1/2 bg-vault-bg px-8 md:px-16 py-12 flex flex-col justify-center">
        <div className="max-w-sm w-full mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-vault-navy">Create your account</h2>
          <p className="text-sm text-gray-400 mt-1.5 mb-6">
            Already have one?{' '}
            <Link to="/login" className="text-vault-blue font-medium hover:underline">
              Log in
            </Link>
          </p>

          <div className="grid grid-cols-2 gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setRole('student')
                setDepartment('Computer Science & Engineering')
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                role === 'student' ? 'bg-white text-vault-blue shadow-sm' : 'text-gray-500'
              }`}
            >
              <GraduationCap size={16} /> Student
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('teacher')
                setDepartment('Physics & Applied Sciences')
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                role === 'teacher' ? 'bg-white text-vault-blue shadow-sm' : 'text-gray-500'
              }`}
            >
              <Presentation size={16} /> Teacher / Faculty
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (name)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (email)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email id"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department (department)</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Physics & Applied Sciences"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password (password)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-vault-blue text-white text-xs font-bold py-3 rounded-xl hover:bg-vault-blue-dark transition-colors mt-2"
            >
              Register Account & Enter Portal
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-5">
            By signing up, you agree to the ClassVault Academic Policy and Terms of Service.
          </p>
        </div>
      </div>
    </div>
  )
}
