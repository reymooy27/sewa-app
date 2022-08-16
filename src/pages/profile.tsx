import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { ReactElement } from "react";
import Card from "../components/Card";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

export default function Profile() {

  const myProducts = trpc.useQuery(['product.get-my-products'])
  
  const {data: session} = useSession()

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <h1>My products</h1>
      {myProducts.isLoading ? <h1>Loading...</h1> : 
        <div className='p-6 grid grid-cols-1 gap-x-5 gap-y-3 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {myProducts?.data?.length! < 1 && <h1>No products, create one</h1>}
          {myProducts?.data?.map((product)=>(
            <Card 
            productName={product.name} 
            href={`/rents/${product.id}`} 
            key={product.id} 
            userName={product?.user?.name} 
            userImage={product?.user?.image}/>
          ))}
        </div>
      }

      {session && <Link href='/rents/create'>
        <a className='block w-[200px] h-[40px] bg-yellow-400 p-1 rounded text-center'>Create Rent</a>
      </Link>}
    </>
  );
}

Profile.getLayout = function getLayout(page: ReactElement){
  return(
    <Layout>
      {page}
    </Layout>
  )
}

Profile.auth = true