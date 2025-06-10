import { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaBoxOpen, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "../../context/productsContext";
import Loader from "../../components/Loader";
import Confirmation from "../../components/Confirmation";
import { deleteProduct } from "../../service/productService";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminProducts() {
  const { products, setProducts } = useProductsContext();
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productID, setProductID] = useState("");

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const sampleProducts = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      oldPrice: 150,
      discount: 50,
      stock: 20,
      category: "Electronics",
      image: "/acc1.png",
    },
    {
      id: 2,
      name: "Product 2",
      price: 150,
      oldPrice: 200,
      discount: 50,
      stock: 2,
      category: "Clothing",
      image: "/clothes1.png",
    },
    {
      id: 3,
      name: "Product 3",
      price: 200,
      oldPrice: 250,
      discount: 50,
      stock: 0,
      category: "Books",
      image: "/elec1.png",
    },
    {
      id: 4,
      name: "Product 1",
      price: 100,
      oldPrice: 150,
      discount: 50,
      stock: 20,
      category: "Electronics",
      image: "/acc1.png",
    },
    {
      id: 5,
      name: "Product 2",
      price: 150,
      oldPrice: 200,
      discount: 50,
      stock: 2,
      category: "Clothing",
      image: "/clothes1.png",
    },
    {
      id: 6,
      name: "Product 3",
      price: 200,
      oldPrice: 250,
      discount: 50,
      stock: 0,
      category: "Books",
      image: "/elec1.png",
    },
  ];

  const filtered = sampleProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProductFunction = async (id) => {
    setConfirmation(true);
    setLoading(true);
    const res = await deleteProduct(id);
    setProducts(res.data);
    setLoading(false);
    if (res.status === "success") {
      toast.success("Product deleted successfully");
    } else {
      toast.error("Product deletion failed");
    }
    setConfirmation(false);
  };

  return (
    <div className="bg-white p-2 sm:p-6 rounded-xl">
      <div className="max-w-6xl mx-auto">
        <div className="w-full flex max-[450px]:flex-col items-center justify-between max-[450px]:items-start gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800">
            <FaBoxOpen /> Products
          </h1>
          <button
            onClick={() => navigate("/admin/addproduct")}
            className="max-[450px]:w-full flex justify-center items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 shadow transition"
          >
            <FaPlus className="text-lg" />
            <span>Add product</span>
          </button>
        </div>
        <div className="relative flex items-center gap-2 mb-4 border border-gray-200 px-3 py-2 rounded w-full max-w-xs focus:ring-2 focus:ring-blue-200 transition">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" outline-none"
          />
          <FaSearch className="text-gray-400 absolute right-5" />
        </div>

        {products ? (
          <div className="grid gap-6 grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-primary p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 space-y-2"
              >
                <div className="relative">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${product.image}`}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <FaEdit
                      className="text-2xl text-blue-400"
                      onClick={() => {
                        navigate(`/admin/updateproduct/${product._id}`);
                      }}
                    />
                    <FaTrash
                      className="text-xl text-red-400"
                      onClick={() => {
                        setConfirmation(true);
                        setProductID(product._id);
                      }}
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 truncate">
                  {product.name}
                </h3>

                <p>{product.category}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.oldPrice && product.oldPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <span className="px-3 rounded-2xl bg-red-500 text-white text-sm">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div>
                  {product.stock > 0 ? (
                    <span className="bg-green-100 text-green-600 rounded-lg px-4 py-1 text-sm">
                      in stock ({product.stock})
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 rounded-lg px-4 py-1 text-sm">
                      out of stock
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loader style="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
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
            deleteProductFunction(productID);
          }}
          message="Do you want to delete this product ?"
          confirmText={
            <div className="flex items-center gap-2">
              <span>Confirm</span>
              {loading && <LoadingSpinner />}
            </div>
          }
        />
      )}
    </div>
  );
}
