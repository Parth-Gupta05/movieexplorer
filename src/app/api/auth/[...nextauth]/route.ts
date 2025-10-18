// /app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        // 🔑 NEW: Define the custom credential field to receive the user list from the client
        users: { label: 'Registered Users JSON', type: 'text' }
      },
      async authorize(credentials) {
        // This code runs on the SERVER, and now receives the 'users' data
        if (!credentials || !credentials.users) return null
        
        const { email, password, users } = credentials as any;

        try {
            // 1. Parse the JSON string containing all registered users
            const storedUsers = JSON.parse(users);

            // 2. Find the user by email and matching password
            const existingUser = storedUsers.find(
                (u: any) => u.email === email && u.password === password
            );

            if (existingUser) {
                // Success: Return the user object for session creation
                return { id: existingUser.email, name: existingUser.email, email: existingUser.email }
            }
        } catch (e) {
            console.error("Error processing user data in authorize:", e);
            // Failed to parse or process data
            return null;
        }

        return null // Authentication failed
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      (session as any).user = token.user
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }