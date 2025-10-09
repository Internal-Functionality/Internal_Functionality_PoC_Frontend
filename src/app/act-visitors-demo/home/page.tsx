'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './stylesHome.module.css';

export default function HomePage() {
  const router = useRouter();

  // Función para simular acciones de telemetría
  const handleAction = (type: string, metadata: object = {}) => {
    const role = localStorage.getItem('role') || 'visitor';
    const event = {
      type,
      role,
      metadata,
      timestamp: new Date().toISOString(),
    };
    console.log('Evento de telemetría:', event);
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    handleAction('session_end');
    router.push('/act-visitors-demo');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido, Visitor 👋</h1>
      <p>Explora los trabajos disponibles:</p>

      <div className={styles.buttons}>
        <button onClick={() => handleAction('search', { searchTerm: 'electricista' })}>
          Buscar trabajos
        </button>

        <button onClick={() => handleAction('click', { button: 'Ver detalles de trabajo' })}>
          Simular Click
        </button>

        <button onClick={() => handleAction('review', { comment: 'Muy buen servicio' })}>
          Dejar review
        </button>

        <button onClick={() => handleAction('click', { button: 'Publicar trabajo' })}>
          Publicar trabajo
        </button>
      </div>

      <button className={styles.logout} onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}
