import React from 'react'
import Header from './Header'

export default function Layout({children}) {
  return (
    <>
      <div className="flex flex-col w-full h-full">
          <Header/>
          {children}
      </div>
    </>
  )
}
