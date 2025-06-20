import { useEffect, useState } from "react";
import {
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { getUsers, deleteUser } from "../../service/userService";
import Loader from "../../components/Loader";
// import appData from "../../utils/appData"; // Removed: Assuming appData is available for API responses
import { toast } from "react-toastify";
import Confirmation from "../../components/Confirmation";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [userIDToDelete, setUserIDToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsers();
        if (res && res.data) {
          setUsers(res.data);
        } else {
          toast.error(res.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setUserIDToDelete(userId);
    setConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (userIDToDelete) {
      setDeleting(true);
      try {
        const res = await deleteUser(userIDToDelete);
        if (res && res.status === "success") {
          setUsers(users.filter((user) => user._id !== userIDToDelete));
          toast.success("User deleted successfully");
        } else {
          toast.error(res.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user");
      }
      setDeleting(false);
      setConfirmation(false);
      setUserIDToDelete(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen">
        <Loader style="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  }

  return (
    <div className="bg-white p-2 sm:p-6 rounded-xl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800 mb-6">
          <FaUser /> Users
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="relative w-full max-w-xs sm:max-w-xs border border-gray-200 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-200 transition">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none w-full pr-8"
            />
            <FaSearch className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[900px]:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center space-y-3
                 transition-all duration-300 hover:shadow-md overflow-x-auto"
              >
                {user.image
                 ? <img
                 src={`${import.meta.env.VITE_BASE_URL}${user.image}`}
                  alt={user.firstName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                />
                : <span className="w-24 h-24 rounded-full object-cover shadow-sm bg-blue-700 flex justify-center items-center text-white text-2xl">
                  {user.firstName.slice(0,1)}{user.lastName.slice(0,1)}
                </span>
                }
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-600 w-full px-2">
                  {user.email}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  {user.isVerified ? (
                    <div className="flex items-center gap-2">
                    <span>Verified</span>
                    <FaCheckCircle
                      className="text-green-500 text-lg"
                      title="Verified"
                    />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                    <span>Not Verified</span>
                    <FaTimesCircle
                      className="text-red-500 text-lg"
                      title="Not Verified"
                    />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Joined on {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-2">
                  {/* Edit button - currently not implemented */}
                  {/* <button className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition" title="Edit">
                    <FaEdit />
                  </button> */}
                  <button
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
                    title="Delete"
                    onClick={() => handleDeleteClick(user._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500">
              No users found.
            </div>
          )}
        </div>
      </div>

      {confirmation && (
        <Confirmation
          isOpen={() => {
            return true;
          }}
          onClose={() => setConfirmation(false)}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this user? This action cannot be undone."
          confirmText={
            <div className="flex items-center gap-2">
              <span>Confirm</span>
              {deleting && <LoadingSpinner />}
            </div>
          }
        />
      )}
    </div>
  );
}
