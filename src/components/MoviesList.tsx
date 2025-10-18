'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import MovieCard from './MovieCard'
import { fetchPopular, searchMovies } from '../lib/tmdb'

// Skeleton while loading
const MovieGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="h-64 bg-slate-700 rounded animate-pulse"></div>
    ))}
  </div>
)

export default function MoviesList() {
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)

  // ✅ Fetch movies (either popular or search results)
  const loadMovies = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const data = isSearching
        ? await searchMovies(query)
        : await fetchPopular(page)
      const newMovies = data.results || []

      if (newMovies.length === 0 || (!isSearching && page >= data.total_pages)) {
        setHasMore(false)
      } else {
        setMovies(prev =>
          isSearching || page === 1 ? newMovies : [...prev, ...newMovies]
        )
        if (!isSearching) setPage(prev => prev + 1)
      }
    } catch (err) {
      console.error('❌ Failed to fetch movies:', err)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page, query, isSearching])

  // ✅ Infinite scroll (only for popular movies)
  useEffect(() => {
    if (!loaderRef.current || isSearching) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) loadMovies()
      },
      { threshold: 0.1 }
    )

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [loading, hasMore, loadMovies, isSearching])

  // ✅ Load movies on initial render or when switching modes
  useEffect(() => {
    setMovies([])
    setPage(1)
    setHasMore(true)
    loadMovies()
  }, [isSearching])

  // ✅ Handle search
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return
    setIsSearching(true)
    setMovies([])
    await loadMovies()
  }

  const handleClearSearch = () => {
    setQuery('')
    setIsSearching(false)
    setMovies([])
    setPage(1)
    setHasMore(true)
  }

  return (
    <section className="relative">
      {/* 🔍 Sticky Search Bar */}
      <div className="sticky top-0 z-20 backdrop-blur-md border-b border-slate-800 px-4 py-4">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="flex-1 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white placeholder-slate-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition"
          >
            Search
          </button>
          {isSearching && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition"
            >
              Clear
            </button>
          )}
        </form>
      </div>
      {/* 🎬 Movie Grid */}
      <div className="px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {/* 🌀 Loader / End Message */}
      <div ref={loaderRef} className="mt-6 text-center p-8 text-slate-500">
        {loading && <MovieGridSkeleton />}
        {!loading && !hasMore && !isSearching && (
          <p className="text-slate-400">End of results.</p>
        )}
      </div>
    </section>
  )
}
