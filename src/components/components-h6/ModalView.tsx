"use client";
type ModalViewProps = {
    isOpenView: boolean;
    titulo: string;
    text: string;
    onCloseView: () => void;
    
};
export default function ModalView({ isOpenView,titulo,text, onCloseView }: ModalViewProps) {
    if (!isOpenView) return null;

    return (
        <div className=" fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-2xl w-200 flex flex-col justify-center items-center gap-5 shadow-xl">
                <h1 className="text-3xl font-semibold">{titulo}</h1>
                <p className="text-sm">{text}</p>
                    <button className="bg-blue-300 py-2 px-6 rounded-lg text-white mt-5" onClick={onCloseView}>
                        Cerrar
                    </button>
            </div>
        </div>
    );
}

