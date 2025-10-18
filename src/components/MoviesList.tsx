'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import MovieCard from './MovieCard'
import { fetchPopular, searchMovies } from '../lib/tmdb'

interface MoviesListProps {
  searchQuery: string
}

// Skeleton while loading
const MovieGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="h-64 bg-slate-700 rounded animate-pulse"></div>
    ))}
  </div>
)

export default function MoviesList({ searchQuery }: MoviesListProps) {
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [lastQuery, setLastQuery] = useState('')
  const loaderRef = useRef<HTMLDivElement>(null)

  const loadMovies = useCallback(
    async (reset = false) => {
      if (loading || !hasMore) return
      setLoading(true)

      try {
        const currentPage = reset ? 1 : page
        const data = searchQuery
          ? await searchMovies(searchQuery)
          : await fetchPopular(currentPage)

        const newMovies = data.results || []

        if (reset) setMovies([]) // Clear only after fetching new results

        setMovies(prev =>
          reset || searchQuery ? newMovies : [...prev, ...newMovies]
        )

        if (!searchQuery) setPage(prev => prev + 1)

        if (newMovies.length === 0 || (!searchQuery && currentPage >= data.total_pages)) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
      } catch (err) {
        console.error('❌ Failed to fetch movies:', err)
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    },
    [loading, hasMore, page, searchQuery]
  )

  // ✅ Load movies on mount or when searchQuery changes
  useEffect(() => {
    if (searchQuery !== lastQuery) {
      setLastQuery(searchQuery)
      loadMovies(true) // Reset only after new results fetched
    }
  }, [searchQuery, lastQuery, loadMovies])

  // ✅ Infinite scroll for popular movies
  useEffect(() => {
    if (!loaderRef.current || searchQuery) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) loadMovies()
      },
      { threshold: 0.1 }
    )

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [loading, hasMore, loadMovies, searchQuery])

  return (
    <section className="relative">
      <div className="px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      <div ref={loaderRef} className="mt-6 text-center p-8 text-slate-500">
        {loading && <MovieGridSkeleton />}
        {!loading && !hasMore && !searchQuery && (
          <p className="text-slate-400">End of results.</p>
        )}
      </div>
    </section>
  )
}
