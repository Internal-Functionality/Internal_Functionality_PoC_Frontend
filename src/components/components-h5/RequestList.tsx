import React from 'react';
import { Booking } from '@/app/[locale]/act-fixers-demo/page';

interface RequestsListProps {
  requests: Booking[];
  onAccept: (bookingId: string) => void;
}

const RequestsList: React.FC<RequestsListProps> = ({ requests, onAccept }) => {
  return (
    <div className="bg-blue-100 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">Solicitudes:</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request._id} 
            className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-bold text-gray-800">{request.requesterId?.name || 'Sin nombre'} - {request.jobId?.title || 'Sin servicio'}</p>
              <p className="text-sm text-gray-700">{new Date(request.date).toLocaleString()}</p>
            </div>
            <button
              onClick={() => onAccept(request._id)}
              className="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Aceptar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsList;