'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    // Get or initialize registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')

    if (users.find((u: any) => u.email === email)) {
      alert('User already exists!')
      return
    }

    // Save new user
    users.push({ email, password })
    localStorage.setItem('registeredUsers', JSON.stringify(users))

    // For NextAuth (mock global store)
    if (typeof window !== 'undefined') {
      ;(window as any).registeredUsers = JSON.stringify(users)
    }

    alert('Registration successful! Please login.')
    router.push('/auth/login')
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-3">
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
        <button className="px-4 py-2 bg-green-700 text-white rounded w-full">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <a href="/auth/login" className="text-blue-600 underline">
          Login here
        </a>
      </p>
    </div>
  )
}
