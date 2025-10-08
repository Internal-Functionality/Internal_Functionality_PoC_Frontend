//import React from 'react'

//export default function Page () {
//  return (
//    <div>
//       <h1>Demo actividad visitors</h1>
//    </div>
//  )
//}

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from './stylesLogin.module.css'

export default function LoginPage() {
  const router = useRouter();

  const handleVisitorLogin = () => {
    // Generar un ID único simulado para el visitante
    const visitorId = crypto.randomUUID();

    // Guardarlo en sessionStorage para identificarlo mientras navega
    sessionStorage.setItem("visitorId", visitorId);

    // Redirigir a la página principal del visitante
    router.push("/act-visitors-demo");
  };

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.title_header}>SERVINEO</h1>
      </div>

      <div className={styles.containerLogin}>
        <h1>Inicio de Sesión</h1>

        <div style={{ marginTop: "20px" }}>
          <input type="text" placeholder="Username" disabled style={{ margin: "5px" }} />
          <br />
          <input type="password" placeholder="Password" disabled style={{ margin: "5px" }} />
          <br />
          <button
            onClick={handleVisitorLogin}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Entrar como Visitor
          </button>
        </div>
      </div>
    </div>
  );
}
