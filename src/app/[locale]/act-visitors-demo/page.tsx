'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './stylesLogin.module.css'
import { API_CONFIG } from '@/config/api';

export default function LoginPage() {
  const LS_KEY = "visitorId";
  const router = useRouter();

  const handleVisitorLogin = async () => {

    const isValidObjectId = (id: string) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

    const createVisitor = async () => {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VISITORS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: "es" }),
      });

      if (!res.ok) throw new Error("Error al registrar visitor (POST)");

      const data = await res.json();
      if (!data || !data.userId || !isValidObjectId(data.userId)) {
        throw new Error("Respuesta inválida al crear visitor");
      }
      return data.userId;
    };

    const verifyVisitor = async (id: string) => {
      try {
        const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VISITORS}/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return false;
        const user = await res.json();
        if (user && user.role === "visitor") return true;
        return !!user;
      } catch (e) {
        console.warn("No se pudo verificar visitorId en backend:", e);
        return null;
      }
    };
    try {
      const localId = localStorage.getItem(LS_KEY);
      if (localId && isValidObjectId(localId)) {
        const verified = await verifyVisitor(localId);
        if (verified === true) {
          router.push("/act-visitors-demo/home");
          return;
        }
        console.log("visitorId local no encontrado en DB, se creará uno nuevo.");
      }

      const newId = await createVisitor();

      localStorage.setItem(LS_KEY, newId);

      router.push("/act-visitors-demo/home");

    } catch (err) {
      console.error("Error en handleVisitorLogin:", err);
      alert("No se pudo registrar el visitante. Verifica la conexión con el backend.");
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