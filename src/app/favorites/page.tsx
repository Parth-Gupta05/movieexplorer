'use client'
import { useEffect, useState } from 'react'
import MovieCard from '../../components/MovieCard'

export default function FavoritesPage() {
  const [favs, setFavs] = useState<any[]>([])

  useEffect(() => {
    const storedFavs = localStorage.getItem('favs')
    const storedUser = localStorage.getItem('user')
    if (storedFavs && storedUser) {
      const favArray = JSON.parse(storedFavs)
      const userObj = JSON.parse(storedUser)
      // Filter favorites by matching email
      const filteredFavs = favArray.filter(fav => fav.email === userObj.email)
      setFavs(filteredFavs)
    }
  }, [])

  if (favs.length === 0) return <p>No favorites yet — add some from the movies page.</p>

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favs.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  )
}
