import Link from "next/link";

export default function JobRegisterBox(){
    return (
        <div className="max-w-2xl w-full text-2xl mt-5">
            Trabajos Realizados:
            <p className="text-sm mt-2 ml-1">Total 2 trabajos</p>
            <ul className="text-sm text-left">
                <li className="w-full mt-8">
                    <Link href="" className="block bg-blue-100 p-5 border border-black rounded-t-xl w-full text-2xl">
                        Reparacion PC
                        <p className="text-sm mt-3">Comentario de Maria Lopez: Excelente trabajo, lo areglo de manera
                        precisa y rapida</p>
                    </Link>
                </li>
                <li className="w-full">
                    <Link href="" className="block bg-blue-100 p-5 border border-black w-full text-2xl rounded-b-xl shadow-md">
                    Instalación de programa                        
                    <p className="text-sm mt-3">Comentario de Juan Perez: No me gusto el trabajo, el sistema tiene
                    muchas fallas</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}