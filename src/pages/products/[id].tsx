import React, {ReactElement} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { trpc } from '../../utils/trpc'

export default function Rent() {

  const {data: session} = useSession()
  
  const router = useRouter()
  const id = router.query.id as string
  

  const product = trpc.useQuery(['product.get-product', {id}])
  const mutation = trpc.useMutation('product.delete')

  const handleDelete = async ()=>{
    mutation.mutate({id}, {
      onSuccess(data, variables, context) {
        window.alert(data)
        router.push('/profile')
      },
      onError(error, variables, context) {
        window.alert('error')
      },
    })
  }

  const handleRent = ()=>{
    window.alert('rent')
  }

  return (
    <>
      <Head>
        <title>{product?.data?.name ? product?.data?.name : 'Loading...'}</title>
      </Head>
      { product.isLoading ? <h1>Loading...</h1> :
        <>
          <div>
            <p>{product?.data?.name}</p>
            <p>{product?.data?.price?.toString()}</p>
            <p>{product?.data?.amount?.toString()}</p>
          </div>
          
          { session?.user?.id === product?.data?.userId ? 
            <>
              <div>
                <button onClick={handleDelete} className='w-[100px] h-[50px] bg-red-500'>Delete</button>
              </div>
              <Link href={`/products/edit/${id}`}>
                <a className='w-[100px] h-[50px] bg-yellow-500'>Edit</a>
              </Link>
            </> 
            :
            <div>
              <button onClick={handleRent} className='w-[100px] h-[50px] bg-green-500'>Rent</button>
            </div>
          }
        </>
      }
    </>
  )
}


Rent.getLayout = function getLayout(page: ReactElement){
  return(
    <Layout>
      {page}
    </Layout>
  )
}