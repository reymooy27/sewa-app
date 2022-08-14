import Link from 'next/link'
import React from 'react'

export default function SideBar() {
  return (
    <div className='h-screen w-[20%] fixed bg-slate-600 hidden lg:block'>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </div>
  )
}
