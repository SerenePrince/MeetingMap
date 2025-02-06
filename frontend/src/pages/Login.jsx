import { useState } from "react";
import { useLogin } from "../hooks/useLogin.jsx";
import Loading from "../components/Loading.jsx";

function Login() {
  const { login, error, isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center">
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-500 w-full max-w-lg rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-primary-100 mb-6 text-center text-2xl font-bold">
          Login
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-100 hover:bg-primary-200 w-full cursor-pointer rounded-lg p-4 font-semibold text-black transition disabled:opacity-50"
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-4 rounded-lg bg-red-500 p-3 text-center font-semibold text-black shadow-md">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
