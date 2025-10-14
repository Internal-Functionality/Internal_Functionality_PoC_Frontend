"use client";
import { useState, useEffect } from "react";
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
    _id: string;
    title: string;
    description: string;
    status: string;
    requesterId: string;
    fixerId: string;
    price: number;
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
// Trabajos realizados (historial del fixer - solo para ver detalles)
const TrabajosRealizados = [
    {
        id: "T004",
        titulo: "Reparacion PC",
        descripcion: "Comentario de Maria Lopez: Excelente trabajo, lo areglo de manera precisa y rapida",
    },
    {
        id: "T005", 
        titulo: "Instalacion de programa",
        descripcion: "Comentario de Juan Perez: No me gusto el trabajo, el sistema tiene muchas fallas",
    },
];
export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<OfferedJob | null>(null);
    const [registeredJobs, setRegisteredJobs] = useState<RegisteredJob[]>([]);
    const persona = { id: "507f1f77bcf86cd799439011", nombre: "Usuario POC" };

    // Función para obtener trabajos ya registrados por el usuario desde la BD
    async function fetchRegisteredJobs() {
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/JobsReviews");
            if (!response.ok) throw new Error("Error al obtener trabajos registrados");
            const data = await response.json();
            
            // Filtrar solo los trabajos del usuario actual
            const userJobs = data.filter((job: RegisteredJob) => job.requesterId === persona.id);
            setRegisteredJobs(userJobs);
        } catch (error) {
            console.error("Error al obtener trabajos registrados:", error);
            setRegisteredJobs([]);
        }
    }

    // Función para verificar si un trabajo ya está registrado por el usuario
    function isJobAlreadyRegistered(jobTitle: string): boolean {
        return registeredJobs.some(job => 
            job.requesterId === persona.id && 
            job.title.toLowerCase().trim() === jobTitle.toLowerCase().trim()
        );
    }

    // Efecto para cargar trabajos registrados al montar el componente
    useEffect(() => {
        fetchRegisteredJobs();
    }, []);

    async function registrarClick(jobId: string) {
        const job = OfferedJobs.find(j => j.id === jobId);
        if (!job) {
            console.error("Trabajo no encontrado");
            return;
        }

        // Verificar si el trabajo ya está registrado por este usuario
        if (isJobAlreadyRegistered(job.titulo)) {
            console.log(`El trabajo "${job.titulo}" ya está registrado por este usuario`);
            return;
        }

        const jobData = {
            title: job.titulo,
            description: job.descripcion,
            status: "pending",
            requesterId: persona.id,
            price: 0,
        };
        
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/JobsReviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData),
            });
            if (!response.ok) throw new Error("Error al registrar clic");
            console.log("Clic registrado correctamente como Job");
            
            // Actualizar la lista de trabajos registrados después de registrar uno nuevo
            await fetchRegisteredJobs();
        } catch (error) {
            console.error("Error:", error);
        }
    }
    // Función para manejar clics en trabajos realizados (solo verificación, no registro)
    async function handleRealizedJobClick(jobTitle: string) {
        // Verificar si el trabajo ya está registrado por este usuario
        if (isJobAlreadyRegistered(jobTitle)) {
            console.log(`El trabajo "${jobTitle}" ya está registrado por este usuario`);
            return;
        }

        const jobData = {
            title: jobTitle,
            description: "Trabajo realizado - visualización de detalles",
            status: "pending",
            requesterId: persona.id,
            price: 0,
        };
        
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/JobsReviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData),
            });
            if (!response.ok) throw new Error("Error al registrar clic");
            console.log("Clic en trabajo realizado registrado correctamente");
            
            // Actualizar la lista de trabajos registrados después de registrar uno nuevo
            await fetchRegisteredJobs();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function handleOpen(job: OfferedJob) {
        registrarClick(job.id); 
        setSelectedJob(job); 
        setIsOpen(true);
    }

    // Función para manejar clics en trabajos realizados
    function handleRealizedJobOpen(job: any) {
        handleRealizedJobClick(job.titulo);
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
                <JobRegisterBox onOpen={handleRealizedJobOpen} jobs={TrabajosRealizados}/>
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