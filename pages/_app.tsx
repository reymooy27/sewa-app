import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
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

export default MyApp;

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
