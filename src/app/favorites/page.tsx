'use client'
import { useEffect, useState } from 'react'
import MovieCard from '../../components/MovieCard'

// ✅ Define a type for favorite movies
interface FavoriteMovie {
  id: number
  title: string
  poster_path?: string
  email: string
}

export default function FavoritesPage() {
  const [favs, setFavs] = useState<FavoriteMovie[]>([])

  useEffect(() => {
    const storedFavs = localStorage.getItem('favs')
    const storedUser = localStorage.getItem('user')

    if (storedFavs && storedUser) {
      const favArray: FavoriteMovie[] = JSON.parse(storedFavs)
      const userObj = JSON.parse(storedUser)
      // ✅ Type-safe filter
      const filteredFavs = favArray.filter(
        (fav: FavoriteMovie) => fav.email === userObj.email
      )
      setFavs(filteredFavs)
    }
  }, [])

  if (favs.length === 0)
    return <p>No favorites yet — add some from the movies page.</p>

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favs.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  )
}
