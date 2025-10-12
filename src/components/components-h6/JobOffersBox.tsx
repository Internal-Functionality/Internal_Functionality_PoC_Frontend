"use client";

interface OfferedJob {
    id: string;
    titulo: string;
    descripcion: string;
}

type JobOffersBoxProps = {
    onOpen: (job: OfferedJob) => void;
    jobs: OfferedJob[];
};
export default function JobOffersBox({ onOpen, jobs }: JobOffersBoxProps) {
    return (
    <div className="min-w-2xl w-full text-2xl mt-5">
        Trabajos Ofertados:
        <p className="text-sm mt-2 ml-1">Total {jobs.length} trabajos</p>
        <div className="mt-8">
            <ul className="text-sm text-left ">
            {jobs.map((job, index) => (
            <li key={index} className="w-full mt-5">
                <div onClick={() => onOpen(job)} className="cursor-pointer block bg-blue-100 rounded-xl shadow-md p-7   text-2xl hover:bg-blue-200 transition-colors" >
                    {job.titulo}
                <p className="text-sm ">{job.descripcion.slice(0, 40)}...</p>
                </div>
            </li>
            ))}
        </ul>
        </div>
    </div>
    );
}
