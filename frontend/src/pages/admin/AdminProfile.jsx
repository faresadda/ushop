import { useEffect, useState } from "react";
import { useProductsContext } from "../../context/productsContext";
import { FaUser, FaShoppingBag, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlinePayment } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext";
import Loader from "../../components/Loader";
import { IoIosAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import PasswordInput from "../../components/PasswordInput";
import {
  updatePassword,
  updateUser,
  addPhone,
  addAddress
} from "../../service/userService";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { MdOutlineVerifiedUser } from "react-icons/md";

export default function Profile() {
  const { cart } = useProductsContext();
  const {user,setUser,setConfirmation,id,isLoading,setIsLoading} = useUserContext();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddPhone, setIsAddPhone] = useState(false);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigate = useNavigate();

  const [passwordMessage, setPasswordMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "security", label: "Security", icon: MdOutlineSecurity },
  ];


  const updateUserFunction = async () => {
    const res = await updateUser(id, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      birthday: birthday,
      phone:phone,
      address:address
    });
    setUser(res);
    setIsLoading(false);
    if (res && res.status === "success") {
      setIsEditing(false);
      toast.success("Profile updated successfully");
      setEditMessage('')
    } else {
      setEditMessage(res.message);
    }
  };

  useEffect(() => {
      setFirstName(user.data.firstName);
      setLastName(user.data.lastName);
      setEmail(user.data.email);
      setGender(user.data.gender);
      setBirthday(user.data.birthday.split("T")[0]);
      setPhone(user.data.phone)
      setAddress(user.data.address)
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
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMessage('')
      } else {
        setPasswordMessage(res.message);
      }
    } else {
      toast.error("Password does not match");
    }
  };

  const addPhoneFunction = async () => {
    setIsLoading(true)
    const res = await addPhone(id,phone)
    setIsLoading(false)
    setUser(res)
    toast.success('Phone added successfully')
    setIsAddPhone('')
  }

  const addAddressFunction = async () => {
    setIsLoading(true)
    const res = await addAddress(id,address)
    setIsLoading(false)
    setUser(res)
    toast.success('Address added successfully')
    setIsAddPhone('')
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-primary rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-6 mb-8">
              <div
                className="relative w-20 h-20 rounded-full bg-blue-700 text-white
                 place-content-center text-center text-2xl"
              >
                {user.data.firstName.slice(0, 1)}
                {user.data.lastName.slice(0, 1)}
                {isEditing && (
                  <button
                    className="absolute bottom-0 right-0 bg-blue-800 text-white p-2
                   rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <FaUser className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.data.firstName} {user.data.lastName}
                </h2>
                <p className='flex items-center gap-2'>Admin <MdOutlineVerifiedUser /></p>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
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
                        <p className="text-red-500 text-sm mt-1 font-medium px-4">
                          {editMessage.find((err) => err.path === "firstName").msg}
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
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
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
                        <p className="text-red-500 text-sm mt-1 font-medium px-4">
                          {editMessage.find((err) => err.path === "lastName").msg}
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
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className={`${
                        editMessage &&
                        (typeof editMessage === "string" ||
                          (typeof editMessage === "object" &&
                            editMessage.find((err) => err.path === "email")))
                          ? "border-red-200"
                          : "border-gray-200"
                      }
                        w-full px-4 outline-0 py-2 border border-gray-200 rounded-lg`}
                    />
                    {editMessage && typeof editMessage === "string" && (
                      <p className="text-xs font-medium text-red-500 mt-1 px-4">
                        {editMessage}
                      </p>
                    )}
                    {editMessage && typeof editMessage === "object" &&
                      editMessage.find((err) => err.path === "email") && (
                        <p className="text-red-500 text-sm mt-1 font-medium px-4">
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
                          !gender
                            ? user.data.gender === "male"
                            : gender === "male"
                        }
                        onChange={() => setGender("male")}
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
                          !gender
                            ? user.data.gender === "female"
                            : gender === "female"
                        }
                        onChange={() => setGender("female")}
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
                    value={birthday}
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={phone}
                      onChange={(e)=>{setPhone(e.target.value)}}
                      className="w-full px-4 outline-0 py-2 border border-gray-200 rounded-lg"
                      rows="3"
                    />
                  ) : (
                    <p className="text-gray-900">{user.data.phone}</p>
                  )}
                </div>
              )}

              {user.data.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={address}
                      onChange={(e)=>{setAddress(e.target.value)}}
                      className="w-full px-4 outline-0 py-2 border border-gray-200 rounded-lg"
                      rows="3"
                    />
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
                      setFirstName(user.data.firstName);
                      setLastName(user.data.lastName);
                      setEmail(user.data.email);
                      setGender(user.data.gender);
                      setBirthday(user.data.birthday.split("T")[0]);
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
                    <div className="flex justify-between flex-col md:flex-row md:items-center gap-5">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Phone Number
                        </h3>
                        {!isAddPhone ? (
                          <p className="text-sm text-gray-600 mt-1">
                            Add your phone number for better communication
                          </p>
                        ) : (
                          <input
                            type="number"
                            value={phone}
                            placeholder="Phone"
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            className="w-full px-4 outline-0 py-2 border border-gray-200 rounded-lg mt-2"
                          />
                        )}
                      </div>
                      <div >
                        {!isAddPhone ? (
                          <button
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsAddPhone(true)}
                          >
                            <IoIosAdd />
                            Add Phone
                          </button>
                        ) : (
                          <div className="flex space-x-4 w-full">
                          <button onClick={() => addPhoneFunction()} 
                          className="px-4 py-2 rounded-lg text-white bg-black flex-1 flex items-center justify-center gap-2">
                            Save {isLoading && <LoadingSpinner />}
                          </button>
                          <button onClick={() => setIsAddPhone(false)} 
                          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 flex-1">
                            Cancel
                          </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {!user.data.address && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between flex-col md:flex-row md:items-center gap-5">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Delivery Address
                        </h3>
                        {!isAddAddress ? (
                          <p className="text-sm text-gray-600 mt-1">
                            Add your address for faster delivery
                          </p>
                        ) : (
                          <input
                            type="text"
                            value={address}
                            placeholder="address"
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            className="w-full px-4 outline-0 py-2 border border-gray-200 rounded-lg mt-2"
                          />
                        )}
                      </div>
                      <div >
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
                          <button onClick={() => addAddressFunction()} 
                          className="px-4 py-2 rounded-lg text-white bg-black flex-1 flex items-center justify-center gap-2">
                            Save {isLoading && <LoadingSpinner />}
                          </button>
                          <button onClick={() => setIsAddAddress(false)} 
                          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 flex-1">
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

      
        return (
          <div className="bg-primary rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order History
            </h2>
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4 max-[450px]:flex-col max-[450px]:items-center">
                      <div className="flex items-center gap-4 justify-between w-full flex-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-gray-900 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          Delivered
                        </span>
                        <p className="text-sm text-gray-600 mt-2">
                          Order #12345
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                      style={`${passwordMessage && typeof passwordMessage==='string' ? 'border-red-200' : 'border-gray-200'}`}
                    />
                    {passwordMessage && typeof passwordMessage==='string' && 
                    <p className="text-red-500 text-sm mt-1 font-medium px-4">{passwordMessage}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <PasswordInput
                      password={newPassword}
                      setPassword={setNewPassword}
                      style={`${passwordMessage && typeof passwordMessage==='object' ? 'border-red-200' : 'border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <PasswordInput
                      password={confirmPassword}
                      setPassword={setConfirmPassword}
                      style={`${passwordMessage && typeof passwordMessage==='object' ? 'border-red-200' : 'border-gray-200'}`}
                    />
                  </div>
                  {passwordMessage && typeof passwordMessage==='object' &&
                    <div>
                      {passwordMessage.map((m,i)=>
                        <p key={i} className="text-red-500 text-sm mt-1 font-medium px-4">{m.msg}</p>
                      )}
                    </div>
                  }
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
                      e.preventDefault()
                      deleteUserFunction();
                    }}
                  >
                    <div className="flex-1 w-full">
                    <PasswordInput
                      placeholder="password"
                      password={currentPassword}
                      setPassword={setCurrentPassword}
                      style={`${deleteMessage ? 'border-red-200' : 'border-gray-200'}`}
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
                        setCurrentPassword('')
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
      <div className="px-2 md:px-4">
        <div className="space-y-5">
          
              <nav className="flex gap-2 w-full">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-1 items-center gap-3 px-4 py-3 rounded-lg transition-colors place-content-center ${
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
              </nav>
            

          {/* Main Content */}
          {user && user.data ? (
            <div className="flex-1">{renderContent()}</div>
          ) : (
            <div className="flex-1">
              <Loader style={"left-[50%] tranform -translate-x-1/2 mt-20"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
