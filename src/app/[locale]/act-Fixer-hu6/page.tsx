"use client";
import { Roboto } from 'next/font/google'
import { useState, useEffect } from "react";
import FixerCardEditable from "@/components/components-h6/FixerCardEditable";
import JobOffersBox from "@/components/components-h6/JobOffersBox";
import JobRegisterBox from "@/components/components-h6/JobRegisterBox";
import ModalRequester from "@/components/components-h6/ModalRequester";
import RoleBottom from "@/components/components-h6/RoleBottom";
import ModalView from "@/components/components-h6/ModalView";
import ViewBottom from "@/components/components-h6/ViewBottom";

const roboto = Roboto({
    weight: '300',
    subsets: ['latin'],
})
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

interface Activity {
    _id: string;
    userId: string;
    date: string;
    role: string;
    type: string;
    metadata: {
        button?: string;
        jobTitle?: string;
        jobId?: string;
        [key: string]: any;
    };
    timestamp: string;
}
interface View {
    titulo: string;
    descripcion: string;
}
export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<OfferedJob | null>(null);
    const [isOpenView, setIsOpenView] = useState(false);
    const [selectedView, setSelectedView] = useState<View | null>(null);
    const [offeredJobs, setOfferedJobs] = useState<OfferedJob[]>([]);
    const [completedJobs, setCompletedJobs] = useState<OfferedJob[]>([]);
    const [registeredJobs, setRegisteredJobs] = useState<Activity[]>([]);
    const persona = { id: "507f1f77bcf86cd799439011", nombre: "Usuario POC" };

    // Función para obtener trabajos ofertados (pending) desde la BD
    async function fetchOfferedJobs() {
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/JobsReviews");
            if (!response.ok) throw new Error("Error al obtener trabajos ofertados");
            const data = await response.json();
            
            // Filtrar solo trabajos pending y convertir a formato OfferedJob
            const offeredJobsData = data
                .filter((job: RegisteredJob) => job.status === "pending")
                .map((job: RegisteredJob) => ({
                    id: job._id,
                    titulo: job.title,
                    descripcion: job.description
                }));
            setOfferedJobs(offeredJobsData);
        } catch (error) {
            console.error("Error al obtener trabajos ofertados:", error);
            setOfferedJobs([]);
        }
    }

    // Función para obtener trabajos completados desde la BD
    async function fetchCompletedJobs() {
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/JobsReviews");
            if (!response.ok) throw new Error("Error al obtener trabajos completados");
            const data = await response.json();
            
            // Filtrar solo trabajos completed y convertir a formato OfferedJob
            const completedJobsData = data
                .filter((job: RegisteredJob) => job.status === "completed")
                .map((job: RegisteredJob) => ({
                    id: job._id,
                    titulo: job.title,
                    descripcion: job.description
                }));
            setCompletedJobs(completedJobsData);
        } catch (error) {
            console.error("Error al obtener trabajos completados:", error);
            setCompletedJobs([]);
        }
    }

    // Función para obtener actividades ya registradas por el usuario desde la BD
    async function fetchRegisteredJobs() {
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/ActivityReviews");
            if (!response.ok) throw new Error("Error al obtener actividades registradas");
            const data = await response.json();
            
            // Filtrar solo las actividades del usuario actual con tipo "click"
            const userActivities = data.filter((activity: Activity) => 
                activity.userId === persona.id && 
                activity.type === "click" &&
                activity.metadata?.jobTitle
            );
            setRegisteredJobs(userActivities);
        } catch (error) {
            console.error("Error al obtener actividades registradas:", error);
            setRegisteredJobs([]);
        }
    }

    // Función para verificar si un trabajo ya está registrado por el usuario
    function isJobAlreadyRegistered(jobTitle: string): boolean {
        return registeredJobs.some(activity => 
            activity.userId === persona.id && 
            activity.metadata?.jobTitle?.toLowerCase().trim() === jobTitle.toLowerCase().trim()
        );
    }

    // Efecto para cargar todos los trabajos al montar el componente
    useEffect(() => {
        fetchOfferedJobs();
        fetchCompletedJobs();
        fetchRegisteredJobs();
    }, []);

    // Función para registrar clic en activities
    async function registrarClick(jobId: string, jobTitle: string, buttonType: string) {
        // Verificar si el trabajo ya está registrado por este usuario
        if (isJobAlreadyRegistered(jobTitle)) {
            console.log(`El trabajo "${jobTitle}" ya está registrado por este usuario`);
            return;
        }

        const activityData = {
            userId: persona.id,
            date: new Date().toISOString(),
            role: "fixer",
            type: "click",
            metadata: {
                button: buttonType,
                jobTitle: jobTitle,
                jobId: jobId
            },
            timestamp: new Date().toISOString()
        };
        
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/ActivityReviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(activityData),
            });
            const result = await response.json();
            console.log("Respuesta del backend (fixer):", result);
            if (!response.ok) throw new Error("Error al registrar clic");
            console.log("Clic registrado correctamente en activities");
            
            // Actualizar la lista de trabajos registrados después de registrar uno nuevo
            await fetchRegisteredJobs();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleOpenModal = (job: OfferedJob) => {
        registrarClick(job.id, job.titulo, "job_offer");
        setSelectedJob(job);
        setIsOpen(true);
    };
    const handleOpenModalR = (job: OfferedJob) => {
        registrarClick(job.id, job.titulo, "completed_job");
        setSelectedJob(job);
        setIsOpen(true);
    };
    const handleOpenModalViews = (views: View) => {
        setSelectedView(views);
        setIsOpenView(true);
    };
    return (
    <>
        <section className={` ${roboto.className}`}>
            <div className="flex ${roboto.className}">
                <div className="max-w-2xl w-full p-6">
                    <FixerCardEditable />
                </div>
                <div className="max-w-lg w-full mt-10 ml-15">
                    <RoleBottom />
                </div>
            </div>
            <div className="px-6">
                <button className="cursor-pointer bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                + Publicar Oferta de Trabajo
                </button>
            </div>

            <div className="flex space-x-9">
            <div className="max-w-2xl w-full p-6 ">
                <JobOffersBox onOpen={handleOpenModal} jobs={offeredJobs} />
            </div>
            <div className="max-w-2xl w-full p-6 relative">
                <JobRegisterBox onOpen={handleOpenModalR} jobs={completedJobs} />
                <ViewBottom onOpenView={handleOpenModalViews} views={[{ titulo: "Vistas en trabajos", descripcion: `Total: ${completedJobs.length}` }]} />
            </div>
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
        </section>
    </>
    );
}