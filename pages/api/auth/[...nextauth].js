import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/google";

export default NextAuth({
    session: {
        jwt: true
    },
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  // mongodb database or any other - no db, then leave empty
  database: process.env.MONGO_URI
})