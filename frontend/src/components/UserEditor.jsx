import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useContexts.jsx";
import BackButton from "./BackButton.jsx";
import { useUsersContext } from "../hooks/useContexts.jsx";
import Loading from "./Loading.jsx";

function useUserEditor(id, user, dispatch, navigate) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${user.data.token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch user");
      return response.json();
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) setUserData({ ...data.data, password: "" });
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const method = id ? "PATCH" : "POST";
      const url = `${import.meta.env.VITE_API_URL}/users${id ? `/${id}` : ""}`;

      // Create a copy and remove the password if it's empty or null
      const dataToSend = { ...userData };
      if (dataToSend.password === "") {
        delete dataToSend.password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${user.data.token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok)
        throw new Error(`Failed to ${id ? "update" : "create"} user`);
      return response.json();
    },
    onSuccess: (updatedUser) => {
      toast.success(
        id ? "User updated successfully." : "User created successfully.",
      );
      dispatch({
        type: id ? "UPDATE_USER" : "CREATE_USER",
        payload: updatedUser.data,
      });
      navigate("/users");
    },
    onError: () => toast.error("An error occurred. Please try again."),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${user.data.token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to delete user");
      return response.json();
    },
    onSuccess: () => {
      toast.success("User deleted successfully.");
      dispatch({ type: "DELETE_USER", payload: { _id: id } });

      navigate("/users");
    },
    onError: () => toast.error("Failed to delete user. Please try again."),
  });

  return {
    userData,
    setUserData,
    isLoading,
    isError,
    error,
    mutation,
    deleteMutation,
  };
}

function UserEditor() {
  const { id } = useParams();
  const { dispatch } = useUsersContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const {
    userData,
    setUserData,
    isLoading,
    isError,
    error,
    mutation,
    deleteMutation,
  } = useUserEditor(id, user, dispatch, navigate);

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  if (isError || !user)
    return (
      <p className="mt-5 text-center text-lg text-red-400">
        Error: {!user ? "Must be logged in to edit user." : error.message}
      </p>
    );

  return (
    <>
      {isLoading && <Loading />}
      <form
        className="bg-surface-500 mx-auto w-full max-w-lg p-6 shadow-lg sm:rounded-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(userData);
        }}
      >
        <div className="mb-6 flex justify-between">
          <h2 className="text-primary-100 text-2xl font-bold">
            {id ? "Edit User" : "Create User"}
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

        {["firstName", "lastName", "email"].map((field, i) => (
          <div key={i} className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={userData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
              required
            />
          </div>
        ))}

        {/* Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
          />
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="bg-surface-400 focus:ring-primary-300 w-full rounded-lg p-3 focus:ring-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-100 hover:bg-primary-200 w-full cursor-pointer rounded-lg p-4 text-black transition disabled:opacity-50"
        >
          {isLoading ? "Saving..." : id ? "Update User" : "Create User"}
        </button>
      </form>
      <BackButton />
    </>
  );
}

export default UserEditor;
