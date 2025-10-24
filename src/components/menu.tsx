import { useTranslations } from "next-intl";
import { Roboto } from 'next/font/google'
import Link from "next/link";
import { TranslationButton } from "./hu2-components/TranslationButton";
const roboto = Roboto({
        weight: '300',
        subsets: ['latin'],
    })
export function Menu (){
    let t = useTranslations("menu");
    return(
    <div className={roboto.className}>
        <div className=" flex justify-center text-center text-[#000000]">
        <menu className="p-10 ">
            <h1 className="font-black m-20 text-6xl">{t("title")}</h1>
            <ul className=" text-3xl text-center ">
            <li className="p-3 m-5"><Link href="/i18n-hu1" className="block rounded-2xl  p-10 bg-[#759AE0]   hover:bg-[#2B6AE0]  shadow-xl">
            {t("button1")}</Link></li>
            <li className="p-3 m-5"><Link href="/i18n-hu2" className="block rounded-2xl  p-10 bg-[#759AE0] hover:bg-[#2B6AE0] shadow-xl">{t("button2")}</Link></li>
            <li className="p-3 m-5"><a href="/act-visitors-demo" className="block rounded-2xl  p-10 bg-[#759AE0] hover:bg-[#2B6AE0] shadow-xl">{t("button3")}</a></li>
            <li className="p-3 m-5"><Link href="/act-requesters-hu6" className="block rounded-2xl  p-10 bg-[#759AE0] hover:bg-[#2B6AE0] shadow-xl">{t("button4")}</Link></li>
            <li className="p-3 m-5"><Link href="/act-fixers-demo" className="block rounded-2xl  p-10 bg-[#759AE0] hover:bg-[#2B6AE0] shadow-xl">{t("button5")}</Link></li>
            <li className="p-3 m-5"><Link href="/act-requesters-hu4" className="block rounded-2xl  p-10 bg-[#759AE0] hover:bg-[#2B6AE0] shadow-xl">{t("button6")}</Link></li>
            </ul>
        </menu>
        </div>
        <div className="fixed bottom-6 left-6 z-50 text-white">
            <TranslationButton/>
        </div>
    </div>
    )
}