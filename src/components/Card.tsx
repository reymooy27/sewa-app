import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type CardComponentType = {
  productName : string,
  href: string,
  userName: string | null | undefined,
  userImage: string | null | undefined
}

export default function Card({productName, href, userName, userImage}: CardComponentType) {
  return (
      <Link href={href}>
        <a className='w-[150px] h-[250px] rounded p-[10px] flex flex-col grow
        bg-white text-black hover:scale-[1.05] transition-all shadow-xl'>
          <div className='w-full h-[50%] bg-slate-500'>
            
          </div>
          <div>
            <h4>{productName}</h4>
            <p>{userName}</p>
            <div className='w-[20px]'>
              <Image src={userImage} height={20} width={20} alt={'Profile'}/>
            </div>
          </div>
        </a>
      </Link>
  )
}
