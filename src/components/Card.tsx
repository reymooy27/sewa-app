import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Card({productName, href, userName, userImage}) {
  return (
      <Link href={href}>
        <a className='w-full min-w-[200px] h-[120px] rounded p-[10px] bg-white hover:scale-[1.05] transition-all'>
          <h4>{productName}</h4>
          <p>{userName}</p>
          <Image src={userImage} height={20} width={20} alt={'Profile'}/>
        </a>
      </Link>
  )
}
