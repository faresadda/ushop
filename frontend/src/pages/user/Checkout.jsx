import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaSpinner,
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";
import { useProductsContext } from "../../context/productsContext";
import { useOrdersContext } from "../../context/orderContext";
import data from "../../data/shipping_prices.json";
import { addOrderNoUser, addOrderUser } from "../../service/orderService";
import { useUserContext } from "../../context/userContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useProductsContext();
  const { order, cartProducts } = useOrdersContext();
  const { user, id, token } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    state: "",
    city: "",
    street: "",
    shippingType: "home",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const products = cartProducts ? cart : [order];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const address = `${formData.state} , ${formData.city} , ${formData.street}`;
    console.log(address)

    // Format products data
    const formattedProducts = products.map((product) => ({
      productId: product._id,
      attributes: product.selectedAttributes || {},
      quantity: product.quantity,
    }));

    let orderData;
    let res;
    if (token && id && user) {
      orderData = {
        userId: id,
        phone: formData.phone.trim(),
        address: address.trim(),
        products: formattedProducts,
        shippingType: formData.shippingType,
        notes: formData.notes?.trim() || "",
      };
      res = await addOrderUser(orderData);
    } else {
      orderData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        address: address.trim(),
        products: formattedProducts,
        shippingType: formData.shippingType,
        notes: formData.notes?.trim() || "",
      };
      // Validate required fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.phone ||
        !formData.state ||
        !formData.city ||
        !formData.street
      ) {
        toast.error("Please fill in all required fields");
        return;
      }
      res = await addOrderNoUser(orderData);
    }

    setLoading(false);
    console.log("Submitting order data:", orderData);

    if (res && res.status === "success") {
      toast.success("Order submitted successfully");
      navigate("/");
    } else {
      toast.error(res?.message || "Something went wrong");
      console.log("Error response:", res);
    }
  };

  const shipping = user?.data?.address
    ? data.states.find((s) => user.data.address.includes(s.name))?.[
        formData.shippingType === "home" ? "home_shipping" : "office_shipping"
      ]
    : formData.state
    ? data.states.find((s) => s.name === formData.state)?.[
        formData.shippingType === "home" ? "home_shipping" : "office_shipping"
      ]
    : 0;

  const subtotal = cartProducts
    ? cart.reduce((sum, c) => sum + c.price * c.quantity, 0)
    : order.price * order.quantity;

  return (
    <div className="min-h-screen bg-white py-8">
      {/* Shipping Information Form */}
      <div
        className="flex flex-col md:flex-row w-full space-x-0 md:space-x-5 px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-0"
      >
        <div className="space-y-6 bg-primary rounded-xl shadow-sm p-6 sm:p-8 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Checkout
          </h1>
          {!id && !token && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Enter last name"
                />
              </div>
            </div>
          )}

          {!user?.data.phone && (
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm"
                placeholder="05xxxxxxxx"
                pattern="^0[5-7][0-9]{8}$"
              />
            </div>
          )}

          {!user?.data.address && (
            <>
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
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-500"
                >
                  <option value="" className="text-gray-700">
                    Select State
                  </option>
                  {data.states.map((d, i) => (
                    <option key={i} value={d.name} className="text-gray-700">
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
                  value={formData.commune}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-500"
                  placeholder="Enter city"
                >
                  <option>Select City</option>
                  {formData.state &&
                    data.states
                      .find((state) => state.name === formData.state)
                      ?.city.map((c, i) => <option key={i}>{c}</option>)}
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
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Enter street address"
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shipping Type
            </label>
            <div className="flex justify-between gap-5">
              <div className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm">
                <p className="text-gray-500 text-sm">Home</p>
                <input
                  type="radio"
                  id="home"
                  name="shippingType"
                  required
                  checked={formData.shippingType === "home"}
                  value="home"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm">
                <p className="text-gray-500 text-sm">Office</p>
                <input
                  type="radio"
                  id="office"
                  name="shippingType"
                  required
                  value="office"
                  checked={formData.shippingType === "office"}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-primary text-sm"
              placeholder="Any additional notes for your order"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-primary rounded-xl shadow-sm p-6 sm:p-8 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>
            <FaShoppingBag className=" text-xl" />
          </div>

          <div className="flex flex-wrap justify-between gap-5 border-b border-gray-200 py-5 mb-5">
            <div>
              <label>Name</label>

              <p className="text-sm font-medium">
                {token && id
                  ? `${user?.data?.firstName} ${user?.data?.lastName}`
                  : formData.firstName
                  ? `${formData.firstName} ${formData.lastName}`
                  : ".........."}
              </p>
            </div>
            <div>
              <label>Phone</label>
              <p className="text-sm font-medium">
                {token && id && user?.data?.phone
                  ? user.data.phone
                  : formData.phone
                  ? formData.phone
                  : ".........."}
              </p>
            </div>

            <div>
              <label>Address</label>
              <p className="text-sm font-medium">
                {token && id && user?.data?.address
                  ? user.data.address
                  : formData.state
                  ? formData.city
                    ? formData.street
                      ? `${formData.state} , ${formData.city} , ${formData.street}`
                      : `${formData.state} , ${formData.city}`
                    : formData.state
                  : ".........."}
              </p>
            </div>
            <button className="bg-black py-2 px-4 rounded-lg font-medium text-white"
               onClick={()=>navigate('/profile')}>Change information</button>
          </div>
          {/* Products List */}
          {cartProducts ? (
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="w-full">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="flex justify-between items-center gap-4 w-full">
                        <p className="font-medium text-gray-900">
                          {item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          Quantity : {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 font-medium grid grid-cols-2 justify-between">
                        {Object.entries(item.selectedAttributes).map(
                          ([key, value], i) => (
                            <p
                              key={i}
                              className={
                                i % 2 === 0
                                  ? "place-self-start"
                                  : "place-self-end"
                              }
                            >
                              {key} : {value}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full items-center justify-between py-3 border-b border-gray-200 mb-6">
              <div className="flex items-center space-x-4 w-full">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${order.image}`}
                  alt={order.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="w-full">
                  <h3 className="font-medium text-gray-900">{order.name}</h3>
                  <div className="flex justify-between items-center w-full gap-4 ">
                    <p className="font-medium text-gray-900">
                      {" "}
                      ${order.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {" "}
                      Quantity : {order.quantity}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 font-medium grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {Object.entries(order.selectedAttributes).map(
                      ([key, value], i) => (
                        <p
                          key={i}
                          className={
                            i % 2 === 0 ? "place-self-start" : "place-self-end"
                          }
                        >
                          {key} : {value}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Order Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold text-gray-900 pt-3 border-t border-gray-200">
              <span>Total</span>
              <span>${(subtotal + shipping).toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Payment Methods</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <FaCreditCard className="text-black" />
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">
              Shipping Information
            </h3>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <FaTruck className="text-black" />
              <span>Standard Delivery (2-5 business days)</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-black hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <FaSpinner className="animate-spin  mr-2 h-5 w-5" />
                Processing...
              </div>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
