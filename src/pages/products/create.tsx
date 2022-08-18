import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { trpc } from "../../utils/trpc";

export default function Create() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const [isSubmitting, setIsSubmittting] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const mutation = trpc.useMutation(['product.create'])

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

    mutation.mutate({name,price},{
      onSuccess: (data)=>{
        setIsSubmittting(false)
        typeof data !== 'string' && window.alert(data?.name)
        window.alert(data)
      },
      onError: (error)=>{
        setIsSubmittting(false)
        window.alert(error)
      }
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


Create.auth = true