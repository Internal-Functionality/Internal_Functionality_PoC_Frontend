"use client";
import { useState } from "react";
import FixerCardEditable from "@/components/components-h6/FixerCardEditable";
import JobOffersBox from "@/components/components-h6/JobOffersBox";
import JobRegisterBox from "@/components/components-h6/JobRegisterBox";
import ModalRequester from "@/components/components-h6/ModalRequester";
import RoleBottom from "@/components/components-h6/RoleBottom";
import ModalView from "@/components/components-h6/ModalView";
import ViewBottom from "@/components/components-h6/ViewBottom";

interface OfferedJob {
    id: string;
    titulo: string;
    descripcion: string;
}
interface RegisteredJob {
    id: string;
    titulo: string;
    descripcion: string;
}
interface View {
    titulo: string;
    descripcion: string;
}

const OfferedJobs: OfferedJob[] = [
    {
        titulo: "Reparacion de laptop HP",
        descripcion:
        "Me especializo en la reparación y reemplazo de pantallas dañadas en laptops de diferentes marcas y modelos. Cuando una pantalla se rompe, los síntomas más comunes que encuentro son rajaduras visibles, manchas negras, pérdida de colores, líneas horizontales o verticales, parpadeos constantes o pantalla en blanco.",
        id: "T001",
    },
    {
        titulo: "Instalacion de software contable",
        descripcion:
        "Realizo instalación y configuración de sistemas contables como QuickBooks y Contasis. Aseguro conectividad en red local y respaldo de bases de datos para evitar pérdidas de información.",
        id: "T002",
    },
    {
        titulo: "Instalacion de Office",
        descripcion:
        "Instalo y activo Microsoft Office en su versión más reciente, incluyendo personalización de licencias, plantillas y configuración de cuentas Outlook.",
        id: "T003",
    },
];
const RegisteredJobs: RegisteredJob[] = [
    {
        titulo: "Reparacion PC",
        descripcion:
        "Comentario de Maria Lopez: Excelente trabajo, lo areglo de manera precisa y rapida",
        id: "T004",
    },
    {
        titulo: "Instalacion de programa",
        descripcion:
        "Comentario de Juan Perez: No me gusto el trabajo, el sistema tiene muchas fallas",
        id: "T005",
    },
];
const Views: View[] = [
    { titulo: "Vistas en trabajos", descripcion: "Total:" },
];
export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<OfferedJob | null>(null);
    const [isOpenView, setIsOpenView] = useState(false);
    const [selectedView, setSelectedView] = useState<View | null>(null);

    const handleOpenModal = (job: OfferedJob) => {
        setSelectedJob(job);
        setIsOpen(true);
    };
    const handleOpenModalR = (job: RegisteredJob) => {
        setSelectedJob(job);
        setIsOpen(true);
    };
    const handleOpenModalViews = (views: View) => {
        setSelectedView(views);
        setIsOpenView(true);
    };
    return (
    <>
        <div className="flex">
            <div className="max-w-2xl w-full p-6">
                <FixerCardEditable />
            </div>
            <div className="max-w-lg w-full mt-10 ml-15">
                <RoleBottom />
            </div>
        </div>

      {/* Botón de publicar */}
        <div className="px-6">
            <button className="cursor-pointer bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
            + Publicar Oferta de Trabajo
            </button>
        </div>

        <div className="flex space-x-9">
        {/* Trabajos ofertados */}
        <div className="max-w-2xl w-full p-6 ">
            <JobOffersBox onOpen={handleOpenModal} jobs={OfferedJobs} />
        </div>

        {/* Trabajos realizados */}
        <div className="max-w-2xl w-full p-6 relative">
            <JobRegisterBox onOpen={handleOpenModalR} jobs={RegisteredJobs} />
            <ViewBottom onOpenView={handleOpenModalViews} views={Views} />
        </div>

        {/* Modal */}
        {selectedJob && (
            <ModalRequester
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            titulo={selectedJob.titulo}
            text={selectedJob.descripcion} />
        )}
        {selectedView && (
            <ModalView
            isOpenView={isOpenView}
            titulo={selectedView.titulo}
            text={selectedView.descripcion}
            onCloseView={() => setIsOpenView(false)}
            />
)}
        </div>
    </>
    );
}