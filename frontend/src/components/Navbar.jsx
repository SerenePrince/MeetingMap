import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useContexts.jsx";

function Navbar() {
  const { user } = useAuthContext();

  return (
    <nav className="bg-surface-500 border-surface-400 flex flex-col items-center justify-between border-b p-4 shadow-md md:flex-row md:px-10">
      {/* Logo */}
      <Link
        to="/"
        className="text-primary-100 hover:text-primary-300 text-3xl font-bold transition-all"
      >
        MeetingMap
      </Link>

      {/* User Info / Auth Buttons */}
      {user ? (
        <p className="text-whitesmoke mt-2 text-sm md:mt-0">
          Logged in as: <span className="font-medium">{user.data.email}</span>
        </p>
      ) : (
        <div className="mt-2 flex gap-3 md:mt-0">
          <Link
            to="/login"
            className="border-primary-100 text-primary-100 hover:bg-primary-100 rounded-xl border px-5 py-1 font-semibold transition hover:text-black"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-primary-100 border-primary-100 hover:bg-primary-300 rounded-xl border px-5 py-1 font-semibold text-black shadow-md transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
