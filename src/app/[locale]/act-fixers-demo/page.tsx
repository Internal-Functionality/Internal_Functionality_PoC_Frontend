'use client';

import React, { useState, useEffect } from 'react'; 
import Header from '@/components/components-h5/Header';
import RequestsList from '@/components/components-h5/RequestList';
import Calendar from '@/components/components-h5/Calendar';
import AppointmentsList from '@/components/components-h5/AppointmentsList';

export interface Booking {
  _id: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  clientName: string;
  service: string;
}
//datos mock
const initialBookings: Booking[] = [
  { _id: '1', date: '2025-09-30T14:00:00Z', status: 'pending', clientName: 'Maria Fernandez', service: 'Revisión general' },
  { _id: '2', date: '2025-09-30T16:00:00Z', status: 'pending', clientName: 'Josue Onofre', service: 'Instalación de software' },
  { _id: '101', date: '2025-09-29T10:00:00Z', status: 'confirmed', clientName: 'Carlos La Fuente', service: 'Mantenimiento preventivo' },
];

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/fixer-activity');
        const data = await response.json();

        if (data && data.requests && data.appointments) {
          const allBookings = [...data.requests, ...data.appointments]; 
          setBookings(allBookings); 
        }
        
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    fetchActivityData();
  }, []);

  

  const handleAccept = async (bookingId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/fixer-activity/${bookingId}/accept`, {
        method: 'PATCH', 
      });
      const updatedBooking: Booking = await response.json();

      setBookings(currentBookings =>
        currentBookings.map(booking =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  const handleCancel = async (bookingId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/fixer-activity/${bookingId}/cancel`, {
        method: 'PATCH',
      });
      const updatedBooking: Booking = await response.json();

      setBookings(currentBookings =>
        currentBookings.map(booking =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
    }
  };

  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const confirmedAppointments = bookings.filter(b => b.status === 'confirmed');
  
  return (
    <main className="bg-slate-100 min-h-screen p-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <Header userName="Fixer" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RequestsList requests={pendingRequests} onAccept={handleAccept} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Calendar />
            <AppointmentsList appointments={confirmedAppointments} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    </main>
  );
}