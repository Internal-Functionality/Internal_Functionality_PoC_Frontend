import { HomeLayout } from '@/components/hu1-components/HomeLayout'
import { NavBar } from '@/components/hu1-components/Navbar'
import { HomeContent } from '@/components/hu2-components/HomeContent'
import React from 'react'

export default function page() {
  return (
    <div className="flex ">
      <div className="w-[10%] h-screen bg-blue-400 text-white sticky top-0 left-0">
        <NavBar />
      </div>
      <div >
        <HomeContent />
      </div>
        
    </div>
  )
}