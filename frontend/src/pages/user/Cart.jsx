import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";
import { BsPaypal } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useProductsContext } from "../../context/productsContext";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";

export default function Cart() {
  const { cart, setCart, attributes, setAttributes } = useProductsContext();
  const [sortOption, setSortOption] = useState("newest");
  const navigate = useNavigate();

  const ship = cart.reduce((sum, c) => sum + (c.ship || 0), 0);
  const subtotal = cart.reduce(
    (sum, c, index) => sum + c.price * (cart[index].quantity || 1),
    0
  );

  // Function to update quantity
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(() => {
      const cartArray = cart.map((c, i) =>
        i === index ? { ...c, quantity: Number(newQuantity) } : c
      );
      localStorage.setItem("cart", JSON.stringify(cartArray));
      return cartArray;
    });
  };

  // Function to remove item
  const removeItem = (index) => {
    setCart(() => {
      const cartArray = cart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(cartArray));
      return cartArray;
    });
  };

  const clearAllproducts = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Function to update product options
  const updateProductAttributes = (index, key, value) => {
    setCart(() => {
      const newCart = cart.map((item, i) =>
        i === index
          ? {
              ...item,
              selectedAttributes: {
                ...item.selectedAttributes,
                [key]: value,
              },
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {cart.length} {cart.length === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>

            {cart.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {/* Sort Options */}
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Filter className="w-4 h-4 text-gray-600 mr-2" />
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent text-sm border-none outline-none focus:ring-0 text-gray-700 cursor-pointer"
                  >
                    <option value="newest">Recently Added</option>
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Clear All Button */}
                <button
                  onClick={clearAllproducts}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <FaRegTrashAlt className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <FaCartPlus className="text-4xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet.
              Start shopping to fill it up!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex gap-8 w-full max-[920px]:flex-col">
            {/* Cart Items Section */}
            <div className="basis-[70%] flex flex-col gap-6">
              {cart.map((c, index) => (
                <div
                  key={index}
                  className="bg-primary rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex flex-col sm:flex-row gap-6 p-6">
                    <div className="relative sm:w-32 sm:h-32 w-full h-48 flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${c.image}`}
                        alt={c.name}
                        onClick={()=>{navigate(`/product/${c._id}`)}}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">
                          {c.name}
                        </h3>
                        <span className="font-bold text-gray-900">
                          {(c.price * cart[index].quantity).toFixed(2)} $
                        </span>
                        {/* Product Options */}
                        <div className="flex flex-wrap gap-4 my-4 place-content-start">
                          {c.selectedAttributes && c.attributes.map(
                            (attr, i) => (
                              <div key={i} className="w-fit">
                                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                  {attr.name}
                                </label>
                                <select
                                  value={c.selectedAttributes[index]?.values}
                                  onChange={(e) => {
                                    updateProductAttributes(
                                      index,
                                      attr.name,
                                      e.target.value
                                    );
                                  }}
                                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none text-sm bg-white"
                                >
                                  {attr.values.map((v,i) => (
                                    <option key={`${i}-${v}`}>{v}</option>
                                  ))}
                                </select>
                              </div>
                            )
                          )}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quantity
                            </label>
                            <div className="flex items-center shadow-gray-300 shadow-xs rounded-lg w-fit bg-white">
                              <button
                                disabled={cart[index].quantity === 1}
                                onClick={() =>
                                  updateQuantity(
                                    index,
                                    cart[index].quantity - 1
                                  )
                                }
                                className="px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="outline-none w-16 text-center py-2 border-0"
                                value={cart[index].quantity}
                                onChange={(e) =>
                                  updateQuantity(index, e.target.value)
                                }
                                min="1"
                              />
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    index,
                                    cart[index].quantity + 1
                                  )
                                }
                                className="px-4 py-2 hover:bg-gray-50 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(index)}
                            className="flex items-center gap-2 p-2 text-red-500 rounded-lg bg-red-50 w-fit h-fit place-self-end"
                            title="Remove item"
                          >
                            <FaRegTrashAlt />
                            Remove
                          </button>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="basis-[30%] min-w-[320px]">
              <div className="bg-primary rounded-xl shadow-sm border border-gray-100 p-8 sticky top-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  Order Summary
                </h2>

                <div className="space-y-5 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span className="text-base">Subtotal</span>
                    <span className="font-medium">{subtotal.toFixed(2)} $</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-base">Shipping fee</span>
                    <span className="font-medium">{ship.toFixed(2)} $</span>
                  </div>
                  <div className="border-t border-gray-200 pt-5">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span className="text-2xl text-emerald-600">
                        {(ship + subtotal).toFixed(2)} $
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-8">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Accepted Payment Methods
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="p-3 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                      <SiVisa className="w-8 h-5 text-blue-600" />
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                      <SiMastercard className="w-8 h-5 text-red-500" />
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                      <BsPaypal className="w-8 h-5 text-blue-800" />
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  disabled={cart.length === 0}
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-8 shadow-sm hover:shadow"
                >
                  {cart.length === 0 ? "Cart is Empty" : "PROCEED TO CHECKOUT"}
                </button>

                {/* Buyer Protection */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
                  <div className="flex items-start gap-4">
                    <MdOutlineVerifiedUser className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-800 mb-2">
                        Buyer Protection
                      </h3>
                      <p className="text-sm text-emerald-700">
                        Get a full refund if the item is not as described or not
                        delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
