import Link from "next/link";

export default function JobOffersBox() {
    return (
        <div className="max-w-2xl w-full text-2xl mt-5">
            Trabajos Ofertados:
            <p className="text-sm mt-2 ml-1">Total 3 trabajos</p>
            <ul className="text-sm text-left ">
                <li className="w-full mt-8">
                    <Link href="" className="block bg-blue-100 p-5 border border-black rounded-t-xl w-full text-2xl">
                        Reparacion de Laptop HP
                        <p className="text-sm mt-3">Reparacion de pantallas rotas</p>
                    </Link>
                </li>
                <li className="w-full">
                    <Link href="" className="block bg-blue-100 p-5 border border-black w-full text-2xl shadow-md">
                        Instalacion de Software contable
                        <p className="text-sm mt-3">Configuracion de Quickbooks en red local</p>
                    </Link>
                </li>
                <li className="w-full">
                    <Link href="" className="block bg-blue-100 p-5 border border-black rounded-b-xl w-full text-2xl shadow-md">
                    Instalacion de Office
                        <p className="text-sm mt-3">Version 2025</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
