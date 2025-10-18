import MoviePageClient from './MoviePageClient'

// ✅ Correct type for Next.js App Router dynamic routes
interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePageWrapper({ params }: MoviePageProps) {
  const { id } = params
  return <MoviePageClient movieId={id} />
}
