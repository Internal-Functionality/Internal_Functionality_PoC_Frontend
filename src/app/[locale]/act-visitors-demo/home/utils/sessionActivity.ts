let __sessionAlreadyLogged = false;

export function setupSessionEndLogging(userId: string, backendEnpoint: string) {

  const logSessionEnd = () => {
    if (__sessionAlreadyLogged) return;
    __sessionAlreadyLogged = true;

    const data = {
      userId,
      role: "visitor",
      type: "session_end",
      metadata: { reason: "page_closed" },
      timestamp: new Date().toISOString(),
    };

    try {
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      const ok = navigator.sendBeacon(backendEnpoint, blob);
      console.log(" sendBeacon resultado:", ok);
    } catch (e) {
      console.warn("sendBeacon falló:", e);
    }
  };

  window.addEventListener("beforeunload", logSessionEnd, { once: true });
  window.addEventListener("pagehide", logSessionEnd, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") logSessionEnd();
  });

  return () => {
    window.removeEventListener("beforeunload", logSessionEnd);
    window.removeEventListener("pagehide", logSessionEnd);
    document.removeEventListener("visibilitychange", logSessionEnd);
  };
}