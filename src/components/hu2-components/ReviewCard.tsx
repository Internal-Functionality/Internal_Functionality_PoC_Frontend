import React from 'react'
import Image from 'next/image'
import userImage from "@/assets/user.jpg";
import { StarRaiting } from './StarRaiting';

interface Props {
    name: string;
    service: string;
    review: string;
    rating: number;
}

export const ReviewCard = ({name,service,review,rating}:Props) => {
    return (
        <div className='flex gap-15 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-black  '>
                <Image 
                src={userImage}
                alt="User"
                width={100}
                height={100}
                className="rounded-full m-auto  "
                />
                <div className="flex-1 w-full ">
                    <h1 className='text-3xl font-bold'>{name}</h1>
                    <h2 className='text-xl font-semibold text-amber-700 py-5'> {service}</h2>
                    <p className="text-xl text-justify">
                    {review}
                    </p>
                </div>
                
                <div className='m-auto w-max '>
                    <StarRaiting rating={rating}/>
                </div>
        </div>
    )
}
