"use client";
import { useState } from "react";
import FixerCard from "@/components/components-h6/FixerCard";
import JobOffersBox from "@/components/components-h6/JobOffersBox";
import JobRegisterBox from "@/components/components-h6/JobRegisterBox";
import ModalRequester from "@/components/components-h6/ModalRequester";
import RoleBottom from "@/components/components-h6/RoleBottom";

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
export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<OfferedJob | null>(null);
    const persona = { id: "P001", nombre: "Usuario POC" };
    async function registrarClick(jobId: string) {
    const registro = { requesterId: persona.id, jobId, fecha: new Date().toISOString(), };
    try {
            const response = await fetch("/api/registro-click", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registro),
            });
        if (!response.ok) throw new Error("Error al registrar clic");
        console.log("Clic registrado correctamente");
    } catch (error) {
        console.error("Error:", error);
    }
    }
    function handleOpen(job: OfferedJob) {
        registrarClick(job.id); 
        setSelectedJob(job); 
        setIsOpen(true);
    }
    return (
    <>
        <div className="flex">  
            <div className="max-w-2xl w-full p-6">
                <FixerCard />
            </div>
        <div className="max-w-lg w-full mt-10 ml-15">
            <RoleBottom />
        </div>
        </div>

        <div className="flex space-x-9">
            <div className="max-w-2xl w-full p-6">
                <JobOffersBox onOpen={handleOpen} jobs={OfferedJobs} />
            </div>
            <div className="max-w-2xl w-full p-6">
                <JobRegisterBox onOpen={handleOpen} jobs={RegisteredJobs}/>
            </div>
        <div className=" w-full">
            {selectedJob && (
            <ModalRequester
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                titulo={selectedJob.titulo}
                text={selectedJob.descripcion}
            />
            )}
            
        </div>
        </div>
    </>
    );
}