import React from 'react'
import { Profile } from './Profile'
import { ReviewList } from './ReviewList'
import { FaCircleArrowRight } from "react-icons/fa6";


export const MainLayout = () => {
  return (
      <div className='flex-col bg-gray-100  items-center justify-center p-10 w-screen '>
        <Profile/>
        <h1 className='text-black text-4xl font-bold py-5 flex gap-3'>Reseñas recientes <span><FaCircleArrowRight size={40} className="m-1"/></span></h1>
        <ReviewList/>
      </div>
  )
}

