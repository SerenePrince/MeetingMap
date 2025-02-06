import RoomDetails from "../components/RoomDetails.jsx";
import { Link } from "react-router-dom";
import { useRoomsContext } from "../hooks/useContexts.jsx";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout.jsx";
import { useAuthContext } from "../hooks/useContexts.jsx";
import Loading from "../components/Loading.jsx";

function Rooms() {
  const { logout } = useLogout();
  const { rooms, dispatch } = useRoomsContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // Check if user is an admin
  const isAdmin = user?.data.role === "admin";

  useEffect(() => {
    if (!user?.data.token) return;
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch rooms");
        const json = await response.json();
        dispatch({ type: "SET_ROOMS", payload: json });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [dispatch, user?.data.token]);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 md:p-10">
      {loading && <Loading />}

      {/* Navigation Bar */}
      <div className="mb-5 flex flex-col items-center justify-between lg:flex-row">
        <h1 className="text-primary-100 mb-3 text-2xl font-bold lg:mb-0">
          Rooms
        </h1>

        <div className="flex flex-wrap gap-4">
          {isAdmin && (
            <>
              <Link
                to="create"
                className="bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2 font-semibold text-black shadow-md transition"
              >
                + Add Room
              </Link>
              <Link
                to="/users"
                className="bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2 font-semibold text-black shadow-md transition"
              >
                Manage Users
              </Link>
            </>
          )}
          <Link
            to="/bookings"
            className="bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2 font-semibold text-black shadow-md transition"
          >
            View Bookings
          </Link>
          <button
            onClick={logout}
            className="text-light-a0 cursor-pointer rounded-lg bg-red-500 px-5 py-2 font-semibold shadow-md transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rooms.data?.length > 0 ? (
          rooms.data.map((room) => <RoomDetails key={room._id} room={room} />)
        ) : (
          <p className="text-light-a0">
            {user ? "No rooms available." : "Must be logged in to view rooms."}
          </p>
        )}
      </div>
    </section>
  );
}

export default Rooms;
