import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { trpc } from '../../../utils/trpc';

export default function Edit() {
  const [name, setName] = useState<string | undefined>("");
  const [price, setPrice] = useState<number | undefined>(0);

  const [isSubmitting, setIsSubmittting] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const router = useRouter()
  const id = router.query.id as string

  const product = trpc.useQuery(['product.get-product', {id}])

  const mutation = trpc.useMutation('product.update')


  useEffect(() => {
    setName(product?.data?.name)
    setPrice(product?.data?.price)
  }, [product.data?.name, product.data?.price])
  

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmittting(true)
    
    if(name === '' && price === null){
      return
    }

    mutation.mutate({id, name, price},{
      onSuccess(data, variables, context) {
        setIsSubmittting(false)
        router.push('/profile')
      },
      onError(error, variables, context) {
        setIsSubmittting(false)
        window.alert(error.message)
      },
    })
  };

  return (
    <>
    <Head>
      <title>Edit</title>
    </Head>

    <div className="w-ful h-full flex justify-center items-center">
      <form 
        onSubmit={handleSubmit} 
        className='bg-red-200 w-[50%] h-full flex flex-col p-3'>
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
        <button 
          disabled={buttonDisabled} 
          className={`${buttonDisabled ? "bg-red-400" : "bg-yellow-400"} w-full h-60px mt-2`} >
          {isSubmitting ? 'Loading...' : "Submit"}
        </button>
      </form>
    </div>
    </>
  )
}

Edit.auth = true