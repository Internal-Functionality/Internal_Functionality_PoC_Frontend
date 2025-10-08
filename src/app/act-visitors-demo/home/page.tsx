'use client'

import React from 'react'
import styles from './stylesHome.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Página principal del Visitor</h1>
      <p>Desde aquí podrá explorar trabajos disponibles, pero no publicar.</p>
      <button className={styles.searchButton}>Buscar trabajos</button>
    </div>
  )
}

