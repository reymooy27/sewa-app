import React from "react";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import { GetStaticProps } from 'next'
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Card from "../components/Card";
import { trpc } from "../utils/trpc";


function Home() {
  const { status } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  const allProducts = trpc.useQuery(['product.get-products'])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="flex w-full h-full">
        <SideBar/>
        <div className="bg-red-300 w-full ml-0 h-screen flex flex-col lg:w-[80%] lg:ml-[20%]">
          {status === "loading" ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <Header/>
              <div>
                <div className='p-6 grid grid-cols-1 gap-x-5 gap-y-3 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                  {allProducts?.data?.map((r)=>(
                    <Card 
                    productName={r.name} 
                    href={`/products/${r.id}`} 
                    key={r.id} 
                    userName={r?.user?.name} 
                    userImage={r?.user?.image}/>
                  ))}
                </div>
              </div>

              {status === "authenticated" && (
                <>
                  <button onClick={handleSignOut}>SignOut</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      
    </>
  );
}

export default Home;