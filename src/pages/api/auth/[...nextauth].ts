import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  session: {
    strategy: "database",
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES,
  },
  providers: [
    GoogleProvider({
      // cannot access from env variabel
      clientId: "161861232631-tul7mmr1asjh8s8smo5ka0vkaojm01ql.apps.googleusercontent.com",
      clientSecret: "GOCSPX-\_xfd7M4gPOXXG4X9dIKbpY3FA84I",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({session, token, user}){
      const shop = await prisma.shop.findUnique({
        where:{
          userId: user?.id!
        }
      })
      if (session !== undefined) {
        session.user!.id = user?.id
        session.user!.shopId = shop ? shop?.id : null
        return session
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  useSecureCookies: process.env.NODE_ENV === "production" ? true : false,
};

export default NextAuth(authOptions);
