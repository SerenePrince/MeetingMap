import BookingDetails from "../components/BookingDetails.jsx";
import { Link } from "react-router-dom";
import { useBookingsContext } from "../hooks/useContexts.jsx";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout.jsx";
import { useAuthContext } from "../hooks/useContexts.jsx";
import Loading from "../components/Loading.jsx";

function Bookings() {
  const { logout } = useLogout();
  const { bookings, dispatch } = useBookingsContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // Check if user is an admin
  const isAdmin = user?.data.role === "admin";

  useEffect(() => {
    if (!user?.data.token) return;
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const url = isAdmin
          ? `${import.meta.env.VITE_API_URL}/bookings`
          : `${import.meta.env.VITE_API_URL}/bookings/user/${user.data.id}`;

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");
        const json = await response.json();
        dispatch({ type: "SET_BOOKINGS", payload: json });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setDeleted(false);
      }
    };

    fetchBookings();
  }, [dispatch, user?.data.token, user.data.id, isAdmin, deleted]);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 md:p-10">
      {loading && <Loading />}

      {/* Navigation Bar */}
      <div className="mb-5 flex flex-col items-center justify-between lg:flex-row">
        <h1 className="text-primary-100 mb-3 text-2xl font-bold lg:mb-0">
          Bookings
        </h1>

        <div className="flex flex-wrap gap-4">
          <>
            <Link
              to="/rooms"
              className="bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2 font-semibold text-black shadow-md transition"
            >
              View Rooms
            </Link>
          </>

          <button
            onClick={logout}
            className="text-light-a0 cursor-pointer rounded-lg bg-red-500 px-5 py-2 font-semibold shadow-md transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {bookings.data?.length > 0 ? (
          bookings.data.map((booking) => (
            <BookingDetails
              key={booking._id}
              booking={booking}
              setDeleted={setDeleted}
            />
          ))
        ) : (
          <p className="text-light-a0">
            {user
              ? "No bookings available."
              : "Must be logged in to view bookings."}
          </p>
        )}
      </div>
    </section>
  );
}

export default Bookings;
