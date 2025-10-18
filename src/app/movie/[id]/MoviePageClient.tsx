'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchMovie, posterUrl } from '../../../lib/tmdb'
import FavoriteButton from '../../../components/FavoriteButton'

type Props = { movieId: string }

export default function MoviePageClient({ movieId }: Props) {
  const [movie, setMovie] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    async function loadMovie() {
      const data = await fetchMovie(movieId)
      setMovie(data)
    }
    loadMovie()
  }, [movieId])

  if (!movie) return <p className="text-center py-20 text-gray-400">Loading...</p>

  return (
    <main className="bg-black text-white min-h-screen pb-16">
      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto p-6">
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image
            src={posterUrl(movie.poster_path, 'w780')}
            alt={movie.title}
            fill
            priority
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.release_date && (
                <span className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-300">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}
              {movie.runtime && (
                <span className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-300">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
              {movie.genres?.slice(0, 2).map((genre: any) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>
              <FavoriteButton movie={movie} />
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="max-w-5xl mx-auto px-6 mt-10 border-b border-gray-800">
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          {['overview'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-red-600 text-white'
                  : 'border-transparent hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="max-w-5xl mx-auto px-6 mt-8">
        {activeTab === 'overview' && (
          <>
            <h3 className="text-xl font-semibold mb-4">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed mb-10">{movie.overview}</p>

            <h3 className="text-xl font-semibold mb-4">Cast & Crew</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
              {movie.credits?.cast?.slice(0, 5).map((member: any) => (
                <div key={member.id} className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-3 rounded-xl overflow-hidden">
                    <Image
                      src={
                        member.profile_path
                          ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                          : '/placeholder.png'
                      }
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-semibold text-sm">{member.name}</p>
                  <p className="text-gray-400 text-xs">{member.character}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-4">Ratings & Reviews</h3>
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-10 mb-6">
                <div>
                  <p className="text-3xl font-bold text-red-500">
                    {Math.round(movie.vote_average * 10)}%
                  </p>
                  <p className="text-gray-400 text-sm">TMDB Score</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-400">95%</p>
                  <p className="text-gray-400 text-sm">Audience Score</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-gray-200 italic">
                    “A visually stunning and emotionally resonant journey across the desert sands.”
                  </p>
                  <p className="text-gray-500 text-sm mt-1">— Film Critic</p>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-gray-200 italic">
                    “Villeneuve delivers an epic worthy of its legacy — breathtaking, intelligent, and moving.”
                  </p>
                  <p className="text-gray-500 text-sm mt-1">— Reviewer</p>
                </div>
              </div>
            </div>
          </>
        )}

       

        
      </section>
    </main>
  )
}
