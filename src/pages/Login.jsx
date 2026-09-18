import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Library } from 'lucide-react'
import { useUser } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-vault-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-full bg-vault-blue flex items-center justify-center">
          <Library size={18} className="text-white" />
        </div>
        <span className="font-semibold text-xl text-vault-navy">ClassVault</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
        <h1 className="text-2xl font-serif font-semibold text-center text-vault-navy">Welcome back</h1>
        <p className="text-center text-sm text-gray-400 mt-1.5 mb-8">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-vault-blue font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-vault-navy mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email id"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-vault-navy">Password</label>
              <a href="#" className="text-sm text-vault-blue hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-vault-blue text-white font-medium py-3 rounded-xl hover:bg-vault-blue-dark transition-colors"
          >
            Log in to ClassVault
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-vault-navy hover:bg-gray-50">
            <span className="font-semibold">G</span> Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-vault-navy hover:bg-gray-50">
            <span className="font-semibold">M</span> Microsoft
          </button>
        </div>
      </div>

      <Link to="/" className="text-sm text-gray-400 hover:text-vault-navy mt-8">
        ← Back to home
      </Link>
    </div>
  )
}
