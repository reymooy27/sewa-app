import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../server/routers/_app";
import superjson from 'superjson';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement
  auth: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

          
  const comp = getLayout(<Component {...pageProps} />)
  
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          {comp}
        </Auth>
      ) : (
        <>
          {comp}
        </>
      )}
    </SessionProvider>
  );
}


function Auth({ children }: { children: JSX.Element }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      url: `${getBaseUrl()}/api/trpc`,
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      transformer: superjson
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  // ssr: true,
})(MyApp);