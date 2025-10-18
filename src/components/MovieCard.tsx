'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { posterUrl } from '../lib/tmdb'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  movie: any
}

export default function MovieCard({ movie }: Props) {
  const [isFav, setIsFav] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

// ✅ Sync favorite state — tied to logged-in user
useEffect(() => {
  if (typeof window === 'undefined') return

  const userStr = localStorage.getItem('user')
  if (!userStr) {
    setIsFav(false)
    return
  }

  try {
    const { email } = JSON.parse(userStr)
    const stored = localStorage.getItem('favs')
    if (stored) {
      const arr = JSON.parse(stored)
      const userFavs = arr.filter((m: any) => m.email === email)
      setIsFav(userFavs.some((m: any) => m.id === movie.id))
    } else {
      setIsFav(false)
    }
  } catch (e) {
    console.error('Error checking favorites:', e)
    setIsFav(false)
  }
}, [movie.id])


  // ✅ Toggle Favorite
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (typeof window === 'undefined') return
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      toast.warn('Please log in to add favorites.')
      return
    }

    const stored = localStorage.getItem('favs')
    let arr = []
    try {
      arr = stored ? JSON.parse(stored) : []
    } catch {
      arr = []
    }

    if (isFav) {
      arr = arr.filter((m: any) => m.id !== movie.id)
      setIsFav(false)
      toast.info('Removed from favorites.')
    } else {
      arr.push({ ...movie, email: JSON.parse(userStr).email })
      setIsFav(true)
      toast.success('Added to favorites!')
    }

    localStorage.setItem('favs', JSON.stringify(arr))
  }

  return (
    <article className="bg-white dark:bg-slate-800 shadow rounded overflow-hidden relative group">
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative h-64 w-full">
          {/* ✅ Grey Skeleton Placeholder */}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          )}

          {/* ✅ Image + Fallback Handling */}
          {!imgError ? (
            <Image
              src={posterUrl(movie.poster_path)}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-opacity duration-500 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                setImgError(true)
                setImgLoaded(true)
              }}
            />
          ) : (
            // ✅ Centered Fallback Text
            <div className="absolute inset-0 flex items-center justify-center text-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium p-2">
              {movie.title}
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-lg">{movie.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ⭐ {movie.vote_average} • {movie.release_date}
          </p>
        </div>
      </Link>

      {/* ✅ Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
          isFav
            ? 'bg-red-500 text-white shadow-lg scale-110'
            : 'bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-red-500 hover:scale-110'
        }`}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFav ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
    </article>
  )
}
