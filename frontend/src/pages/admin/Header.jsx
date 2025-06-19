import {
  FaBars,
  FaHeadphonesAlt,
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
        {!sidebarOpen && (
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <FaBars className="text-2xl" />
          </button>
        )}
      <div className="flex items-center justify-end w-full gap-6">
        <FaHeadphonesAlt className="text-2xl"/>
        <FaBell className="text-2xl text-yellow-500" />
        {user && user.data
          ? user.data.image
          ? <img
            src={`${import.meta.env.VITE_BASE_URL}${user.data.image}`}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            onClick={()=>navigate('/admin/profile')}
          />
          : <span className="text-xs rounded-full bg-blue-700 text-white p-2 cursor-pointer"
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
