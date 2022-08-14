import Head from "next/head";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function Login({}) {
  const [loading, setLoading] = useState<Boolean>(false);

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    const isSignIn = await signIn("google", {
      callbackUrl: "http://localhost:3000/",
    });
    if (isSignIn) setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl">Login</h1>
        <button
          className="bg-yellow-100 w-[200px] h-[60px] rounded"
          onClick={handleSignInWithGoogle}
        >
          {loading ? "Loading" : "Login with Google"}
        </button>
      </div>
    </>
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
