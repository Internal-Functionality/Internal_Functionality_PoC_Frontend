'use client'
import React, { useState } from 'react'
import styles from './stylesHome.module.css'

export default function HomePage() {
  const [searchFixer, setSearchFixer] = useState('')
  const [searchRequester, setSearchRequester] = useState('')

  const logTelemetry = async (type: string, metadata = {}) => {
    const visitorId = localStorage.getItem('visitorId') || 'unknown';
    const data = {
      userId: visitorId,
      role: 'visitor',
      type,
      metadata,
      timestamp: new Date().toISOString(),
    };

    console.log('Telemetry Event:', data);

    try {
      const res = await fetch("http://localhost:3000/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al registrar actividad");
      console.log("Actividad registrada:", await res.json());
    } catch (err) {
      console.error("Error enviando actividad:", err);
    }
  };


  const handleSearchFixer = () => {
    logTelemetry('search', { searchTerm: searchFixer, section: 'fixer' })
  }

  const handleSearchRequester = () => {
    logTelemetry('search', { searchTerm: searchRequester, section: 'requester' })
  }

  const handleClickFixer = () => {
    logTelemetry('click', { button: 'Ver información del trabajo', section: 'fixer' })
  }

  const handleClickRequester = () => {
    logTelemetry('click', { button: 'Ver fixer', section: 'requester' })
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Servineo</h1>
        <div className={styles.headerButtons}>
          <button>Iniciar Sesión</button>
          <button>Registrar</button>
        </div>
      </header>

      {/* SECCIÓN FIXER */}
      <section className={styles.section}>
        <h2>Fixer:</h2>
        <div className={styles.searchContainer}>
          <label>SEARCH:</label>
          <input
            type="text"
            value={searchFixer}
            onChange={(e) => setSearchFixer(e.target.value)}
            placeholder="Buscar trabajo..."
          />
          <button onClick={handleSearchFixer}>Buscar</button>
        </div>

        <div className={styles.card}>
          <div className={styles.imagePlaceholder}>Imagen trabajo especial</div>
        </div>

        <div className={styles.jobCard}>
          <div className={styles.imageBox}>Img</div>
          <div className={styles.jobInfo}>
            <p>Descripción</p>
            <p>Lugar: ****</p>
          </div>
          <button onClick={handleClickFixer}>Ver información del trabajo</button>
        </div>

        <div className={styles.jobCard}>
          <div className={styles.imageBox}>Img</div>
          <div className={styles.jobInfo}>
            <p>Descripción</p>
            <p>Lugar: ****</p>
          </div>
          <button onClick={handleClickFixer}>Ver información del trabajo</button>
        </div>
      </section>

      {/* SECCIÓN REQUESTER */}
      <section className={styles.section}>
        <h2>Requester:</h2>
        <div className={styles.searchContainer}>
          <label>SEARCH:</label>
          <input
            type="text"
            value={searchRequester}
            onChange={(e) => setSearchRequester(e.target.value)}
            placeholder="Buscar fixer..."
          />
          <button onClick={handleSearchRequester}>Buscar</button>
        </div>

        <div className={styles.jobCard}>
          <div className={styles.imageBox}>Imagen: Fixer</div>
          <div className={styles.jobInfo}>
            <p>Descripción</p>
            <button onClick={handleClickRequester}>Ver fixer</button>
          </div>
        </div>

        <div className={styles.jobCard}>
          <div className={styles.imageBox}>Imagen: Fixer</div>
          <div className={styles.jobInfo}>
            <p>Descripción</p>
            <button onClick={handleClickRequester}>Ver fixer</button>
          </div>
        </div>
      </section>
    </div>
  )
}