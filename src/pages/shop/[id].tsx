import Head from 'next/head'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import Card from '../../components/Card'
import CardContainer from '../../components/CardContainer'
import Layout from '../../components/layout'
import { trpc } from '../../utils/trpc'
import { Order } from '../profile'

export default function MyShop() {

  const myShop = trpc.useQuery(['shop.get-my-shop'])
  const myProducts = trpc.useQuery(['product.get-my-products'])
  const myShopOrders = trpc.useQuery(['order.get-my-shop-orders'])

  return (
    <>
      <Head>
        <title>My Shop</title>
      </Head>

      <div>
        {myShop.isLoading ? <h1>Loading...</h1>
        :
        <h1 className='text-xl font-bold'>{myShop.data?.name}</h1>
        }
      </div>

      <div className='mt-10 bg-red-500 w-16'>
        <Link href='/products/create'>
          <a>Create Product</a>
        </Link>
      </div>

      <CardContainer>
        {myProducts?.data?.length! < 1 && <h1>No products, create one</h1>}
          {myProducts?.data?.map((product)=>(
            <Card 
              productName={product.name} 
              shopName={product.shop.name}
              href={`/products/${product.id}`} 
              key={product.id} 
            />
          ))}
      </CardContainer>

      <div className='mt-8'>
        {myShopOrders.isLoading ? <h1>Loading...</h1>
        :
          myShopOrders?.data?.length! < 1 ? <h1>No Orders</h1>
          : myShopOrders.data?.map(order=>(
            <Order 
              key={order.id} 
              productName={order?.product?.name}
              seller={order?.shop?.name}
              buyer={order?.user?.name}
            />
          ))
        }
      </div>
    </>
  )
}

MyShop.auth = true

MyShop.getLayout = function getLayout(page: ReactElement){
  return(
    <Layout>
      {page}
    </Layout>
  )
}