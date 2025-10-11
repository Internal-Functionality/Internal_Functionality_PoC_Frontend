'use client';

import React, { useState } from 'react';
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
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);


  const handleAccept = (bookingId: string) => {
    setBookings(currentBookings =>
      currentBookings.map(booking =>
        booking._id === bookingId ? { ...booking, status: 'confirmed' } : booking
      )
    );
  };

  const handleCancel = (bookingId: string) => {
    setBookings(currentBookings =>
      currentBookings.map(booking =>
        booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );
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