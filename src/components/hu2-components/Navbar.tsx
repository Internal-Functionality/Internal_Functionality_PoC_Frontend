'use client';
import Link from 'next/link';
import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { MdGTranslate } from "react-icons/md";

export const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    const handleLanguageChange = (lang: string) => {
        alert(`Idioma cambiado a: ${lang}`);
        setShowMenu(false);
    };
    
    return (
        <>
            <div className="flex flex-col justify-between h-screen">
                {/* Contenedor superior */}
                <div className="flex flex-col items-center justify-center flex-grow gap-10">
                    <Link href="/i18n-hu2/home" className='block'>
                    <button className="cursor-pointer" >
                        <IoHome size={70} className="m-4" />
                    </button>
                    </Link>
                    <Link href="/i18n-hu2" className='block'>
                    <button className="cursor-pointer">
                        <CgProfile size={70} className="m-4" />
                    </button>
                    </Link>
                </div>

                {/* Botón de traducción */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <button 
                            onClick={toggleMenu} 
                            className="cursor-pointer"
                        >
                            <MdGTranslate size={70} className="m-4" />
                        </button>

                        {/* Dropdown */}
                        {showMenu && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-gray-800 rounded-lg shadow-lg w-32 p-2">
                                <button
                                    onClick={() => handleLanguageChange('es')}
                                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                                >
                                    🇪🇸 Español
                                </button>
                                <button
                                    onClick={() => handleLanguageChange('en')}
                                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                                >
                                    🇬🇧 English
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}