import { withAuth } from 'next-auth/middleware'

export default withAuth(() => {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      // allow public paths
      const publicPaths = ['/', '/auth', '/api', '/_next', '/favicon.ico']
      const pathname = req.nextUrl.pathname
      if (publicPaths.some(p => pathname.startsWith(p))) return true
      // require auth for others
      return !!token
    }
  }
})

export const config = { matcher: ['/movies/:path*', '/favorites/:path*', '/movie/:path*'] }