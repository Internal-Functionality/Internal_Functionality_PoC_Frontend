'use client';
import Link from 'next/link';
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoArrowBack, IoHome } from "react-icons/io5";
import { TranslationButton } from './TranslationButton';
import { useLocale } from 'next-intl';

export const NavBar = () => {
    const locale = useLocale();
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

                {/* Contenedor central */}
                <div className="flex flex-col items-center justify-center flex-grow gap-10">
                    <Link href={`/${locale}/i18n-hu2`} className='block'>
                        <button className="cursor-pointer">
                            <IoHome size={70} className="m-4" />
                        </button>
                    </Link>
                    <Link href={`/${locale}/i18n-hu2/profile`} className='block'>
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