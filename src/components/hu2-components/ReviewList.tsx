import React from 'react'
import { useTranslations } from "next-intl";
import { ReviewCard } from './ReviewCard';

interface ReviewProps{
    name: string;
    service: string;
    review: string;
    rating: number;
}

export const ReviewList = () => {
    const t = useTranslations("reviewList");
    const Reviews: ReviewProps[] = [
    {
        name: "Pedro Perez",
        service: t("0.service"),
        review: t("0.review"),
        rating: 4
    },
    {
        name: "Adriana Montaño",
        service: t("1.service"),
        review: t("1.review"),
        rating: 5
    },
    {
        name: "Cristofer Vera",
        service: t("2.service"),
        review: t("2.review"),
        rating: 2
    }
];

    return (
        <div className='flex flex-col gap-0 bg-gray-100 w-full text-white  mx-auto p-5 rounded  '>
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
