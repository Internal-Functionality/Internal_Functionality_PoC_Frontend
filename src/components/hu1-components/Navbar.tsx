'use client';
import Link from 'next/link';
import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { IoArrowBack, IoHome } from "react-icons/io5";
import { MdGTranslate } from "react-icons/md";
import { TranslationButton } from '../hu2-components/TranslationButton';

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
             {/* Botón de retroceso en la parte superior */}
                <div className="flex justify-center mt-6">
                    <Link href="/.." className='block'>
                        <button className="cursor-pointer">
                            <IoArrowBack size={70} className="m-4" />
                        </button>
                    </Link>
                </div>

                {/* Contenedor superior */}
                <div className="flex flex-col items-center justify-center flex-grow gap-10">
                    <Link href="/i18n-hu1/home" className='block'>
                    <button className="cursor-pointer" >
                        <IoHome size={70} className="m-4" />
                    </button>
                    </Link>
                    <Link href="/i18n-hu1" className='block'>
                    <button className="cursor-pointer">
                        <CgProfile size={70} className="m-4" />
                    </button>
                    </Link>
                </div>
                
                {/* Botón de traducción */}
                <TranslationButton/>
            </div>
        </>
    )
}