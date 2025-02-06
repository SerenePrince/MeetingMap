import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext, useRoomsContext } from "../hooks/useContexts.jsx";
import BackButton from "./BackButton.jsx";
import Loading from "./Loading.jsx";

function useRoomEditor(id, user, dispatch, navigate) {
  const [roomData, setRoomData] = useState({
    name: "",
    location: "",
    capacity: "",
    amenities: [],
  });
  const [amenityInput, setAmenityInput] = useState("");

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch room");
      return response.json();
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data)
      setRoomData({ ...data.data, amenities: data.data.amenities || [] });
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (roomData) => {
      const method = id ? "PATCH" : "POST";
      const url = `${import.meta.env.VITE_API_URL}/rooms${id ? `/${id}` : ""}`;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
        body: JSON.stringify(roomData),
      });
      if (!response.ok)
        throw new Error(`Failed to ${id ? "update" : "create"} room`);
      return response.json();
    },
    onSuccess: (updatedRoom) => {
      toast.success(
        id ? "Room updated successfully." : "Room created successfully.",
      );
      dispatch({
        type: id ? "UPDATE_ROOM" : "CREATE_ROOM",
        payload: updatedRoom.data,
      });
      navigate("/rooms");
    },
    onError: () => toast.error("An error occurred. Please try again."),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to delete room");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Room deleted successfully.");
      dispatch({ type: "DELETE_ROOM", payload: { _id: id } });
      navigate("/rooms");
    },
    onError: () => toast.error("Failed to delete room. Please try again."),
  });

  return {
    roomData,
    setRoomData,
    amenityInput,
    setAmenityInput,
    isLoading,
    isError,
    error,
    mutation,
    deleteMutation,
  };
}

function RoomEditor() {
  const { id } = useParams();
  const { dispatch } = useRoomsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const {
    roomData,
    setRoomData,
    amenityInput,
    setAmenityInput,
    isLoading,
    isError,
    error,
    mutation,
    deleteMutation,
  } = useRoomEditor(id, user, dispatch, navigate);

  const handleChange = (e) =>
    setRoomData({ ...roomData, [e.target.name]: e.target.value });

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setRoomData({
        ...roomData,
        amenities: [...roomData.amenities, amenityInput.trim()],
      });
      setAmenityInput("");
    }
  };
  const removeAmenity = (index) =>
    setRoomData({
      ...roomData,
      amenities: roomData.amenities.filter((_, i) => i !== index),
    });

  if (isError || !user)
    return (
      <p className="mt-5 text-center text-lg text-red-400">
        Error: {!user ? "Must be logged in." : error.message}
      </p>
    );

  return (
    <>
      {isLoading && <Loading />}
      <form
        className="bg-surface-500 mx-auto w-full max-w-lg p-6 shadow-lg sm:rounded-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(roomData);
        }}
      >
        <div className="mb-6 flex justify-between">
          <h2 className="text-primary-100 text-2xl font-bold">
            {id ? "Edit Room" : "Create Room"}
          </h2>
          {id && (
            <button
              type="button"
              className="cursor-pointer text-red-400 transition hover:text-red-300"
              onClick={() =>
                window.confirm("Are you sure?") && deleteMutation.mutate()
              }
            >
              <FaTrash />
            </button>
          )}
        </div>

        {["name", "location", "capacity"].map((field, i) => (
          <div key={i} className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "capacity" ? "number" : "text"}
              name={field}
              value={roomData[field]}
              onChange={handleChange}
              placeholder={
                field === "capacity" ? "Enter number" : `Enter ${field}`
              }
              className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
              required
            />
          </div>
        ))}

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">Amenities</label>
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="bg-primary-100 hover:bg-primary-200 cursor-pointer rounded-lg px-4 py-2 text-black transition disabled:opacity-50"
              disabled={!amenityInput}
            >
              Add
            </button>
          </div>
          <ul>
            {roomData.amenities.map((a, i) => (
              <li key={i} className="mb-2 flex justify-between">
                {a}{" "}
                <button
                  onClick={() => removeAmenity(i)}
                  className="cursor-pointer text-red-400 transition hover:text-red-300"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-primary-100 hover:bg-primary-200 w-full cursor-pointer rounded-lg p-4 text-black transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : id ? "Update Room" : "Create Room"}
        </button>
      </form>
      <BackButton />
    </>
  );
}

export default RoomEditor;
