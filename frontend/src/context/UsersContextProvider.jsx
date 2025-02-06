import { useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import { UsersContext } from "./UsersContext";

const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { users: action.payload };
    case "CREATE_USER":
      return { users: [action.payload, ...state.users.data] };
    case "DELETE_USER":
      return {
        users: state.users.data.filter((user) => user._id !== action.payload),
      };
    case "UPDATE_USER":
      return {
        users: state.users.data.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        ),
      };
    default:
      return state;
  }
};

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, { users: [] });

  const contextValue = useMemo(
    () => ({ users: state.users, dispatch }),
    [state.users],
  );

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
