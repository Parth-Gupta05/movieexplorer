'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

type Movie = {
  id: number
  title: string
  poster_path?: string
  vote_average?: number
  [key: string]: any
}

export default function FavoriteButton({ movie }: { movie: Movie }) {
  const [isFav, setIsFav] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  // Load user email once
  useEffect(() => {
    if (typeof window === 'undefined') return
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const parsed = JSON.parse(user)
        setUserEmail(parsed.email)
      } catch {
        setUserEmail(null)
      }
    }
  }, [])

  // Check favorites whenever movie or user changes
  const checkFav = () => {
    if (!userEmail) return
    const stored = localStorage.getItem('favs')
    if (stored) {
      try {
        const arr: (Movie & { email: string })[] = JSON.parse(stored)
        const exists = arr.some(m => m.id === movie.id && m.email === userEmail)
        setIsFav(exists)
      } catch {
        setIsFav(false)
      }
    } else {
      setIsFav(false)
    }
  }

  useEffect(checkFav, [movie.id, userEmail])

  // Sync across tabs/components
  useEffect(() => {
    const listener = () => checkFav()
    window.addEventListener('storage', listener)
    return () => window.removeEventListener('storage', listener)
  }, [movie.id, userEmail])

  const toggleFav = () => {
    if (!userEmail) {
      toast.warn('Please log in to add favorites!')
      return
    }

    let arr: (Movie & { email: string })[] = []
    try {
      const stored = localStorage.getItem('favs')
      arr = stored ? JSON.parse(stored) : []
    } catch {
      arr = []
    }

    if (isFav) {
      arr = arr.filter(m => !(m.id === movie.id && m.email === userEmail))
      setIsFav(false)
      toast.info('Removed from favorites')
    } else {
      arr.push({ ...movie, email: userEmail })
      setIsFav(true)
      toast.success('Added to favorites')
    }

    localStorage.setItem('favs', JSON.stringify(arr))
    // Manually trigger storage for same tab
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <button
      onClick={toggleFav}
      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
        isFav
          ? 'bg-red-500 hover:bg-red-600 text-white border-2 border-red-500 hover:border-red-600'
          : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600'
      }`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="text-lg">{isFav ? '★' : '☆'}</span>
      <span>{isFav ? 'Remove Favorite' : 'Add to Favorites'}</span>
    </button>
  )
}
