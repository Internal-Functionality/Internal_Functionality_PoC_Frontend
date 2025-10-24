'use client'
import { useTranslations } from "next-intl";
import { Roboto } from 'next/font/google'
import Link from "next/link";
import { TranslationButton } from "./hu2-components/TranslationButton";
import { Globe, Settings, Activity, FileText, Wrench, Search, Icon } from 'lucide-react';
import { usePathname } from "next/navigation";
const roboto = Roboto({
        weight: '300',
        subsets: ['latin'],
    })
export function Menu (){
    let t = useTranslations("menu");
    const pathname = usePathname();
    const isLightView = pathname === '/es' || pathname === '/en';
    return(
    <div className={roboto.className}>
        <div className=" flex justify-center text-center text-[#000000]">
        <menu className="p-4 ">
            <h1 className="font-black m-10 text-6xl">{t("title")}</h1>
            <h3 className="font-medium text-2xl my-10">{t("description")}</h3>
            <div className="flex">
            <ul className=" text-2xl text-center  text-white font-semibold">
            <li className="p-3 m-1"><Link href="/i18n-hu1" className="flex gap-4 items-center rounded-2xl  p-10 bg-[#759AE0]   hover:bg-[#2B6AE0] hover:scale-102 shadow-xl">
                <div className="bg-white/20 p-3 rounded-lg">
                    <Globe className="w-8 h-8" />
                </div>{t("button1")}</Link></li>
            <li className="p-3 m-1"><Link href="/i18n-hu2" className="flex gap-4 items-center rounded-2xl  p-10 bg-[#759AE0]   hover:bg-[#2B6AE0] hover:scale-102  shadow-xl">
                <div className="bg-white/20 p-3 rounded-lg">
                    <Settings className="w-8 h-8" />
                </div>{t("button2")}</Link></li>
            <li className="p-3 m-1"><Link href="/act-visitors-demo" className="flex gap-4 items-center rounded-2xl  p-10 bg-[#759AE0]   hover:bg-[#2B6AE0] hover:scale-102  shadow-xl">
                <div className="bg-white/20 p-3 rounded-lg">
                    <Activity className="w-8 h-8" />
                </div>{t("button3")}</Link></li>
            </ul>
            <ul className=" text-2xl text-center  text-white font-semibold">
            <li className="p-3 m-1"><Link href="/act-requesters-hu6" className="flex gap-4 items-center rounded-2xl  p-10 bg-[#759AE0]   hover:bg-[#2B6AE0]  hover:scale-102 shadow-xl">
                <div className="bg-white/20 p-3 rounded-lg">
                    <FileText className="w-8 h-8" />
                </div>{t("button4")}</Link></li>
            <li className="p-3 m-1"><Link href="/act-fixers-demo" className="flex gap-4 items-center rounded-2xl  p-10 bg-[#759AE0]   hover:bg-[#2B6AE0]  hover:scale-102 shadow-xl">
                <div className="bg-white/20 p-3 rounded-lg">
                    <Wrench className="w-8 h-8" />
                </div>{t("button5")}</Link></li>
            <li className="p-3 m-1"><Link href="/act-requesters-hu4" className="flex gap-4 items-center rounded-2xl  p-10 bg-[#759AE0]   hover:bg-[#2B6AE0]  hover:scale-102 shadow-xl">
                <div className="bg-white/20 p-3 rounded-lg">
                    <Search className="w-8 h-8" />
                </div>{t("button6")}</Link></li>
            </ul>
            </div>
        </menu>
        </div>
        <div className= {`fixed bottom-6 left-6 z-50  ${isLightView ? 'text-black' : 'text-white'}`}>
            <TranslationButton/>
        </div>
    </div>
    )
}