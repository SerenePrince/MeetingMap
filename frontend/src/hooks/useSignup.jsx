import { useState } from "react";
import { useAuthContext } from "./useContexts.jsx";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const signup = async (firstName, lastName, email, password) => {
    // Prevent signup if any field is missing
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Please fill out all required fields.");
        } else if (response.status === 409) {
          throw new Error("Email is already in use.");
        } else {
          throw new Error(json?.error || "Signup failed.");
        }
      }

      // Successful signup
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

  return { signup, isLoading, error };
};
