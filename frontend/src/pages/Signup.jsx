import { useState } from "react";
import { useSignup } from "../hooks/useSignup.jsx";
import Loading from "../components/Loading.jsx";

function Signup() {
  const { signup, error, isLoading } = useSignup();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(firstName, lastName, email, password);
  };

  return (
    <div className="flex items-center justify-center">
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-500 w-full max-w-lg rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-primary-100 mb-6 text-center text-2xl font-bold">
          Sign Up
        </h2>

        {/* First Name Input */}
        <div className="mb-4">
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="Enter your first name"
            className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
            required
          />
        </div>

        {/* Last Name Input */}
        <div className="mb-4">
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Enter your last name"
            className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
            required
          />
        </div>

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
          {isLoading ? "Signing Up..." : "Sign Up"}
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

export default Signup;
