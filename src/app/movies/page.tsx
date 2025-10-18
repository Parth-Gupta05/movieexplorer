'use client'
import React, { useState } from 'react'
import MoviesList from '../../components/MoviesList'

export default function MoviesPage() {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('') // This triggers MoviesList to fetch

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(input.trim()) // Only update MoviesList on submit
  }

  const handleClear = () => {
    setInput('')
    setQuery('')
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSubmit} className="mb-6 max-w-2xl flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search movies..."
          className="flex-1 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white placeholder-slate-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition"
        >
          Search
        </button>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition"
          >
            Clear
          </button>
        )}
      </form>

      {/* Movies List */}
      <MoviesList searchQuery={query} />
    </section>
  )
}
