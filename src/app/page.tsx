'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPopular, posterUrl } from '@/lib/tmdb'

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
}

export default function Home() {
  const [popular, setPopular] = useState<Movie[]>([])
  const [hero, setHero] = useState<Movie | null>(null)

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchPopular()
        setPopular(data.results.slice(0, 10))
        setHero(data.results[0])
      } catch (err) {
        console.error(err)
      }
    }
    loadMovies()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* HERO SECTION */}
      {hero && (
        <section
          className="relative h-[70vh] flex items-center justify-start px-6 sm:px-12 rounded-xl overflow-hidden shadow-lg"
          style={{
            backgroundImage: `url(${posterUrl(hero.backdrop_path, 'w1280')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 dark:from-slate-950/90 dark:to-slate-800/20 backdrop-blur-sm"></div>

          <div className="relative z-10 max-w-2xl text-white">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
              {hero.title}
            </h1>
            <p className="text-gray-200 dark:text-gray-300 mb-6 line-clamp-3">
              {hero.overview}
            </p>
            <div className="flex gap-4">
              <Link
                href={`/movie/${hero.id}`}
                className="bg-white/20 dark:bg-slate-800/70 hover:bg-white/30 dark:hover:bg-slate-700/80 px-5 py-2 rounded-md font-semibold backdrop-blur-md transition"
              >
                More Info
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* POPULAR MOVIES */}
      <section className="px-6 sm:px-12 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
          Popular Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popular.slice(0, 5).map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="hover:scale-105 transition-transform duration-200"
            >
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <Image
                  src={posterUrl(movie.poster_path)}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="px-6 sm:px-12 pb-16">
        <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
          Trending Now
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popular.slice(5, 10).map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="hover:scale-105 transition-transform duration-200"
            >
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <Image
                  src={posterUrl(movie.poster_path)}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 dark:text-gray-400 text-xs py-4 border-t border-gray-200 dark:border-gray-800">
        © 2024 Movie Explorer. All rights reserved.
      </footer>
    </main>
  )
}
