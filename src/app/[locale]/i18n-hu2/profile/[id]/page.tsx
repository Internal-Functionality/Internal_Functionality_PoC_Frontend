import {MainLayout} from '@/components/hu2-components/MainLayout'
import { NavBar } from '@/components/hu2-components/Navbar'
import React from 'react'
import {Roboto} from 'next/font/google';

const roboto = Roboto({ 
    weight: '400',
    subsets: ['latin'],
})


interface ProfessionalData {
  id: string | null;
  name: string | null;
  profession: string | null;
  specialty: string | null;
  rating: number;
  reviews: number;
  location: string | null;
  price: number;
  available: boolean;
  initials: string | null;
}
// Datos de los profesionales (puedes moverlo a un archivo separado)
const professionals = [
  {
    id: 1,
    name: 'Pedro Perez',
    profession: 'Plomero',
    specialty: 'Cerrajero',
    rating: 4.8,
    reviews: 127,
    location: 'Centro, Ciudad',
    price: 25,
    available: true,
    initials: 'PP',
    
  },
  {
    id: 2,
    name: 'Carlos Ramirez',
    profession: 'Electricista',
    specialty: '',
    rating: 4.9,
    reviews: 203,
    location: 'Zona Norte',
    price: 30,
    available: true,
    initials: 'CR',
    
  },
  {
    id: 3,
    name: 'Ana Martinez',
    profession: 'Electricista',
    specialty: '',
    rating: 4.7,
    reviews: 89,
    location: 'Zona Sur',
    price: 28,
    available: false,
    initials: 'AM',
    
  },
  {
    id: 4,
    name: 'Luis Fernandez',
    profession: 'Plomero',
    specialty: '',
    rating: 4.6,
    reviews: 156,
    location: 'Zona Este',
    price: 22,
    available: true,
    initials: 'LF',
    
  }
];

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const professionalId = parseInt(id);
  const professionalData = professionals.find(prof => prof.id === professionalId);

  // Si no se encuentra el profesional, mostrar error
  if (!professionalData) {
    return (
      <div className="flex ">
        <div className="w-[10%] h-screen bg-[#2B6AE0] text-white sticky top-0 left-0">
          <NavBar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-gray-600">Profesional no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <section className={roboto.className}>
      <div className="flex ">
        <div className="w-[10%] h-screen bg-[#2B6AE0] text-white sticky top-0 left-0">
          <NavBar />
        </div>
        <MainLayout professionalData={professionalData} />
      </div>
    </section>
  )
}