import Head from "next/head";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Card from "../components/Card";
import Layout from "../components/layout";

export default function Profile() {

  const [myRents, setMyRents] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMyRents = useCallback(
    async () => {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:3000/api/rents/my-rents')
        const data = await res.json()
        setMyRents(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchMyRents()
  }, [fetchMyRents])
  
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <h1>My rents</h1>
      {loading ? <h1>Loading...</h1> : 
        <div className='p-6 grid grid-cols-1 gap-x-5 gap-y-3 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {myRents.length < 1 && <h1>No rents, create one</h1>}
          {myRents.map((r)=>(
            <Card 
            productName={r.name} 
            href={`/rents/${r.id}`} 
            key={r.id} 
            userName={r?.user?.name} 
            userImage={r?.user?.image}/>
          ))}
        </div>
      }
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