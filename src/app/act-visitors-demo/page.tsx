'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './stylesLogin.module.css'

export default function LoginPage() {
  const router = useRouter()

  const handleVisitorLogin = () => {
    // Generar un ID único para el visitante
    const visitorId = crypto.randomUUID()

    // Guardar en localStorage
    localStorage.setItem('visitorId', visitorId)

    // Simular registro en telemetría (por ahora solo consola)
    console.log('Visitor logged in:', {
      visitorId,
      role: 'visitor',
      type: 'session_start',
      timestamp: new Date().toISOString(),
    })

    // Redirigir a la página principal del visitor
    router.push('/act-visitors-demo/home')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Servineo</h1>
      </div>

      <div className={styles.loginBox}>
        <label className={styles.label}>Usuario:</label>
        <input className={styles.input} type="text" placeholder="Usuario" />

        <label className={styles.label}>Contraseña:</label>
        <input className={styles.input} type="password" placeholder="Contraseña" />

        <div className={styles.buttonGroup}>
          <button className={styles.visitorButton} onClick={handleVisitorLogin}>
            Entrar como visitor
          </button>
          <button className={styles.loginButton}>Login</button>
        </div>
      </div>
    </div>
  )
}