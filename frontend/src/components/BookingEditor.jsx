import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useBookingsContext, useAuthContext } from "../hooks/useContexts.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import BookingDetails from "./BookingDetails.jsx";
import Loading from "./Loading.jsx";
import BackButton from "./BackButton.jsx";

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours24 = Math.floor(i / 2); // 24-hour format
  const minutes = i % 2 === 0 ? "00" : "30";

  // Convert 24-hour to 12-hour format
  const hours12 = hours24 % 12 || 12; // 12-hour format
  const ampm = hours24 < 12 ? "AM" : "PM";

  const label = `${hours12}:${minutes} ${ampm}`;
  const value = `${String(hours24).padStart(2, "0")}:${minutes}`; // <-- 24-hour format value

  return { value, label };
});

function BookingEditor() {
  const { roomId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const { bookings, dispatch } = useBookingsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["bookings", roomId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/room/${roomId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return response.json();
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (data) dispatch({ type: "SET_BOOKINGS", payload: data });
  }, [data, dispatch]);

  const filteredBookings = selectedDate
    ? bookings.data?.bookings?.filter(
        (booking) =>
          booking.date.split("T")[0] ===
          selectedDate.toISOString().split("T")[0],
      )
    : bookings.data?.bookings;

  const mutation = useMutation({
    mutationFn: async (newBooking) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
        body: JSON.stringify(newBooking),
      });
      if (!response.ok) throw new Error("Failed to create booking");
      return response.json();
    },
    onSuccess: (updatedBooking) => {
      toast.success("Booking confirmed!");
      dispatch({ type: "CREATE_BOOKING", payload: updatedBooking.data });
      navigate("/bookings");
    },
    onError: () => toast.error("Error creating booking. Please try again."),
  });

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDate || !startTime || !endTime || !purpose) {
      return toast.error("Please select a date, time range, and purpose.");
    }

    const selectedStartTime = new Date(selectedDate);
    const selectedEndTime = new Date(selectedDate);
    const [startHours, startMinutes] = startTime.value.split(":").map(Number);
    const [endHours, endMinutes] = endTime.value.split(":").map(Number);

    selectedStartTime.setHours(startHours, startMinutes, 0, 0);
    selectedEndTime.setHours(endHours, endMinutes, 0, 0);

    if (selectedStartTime >= selectedEndTime) {
      return toast.error("End time must be after start time.");
    }

    mutation.mutate({
      date: selectedDate.toISOString().split("T")[0],
      startTime: selectedStartTime.toISOString(),
      endTime: selectedEndTime.toISOString(),
      room: roomId,
      user: user.data.id,
      purpose: purpose.trim(),
    });
  };

  if (isError || !user) {
    return (
      <p className="mt-5 text-center text-lg text-red-400">
        Error: {!user ? "Must be logged in to book a room." : error.message}
      </p>
    );
  }

  return (
    <>
      <div className="bg-surface-500 mx-auto w-full max-w-lg rounded-2xl p-6 shadow-lg">
        {isLoading && <Loading />}
        <h2 className="text-primary-100 mb-6 text-center text-2xl font-bold">
          Book a Meeting
        </h2>
        <form onSubmit={handleBooking}>
          <div className="mb-4 flex flex-col justify-center align-middle">
            <label className="mb-1 block text-sm font-medium">
              Select Date:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Start Time:
            </label>
            <Select
              options={timeOptions}
              value={startTime}
              onChange={setStartTime}
              isDisabled={!selectedDate}
              className="text-black"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">End Time:</label>
            <Select
              options={timeOptions.filter(
                (t) => startTime && t.value > startTime.value,
              )}
              value={endTime}
              onChange={setEndTime}
              isDisabled={!startTime}
              className="text-black"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Purpose:</label>
            <input
              type="text"
              value={purpose || ""}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter purpose (e.g., Interview, Team Sync, Scrum Meeting)"
              className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="bg-primary-100 w-full cursor-pointer rounded-lg p-4 font-semibold text-black transition disabled:opacity-50"
          >
            {mutation.isLoading ? "Booking..." : "Book Meeting"}
          </button>
        </form>
      </div>
      <BackButton />
      <div className="mx-auto mt-5 grid w-full max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredBookings?.length ? (
          filteredBookings.map((b) => (
            <BookingDetails key={b._id} booking={b} />
          ))
        ) : (
          <p className="text-light-a0 text-center">No bookings available.</p>
        )}
      </div>
    </>
  );
}

export default BookingEditor;
