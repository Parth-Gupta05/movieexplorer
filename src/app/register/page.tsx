'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import Toast from '@/components/Toast' // optional toast component

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState<{ message: string; type?: 'error' | 'success' } | null>(null)
  const router = useRouter()

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')

    if (users.find((u: any) => u.email === email)) {
      setToast({ message: 'User already exists!', type: 'error' })
      return
    }

    users.push({ email, password })
    localStorage.setItem('registeredUsers', JSON.stringify(users))
    if (typeof window !== 'undefined') {
      ;(window as any).registeredUsers = JSON.stringify(users)
    }

    setToast({ message: 'Registration successful! Redirecting to login...', type: 'success' })
    setTimeout(() => router.push('/auth/login'), 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-10 w-full max-w-md">
        <div className="text-center mb-6">
          <User className="w-12 h-12 mx-auto mb-2 text-green-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Register</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
