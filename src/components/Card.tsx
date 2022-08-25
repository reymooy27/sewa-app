import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type CardComponentType = {
  productName : string,
  href: string,
  shopName: string
}

export default function Card({productName, href, shopName}: CardComponentType) {
  return (
      <Link href={href}>
        <a className='w-[150px] h-[250px] rounded p-[10px] flex flex-col shrink
        bg-white text-black hover:scale-[1.05] transition-all shadow-xl'>
          <div className='w-full h-[50%] bg-slate-500'>
            
          </div>
          <div>
            <h4>{productName}</h4>
            <p>{shopName}</p>
            {/* <div className='w-[20px]'>
              <Image src={userImage} height={20} width={20} alt={'Profile'}/>
            </div> */}
          </div>
        </a>
      </Link>
  )
}
