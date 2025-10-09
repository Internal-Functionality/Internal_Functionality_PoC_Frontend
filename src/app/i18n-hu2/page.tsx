import {MainLayout} from '@/components/hu2-components/MainLayout'
import { NavBar } from '@/components/hu2-components/Navbar'
import React from 'react'

export default function page() {
  return (
    <div className="flex ">
      <div className="w-[10%] h-screen bg-blue-400 text-white sticky top-0 left-0">
        <NavBar />
      </div>
        <MainLayout />
    </div>
  )
}
