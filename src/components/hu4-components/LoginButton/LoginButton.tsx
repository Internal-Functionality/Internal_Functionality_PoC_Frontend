"use client";

import React, { useState } from "react";
import type { LoginButtonProps } from "./LoginButton.types";

const LoginButton: React.FC<LoginButtonProps> = ({ onAuthChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleClick = () => {
    const newAuthState = !isAuthenticated;
    setIsAuthenticated(newAuthState);

    if (onAuthChange) {
      onAuthChange(newAuthState);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        isAuthenticated
          ? "bg-blue-500 text-white hover:bg-blue-600 border-2 border-blue-500"
          : "bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50"
      }`}
    >
      {isAuthenticated ? "Registrado" : "Acceder/Registrarse"}
    </button>
  );
};

export default LoginButton;
