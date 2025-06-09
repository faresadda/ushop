import {
  FaTimes,
  FaChartLine,
  FaBoxOpen,
  FaShoppingCart,
  FaChartBar,
  FaUsers,
  FaUserShield,
  FaRegCommentDots,
  FaPercentage,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {FaSignOutAlt } from "react-icons/fa";
import { useUserContext } from "../../context/userContext";
import Confirmation from "../../components/Confirmation"

// Sidebar Link Component
function SidebarLink({ icon, label, active,setSidebarOpen,path }) {

  return (
    <Link
      to={path}
      onClick={()=>{setSidebarOpen(false)}}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-2 cursor-pointer ${
        active ? "bg-black text-white" : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const {confirmation,setConfirmation,logOut} = useUserContext()
  return (
    <section>
      <aside
        className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-primary shadow-lg flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50`}
      >
        <div className="flex items-center gap-2 px-6 py-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-8" />
            <span className="font-bold text-xl text-black">USHOP</span>
          </div>
          {sidebarOpen && (
            <button
              className="ml-auto md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes className="text-xl text-black" />
            </button>
          )}
        </div>
        <nav className="flex-1 px-4 py-6">
          <SidebarLink icon={<FaChartLine />} label="Dashboard" active setSidebarOpen={setSidebarOpen} path='/admin'/>
          <SidebarLink icon={<FaBoxOpen />} label="Products" setSidebarOpen={setSidebarOpen} path='/admin/products'/>
          <SidebarLink icon={<FaShoppingCart />} label="Orders" setSidebarOpen={setSidebarOpen}/>
          <SidebarLink icon={<FaChartBar />} label="Sales" setSidebarOpen={setSidebarOpen}/>
          <SidebarLink icon={<FaUsers />} label="Users" setSidebarOpen={setSidebarOpen} path='/admin/users'/>
          <SidebarLink icon={<FaUserShield />} label="Admins" setSidebarOpen={setSidebarOpen} path='/admin/admins'/>
          <SidebarLink icon={<FaRegCommentDots />} label="Feedback" setSidebarOpen={setSidebarOpen}/>
          <SidebarLink icon={<FaPercentage />} label="Rate" setSidebarOpen={setSidebarOpen}/>
          <button
                  onClick={() => {
                    setConfirmation(true);
                  }}
                  className="flex items-center px-4 py-3 gap-2 text-red-600 hover:text-red-700 
                  flex-1 place-content-center  hover:bg-gray-50 rounded-lg"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-80 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {confirmation && <Confirmation 
                isOpen={()=>{return null}}
                onClose={()=>{setConfirmation(false)}}
                onConfirm={()=>{logOut()}}
                message='Do you want to sign out ?'
                confirmText='Confirm'
            />}
    </section>
  );
}

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

SidebarLink.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    setSidebarOpen: PropTypes.func.isRequired,
  };
