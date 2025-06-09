import {
  FaBars,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { useUserContext } from "../../context/userContext";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const {user} = useUserContext()
  const navigate=useNavigate()
  return (
    <header className="flex items-center justify-between gap-0 bg-primary px-4 sm:px-8 py-4 shadow sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {!sidebarOpen && (
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <FaBars className="text-xl" />
          </button>
        )}
        <input
          type="text"
          placeholder="Search"
          className="outline-none border border-gray-300 px-3 py-1 rounded-lg max-w-50"
        />
      </div>
      <div className="flex items-center gap-6">
        <FaBell className="text-xl" />
        {user && user.data
          ? <span className="text-xs rounded-full bg-blue-700 text-white p-2 cursor-pointer"
              onClick={() => navigate("/admin/profile")}>
             {user.data.firstName.slice(0,1)}{user.data.lastName.slice(0,1)}</span>
          : <Loader />}
      </div>
    </header>
  );
}

Header.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};
