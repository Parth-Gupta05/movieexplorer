'use client'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import Toast from '@/components/Toast' // Assuming Toast component is defined

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)
  const [toast, setToast] = useState<{ message: string; type?: 'error' | 'success' } | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This block is mostly for the older NextAuth workaround, but we keep the local state logic.
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      ;(window as any).registeredUsers = JSON.stringify(users)
    }
    // Check for locally stored user (for display/logout logic)
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setToast(null); // Clear previous toast

    // 1. Get the users array from localStorage (Browser)
    const storedUsers = localStorage.getItem('registeredUsers') || '[]';
    
    // 2. Pass the email, password, AND the storedUsers JSON string to the server
    const res = await signIn('credentials', { 
        redirect: false, 
        email, 
        password,
        users: storedUsers, // Custom credential parameter
    });
    
    // 3. Handle response
    if (res?.ok) {
        // 🚀 LOGIN SUCCESS LOGIC ADDED HERE
        const userData = { email: email } // Only store necessary user info
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        setToast({ message: 'Login successful! Redirecting...', type: 'success' })
        
        // Delay redirect slightly to allow toast to show
        setTimeout(() => {
          router.push('/movies')
        }, 1000); 

    } else {
        // Error logic (already present)
        setToast({ message: 'Invalid email or password', type: 'error' });
    }
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <User className="w-16 h-16 mb-4 text-slate-700" />
        <h2 className="text-xl font-semibold">Welcome, {user.email}</h2>
        <button
          onClick={() => {
            // ... logout logic
            localStorage.removeItem('user')
            setUser(null)
            setToast({ message: 'Logged out successfully', type: 'success' })
          }}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded"
        >
          Logout
        </button>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded w-full">
          <User className="w-5 h-5" /> Login
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-blue-600 underline">
          Register here
        </a>
      </p>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}