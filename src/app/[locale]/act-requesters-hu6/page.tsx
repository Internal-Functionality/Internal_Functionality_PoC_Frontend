"use client";
import { Roboto } from 'next/font/google'

import { useState, useEffect } from "react";
import FixerCard from "@/components/components-h6/FixerCard";
import JobOffersBox from "@/components/components-h6/JobOffersBox";
import JobRegisterBox from "@/components/components-h6/JobRegisterBox";
import ModalRequester from "@/components/components-h6/ModalRequester";
import RoleBottom from "@/components/components-h6/RoleBottom";

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
export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<OfferedJob | null>(null);
    const [registeredJobs, setRegisteredJobs] = useState<Activity[]>([]);
    const [offeredJobs, setOfferedJobs] = useState<OfferedJob[]>([]);
    const [completedJobs, setCompletedJobs] = useState<OfferedJob[]>([]);
    const persona = { id: "507f1f77bcf86cd799439011", nombre: "Usuario POC" };

    async function fetchOfferedJobs() {
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/JobsReviews");
            if (!response.ok) throw new Error("Error al obtener trabajos ofertados");
            const data = await response.json();
            
            const offeredJobsData = data
                .filter((job: RegisteredJob) => job.status === "pending")
                .map((job: RegisteredJob) => ({
                    id: job._id,
                    titulo: job.title,
                    descripcion: job.description
                }));
            setOfferedJobs(offeredJobsData);
        } catch (error) {
            console.error("Error fetching offered jobs:", error);
            setOfferedJobs([]);
        }
    }

    async function fetchCompletedJobs() {
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/JobsReviews");
            if (!response.ok) throw new Error("Error al obtener trabajos completados");
            const data = await response.json();
            
            const completedJobsData = data
                .filter((job: RegisteredJob) => job.status === "completed")
                .map((job: RegisteredJob) => ({
                    id: job._id,
                    titulo: job.title,
                    descripcion: job.description
                }));
            setCompletedJobs(completedJobsData);
        } catch (error) {
            console.error("Error fetching completed jobs:", error);
            setCompletedJobs([]);
        }
    }

    async function fetchRegisteredJobs() {
        try {
            const response = await fetch("http://localhost:3001/api/telemetry/ActivityReviews");
            if (!response.ok) throw new Error("Error al obtener actividades registradas");
            const data = await response.json();
            
            const userActivities = data.filter((activity: Activity) => 
                activity.userId === persona.id && 
                activity.type === "click" &&
                activity.metadata?.jobTitle
            );
            setRegisteredJobs(userActivities);
        } catch (error) {
            console.error("Error fetching registered activities:", error);
            setRegisteredJobs([]);
        }
    }

    useEffect(() => {
        fetchOfferedJobs();
        fetchCompletedJobs();
        fetchRegisteredJobs();
    }, []);

    async function registrarClick(jobId: string) {
        const job = offeredJobs.find(j => j.id === jobId);
        if (!job) {
            console.error("Job not found");
            return;
        }

        const activityData = {
            userId: persona.id,
            date: new Date().toISOString(),
            role: "requester",
            type: "click",
            metadata: {
                button: "job_offer",
                jobTitle: job.titulo,
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
            if (!response.ok) throw new Error("Error al registrar clic");
            
            await fetchRegisteredJobs();
        } catch (error) {
            console.error("Error:", error);
        }
    }
    async function handleRealizedJobClick(jobTitle: string) {
        const activityData = {
            userId: persona.id,
            date: new Date().toISOString(),
            role: "requester",
            type: "click",
            metadata: {
                button: "completed_job",
                jobTitle: jobTitle
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
            if (!response.ok) throw new Error("Error al registrar clic");
            
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

    function handleRealizedJobOpen(job: any) {
        handleRealizedJobClick(job.titulo);
        setSelectedJob(job); 
        setIsOpen(true);
    }
    return (
    <>
        <section className={` ${roboto.className}`}>
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
                    <JobOffersBox onOpen={handleOpen} jobs={offeredJobs} />
                </div>
                <div className="max-w-2xl w-full p-6">
                    <JobRegisterBox onOpen={handleRealizedJobOpen} jobs={completedJobs}/>
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
        </section>
    </>
    );
}