'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import { Lock, Mail, Loader, AlertCircle, Zap } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAdmin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        router.push('/admin/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="backdrop-blur-xl bg-slate-900/70 border border-cyan-400/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Ghostwire Admin</h1>
            <p className="text-gray-400">Control Center</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ghostwire.com"
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-sm text-gray-500">
              Admin access only. Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Demo Credentials:</p>
          <p>Email: amann.khann172@gmail.com</p>
          <p>Password: kH@rIz</p>
        </div>
      </div>
    </div>
  )
}
