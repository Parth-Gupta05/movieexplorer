'use client'
import { useState, useEffect } from 'react'
import { XCircle } from 'lucide-react'

export default function Toast({
  message,
  type = 'error',
  onClose,
}: {
  message: string
  type?: 'error' | 'success'
  onClose: () => void
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  if (!visible) return null

  return (
    <div
      className={`fixed top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-white transition-all duration-300 ${
        type === 'error' ? 'bg-red-600' : 'bg-green-600'
      }`}
    >
      <XCircle size={20} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}
