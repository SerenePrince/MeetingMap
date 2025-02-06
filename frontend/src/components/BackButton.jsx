import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function BackButton({ to }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to || -1);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Go back"
      className="bg-primary-100 hover:bg-primary-300 mx-auto mt-4 flex cursor-pointer rounded-full p-3 text-center align-middle font-semibold text-black shadow-md transition-all"
    >
      <FaArrowLeft />
    </button>
  );
}

BackButton.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BackButton;
