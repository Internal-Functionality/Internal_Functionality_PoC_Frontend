"use client";
type ModalRequesterProps = {
    isOpen: boolean;
    titulo: string;
    text: string;
    onClose: () => void;
    
};
export default function ModalRequester({ isOpen,titulo,text, onClose }: ModalRequesterProps) {
    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-2xl w-200 flex flex-col justify-center items-center gap-5 shadow-xl">
                <h1 className="text-3xl font-semibold">{titulo}</h1>
                <h2 className="text-xl font-semibold">Descripcion</h2>
                <p className="text-sm">{text}</p>
                <div className="grid grid-cols-2 gap-4 mt-3 space-x-5">
                    <div className="w-40 h-40 bg-blue-300"></div>
                    <div className="w-40 h-40 bg-blue-300"></div>
                </div>
                    <button className="bg-blue-300 py-2 px-6 rounded-lg text-white mt-5" onClick={onClose}>
                        Cerrar
                    </button>
            </div>
        </div>
    );
}

