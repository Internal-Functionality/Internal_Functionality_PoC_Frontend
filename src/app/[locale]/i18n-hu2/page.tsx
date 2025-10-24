
import { NavBar } from '@/components/hu2-components/Navbar'
import {Roboto} from 'next/font/google';
import { HomeContent } from '@/components/hu2-components/HomeContent'
import React from 'react'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

export default function page() {
  return (
  <section className={roboto.className}>
    <div className="flex ">
        <div className="w-[10%] h-screen bg-[#2B6AE0] text-white sticky top-0 left-0">
          <NavBar />
        </div>
        <div className='w-full'>
          <HomeContent />
        </div>
    </div>
  </section>
  )
}