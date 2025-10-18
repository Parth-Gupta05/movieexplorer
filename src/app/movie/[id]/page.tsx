import MoviePageClient from "./MoviePageClient";

// ✅ Use Next.js built-in type for clarity
interface MoviePageProps {
  params: Promise<{ id: string }>; // 👈 Fix: Next.js 15 expects Promise here
}

export default async function MoviePageWrapper({ params }: MoviePageProps) {
  const { id } = await params; // ✅ await the promise
  return <MoviePageClient movieId={id} />;
}
