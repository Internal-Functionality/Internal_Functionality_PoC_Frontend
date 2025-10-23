import React from 'react'
import { Profile } from './Profile'
import { ReviewList } from './ReviewList'
import { FaCircleArrowRight } from "react-icons/fa6";
import { useTranslations } from 'next-intl';

interface ProfessionalData {
  id: number | null;
  name: string | null;
  profession: string | null;
  specialty: string | null;
  rating: number;
  reviews: number;
  location: string | null;
  price: number;
  available: boolean;
  initials: string | null;
}

interface MainLayoutProps {
  professionalData: ProfessionalData;
}

export const MainLayout = ({ professionalData }: MainLayoutProps) => {
  const t = useTranslations("home");
  return (
    <div className='flex-col bg-gray-100  items-center justify-center p-10 w-screen '>
      <Profile professionalData={professionalData}/>
      <h1 className='text-black text-4xl font-bold py-5 flex gap-3'>
        {t("recentReviews")} <span><FaCircleArrowRight size={40} className="m-1" /></span>
      </h1>
      <ReviewList />
    </div>
  );
}

