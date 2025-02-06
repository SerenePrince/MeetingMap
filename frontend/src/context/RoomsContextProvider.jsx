import { useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import { RoomsContext } from "./RoomsContext";

const roomsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROOMS":
      return { rooms: action.payload };
    case "CREATE_ROOM":
      return { rooms: [action.payload, ...state.rooms.data] };
    case "DELETE_ROOM":
      return {
        rooms: state.rooms.data.filter((room) => room._id !== action.payload),
      };
    case "UPDATE_ROOM":
      return {
        rooms: state.rooms.data.map((room) =>
          room._id === action.payload._id ? action.payload : room,
        ),
      };
    default:
      return state;
  }
};

export const RoomsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomsReducer, { rooms: [] });

  const contextValue = useMemo(
    () => ({ rooms: state.rooms, dispatch }),
    [state.rooms],
  );

  return (
    <RoomsContext.Provider value={contextValue}>
      {children}
    </RoomsContext.Provider>
  );
};

RoomsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
