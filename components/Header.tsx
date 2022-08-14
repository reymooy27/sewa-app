import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {

  const {data:session, status} = useSession()

  return (
    <div className='flex items-center justify-between w-full h-[50px] px-3 bg-red-200'>
      <>
        { session !== null ?
          <Link href="/profile">
            <a>
              <Image src={session?.user?.image} alt='profile' width={20} height={20}/>
              <span>{session?.user?.name}</span>
            </a>
          </Link>
          :
          <Link href="/login">
            <a className="text-xl">Login</a>
          </Link>
        }
      </>

      {session && <Link href='/rents/create'>
        <a className='block w-[200px] h-[40px] bg-yellow-400 p-1 rounded text-center'>Create Rent</a>
      </Link>}
    </div>
  )
}
