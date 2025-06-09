const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const appData = require("../utils/appData");
const appError = require("../utils/appError");

const addProduct = asyncHandler(async (req, res) => {
  // Check if file exists
  if (!req.file) {
    throw appError.createError(400, "Please upload a product image");
  }
  console.log(req.file);
  const { name, description, category, price, oldPrice, stock, attributes } =
    req.body;

  // Validate required fields
  if (!name || !description || !category || !price || !stock) {
    throw appError.createError(400, "Please provide all required fields");
  }

  // Validate price
  if (Number(price) <= 0) {
    throw appError.createError(400, "Price must be greater than zero");
  }

  // Validate old price
  if (oldPrice && Number(oldPrice) <= Number(price)) {
    throw appError.createError(
      400,
      "Old price must be greater than current price"
    );
  }

  // Validate stock
  if (Number(stock) < 0) {
    throw appError.createError(400, "Stock cannot be negative");
  }

  // Calculate discount
  if (oldPrice) {
    discount = Math.floor(100 - (price * 100) / oldPrice);
  }

  // Create product
  const product = new Product({
    name,
    description,
    category,
    price: Number(price),
    oldPrice: oldPrice ? Number(oldPrice) : null,
    stock: Number(stock),
    attributes: attributes ? JSON.parse(attributes) : null,
    image: `/uploads/products/${req.file.filename}`,
    discount: oldPrice ? discount : null,
  });

  // Save product
  await product.save();
  const products = await Product.find({});

  res
    .status(200)
    .json(appData.createData("Product added successfully", products));
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res
    .status(200)
    .json(appData.createData("Products retrieved successfully", products));
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw appError.createError(404, "Product not found");
  }

  res
    .status(200)
    .json(appData.createData("Product retrieved successfully", product));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, oldPrice, stock, attributes } =
    req.body;

  // Validate price
  if (price && Number(price) <= 0) {
    throw appError.createError(400, "Price must be greater than zero");
  }

  // Validate old price
  if (oldPrice && Number(oldPrice) <= Number(price)) {
    throw appError.createError(
      400,
      "Old price must be greater than current price"
    );
  }

  // Calculate new discount
  let discount = null; // Initialize discount
  if (price && oldPrice) {
    discount = Math.floor(100 - (price * 100) / oldPrice);
  }

  // Prepare update object
  const updateFields = {
    name,
    description,
    category,
    price: Number(price),
    oldPrice: oldPrice ? Number(oldPrice) : null,
    stock: Number(stock),
    attributes: attributes ? JSON.parse(attributes) : null,
    discount: discount,
  };

  // Update image only if a new file is uploaded
  if (req.file) {
    updateFields.image = `/uploads/products/${req.file.filename}`;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateFields, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw appError.createError(404, "Product not found");
  }

  const products = await Product.find({});

  res
    .status(200)
    .json(appData.createData("Product updated successfully", products));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw appError.createError(404, "Product not found");
  }

  const products = await Product.find({});

  res
    .status(200)
    .json(appData.createData("Product deleted successfully", products));
});

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
