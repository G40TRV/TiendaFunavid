import { useState } from "preact/hooks";
import { API_ENDPOINTS } from "../../shared/api";
import { auth } from "../../shared/auth";

export const useLoginForm = (setIsAuth, setUser) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validarDatos = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Credenciales incorrectas");
        setTimeout(() => setError(""), 3000);
        return;
      }

      const data = await response.json();

      auth.setToken(data.access_token);
      auth.setAdmin(data.admin);

      setIsAuth(true);
      setUser({ ...data.admin, role: "admin" });
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("user", JSON.stringify({ ...data.admin, role: "admin" }));
    } catch (err) {
      setError("Error de conexión. Intenta más tarde.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    validarDatos,
  };
};