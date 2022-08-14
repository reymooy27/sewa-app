import React, {useCallback, useEffect,useState} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Rent() {

  const {data: session} = useSession()
  
  const router = useRouter()
  const {id} = router.query
  
  const [rentData, setRentData] = useState({})

  const fetchData = useCallback(
    async () => {
      try {
      const res = await fetch(`http://localhost:3000/api/rents/${id}`)
      const data = await res.json()
      setRentData(data)
    } catch (error) {
      console.log(error)        
    }
    },
    [id],
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDelete = async ()=>{
    await fetch(`http://localhost:3000/api/rents/delete/${id}`,
      {
        method: 'DELETE'
      }
    ).then(async res=>{
      window.alert(await res.json())
    }).catch(err=>{
      window.alert(err)
    })
  }

  console.log(session?.user?.id)
  console.log(rentData?.userId)

  return (
    <>
      <Head>
        <title>{rentData?.name}</title>
      </Head>
      
      <div>
        <p>{rentData?.name}</p>
        <p>{rentData?.price?.toString()}</p>
        <p>{rentData?.amount?.toString()}</p>
      </div>
      
      { session?.user?.id === rentData?.userId && 
      <>
        <div>
          <button onClick={handleDelete} className='w-[100px] h-[50px] bg-red-500'>Delete</button>
        </div>
        <Link href={`/rents/edit/${id}`}>
          <a>Edit</a>
        </Link>
       </> 
      }


      {session && <div>
        <button className='w-[100px] h-[50px] bg-green-500'>Rent</button>
      </div>}
    </>
  )
}


Rent.getLayout = function getLayout(page){
  return(
    <Layout>
      {page}
    </Layout>
  )
}