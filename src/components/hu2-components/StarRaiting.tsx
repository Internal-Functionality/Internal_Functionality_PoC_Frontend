interface Props{
    rating: number;
}
import React from 'react'


export const StarRaiting = ({ rating }: Props) => {
    return (
    <div className="flex justify-center space-x-1 p-2">
        {[1, 2, 3, 4, 5].map((star) => (
        <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            className={`w-8 h-8 ${star <= rating ? 'text-purple-500' : 'text-purple-500'} `}
            viewBox="0 0 24 24"
            fill={star <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.25 6.905a1 1 0 00.95.69h7.26c.969 0 1.371 1.24.588 1.81l-5.873 4.27a1 1 0 00-.364 1.118l2.25 6.905c.3.921-.755 1.688-1.54 1.118l-5.872-4.27a1 1 0 00-1.176 0l-5.872 4.27c-.784.57-1.838-.197-1.539-1.118l2.25-6.905a1 1 0 00-.364-1.118l-5.872-4.27c-.784-.57-.38-1.81.588-1.81h7.26a1 1 0 00.95-.69l2.25-6.905z"
            />
        </svg>
        ))}
    </div>
    );
};

