import React from 'react';
import { Booking } from '@/app/[locale]/act-fixers-demo/page';

interface AppointmentsListProps {
  appointments: Booking[];
  onCancel: (bookingId: string) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments, onCancel }) => {
  return (
    <div className="bg-blue-100 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">Citas agendadas</h2>
      <div className="bg-white rounded-lg p-2">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0"
          >
            <div>
              <p className="font-bold text-gray-800">{new Date(appointment.date).toLocaleString()}</p>
              <p className="text-sm text-gray-600">{appointment.clientName} - {appointment.service}</p>
            </div>
            <button
              onClick={() => onCancel(appointment._id)}
              className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;