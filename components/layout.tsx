import Head from 'next/head'
import React from 'react'
import Header from './Header'
import SideBar from './SideBar'

export default function Layout({children}) {
  return (
    <>
      <div className="flex w-full h-full">
        <SideBar/>
        <div className="bg-red-300 w-full ml-0 h-screen flex flex-col lg:w-[80%] lg:ml-[20%]">
          <Header/>
          {children}
        </div>
      </div>
    </>
  )
}
