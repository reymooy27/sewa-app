import React, { useState, useEffect } from "react";
import Head from 'next/head'

export default function CreateRent() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string | undefined>(0);

  const [isSubmitting, setIsSubmittting] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  useEffect(()=>{
    if(name === '' && price === 0){
      setButtonDisabled(true)
    }else{
      setButtonDisabled(false)

    }
  },[name, price])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmittting(true)
    
    if(name === '' && price === null){
      return
    }

    await fetch('http://localhost:3000/api/rents/create', 
    {
      method: 'POST',
      body:JSON.stringify({name, price}),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    )
    .then(async data=> {
      setIsSubmittting(false)
      window.alert(await data.json())
    })
    .catch(err=> {
      setIsSubmittting(false)
      window.alert(err)
    })

    setName('')
    setPrice(0)

  };

  return (
    <>
    <Head>
      <title>Create</title>
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
  );
}


CreateRent.auth = true