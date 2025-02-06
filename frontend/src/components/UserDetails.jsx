import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useContexts.jsx";

function UserDetails({ user }) {
  const { user: currentUser } = useAuthContext();
  const isAdmin = currentUser.data?.role === "admin";

  return (
    <article className="bg-surface-500 flex flex-col gap-4 rounded-2xl p-6 shadow-lg transition hover:shadow-xl">
      {/* Header with User Name & Edit Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-primary-100 text-xl font-semibold">
          {user.firstName} {user.lastName}
        </h2>
        {isAdmin && (
          <Link
            to={`update/${user._id}`}
            state={{ user }}
            className="text-primary-100 hover:text-primary-300 transition"
          >
            <FaEdit size={22} />
          </Link>
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-2">
        <p>
          <span className="text-primary-100 font-semibold">Email:</span>{" "}
          {user.email}
        </p>
        <p>
          <span className="text-primary-100 font-semibold">Role:</span>{" "}
          {user.role}
        </p>
      </div>
    </article>
  );
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserDetails;
