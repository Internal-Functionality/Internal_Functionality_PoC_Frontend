'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './stylesLogin.module.css'

export default function LoginPage() {
  const router = useRouter();

  const handleVisitorLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/visitor/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: "es" }),
      });

      if (!res.ok) throw new Error("Error al registrar visitor");

      const data = await res.json();
      console.log("Visitor registrado:", data);

      // Guarda el ID devuelto por el backend (MongoDB)
      localStorage.setItem("visitorId", data.userId);

      // Redirige solo si se registró correctamente
      router.push("/act-visitors-demo/home");

    } catch (err) {
      console.error("Error conectando al backend:", err);
      alert("❌ No se pudo registrar el visitante. Verifica la conexión con el backend.");
    }
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