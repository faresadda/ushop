import { useEffect, useState } from "react";
import {
  FaSpinner,
  FaSearch,
  FaShoppingBag,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import {
  getOrders,
  getPendingOrders,
  getCancelledOrders,
  getConfirmedOrders,
  getShippedOrders,
  getReturnedOrders,
  getDeliveredOrders,
  updateStatus,
} from "../../service/orderService";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [orderID, setOrderID] = useState(null);
  const statuses = [
    "cancelled",
    "confirmed",
    "shipped",
    "returned",
    "delivered",
  ];
  const [status, setStatus] = useState(null);
  const [statusValue, setStatusValue] = useState("pending");

  useEffect(() => {
    fetchOrders();
  }, [statusValue]);

  const fetchOrders = async () => {
    try {
      var res;
      if (statusValue === "pending") {
        res = await getPendingOrders();
      } else if (statusValue === "cancelled") {
        res = await getCancelledOrders();
      } else if (statusValue === "confirmed") {
        res = await getConfirmedOrders();
      } else if (statusValue === "shipped") {
        res = await getShippedOrders();
      } else if (statusValue === "returned") {
        res = await getReturnedOrders();
      } else if (statusValue === "delivered") {
        res = await getDeliveredOrders();
      } else {
        res = await getOrders();
      }

      if (res.status === "success") {
        setOrders(res.data);
      } else {
        toast.error(res.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id) => {
    if (orderID === id) {
      setOrderID(null);
      setLoading(true);
      try {
        const res = await updateStatus(id, status);
        if (res.status === "success") {
          toast.success("Status changed successfully");
        } else {
          toast.error(res.message || "Failed to change status");
        }
      } catch (error) {
        console.error("Error changing status:", error);
        toast.error("Failed to change orders");
      } finally {
        setLoading(false);
      }
    } else {
      setOrderID(id);
    }
  };

  const filteredOrders = orders?.filter(
    (order) =>
      order.firstName.toLowerCase().includes(search.toLowerCase()) ||
      order.lastName.toLowerCase().includes(search.toLowerCase()) ||
      String(order.phone).includes(search) ||
      order.address.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "returned":
        return "bg-red-100 text-red-800 border-red-300";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-2 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Orders Management
              </h1>
              <p className="mt-1 text-slate-600">
                Manage and track all customer orders
              </p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <select
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
                className="outline-none border border-gray-200 p-3 rounded-lg text-gray-700"
              >
                <option value="statuses">all statuses</option>
                <option value="pending">pending</option>
                {statuses.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full border border-slate-200 outline-none rounded-lg bg-white text-slate-900 placeholder-slate-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {filteredOrders?.map((order) => (
            <div key={order._id} className="bg-[rgb(253,253,253)] shadow-lg">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-md font-semibold text-slate-900">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="mb-6 border-y border-gray-200 py-5">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FaUser className="text-slate-400" />
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-1 min[900px]:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        Name
                      </p>
                      <p className="font-medium text-slate-900">
                        {order.firstName} {order.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        <FaPhone className="text-slate-400 text-sm" />
                        Phone
                      </p>
                      <p className="font-medium text-slate-900">
                        {order.phone}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        <FaMapMarkerAlt className="text-slate-400 text-sm" />
                        Address
                      </p>
                      <p className="font-medium text-slate-900">
                        {order.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FaShoppingBag className="text-slate-400" />
                    Products
                  </h4>
                  <div className="space-y-4">
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 border-b border-gray-200 pb-5"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-slate-200">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}${
                              product.image
                            }`}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center gap-4">
                            <div>
                              <p className="font-medium text-slate-900 mb-1">
                                {product.productName}
                              </p>

                              <div className="flex flex-wrap gap-1">
                                <p className="px-2 py-1 text-xs font-medium bg-white text-slate-700 rounded border border-slate-200">
                                  Quantity : {product.quantity}
                                </p>
                                {Object.entries(product.attributes).map(
                                  ([key, value]) => (
                                    <span
                                      key={key}
                                      className="px-2 py-1 text-xs font-medium bg-white text-slate-700 rounded border border-slate-200"
                                    >
                                      {key} : {value}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <p className="font-semibold text-slate-900 w-max shrink-0">
                              $ {product.productPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex flex-col min-[1150px]:flex-row min-[1150px]:items-center sm:justify-between  gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-600">
                      Shipping ({order.shippingType}) : $
                      {order.shippingPrice.toFixed(2)}
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      Total : ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="grid gap-2 grid-cols-2 min-[425px]:grid-cols-3 min-[900px]:grid-cols-5">
                    {orderID === order._id &&
                      statuses.map((s, i) => (
                        <div
                          key={i}
                          className={`${getStatusColor(s)} border ${
                            status === s ? "outline-2" : "outline-0"
                          } p-2 rounded-sm text-sm font-medium text-center`}
                          onClick={() => setStatus(s)}
                        >
                          {s}
                        </div>
                      ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                      onClick={() => {
                        changeStatus(order._id);
                      }}
                    >
                      {orderID === order._id ? "Save" : "Update"} Status
                    </button>
                    {orderID === order._id && (
                      <button
                        className="px-4 py-2.5 text-sm font-medium text-black bg-white rounded-lg border border-gray-300"
                        onClick={() => setOrderID(null)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No orders found
            </h3>
            <p className="text-slate-600">
              {search
                ? "Try adjusting your search terms."
                : "Orders will appear here once customers place them."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
