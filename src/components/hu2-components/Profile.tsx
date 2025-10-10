
import userImage from "@/assets/user.jpg";
import Image from "next/image";
export const Profile = () => {
    return (
    <div className='flex gap-15 bg-blue-200 w-full  mx-auto p-10 rounded-4xl shadow-md '>
        <div className="text-center space-y-5  w-[20%]">
            <h2 className="text-3xl font-bold">Perfil</h2>
            <Image 
            src={userImage}
            alt="User"
            width={180}
            height={180}
            className="rounded-full mx-auto"
            />
        </div>
        <div className="flex-1 w-full">
            <h1 className='text-6xl font-black'>Pedro Perez</h1>
            <h2 className='text-xl font-semibold text-amber-700 py-5'> Plomero - Cerrajero </h2>
            <p className="text-2xl text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quasi sit culpa maxime, ex fuga, ratione amet suscipit iste obcaecati debitis velit nam beatae commodi odit eius alias eum quia animi! 
            </p>
        </div>
    </div>


    )
}
