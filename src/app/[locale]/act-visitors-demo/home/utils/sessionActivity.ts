// utils/sessionActivity.ts
let __sessionAlreadyLogged = false; // 🧠 variable global compartida

export function setupSessionEndLogging(userId: string, backendBase = "http://localhost:3000") {
  const endpoint = `${backendBase}/api/activity`;

  const logSessionEnd = () => {
    // 💥 Evita duplicados incluso entre closures
    if (__sessionAlreadyLogged) return;
    __sessionAlreadyLogged = true;

    const data = {
      userId,
      role: "visitor",
      type: "session_end",
      metadata: { reason: "page_closed" },
      timestamp: new Date().toISOString(),
    };

    console.log("🚪 Enviando session_end:", data);

    try {
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      const ok = navigator.sendBeacon(endpoint, blob);
      console.log("📡 sendBeacon resultado:", ok);
    } catch (e) {
      console.warn("❌ sendBeacon falló:", e);
    }
  };

  // Eventos que se disparan al cerrar o cambiar de pestaña
  window.addEventListener("beforeunload", logSessionEnd, { once: true });
  window.addEventListener("pagehide", logSessionEnd, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") logSessionEnd();
  });

  console.log("🟢 setupSessionEndLogging activado para", userId);

  return () => {
    window.removeEventListener("beforeunload", logSessionEnd);
    window.removeEventListener("pagehide", logSessionEnd);
    document.removeEventListener("visibilitychange", logSessionEnd);
  };
}