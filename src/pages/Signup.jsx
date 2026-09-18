import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Library, GraduationCap, Presentation } from 'lucide-react'
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
  const { signup } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup({
      name: name.trim() || 'Student User',
      email: email.trim() || 'student@university.edu',
      role: role.charAt(0).toUpperCase() + role.slice(1),
    })
    navigate('/dashboard')
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
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-xl font-serif font-semibold">{s.value}</span>
              <span className="text-sm text-white/70">{s.label}</span>
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
              onClick={() => setRole('student')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                role === 'student' ? 'bg-white text-vault-blue shadow-sm' : 'text-gray-500'
              }`}
            >
              <GraduationCap size={16} /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                role === 'teacher' ? 'bg-white text-vault-blue shadow-sm' : 'text-gray-500'
              }`}
            >
              <Presentation size={16} /> Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-vault-navy mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vault-navy mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email id"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vault-navy mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-vault-blue text-white font-medium py-3 rounded-xl hover:bg-vault-blue-dark transition-colors"
            >
              Sign up as {role}
            </button>

            <p className="text-xs text-center text-gray-400">
              By signing up, you agree to our{' '}
              <a href="#" className="underline">Terms of Service</a> and{' '}
              <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
