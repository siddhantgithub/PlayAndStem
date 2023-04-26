import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from '../../../lib/dbConnect'
import Learner from '../../../models/learnerModel';
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // Return null if user data could not be retrieved
        await dbConnect();
          const { username, password } = credentials;
          // check if user exist
          try {
            // @ts-ignore
              let learner = await Learner.findOne({ username });
              if (learner)
              {
                  if (!learner.authenticate(password)) {
                      return null;
                  }
                  const { _id, missionProgress, username, firstname, lastname} = learner;
                  console.log ("found a learner",learner);
                  let returnLearner = { username, firstname, lastname, _id, missionProgress};
                  return returnLearner as any;
                 // return returnLearner;
              }
              else
              {
                console.log ("Couldn't find a learner");
                  return null;
              }
          }
          catch (e) 
          {
              console.error(e);
              return null;

          }
        return null
      }
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  /*callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },*/
  pages: {
    signIn: '/',
    signOut: '/',
  },
  session: {
    // @ts-ignore
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },    
}

export default NextAuth(authOptions)
