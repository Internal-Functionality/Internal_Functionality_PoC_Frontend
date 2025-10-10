import React from 'react'
import { ReviewCard } from './ReviewCard'
import { Interface } from 'readline'

interface ReviewProps{
    name: string;
    service: string;
    review: string;
    rating: number;
}

const Reviews:ReviewProps[] = [
    {
        name: "Pedro Perez",
        service: "Plomeria",
        review: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi sit culpa maxime, ex fuga, ratione amet suscipit iste obcaecati debitis velit nam beatae commodi odit eius alias eum quia animi!",
        rating: 4
    },
    {
        name: "Adriana Montaño",
        service: "Cerrajeria",
        review: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi sit culpa maxime, ex fuga, ratione amet suscipit iste obcaecati debitis velit nam beatae commodi odit eius alias eum quia animi!",
        rating: 5
    },
    {
        name: "Crhistofer Vera",
        service: "Cerrajeria",
        review: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi sit culpa maxime, ex fuga, ratione amet suscipit iste obcaecati debitis velit nam beatae commodi odit eius alias eum quia animi!",
        rating: 2
    }
]

export const ReviewList = () => {
    return (
        <div className='flex flex-col gap-0 bg-gray-100 w-full  mx-auto p-5 rounded  '>
            {Reviews.map((review:ReviewProps)=><ReviewCard 
        key={review.name}
        name={review.name}
        service={review.service}
        review={review.review}
        rating={review.rating}
        />)}
        </div>
    )
}
