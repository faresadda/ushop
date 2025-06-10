// Products.jsx

import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import {
  MdOutlineDiscount,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "../../context/productsContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiFilter, FiShoppingBag } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export default function Products({ style }) {
  const { products, categories, favorites, setFavorites } =
    useProductsContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const productsPerPage = 15;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =products?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalPages = Math.ceil((products.length || 0) / productsPerPage);
  const totalProducts = products.length || 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const AddToFavorites = (e, product) => {
    e.stopPropagation();
    setFavorites(() => {
      const favoritesArray = [...favorites, product];
      localStorage.setItem("favorites", JSON.stringify(favoritesArray));
      return favoritesArray;
    });
    toast.success("Product added to favorites");
  };

  const removeFromFavorites = (e, product) => {
    e.stopPropagation();
    setFavorites(() => {
      const favoritesArray = favorites.filter(
        (favorite) => favorite._id !== product._id
      );
      localStorage.setItem("favorites", JSON.stringify(favoritesArray));
      return favoritesArray;
    });
    toast.success("Product removed from favorites");
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById("products-section").offsetTop - 100,
      behavior: "smooth",
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  return (
    <div className="bg-white" id="products-section">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-whita py-10 px-5 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Our Collection
              </h1>
              <p className={`text-gray-600 max-w-xl ${style}`}>
                Discover our carefully curated selection of premium products.
                Each item is handpicked for quality, style, and exceptional
                value.
              </p>
              <div className={`flex items-center gap-6 mt-4 ${style}`}>
                <div className="flex items-center">
                  <FiShoppingBag className="text-green-600 mr-2" />
                  <span className="text-sm font-medium">
                    {totalProducts} Products
                  </span>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-amber-400 mr-2" />
                  <span className="text-sm font-medium">Top Rated Items</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <div className="flex items-center bg-primary rounded-lg shadow-sm p-2 border border-gray-200">
                <BiSortAlt2 className="text-gray-600 mr-2" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent text-sm border-none outline-none focus:ring-0 text-gray-700 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>

              <button className="flex items-center gap-2 bg-primary rounded-lg shadow-sm p-2 px-4 border border-gray-200">
                <FiFilter className="text-gray-600" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-5">
        <div className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <p
            onClick={() => setSelectedCategory("All Products")}
            className={`flex flex-col items-center min-w-[min-content] bg-primary ${
              selectedCategory === "All Products"
                ? "border-secondary"
                : "border-transparent"
            } rounded-xl text-sm text-gray-700 font-medium py-4 px-4 shadow-sm hover:shadow-md justify-center text-center cursor-pointer border-2`}
          >
            All Products
          </p>

          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() => setSelectedCategory(cat.title)}
              className={`flex flex-col items-center min-w-[min-content] bg-primary ${
                selectedCategory === cat.title
                  ? "border-secondary "
                  : "border-transparent"
              } rounded-xl py-4 px-4 shadow-sm hover:shadow-md cursor-pointer border-2`}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-2">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-xs md:text-sm text-gray-700 text-center font-medium">
                {cat.title}
              </span>
            </div>
          ))}
        </div>

        {/* Products */}
        {products ? (
          <div className="mt-8">
            {products.length === 0 ? (
              <div className="text-lg text-red-500 my-20 flex justify-center items-center gap-2 py-10">
                Products not found{" "}
                <MdOutlineReportGmailerrorred className="text-2xl" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {currentProducts.map((product, index) => (
                    <div
                      key={product.id || indexOfFirstProduct + index}
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                      }}
                      className="relative flex flex-col bg-primary p-3 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        {product.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
                            {product.discount}% <MdOutlineDiscount />
                          </div>
                        )}

                        <button
                          className={`absolute left-2 top-2 p-2 bg-white text-red-500 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors ${
                            favorites.find(
                              (favorite) => favorite._id === product._id
                            )
                              ? "animate-heart"
                              : ""
                          }`}
                        >
                          {favorites.find(
                            (favorite) => favorite._id === product._id
                          ) ? (
                            <AiFillHeart
                              className="text-xl"
                              onClick={(e) => removeFromFavorites(e, product)}
                            />
                          ) : (
                            <AiOutlineHeart
                              className="text-xl"
                              onClick={(e) => AddToFavorites(e, product)}
                            />
                          )}
                        </button>

                        <div className="overflow-hidden rounded-xl w-full h-40">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}${
                              product.image
                            }`}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col gap-1">
                        <h3 className="font-medium text-gray-800 truncate">
                          {product.name}
                        </h3>

                        <div className="flex sm:items-center gap-1 text-gray-600 flex-col sm:flex-row">
                          <div className="flex text-amber-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                          </div>
                          <p className="text-xs">4.5 | 143 sold</p>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-semibold text-gray-900">
                            ${product.price}
                          </span>
                          {product.oldPrice > product.price && (
                            <del className="text-sm text-gray-400">
                              ${product.oldPrice}
                            </del>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg flex items-center justify-center ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <IoIosArrowBack className="text-xl" />
                    </button>

                    <div className="flex mx-2">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNumber = i + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 &&
                            pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => goToPage(pageNumber)}
                              className={`w-10 h-10 mx-1 rounded-lg flex items-center justify-center ${
                                currentPage === pageNumber
                                  ? "bg-secondary text-black"
                                  : "bg-white text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          (pageNumber === currentPage - 2 && currentPage > 3) ||
                          (pageNumber === currentPage + 2 &&
                            currentPage < totalPages - 2)
                        ) {
                          return (
                            <span
                              key={pageNumber}
                              className="w-10 h-10 mx-1 flex items-center justify-center"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg flex items-center justify-center ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <IoIosArrowForward className="text-xl" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
