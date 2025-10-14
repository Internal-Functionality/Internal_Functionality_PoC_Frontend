import React from 'react';
import { Job } from '@/types/job';

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Descripción:</h3>
            <p className="text-gray-600">{job.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Estado:</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : job.status === 'in_progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {job.status === 'pending' ? 'Pendiente' : 
               job.status === 'in_progress' ? 'En Progreso' : 'Completado'}
            </span>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Precio:</h3>
            <p className="text-green-600 font-bold text-xl">${job.price}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Fecha de creación:</h3>
            <p className="text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
          
          {job.updatedAt && job.updatedAt !== job.createdAt && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Última actualización:</h3>
              <p className="text-gray-600">{new Date(job.updatedAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
