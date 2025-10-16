"use client";

interface View {
    titulo: string;
    descripcion: string;
}

type ViewBoxProps = {
    onOpenView: (vw: View) => void;
    views: View[];
};
export default function ViewBottom({ onOpenView, views }: ViewBoxProps) {
    if (views.length === 0) return null;
    const view = views[0];

    return (
        <div className="max-w-lg w-full mt-5">
            <div onClick={() => onOpenView(view)} className="cursor-pointer absolute top-11 right-8 bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-xl shadow-md p-7 text-lg transition-colors" >
                Vistas
            </div>
        </div>
    );
}