'use client'
import React, { useState } from 'react'
import MoviesList from '../../components/MoviesList'

export default function MoviesPage() {
  const [query, setQuery] = useState('')

  return (
    <section>
        
      <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
      {/* 🔍 Search Bar */}
      

      {/* Movies List (filtered or popular) */}
      <MoviesList searchQuery={query} />
    </section>
  )
}
