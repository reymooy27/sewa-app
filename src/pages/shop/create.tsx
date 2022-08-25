import Head from 'next/head';
import React, { useState } from 'react'
import { trpc } from '../../utils/trpc';

export default function ShopCreate() {
  const [name, setName] = useState<string>("");

  const [isSubmitting, setIsSubmittting] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const mutation = trpc.useMutation(['shop.create'])


  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmittting(true)
    
    if(name === ''){
      return
    }

    mutation.mutate({name},{
      onSuccess: (data)=>{
        setIsSubmittting(false)
        typeof data !== 'string' ? window.alert(data?.name) : window.alert(data)
      },
      onError: (error)=>{
        setIsSubmittting(false)
        window.alert(error)
      }
    })

    setName('')
  };

  return (
  <>
    <Head>
      <title>Create Shop</title>
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
        <button disabled={buttonDisabled} className={`${buttonDisabled ? "bg-red-400" : "bg-yellow-400"} w-full h-60px mt-2`} >
          {isSubmitting ? 'Loading...' : "Submit"}
        </button>
      </form>
    </div>
    </>
  )
}

ShopCreate.auth = true