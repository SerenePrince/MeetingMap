import UserDetails from "../components/UserDetails.jsx";
import { Link } from "react-router-dom";
import { useUsersContext } from "../hooks/useContexts.jsx";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout.jsx";
import { useAuthContext } from "../hooks/useContexts.jsx";
import Loading from "../components/Loading.jsx";

function Users() {
  const { logout } = useLogout();
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // Check if user is an admin
  const isAdmin = user?.data.role === "admin";

  useEffect(() => {
    if (!user?.data.token) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch users");
        const json = await response.json();
        dispatch({ type: "SET_USERS", payload: json });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch, user?.data.token]);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 md:p-10">
      {loading && <Loading />}

      {/* Navigation Bar */}
      <div className="mb-5 flex flex-col items-center justify-between lg:flex-row">
        <h1 className="text-primary-100 mb-3 text-2xl font-bold lg:mb-0">
          Users
        </h1>

        <div className="flex flex-wrap gap-4">
          {isAdmin && (
            <>
              <Link
                to="create"
                className="bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2 font-semibold text-black shadow-md transition"
              >
                + Add User
              </Link>
              <Link
                to="/rooms"
                className="bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2 font-semibold text-black shadow-md transition"
              >
                Manage Rooms
              </Link>
              <Link
                to="/bookings"
                className="bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2 font-semibold text-black shadow-md transition"
              >
                View Bookings
              </Link>
            </>
          )}
          <button
            onClick={logout}
            className="text-light-a0 cursor-pointer rounded-lg bg-red-500 px-5 py-2 font-semibold shadow-md transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {users.data?.length > 0 ? (
          users.data.map((user) => <UserDetails key={user._id} user={user} />)
        ) : (
          <p className="text-light-a0">
            {user ? "No users available." : "Must be logged in to view users."}
          </p>
        )}
      </div>
    </section>
  );
}

export default Users;
