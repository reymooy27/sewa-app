import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {

  const {data:session, status} = useSession()

  return (
    <div className='flex items-center justify-between w-full h-[50px] 
      px-3 border-b-[0.5px] text-white bg-slate-800 sticky top-0 left-0 z-[2]'>
        <div>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </div>
        <div>
          { session !== null ?
            <Link href="/profile">
              <a>
                <Image src={session?.user?.image!} alt='profile' width={20} height={20}/>
                <span>{session?.user?.name}</span>
              </a>
            </Link>
            :
            <Link href="/login">
              <a className="text-xl">Login</a>
            </Link>
          }
        </div>
    </div>
  )
}
