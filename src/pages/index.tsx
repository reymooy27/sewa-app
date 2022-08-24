import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Card from "../components/Card";
import { trpc } from "../utils/trpc";


function Home() {
  const { status } = useSession();
  const allProducts = trpc.useQuery(['product.get-products'])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

        <div className="w-full h-screen relative">
          {status === "loading" ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <Header/>
              <div className='mx-[80px] my-auto'>
                <Banner/>
                {allProducts.isLoading ? <h1>Loading...</h1> : 
                <div className="my-[20px]">
                  <h1 className="text-xl font-bold">
                    New Releases
                  </h1>
                  <div className='flex gap-3 flex-wrap mt-[10px]'>
                    {allProducts?.data?.map((r)=>(
                      <Card 
                      productName={r.name} 
                      href={`/products/${r.id}`} 
                      key={r.id} 
                      userName={r?.user?.name!} 
                      userImage={r?.user?.image!}/>
                    ))}
                  </div>
                </div>
                }

              </div>
            </>
          )}
        </div>
    </>
  );
}

export default Home;


export function Banner() {
  return (
    <div 
      className='w-full h-[120px] flex justify-center 
      items-center p-2 mt-[20px]
      bg-white text-black rounded shadow-md
      '>
      <h1>Banner</h1>
    </div>
  )
}

export function CardContainer(){
  return(
    <div>k</div>
  )
}
