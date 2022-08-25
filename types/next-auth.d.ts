import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface User{
    id?: string | null;
    shopId?: string | null;
  }
  interface Session {
    user: User
  }
}