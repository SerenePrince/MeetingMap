import { useState } from "react";
import { useAuthContext } from "./useContexts.jsx";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const login = async (email, password) => {
    // Early validation
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid email or password.");
        } else {
          throw new Error(json?.error || "Failed to login.");
        }
      }

      // Successful login
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setError(null); // Clear previous errors
      navigate("/rooms");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
