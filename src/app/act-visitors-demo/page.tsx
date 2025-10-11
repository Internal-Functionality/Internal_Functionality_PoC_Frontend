'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './stylesLogin.module.css'

export default function LoginPage() {
  const router = useRouter()

  const handleVisitorLogin = async () => {
    const visitorId = crypto.randomUUID();
    localStorage.setItem('visitorId', visitorId);

    const eventData = {
      userId: visitorId,
      role: 'visitor',
      type: 'session_start',
      metadata: {},
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!res.ok) throw new Error("Error al registrar visitor");
      console.log("Visitor registrado en BD:", await res.json());
    } catch (err) {
      console.error("Error conectando al backend:", err);
    }

    router.push('/act-visitors-demo/home');
  };


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