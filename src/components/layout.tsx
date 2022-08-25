import React, { ReactNode } from 'react'
import Header from './Header'

export default function Layout({children}: {children: ReactNode}) {
  return (
    <>
      <div className="flex flex-col w-full h-full">
          <Header/>
          {children}
      </div>
    </>
  )
}
