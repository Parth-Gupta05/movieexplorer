const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE = 'https://api.themoviedb.org/3'

export async function fetchPopular(page = 1) {
  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&page=${page}`)
  if (!res.ok) throw new Error('TMDB fetch failed')
  return res.json()
}

export async function fetchMovie(id: string) {
  const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
  if (!res.ok) throw new Error('TMDB fetch failed')
  return res.json()
}

export async function searchMovies(query: string, page = 1) {
  const res = await fetch(`${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`)
  if (!res.ok) throw new Error('TMDB fetch failed')
  return res.json()
}



export function posterUrl(path: string | null, size = 'w342') {
  if (!path) return '/placeholder.png' // This returns a local file
  return `https://image.tmdb.org/t/p/${size}${path}` // This returns the external URL
}