import React from 'react'
import { Profile } from './Profile'
import { ReviewList } from './ReviewList'


export const MainLayout = () => {
  return (
      <div className='flex-col bg-gray-100  items-center justify-center p-10 w-screen '>
        <Profile/>
        <h1 className='text-black text-4xl font-bold py-5 '>Reseñas recientes →</h1>
        <ReviewList/>
      </div>
  )
}

