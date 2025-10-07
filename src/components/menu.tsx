import Link from "next/link";

export function Menu (){
    return(
        <div>
        <div className="bg-blue-950 flex justify-center  text-white">
        <menu className="p-10 ">
            <h1 className="font-black m-30 text-6xl">Internal Functionalities DEMO</h1>
            <ul className=" text-3xl text-center ">
            <li className="border p-3 m-10"><Link href="/i18n-demo" className="block border p-10 bg-blue-900">i18n-Deteccion automatica del idioma del navegador</Link></li>
            <li className="border p-3 m-10"><a href="/act-visitors-demo" className="block border p-10 bg-blue-900">Registro de actividad de visitors</a></li>
            <li className="border p-3 m-10"><Link href="/act-requesters-hu6" className="block border p-10 bg-blue-900">Registro de actividad de Requesters- Registrar revisiones de trabajo</Link></li>
            <li className="border p-3 m-10"><Link href="/act-fixers-demo" className="block border p-10 bg-blue-900">Registro de actividad de fixers</Link></li>
            <li className="border p-3 m-10"><Link href="/act-requesters-hu4" className="block border p-10 bg-blue-900"> Registro de actividad de Requesters-Registrar busqueda de servicios</Link></li>
            </ul>
        </menu>
        </div>
    </div>
    )
}