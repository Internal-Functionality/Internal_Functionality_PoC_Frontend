import Link from "next/link";
export default function RoleBottom(){
    return(
        <div className="flex">
            <p className="mt-8 mr-5">
                Cambiar de rol:
            </p>
        <div className="max-w-sm w-full mt-5 flex space-x-8 text-center">
            <div className="w-full hover:bg-blue-100 rounded-xl shadow-md border border-black">
                <Link href="" className="block  p-3  w-full ">
                        Fixer
                </Link>
            </div>
            <div className="w-full hover:bg-blue-100 rounded-xl shadow-md border border-black">
                <Link href="" className="block  p-3 w-full">
                    Requester
                </Link>
            </div>
        </div>
        </div>
    );
}