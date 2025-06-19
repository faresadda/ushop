import logo from "../../public/logo.png";
import { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";
import { UserCircle } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/productsContext";
import { IoChevronDown } from "react-icons/io5";
import { useUserContext } from "../context/userContext";
import Loader from "../components/Loader";

export default function Navbar() {
  const { setProducts, productsCopy, cart, categories, dispatch, favorites } =
    useProductsContext();
  const { user, token, getUserFunction } = useUserContext();
  const [cg, setCg] = useState("CATEGORIES");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [menu, setMenu] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    if (search !== "") {
      setProducts(
        productsCopy.filter((p) => p.name.toLowerCase().includes(search)),
      );
    } else {
      setProducts(productsCopy);
    }
  }, [search]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenu(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categoriesList = [
    { value: "phones", label: "Phones & Telecommunications", type: "ph" },
    { value: "computer", label: "Computer,Office & Education", type: "co" },
    { value: "furniture", label: "Furniture", type: "fo" },
    { value: "clothes", label: "Clothes", type: "cl" },
    { value: "shoes", label: "Shoes", type: "sh" },
    { value: "electronics", label: "Consumer Electronics", type: "el" },
    { value: "accessories", label: "Accessories", type: "ac" },
  ];

  const handleCategory = (cat) => {
    setCg(cat.value);
    navigate("/products");
    setProducts(
      productsCopy.filter((p) =>
        p.category.includes(cat.value),
      ),
    );
    dispatch({ type: cat.type });
    setDropdownOpen(false);
    setMenu(true);
  };

  useEffect(() => {
    getUserFunction();
  }, []);

  return (
    <nav className="sticky top-0 left-0 w-full bg-primary shadow z-50 border-b border-gray-100 py-2">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between py-2 px-2 sm:px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <img src={logo} className="w-10 h-10" alt="logo" />
          <span className="font-bold text-lg sm:text-xl text-gray-800 tracking-wide">
            USHOP
          </span>
        </div>
        {/* Main Menu */}
        <ul className="hidden lg:flex flex-wrap gap-4 xl:gap-7 items-center font-medium text-black flex-1 justify-center">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-500 transition"
              onClick={() => {
                setProducts(productsCopy);
                setCg("categories");
                setMenu(true);
              }}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-yellow-500 transition"
              onClick={() => {
                setProducts(productsCopy);
                setCg("categories");
                setMenu(true);
              }}
            >
              PRODUCTS
            </Link>
          </li>

          <li>
            <div className="relative transition">
              <button
                className="flex items-center gap-1 text-black hover:text-yellow-500"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                CATEGORIES
                <IoChevronDown
                  className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <ul
                  className="fixed left-[50%] top-[80px] transform -translate-x-1/2 rounded-xl w-56 h-56 overflow-auto
                   bg-primary border border-gray-200 shadow-lg z-50"
                >
                  {categoriesList.map((cat) => (
                    <li key={cat.value}>
                      <button
                        className="w-full text-black px-4 py-2 hover:bg-tertiary transition text-start"
                        onClick={() => handleCategory(cat)}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-yellow-500 transition"
              onClick={() => {
                setCg("categories");
                setMenu(true);
              }}
            >
              CONTACT
            </a>
          </li>
        </ul>
        {/* Actions */}
        <div className="flex items-center gap-4 justify-end">
          {/* Search (desktop) */}
          <div className="relative hidden md:block ">
            <input
              ref={input}
              type="search"
              value={search}
              onFocus={() => {
                navigate("/products");
                setProducts(productsCopy);
                setCg("categories");
              }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
              className="border border-gray-300 rounded-full px-3 py-2 pr-10 focus:outline-none focus:border-yellow-400 transition w-50"
            />
            <IoSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => input.current.focus()}
            />
          </div>
          {/* Search icon (mobile) */}
          <button
            className="md:hidden text-gray-700 hover:text-yellow-500 transition"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Open search"
          >
            <IoSearch className="text-2xl" />
          </button>

          {/* Favorites Heart */}
          <Link to="/favorites" className="relative transition">
            <AiFillHeart className="text-2xl text-red-500" />
            <span className="absolute -top-3 -right-3 bg-secondary text-white text-xs rounded-full px-1.5 py-0.5">
              {favorites.length || 0}
            </span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-red-500 transition">
            <SlBasket className="text-2xl" />
            <span className="absolute -top-3 -right-3 bg-secondary text-white text-xs rounded-full px-1.5 py-0.5">
              {cart.length || 0}
            </span>
          </Link>

          {/* User */}
          {!token ? (
            <button
              className="flex items-center gap-1 hover:text-red-500 transition"
              onClick={() => navigate("/login")}
            >
              <UserCircle className="text-2xl" />
            </button>
          ) : user && user.data ? (
            user.data.image
            ? <img
              src={`${import.meta.env.VITE_BASE_URL}${user.data.image}`}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              onClick={()=>navigate('/profile')}
            />
            :<span
              className="w-8 h-8 text-xs rounded-full bg-blue-700 text-white p-2 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              {user.data.firstName.slice(0,1)}{user.data.lastName.slice(0,1)}
            </span>
          ) : (
            <Loader width={'w-100'}/>
          )}
          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setMenu(!menu)}>
            {menu ? (
              <FiMenu className="text-2xl" />
            ) : (
              <IoClose className="text-2xl" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Search Input */}
      {showMobileSearch && (
        <div className="md:hidden px-2 pb-2 mt-2">
          <div className="relative">
            <input
              ref={input}
              type="search"
              value={search}
              onFocus={() => {
                navigate("/products");
                setProducts(productsCopy);
                setCg("categories");
              }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
              className="border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none 
              focus:border-yellow-400 transition w-full"
            />
            <IoSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => input.current.focus()}
            />
          </div>
        </div>
      )}
      {/* Mobile Menu */}

      {!menu && (
        <ul className="lg:hidden flex flex-col bg-primary px-4 py-4 text-[0.9rem] text-black font-medium">
          <Link
            className="hover:bg-tertiary rounded-lg p-2"
            to="/"
            onClick={() => setMenu(true)}
          >
            HOME
          </Link>
          <Link
            className="hover:bg-tertiary rounded-lg p-2"
            to="/products"
            onClick={() => setMenu(true)}
          >
            PRODUCTS
          </Link>
          <li
            className="hover:bg-tertiary rounded-lg p-2"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <div className="relative">
              <button className="flex items-center gap-1 text-black">
                CATEGORIES
                <IoChevronDown
                  className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <ul
                  className="absolute rounded-2xl left-0 mt-2 w-56 h-56 overflow-auto bg-primary border border-gray-200 
                shadow-lg z-50 animate-fade-in "
                >
                  {categoriesList.map((cat) => (
                    <li key={cat.value}>
                      <button
                        className="w-full text-black px-4 py-2 hover:bg-tertiary text-start transition"
                        onClick={() => handleCategory(cat)}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li className="hover:bg-tertiary rounded-lg p-2">
            <a href="#contact" onClick={() => setMenu(true)}>
              CONTACT
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
