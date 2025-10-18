// page.tsx
import MoviePageClient from './MoviePageClient'

type Params = {
  params: { id: string }
}

export default async function MoviePageWrapper({ params }: Params) {
  // Await params (Next.js 14 requirement)
  const { id } = params
  return <MoviePageClient movieId={id} />
}
