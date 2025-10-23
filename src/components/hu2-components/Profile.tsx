
import userImage from "@/assets/user.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
export const Profile = ({professionalData}:MainLayoutProps) => {
    const t = useTranslations("profile");
    
        return (
        <div className='flex gap-15 bg-blue-400 w-full  mx-auto p-10 rounded-4xl shadow-md '>
            <div className="text-center space-y-5  w-[20%]">
                <h2 className="text-3xl font-bold">{t("title")}</h2>
                <Image 
                src={userImage}
                alt="User"
                width={180}
                height={180}
                className="rounded-full mx-auto"
                />
            </div>
            <div className="flex-1 w-full">
                <h1 className='text-6xl font-black'>{professionalData.name}</h1>
                <h2 className='text-xl font-semibold text-amber-700 py-5'>{t("job")}</h2>
                <p className="text-2xl text-justify">
                {t("description")}
                </p>
            </div>
        </div>
    
        )
}
