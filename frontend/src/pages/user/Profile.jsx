import { useEffect, useState } from "react";
import {
  FaPlus,
  FaUser,
  FaShoppingBag,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineSecurity, MdOutlinePayment } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext";
import Loader from "../../components/Loader";
import { IoIosAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import PasswordInput from "../../components/PasswordInput";
import {
  deleteUser,
  updatePassword,
  updateUser,
  addPhone,
  addAddress,
} from "../../service/userService";
import { getUserOrders } from "../../service/orderService";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import Confirmation from "../../components/Confirmation";
import data from "../../data/shipping_prices.json";

export default function Profile() {
  const {
    user,
    setUser,
    confirmation,
    setConfirmation,
    logOut,
    id,
    setId,
    setToken,
    getUserFunction,
  } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddPhone, setIsAddPhone] = useState(false);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigate = useNavigate();

  const [passwordMessage, setPasswordMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthday: "",
    phone: "",
  });
  const [profileImage, setProfileImage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Handle file upload
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setProfileImage(URL.createObjectURL(files[0]));
    } else {
      // Handle text inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "orders", label: "Orders", icon: BsBoxSeam },
    { id: "security", label: "Security", icon: MdOutlineSecurity },
    { id: "payment", label: "Payment Methods", icon: MdOutlinePayment },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const deleteUserFunction = async () => {
    setIsLoading(true);
    const res = await deleteUser(id, currentPassword);
    setIsLoading(false);
    setUser(res);
    if (res && res.status === "success") {
      setDeleteAccount(false);
      navigate("/");
      setDeleteMessage("");
      setToken("");
      localStorage.removeItem("token");
      setId("");
      localStorage.removeItem("id");
      toast.success("Account removed successfully");
    } else {
      setDeleteMessage(res.message);
    }
  };

  const updateUserFunction = async () => {
    const res = await updateUser(
      id,
      { ...formData, address: `${state} , ${city} , ${street}` },
      user,
      profileImage
    );
    setIsLoading(false);
    if (res && res.status === "success") {
      setUser(res);
      setIsEditing(false);
      toast.success("Profile updated successfully");
      setEditMessage("");
    } else {
      setEditMessage(res.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserFunction();
      setFormData({
        image: res.data.image,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        gender: res.data.gender,
        birthday: res.data.birthday.split("T")[0],
        phone: res.data.phone || "",
        address: res.data.address || "",
      });
      if (res.data.address) {
        const [state, city, street] = res.data.address.split(" , ");
        setState(state);
        setCity(city);
        setStreet(street);
      }
    };

    fetchUser();
  }, []);

  const updatePasswordFunction = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setIsLoading(true);
      const res = await updatePassword(id, currentPassword, newPassword);
      setUser(res);
      setIsLoading(false);
      if (res && res.status === "success") {
        toast.success("Password update successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMessage("");
      } else {
        setPasswordMessage(res.message);
      }
    } else {
      toast.error("Password does not match");
    }
  };

  const addPhoneFunction = async () => {
    setIsLoading(true);
    const res = await addPhone(id, formData.phone);
    setIsLoading(false);
    if (res.status === "success") {
      setUser(res);
      toast.success("Phone added successfully");
      setPhoneMessage(""); // Clear any previous error messages
      setIsAddPhone(false); // Close the add phone form
    } else {
      setPhoneMessage(res.message);
    }
  };

  const addAddressFunction = async () => {
    const a = `${state} , ${city} , ${street}`;
    setIsLoading(true);
    const res = await addAddress(id, a);
    setIsLoading(false);
    if (res.status === "success") {
      setUser(res);
      toast.success("Address added successfully");
    } else {
      console.log(res.message);
    }
  };

  const [userOrders, setUserOrders] = useState("");
  const getUserOrdersFunction = async () => {
    setIsLoading(true);
    const res = await getUserOrders(id);
    setIsLoading(false);
    if (res.status === "success") {
      setUserOrders(res.data);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-primary rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center">
                {user?.data?.image ? (
                  profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${user.data.image}`}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  )
                ) : profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full rounded-full bg-blue-700 text-white flex items-center justify-center text-2xl font-semibold">
                    {user?.data?.firstName?.slice(0, 1)}
                    {user?.data?.lastName?.slice(0, 1)}
                  </span>
                )}

                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      className="absolute inset-0 opacity-0 cursor-pointer w-8 h-8"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <div className="bg-blue-400 rounded-full p-2">
                      <FaPlus className="text-xs text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.data.firstName} {user.data.lastName}
                </h2>
                <p className="text-gray-600 text-xs">
                  joined on{" "}
                  {new Date(user.data.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={e=>handleChange(e)}
                      className={`${
                        editMessage &&
                        typeof message === "object" &&
                        editMessage.find((err) => err.path === "firstName")
                          ? "border-red-200"
                          : "border-gray-200"
                      } 
                      w-full px-4 outline-0 py-2 border rounded-lg`}
                    />
                    {editMessage &&
                      typeof editMessage === "object" &&
                      editMessage.find((err) => err.path === "firstName") && (
                        <p className="text-red-500 text-xs mt-1 font-medium px-4">
                          {
                            editMessage.find((err) => err.path === "firstName")
                              .msg
                          }
                        </p>
                      )}
                  </div>
                ) : (
                  <p className="text-gray-900">{user.data.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`${
                        editMessage &&
                        typeof editMessage === "object" &&
                        editMessage.find((err) => err.path === "lastName")
                          ? "border-red-200"
                          : "border-gray-200"
                      }
                      w-full px-4 outline-0 py-2 border border-gray-200 rounded-lg`}
                    />
                    {editMessage &&
                      typeof editMessage === "object" &&
                      editMessage.find((err) => err.path === "lastName") && (
                        <p className="text-red-500 text-xs mt-1 font-medium px-4">
                          {
                            editMessage.find((err) => err.path === "lastName")
                              .msg
                          }
                        </p>
                      )}
                  </div>
                ) : (
                  <p className="text-gray-900">{user.data.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${
                        editMessage &&
                        ((typeof editMessage === "string" &&
                          editMessage.startsWith("email")) ||
                          (typeof editMessage === "object" &&
                            editMessage.find((err) => err.path === "email")))
                          ? "border-red-200"
                          : "border-gray-200"
                      }
                        w-full px-4 outline-0 py-2 border border-gray-200 rounded-lg`}
                    />
                    {editMessage &&
                      typeof editMessage === "string" &&
                      editMessage.startsWith("email") && (
                        <p className="text-xs font-medium text-red-500 mt-1 px-4">
                          {editMessage}
                        </p>
                      )}
                    {editMessage &&
                      typeof editMessage === "object" &&
                      editMessage.find((err) => err.path === "email") && (
                        <p className="text-red-500 text-xs mt-1 font-medium px-4">
                          {editMessage.find((err) => err.path === "email").msg}
                        </p>
                      )}
                  </div>
                ) : (
                  <p className="text-gray-900">{user.data.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                {isEditing ? (
                  <div className="w-full flex justify-between">
                    <label className="flex items-center gap-2 w-[45%] text-black justify-between border-solid p-2 outline-none border border-gray-200 rounded-lg">
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={
                          !formData.gender
                            ? user.data.gender === "male"
                            : formData.gender === "male"
                        }
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="flex items-center justify-between text-black gap-2 w-[45%] border-solid p-2 outline-none border border-gray-200 rounded-lg">
                      Female
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={
                          !formData.gender
                            ? user.data.gender === "female"
                            : formData.gender === "female"
                        }
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                ) : (
                  <p className="text-gray-900">{user.data.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birthday
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="w-full px-4 outline-0 py-2 border border-gray-200 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900">
                    {new Date(user.data.birthday).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>

              {user.data.phone && (
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 outline-0 py-2 border rounded-lg mt-2 
                        ${
                          typeof editMessage === "string" &&
                          editMessage.startsWith("Phone")
                            ? "border-red-200"
                            : "border-gray-200"
                        }`}
                      />
                      {typeof editMessage === "string" &&
                        editMessage.startsWith("Phone") && (
                          <p className="text-red-500 text-xs mt-1 font-medium px-4">
                            {editMessage}
                          </p>
                        )}
                    </div>
                  ) : (
                    <p className="text-gray-900">{user.data.phone}</p>
                  )}
                </div>
              )}

              {user.data.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Address
                  </label>
                  {isEditing ? (
                    <div className="space-y-4 ">
                      <div>
                        <label
                          htmlFor="wilaya"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          State
                        </label>
                        <select
                          id="state"
                          name="state"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-500"
                        >
                          <option value="" className="text-gray-700">
                            Select State
                          </option>
                          {data.states.map((d, i) => (
                            <option
                              key={i}
                              value={d.name}
                              className="text-gray-700"
                            >
                              {d.id} - {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City
                        </label>
                        <select
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-500"
                          placeholder="Enter city"
                        >
                          <option>Select City</option>
                          {state &&
                            data.states
                              .find((s) => s.name === state)
                              ?.city.map((c, i) => (
                                <option key={i}>{c}</option>
                              ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          required
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm"
                          placeholder="Enter street address"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-900">{user.data.address}</p>
                  )}
                </div>
              )}
            </div>

            <div className="my-8 flex justify-end gap-4 max-[450px]:flex-col">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditMessage("");
                      setFormData({
                        firstName: user.data.firstName,
                        lastName: user.data.lastName,
                        email: user.data.email,
                        gender: user.data.gender,
                        birthday: user.data.birthday.split("T")[0],
                        phone: user.data.phone ? user.data.phone : "",
                        address: user.data.address ? user.data.address : "",
                      });
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsLoading(true);
                      updateUserFunction();
                    }}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Save Changes {isLoading && <LoadingSpinner />}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {(!user.data.phone || !user.data.address) && (
              <hr className="my-8 border-gray-200" />
            )}
            {(!user.data.phone || !user.data.address) && (
              <section className="mt-8 space-y-4">
                {!user.data.phone && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between flex-col md:flex-row md:items-end gap-5">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Phone Number
                        </h3>
                        {!isAddPhone ? (
                          <p className="text-sm text-gray-600 mt-1">
                            Add your phone number for better communication
                          </p>
                        ) : (
                          <div>
                            <input
                              type="number"
                              name="phone"
                              value={formData.phone}
                              placeholder="Phone"
                              onChange={handleChange}
                              className={`w-full px-4 outline-0 py-2 border ${
                                phoneMessage
                                  ? "border-red-200"
                                  : "border-gray-200"
                              } rounded-lg mt-2`}
                            />
                            {phoneMessage && (
                              <p className="text-xs text-red-500 font-medium mt-2 px-4">
                                {phoneMessage[0].msg}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        {!isAddPhone ? (
                          <button
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => {
                              setIsAddPhone(true);
                              setPhoneMessage(""); // Clear any previous error messages
                            }}
                          >
                            <IoIosAdd />
                            Add Phone
                          </button>
                        ) : (
                          <div className="flex space-x-4 w-full">
                            <button
                              onClick={() => addPhoneFunction()}
                              className="px-4 py-2 rounded-lg text-white bg-black flex-1 flex items-center justify-center gap-2"
                            >
                              Save {isLoading && <LoadingSpinner />}
                            </button>
                            <button
                              onClick={() => {
                                setIsAddPhone(false);
                                setPhoneMessage(""); // Clear error message when canceling
                              }}
                              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 flex-1"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {!user.data.address && (
                  <div className="bg-gray-50 rounded-xl">
                    <div className="flex justify-between flex-col md:flex-row md:items-end gap-10">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-5">
                          Delivery Address
                        </h3>
                        {!isAddAddress ? (
                          <p className="text-sm text-gray-600 mt-1">
                            Add your address for faster delivery
                          </p>
                        ) : (
                          <div className="space-y-4 ">
                            <div>
                              <label
                                htmlFor="wilaya"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                State
                              </label>
                              <select
                                id="state"
                                name="state"
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-500"
                              >
                                <option value="" className="text-gray-700">
                                  Select State
                                </option>
                                {data.states.map((d, i) => (
                                  <option
                                    key={i}
                                    value={d.name}
                                    className="text-gray-700"
                                  >
                                    {d.id} - {d.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                City
                              </label>
                              <select
                                type="text"
                                id="city"
                                name="city"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-500"
                                placeholder="Enter city"
                              >
                                <option>Select City</option>
                                {state &&
                                  data.states
                                    .find((s) => s.name === state)
                                    ?.city.map((c, i) => (
                                      <option key={i}>{c}</option>
                                    ))}
                              </select>
                            </div>

                            <div>
                              <label
                                htmlFor="street"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Street Address
                              </label>
                              <input
                                type="text"
                                id="street"
                                name="street"
                                required
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm"
                                placeholder="Enter street address"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {!isAddAddress ? (
                          <button
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                            onClick={() => setIsAddAddress(true)}
                          >
                            <IoIosAdd />
                            Add Address
                          </button>
                        ) : (
                          <div className="flex space-x-4 w-full">
                            <button
                              onClick={() => addAddressFunction()}
                              className="px-4 py-2 rounded-lg text-white bg-black flex-1 flex items-center justify-center gap-2"
                            >
                              Save {isLoading && <LoadingSpinner />}
                            </button>
                            <button
                              onClick={() => setIsAddAddress(false)}
                              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 flex-1"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        );

      case "orders":
        return (
          <div className="bg-primary rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order History
            </h2>
            {userOrders.length > 0 ? (
              userOrders ? (
                <div className="space-y-10">
                  {userOrders.map((order, i) => (
                    <div key={i} className="space-y-5">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 text-sm text-gray-600 mt-2 flex-col sm:flex-row sm:gap-10">
                          <p>Order #{order._id.toUpperCase().slice(-6)}</p>
                          <p>Total : {order.totalPrice}$</p>
                        </div>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {order.status}
                        </span>
                      </div>
                      {order.products.map((item, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-4 max-[450px]:flex-col max-[450px]:items-center">
                            <div className="flex items-center gap-4 justify-between w-full flex-1">
                              <img
                                src={`${import.meta.env.VITE_BASE_URL}${
                                  item.image
                                }`}
                                alt={item.productName}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                  {item.productName}
                                </h3>
                                <p className="text-gray-600 font-medium">
                                  Quantity : {item.quantity}
                                </p>
                                <p className="text-gray-900 font-medium">
                                  ${item.productPrice.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <Loader />
              )
            ) : (
              <div className="text-center py-8">
                <FaShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No orders found</p>
              </div>
            )}
          </div>
        );

      case "security":
        return (
          <div className="bg-primary rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Security Settings
            </h2>
            <div className="space-y-6">
              <form
                onSubmit={(e) => {
                  updatePasswordFunction(e);
                }}
              >
                <h3 className="font-medium text-gray-900 mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <PasswordInput
                      password={currentPassword}
                      setPassword={setCurrentPassword}
                      style={`${
                        passwordMessage && typeof passwordMessage === "string"
                          ? "border-red-200"
                          : "border-gray-200"
                      }`}
                    />
                    {passwordMessage && typeof passwordMessage === "string" && (
                      <p className="text-red-500 text-sm mt-1 font-medium px-4">
                        {passwordMessage}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <PasswordInput
                      password={newPassword}
                      setPassword={setNewPassword}
                      style={`${
                        passwordMessage && typeof passwordMessage === "object"
                          ? "border-red-200"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <PasswordInput
                      password={confirmPassword}
                      setPassword={setConfirmPassword}
                      style={`${
                        passwordMessage && typeof passwordMessage === "object"
                          ? "border-red-200"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  {passwordMessage && typeof passwordMessage === "object" && (
                    <div>
                      {passwordMessage.map((m, i) => (
                        <p
                          key={i}
                          className="text-red-500 text-sm mt-1 font-medium px-4"
                        >
                          {m.msg}
                        </p>
                      ))}
                    </div>
                  )}
                  <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                    Update Password {isLoading && <LoadingSpinner />}
                  </button>
                </div>
              </form>

              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-gray-600 text-xs">
                    Add an extra layer of security to your account
                  </p>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="bg-primary rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Payment Methods
            </h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        •••• •••• •••• 4242
                      </p>
                      <p className="text-sm text-gray-600">Expires 12/24</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>

              <button className="w-full px-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                + Add New Payment Method
              </button>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="bg-primary rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Account Settings
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-600">
                        Receive updates about your orders
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        SMS Notifications
                      </p>
                      <p className="text-sm text-gray-600">
                        Receive text messages about your orders
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Language</h3>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setDeleteAccount(true);
                }}
                className="flex items-center pt-8 gap-2 text-red-600 hover:text-red-700 border-t-1 font-medium border-gray-900 w-full "
              >
                <FaRegTrashAlt />
                Delete account
              </button>
              {deleteAccount && (
                <form
                  className="flex w-full gap-4 flex-col sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    deleteUserFunction();
                  }}
                >
                  <div className="flex-1 w-full">
                    <PasswordInput
                      placeholder="password"
                      password={currentPassword}
                      setPassword={setCurrentPassword}
                      style={`${
                        deleteMessage ? "border-red-200" : "border-gray-200"
                      }`}
                    />
                    {deleteMessage && (
                      <p className="text-xs text-red-500 mt-2 px-4 font-medium">
                        {deleteMessage}
                      </p>
                    )}
                  </div>
                  <div className="space-x-4 flex w-full sm:w-fit">
                    <button
                      className="bg-black text-white px-4 py-2 rounded-lg flex-1 flex items-center justify-center gap-2"
                      type="submit"
                    >
                      Confirm {isLoading && <LoadingSpinner />}
                    </button>
                    <button
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg flex-1"
                      onClick={() => {
                        setDeleteAccount(false);
                        setCurrentPassword("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row max-[1050px]:flex-col gap-8">
          {/* Sidebar */}
          <div className="w-80 max-[1050px]:w-full flex-shrink-0">
            <div className="bg-primary rounded-xl shadow-sm p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        if (tab.id === "orders" && !userOrders) {
                          getUserOrdersFunction();
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setConfirmation(true);
                  }}
                  className="flex items-center px-4 py-3 gap-2 text-red-600 hover:text-red-700"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          {user && user.data ? (
            <div className="flex-1">{renderContent()}</div>
          ) : (
            <div className="flex-1 h-screen">
              <Loader style={"left-1/2 tranform -translate-x-1/2 mt-50"} />
            </div>
          )}
        </div>

        {confirmation && (
          <Confirmation
            isOpen={() => {
              return null;
            }}
            onClose={() => {
              setConfirmation(false);
            }}
            onConfirm={() => {
              logOut();
            }}
            message="Do you want to sign out ?"
            confirmText="Confirm"
          />
        )}
      </div>
    </div>
  );
}
