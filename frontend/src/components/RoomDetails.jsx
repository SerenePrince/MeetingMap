import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useContexts.jsx";

function RoomDetails({ room }) {
  const { user } = useAuthContext();
  const isAdmin = user.data?.role === "admin";

  return (
    <article className="bg-surface-500 flex flex-col gap-4 rounded-2xl p-6 shadow-lg transition hover:shadow-xl">
      {/* Header with Room Name & Edit Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-primary-100 text-xl font-bold">{room.name}</h2>
        {isAdmin && (
          <Link
            to={`update/${room._id}`}
            state={{ room }}
            className="text-primary-100 hover:text-primary-300 transition"
          >
            <FaEdit size={22} />
          </Link>
        )}
      </div>

      {/* Room Info */}
      <div className="space-y-2">
        <p>
          <span className="text-primary-100 font-semibold">Location:</span>{" "}
          {room.location}
        </p>
        <p>
          <span className="text-primary-100 font-semibold">Capacity:</span>{" "}
          {room.capacity}
        </p>
        <p>
          <span className="text-primary-100 font-semibold">Amenities:</span>{" "}
          {room.amenities.join(", ")}
        </p>
      </div>

      {/* Availability & Booking Button */}
      <div className="mt-4 flex items-center justify-between">
        <p
          className={`rounded-lg px-3 py-1 text-sm font-semibold ${room.isAvailable ? "bg-green-800 text-green-300" : "bg-red-800 text-red-300"}`}
        >
          {room.isAvailable ? "Available" : "Unavailable"}
        </p>
        <Link
          to={`book/${room._id}`}
          className="bg-primary-100 hover:bg-primary-300 rounded-lg px-3 py-1 text-sm font-semibold text-black transition"
        >
          + Book a Time Slot
        </Link>
      </div>
    </article>
  );
}

RoomDetails.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomDetails;
