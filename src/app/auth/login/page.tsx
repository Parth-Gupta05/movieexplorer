'use client'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import Toast from '@/components/Toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)
  const [toast, setToast] = useState<{ message: string; type?: 'error' | 'success' } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setToast(null)

    const storedUsers = localStorage.getItem('registeredUsers') || '[]'

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      users: storedUsers,
    })

    if (res?.ok) {
      const userData = { email }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      setToast({ message: 'Login successful! Redirecting...', type: 'success' })

      setTimeout(() => {
        router.push('/movies')
      }, 1000)
    } else {
      setToast({ message: 'Invalid email or password', type: 'error' })
    }
  }

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4">
        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
          <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">
            Welcome, {user.email}
          </h2>
          <button
            onClick={() => {
              localStorage.removeItem('user')
              setUser(null)
              setToast({ message: 'Logged out successfully', type: 'success' })
            }}
            className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-10 w-full max-w-md">
        <div className="text-center mb-6">
          <User className="w-12 h-12 mx-auto mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Login</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            <User className="w-5 h-5" /> Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
