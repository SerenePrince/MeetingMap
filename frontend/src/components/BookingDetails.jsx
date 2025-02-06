import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { useAuthContext, useBookingsContext } from "../hooks/useContexts.jsx";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { format, parseISO } from "date-fns";

function BookingDetails({ booking, setDeleted }) {
  const { user } = useAuthContext();
  const { dispatch } = useBookingsContext();
  const isAdmin = user?.data.role === "admin";

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/${booking._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to delete booking");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Booking deleted successfully.");
      dispatch({ type: "DELETE_BOOKING", payload: { _id: booking._id } });
      setDeleted(true);
    },
    onError: () => toast.error("Failed to delete booking. Please try again."),
  });

  // Format date and times
  const formattedDate = format(
    parseISO(booking.date.split("T")[0]),
    "MMMM d, yyyy",
  );
  const formattedStartTime = format(new Date(booking.startTime), "hh:mm a");
  const formattedEndTime = format(new Date(booking.endTime), "hh:mm a");

  return (
    <article className="bg-surface-500 flex flex-col gap-4 rounded-2xl p-6 shadow-lg transition hover:shadow-xl">
      {/* Header with Booking Name & Delete Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-primary-100 text-xl font-bold">
          {booking.purpose}
        </h2>
        {(user.data.id === booking.user._id || isAdmin) && (
          <button
            type="button"
            className="cursor-pointer text-red-500 transition hover:text-red-400"
            onClick={() =>
              window.confirm("Are you sure?") && deleteMutation.mutate()
            }
          >
            <FaTrash size={22} />
          </button>
        )}
      </div>

      {/* Booking Info */}
      <div className="space-y-2">
        <p>
          <span className="text-primary-100 font-semibold">Room:</span>{" "}
          {booking.room.name}
        </p>
        <p>
          <span className="text-primary-100 font-semibold">Location:</span>{" "}
          {booking.room.location}
        </p>
        <p>
          <span className="text-primary-100 font-semibold">Host:</span>{" "}
          {booking.user.firstName} {booking.user.lastName}
        </p>
        <p>
          <span className="text-primary-100 font-semibold">Date:</span>{" "}
          {formattedDate}
        </p>
        <p>
          <span className="text-primary-100 font-semibold">Start Time:</span>{" "}
          {formattedStartTime}
        </p>
        <p>
          <span className="text-primary-100 font-semibold">End Time:</span>{" "}
          {formattedEndTime}
        </p>
      </div>
    </article>
  );
}

BookingDetails.propTypes = {
  booking: PropTypes.object.isRequired,
  setDeleted: PropTypes.func,
};

export default BookingDetails;
