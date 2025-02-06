import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { BookingsContext } from "../context/BookingsContext.jsx";
import { RoomsContext } from "../context/RoomsContext.jsx";
import { UsersContext } from "../context/UsersContext.jsx";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};

const useBookingsContext = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error(
      "useBookingsContext must be used within a BookingsContextProvider",
    );
  }
  return context;
};

const useRoomsContext = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error(
      "useRoomsContext must be used within a RoomsContextProvider",
    );
  }
  return context;
};

const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error(
      "useUsersContext must be used within a UsersContextProvider",
    );
  }
  return context;
};

export { useAuthContext, useBookingsContext, useRoomsContext, useUsersContext };
