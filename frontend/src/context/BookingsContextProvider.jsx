import { useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import { BookingsContext } from "./BookingsContext";

const bookingReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKINGS":
      return { bookings: action.payload };
    case "ADD_BOOKING":
      return { bookings: [...state.bookings.data, action.payload] };
    case "DELETE_BOOKING":
      return {
        bookings: state.bookings.data.filter(
          (booking) => booking._id !== action.payload_id,
        ),
      };
    default:
      return state;
  }
};

export const BookingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, { bookings: [] });

  // Memoize the context value for performance
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <BookingsContext.Provider value={contextValue}>
      {children}
    </BookingsContext.Provider>
  );
};

BookingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
