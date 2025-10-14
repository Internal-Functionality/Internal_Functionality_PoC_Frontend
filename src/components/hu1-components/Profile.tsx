
import userImage from "@/assets/user.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Profile = () => {
    const t = useTranslations("profile");

    return (
    <div className='flex gap-15 bg-blue-200 w-full  mx-auto p-10 rounded-4xl shadow-md '>
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
            <h1 className='text-6xl font-black'>{t("name")}</h1>
            <h2 className='text-xl font-semibold text-amber-700 py-5'>{t("job")}</h2>
            <p className="text-2xl text-justify">
            {t("description")}
            </p>
        </div>
    </div>

    )
}
