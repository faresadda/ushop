import { MdOutlineDiscount } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";
import { BsPaypal } from "react-icons/bs";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useProductsContext } from "../../context/productsContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { getProduct } from "../../service/productService";
import { useParams } from "react-router-dom";

// Sample user reviews data - In a real app, this would come from your backend
const sampleReviews = [
  {
    id: 1,
    user: "John Smith",
    rating: 5,
    comment: "Excellent product with high quality",
    date: "2024-03-15",
    verified: true,
    helpful: 12,
  },
  {
    id: 2,
    user: "Sarah Johnson",
    rating: 4,
    comment: "Great value for money",
    date: "2024-03-14",
    verified: true,
    helpful: 8,
  },
];

export default function Product() {
  const { cart, setCart, attributes, setAttributes } = useProductsContext();
  const [products, setProducts] = useState(null);
  const [qnt, setQnt] = useState(1);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState(sampleReviews);

  const handleAddReview = () => {
    if (newComment.trim()) {
      const newReview = {
        id: reviews.length + 1,
        user: "User",
        rating: newRating,
        comment: newComment,
        date: new Date().toISOString().split("T")[0],
        verified: true,
        helpful: 0,
      };
      setReviews([...reviews, newReview]);
      setNewComment("");
      setNewRating(5);
      toast.success("Review added successfully");
    }
  };

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`cursor-pointer transition-colors ${
          i < rating ? "text-amber-400" : "text-gray-300"
        }`}
        onClick={() => interactive && setNewRating(i + 1)}
      />
    ));
  };

  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await getProduct(id);
      if (res && res.data) {
        setProducts(res.data);
        // Initialize attributes with default values
        if (res.data.attributes) {
          setAttributes(
            Object.fromEntries(
              res.data.attributes?.map((attr) => [attr.name, attr.values[0]])
            )
          );
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen">
        <Loader style="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  }

  if (!products) {
    return (
      <div className="h-screen flex justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Product Information Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              {/* Product Image Gallery */}
              <div className="relative aspect-square bg-primary">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${products.image}`}
                  alt={products.name}
                  className="w-full h-full object-contain p-4 sm:p-8"
                />
                {products.discount > 0 && (
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white px-2 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                    -{products.discount}%
                    <MdOutlineDiscount className="text-base sm:text-lg" />
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-8 bg-primary">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {products.name}
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {products.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex text-amber-400">
                      {renderStars(4.5)}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      4.5 | 143 sold
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ${products.price}
                    </span>
                    {products.oldPrice && (
                      <del className="text-base sm:text-lg text-gray-500">
                        ${products.oldPrice}
                      </del>
                    )}
                    {products.discount > 0 && (
                      <span className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                        -{products.discount}%
                        <MdOutlineDiscount className="text-base sm:text-lg" />
                      </span>
                    )}
                  </div>

                  {/* Product Options */}
                  <div className="space-y-3 mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Product Specifications
                    </h3>
                    {products.attributes && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {products.attributes.map((attr, index) => (
                          <div
                            key={index}
                            className="bg-white flex items-center justify-between gap-3 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors"
                          >
                            <h4 className="font-medium text-gray-900 flex items-center gap-2 capitalize">
                              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                              {attr.name}
                            </h4>
                            <select
                              className="text-sm text-gray-600 outline-0"
                              value={attributes[attr.name] || attr.values[0]}
                              onChange={(e) => {
                                setAttributes({
                                  ...attributes,
                                  [attr.name]:e.target.value
                                });
                              }}
                            >
                              {attr.values.map((v, i) => (
                                <option key={i}>{v}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4 bg-white hover:bg-tertiary px-4 py-2 rounded-lg">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      Quantity
                    </h4>
                    <div className="flex items-center py-1 px-3 border-2 border-gray-200 rounded-full overflow-hidden bg-white">
                      <button
                        disabled={qnt === 1}
                        onClick={() => setQnt(Number(qnt) - 1)}
                        className=" text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 sm:w-16 text-center outline-none"
                        value={qnt}
                        onChange={(e) =>
                          setQnt(Math.max(1, Number(e.target.value)))
                        }
                        min="1"
                      />
                      <button
                        onClick={() => setQnt(Number(qnt) + 1)}
                        className=" text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1 bg-primary">
            <div className="rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8 sticky top-4 sm:top-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-gray-600">
                  <p className="text-sm sm:text-base">Subtotal</p>
                  <p className="font-medium">
                    {(products.price * qnt).toFixed(2)} $
                  </p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p className="text-sm sm:text-base">Shipping fee</p>
                  <p className="font-medium">0,00 $</p>
                </div>
                <div className="border-t pt-3 sm:pt-4 flex justify-between text-base sm:text-lg font-bold">
                  <p>Total</p>
                  <p className="text-xl sm:text-2xl text-green-600">
                    {(products.price * qnt ).toFixed(2)} $
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <p className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                  Payment Methods
                </p>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                    <SiVisa className="w-6 sm:w-8 h-4 sm:h-5 text-blue-600" />
                  </div>
                  <div className="p-2 sm:p-3 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                    <SiMastercard className="w-6 sm:w-8 h-4 sm:h-5 text-red-500" />
                  </div>
                  <div className="p-2 sm:p-3 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                    <BsPaypal className="w-6 sm:w-8 h-4 sm:h-5 text-blue-800" />
                  </div>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 sm:py-3.5 rounded-lg hover:bg-gray-800 transition-colors mt-4 sm:mt-6 font-medium shadow-sm hover:shadow text-sm sm:text-base">
                Pay Now
              </button>
              <button
                className="w-full bg-gray-100 text-gray-900 py-3 sm:py-3.5 rounded-lg hover:bg-gray-200 transition-colors mt-2 sm:mt-3 font-medium text-sm sm:text-base"
                onClick={() => {
                  setCart(() => {
                    const existingProduct = cart.find(
                      (item) => item.id === products.id
                    );
                    let cartArray;
                    if (existingProduct) {
                      cartArray = cart.map((item) =>
                        item.id === products.id
                          ? {
                              ...item,
                              quantity: item.quantity + qnt,
                              selectedAttributes: attributes,
                            }
                          : item
                      );
                    } else {
                      cartArray = [
                        ...cart,
                        {
                          ...products,
                          quantity: qnt,
                          selectedAttributes: attributes,
                        },
                      ];
                    }
                    localStorage.setItem("cart", JSON.stringify(cartArray));
                    return cartArray;
                  });
                  toast.success("Product added to cart");
                }}
              >
                Add to Cart
              </button>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-100 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3 sm:gap-4">
                  <MdOutlineVerifiedUser className="w-5 sm:w-6 h-5 sm:h-6 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-green-700 mb-1 sm:mb-2">
                      Buyer Protection
                    </h3>
                    <p className="text-xs sm:text-sm text-green-700">
                      Full refund if the item is not as described or not
                      delivered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="lg:col-span-3 bg-primary">
            <div className="rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Customer Reviews
              </h2>

              {/* Add Review Form */}
              <div className="mb-6 sm:mb-8 bg-gray-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Write a Review
                </h3>
                <div className="mb-3 sm:mb-4">
                  <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                    Your Rating
                  </label>
                  <div className="flex text-xl sm:text-2xl">
                    {renderStars(newRating, true)}
                  </div>
                </div>
                <textarea
                  className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg mb-3 sm:mb-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
                  rows="3"
                  placeholder="Write your review here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={handleAddReview}
                  className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
                >
                  Submit Review
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 sm:space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                            {review.user}
                          </h3>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex text-amber-400 mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 sm:mb-3">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-amber-500">
                        <span>Helpful</span>
                        <span>({review.helpful})</span>
                      </button>
                      <button className="hover:text-amber-500">Report</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
