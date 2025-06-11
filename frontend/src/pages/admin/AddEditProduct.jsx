import { useState, useEffect } from "react";
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addProduct,
  getProduct,
  updateProduct,
} from "../../service/productService";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useProductsContext } from "../../context/productsContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setProducts,categories } = useProductsContext();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    stock: "",
    category: "",
    image: null,
    attributes: [{ name: "", values: [""] }],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEditMode) {
        setLoading(true);
        const res = await getProduct(id);
        if (res && res.data) {
          const product = res.data;
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            oldPrice: product.oldPrice || "",
            stock: product.stock,
            category: product.category,
            image: product.image,
            attributes: product.attributes || [{ name: "", values: [""] }],
          });
          if (product.image) {
            setImagePreview(`${import.meta.env.VITE_BASE_URL}${product.image}`);
          }
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));

      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAttributeNameChange = (index, value) => {
    const newAttributes = [...formData.attributes];
    newAttributes[index].name = value;
    setFormData((prev) => ({
      ...prev,
      attributes: newAttributes,
    }));
  };

  const handleAttributeValueChange = (attrIndex, valueIndex, value) => {
    const newAttributes = [...formData.attributes];
    newAttributes[attrIndex].values[valueIndex] = value;
    setFormData((prev) => ({
      ...prev,
      attributes: newAttributes,
    }));
  };

  const addAttributeValue = (attrIndex) => {
    const newAttributes = [...formData.attributes];
    newAttributes[attrIndex].values.push("");
    setFormData((prev) => ({
      ...prev,
      attributes: newAttributes,
    }));
  };

  const removeAttributeValue = (attrIndex, valueIndex) => {
    const newAttributes = [...formData.attributes];
    newAttributes[attrIndex].values = newAttributes[attrIndex].values.filter(
      (_, i) => i !== valueIndex
    );
    setFormData((prev) => ({
      ...prev,
      attributes: newAttributes,
    }));
  };

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { name: "", values: [""] }],
    }));
  };

  const removeAttribute = (index) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredAttributes = formData.attributes.filter((attr) => {
      const filteredValues = attr.values.filter((v) => v.trim() !== "");
      if (attr.name.trim() !== "" && filteredValues.length > 0) {
        attr.values = filteredValues;
        return true;
      }
      return false;
    });

    if (!formData.oldPrice || (formData.oldPrice && Number(formData.oldPrice) > Number(formData.price))
    ) {
      if(formData.description.length>=8){
      setLoading(true);
      var res;
      if (isEditMode) {
        res = await updateProduct(
          id,
          { ...formData, attributes: filteredAttributes },
        );
      } else {
        res = await addProduct(
          { ...formData, attributes: filteredAttributes },
        );
      }
      setProducts(res.data);
      setLoading(false);
      if (res.status === "success") {
        toast.success(
          isEditMode
            ? "Product updated successfully"
            : "Product added successfully"
        );
        navigate("/admin/products");
      } else {
        console.log(res.message);
      }}
      else{toast.error('Description must be graeter than 8 characters')}
    } else {
      toast.error("Old price is lower than new price");
    }
  };

  return (
    <div className="min-h-screen bg-white p-2 sm:p-6 rounded-xl">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 max-[485px]:text-center">
            Product Image
          </label>
          <div className="flex items-center max-[485px]:flex-col gap-6">
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p>No image selected</p>
                  <p className="text-sm">Recommended: 800x800px</p>
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                required={!isEditMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
              />
              <p className="mt-2 text-sm text-gray-500">
                Upload a high-quality product image. Supported formats: JPG,
                PNG, WEBP
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((c,i)=> <option key={i} value={c.value}>{c.title}</option>)}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Enter detailed product description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Pricing */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Old Price $ (Optional)
            </label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            placeholder="Enter available quantity"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Attributes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Product Attributes <br /> (Optional)
            </label>
            <button
              type="button"
              onClick={addAttribute}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <FaPlus className="text-sm" />
              Add Attribute
            </button>
          </div>

          {formData.attributes.map((attr, attrIndex) => (
            <div
              key={attrIndex}
              className="space-y-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 overflow-hidden">
                  <input
                    type="text"
                    value={attr.name}
                    onChange={(e) =>
                      handleAttributeNameChange(attrIndex, e.target.value)
                    }
                    placeholder="Attribute name (e.g., Color, Size)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeAttribute(attrIndex)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600">Values</label>
                  <button
                    type="button"
                    onClick={() => addAttributeValue(attrIndex)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <FaPlus className="text-xs" />
                    Add Value
                  </button>
                </div>

                <div className="space-y-2">
                  {attr.values.map((value, valueIndex) => (
                    <div key={valueIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleAttributeValueChange(
                            attrIndex,
                            valueIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Enter ${attr.name || "attribute"} value`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                      />
                      {attr.values.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeAttributeValue(attrIndex, valueIndex)
                          }
                          className="p-2 text-red-500 hover:text-red-600"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 shadow transition"
          >
            {!loading && <FaSave className="text-lg" />}
            <span>Save Product</span>
            {loading && <LoadingSpinner />}
          </button>
        </div>
      </form>
    </div>
  );
}
