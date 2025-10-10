"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RoleBottom() {
    const pathname = usePathname();
    const isFixer = pathname === "/act-requester-hu6-Fixer";
    const isRequester = pathname === "/act-requesters-hu6";

    return (
        <div className="flex">
            <p className="mt-8 mr-5">Cambiar de rol:</p>
            <div className="max-w-sm w-full mt-5 flex space-x-8 text-center">
            {/* Botón Fixer */}
                <div className={`w-full rounded-xl shadow-md border border-black transition-all duration-200 ${
                    isFixer
                    ? "bg-blue-300 text-white"
                    : "hover:bg-blue-100 text-black"
                    }`}>
                    <Link href="/act-requester-hu6-Fixer" className="block p-3 w-full"> Fixer </Link>
                </div>

            {/* Botón Requester */}
            <div className={`w-full rounded-xl shadow-md border border-black transition-all duration-200 ${
                isRequester
                ? "bg-blue-300 text-white"
                : "hover:bg-blue-100 text-black"
                }`}>
                <Link href="/act-requesters-hu6" className="block p-3 w-full"> Requester </Link>
            </div>
        </div>
    </div>
    );
}
//fix a problem with the link on RoleBottom component