import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

export default function SideBar() {
  const { status } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className='flex-col h-screen w-[20%] fixed bg-slate-600 hidden lg:flex'>
      <Link href='/'>
        <a>Home</a>
      </Link>
      {status === "authenticated" && (
        <>
          <button onClick={handleSignOut}>SignOut</button>
        </>
      )}
    </div>
  )
}
