'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './stylesLogin.module.css';

export default function LoginPage() {
  const router = useRouter();

  const handleVisitorLogin = () => {
    // Guardar el rol del usuario (solo para simular login)
    localStorage.setItem('role', 'visitor');

    // Simular registro de telemetría (login)
    console.log({
      type: 'login',
      role: 'visitor',
      timestamp: new Date().toISOString(),
    });

    // Redirigir a Home
    router.push('/act-visitors-demo/home');
  };

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.title_header}>SERVINEO</h1>
      </div>

      <div className={styles.containerLogin}>
        <h1 className={styles.titleLogin}>Inicio de Sesión</h1>

        <div style={{ marginTop: "20px" }}>
          <input type="text" placeholder="Username" disabled style={{ margin: "5px" }} />
          <br />
          <input type="password" placeholder="Password" disabled style={{ margin: "5px" }} />
          <br />
          <button className={styles.btnVisitor} onClick={handleVisitorLogin}>
            Entrar como Visitor
          </button>
        </div>
      </div>
    </div>
  );
}