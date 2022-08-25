import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { ReactElement } from "react";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

export default function Profile() {

  const myOrders = trpc.useQuery(['order.get-my-orders'])
  
  const {data: session} = useSession()

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      {session?.user?.shopId! ? 
        <Link href={`/shop/${session?.user?.shopId!}`}>
          <a>MyShop</a>
      </Link>
      :
        <Link href='/shop/create'>
        <a>Create Shop</a>
      </Link>}

      <h1 className="mt-5">My Orders</h1>
      <div>
        {myOrders.isLoading ? <h1>Loading...</h1> : 
          <div>
            {myOrders?.data?.map((order: any)=>(
              <Order 
                key={order.id}
                productName = {order?.product?.name}
                seller={order?.shop?.name}
              />
            ))}
          </div>
        }
      </div>
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

export type OrderComponentProps = {
  productName: string | null,
  buyer?: string | null,
  seller: string | null
}

export function Order({productName, buyer, seller}: OrderComponentProps){
  return (
    <div className="w-[300px] h-[80px] p-3 m-1 rounded bg-white text-black shadow-md">
      <p>Product Name : {productName}</p>
      <p>Seller : {seller}</p>
      <p>Buyer : {buyer}</p>
    </div>
  )
}