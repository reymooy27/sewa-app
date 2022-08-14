import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function Edit() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string | undefined>(0);

  const [isSubmitting, setIsSubmittting] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const [data, setData] = useState([])

  const router = useRouter()
  const {id} = router.query


  useEffect(() => {
    const fetchData = async ()=>{
      const res = await fetch(`http://localhost:3000/api/rents/${id}`)
      const _data = await res.json()
      setName(_data.name)
      setPrice(_data.price)
    } 

    fetchData()
  }, [id])
  
  console.log(data)

  

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmittting(true)
    
    if(name === '' && price === null){
      return
    }

    await fetch(`http://localhost:3000/api/rents/edit/${id}`, 
    {
      method: 'PUT',
      body:JSON.stringify({name, price}),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    )
    .then(async data=> {
      setIsSubmittting(false)
      router.push('/profile')
    })
    .catch(err=> {
      setIsSubmittting(false)
      window.alert(err)
    })
  };

  return (
    <>
    <Head>
      <title>Edit</title>
    </Head>

    <div className="w-ful h-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className='bg-red-200 w-[50%] h-full flex flex-col p-3'>
        <input
          className="w-full h-[60px] border-red-500 border-2 mt-2"
          placeholder="Name"
          value={name!}
          type='text'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full h-[60px] border-red-500 border-2 mt-2"
          placeholder="Price"
          value={price}
          type='number'
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button disabled={buttonDisabled} className={`${buttonDisabled ? "bg-red-400" : "bg-yellow-400"} w-full h-60px mt-2`} >
          {isSubmitting ? 'Loading...' : "Submit"}
        </button>
      </form>
    </div>
    </>
  )
}

Edit.auth = true