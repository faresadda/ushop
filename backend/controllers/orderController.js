const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const appError = require("../utils/appError");
const appData = require("../utils/appData");
const shipping_prices = require("../shipping_prices.json");

const addOrder = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    products, // Array of products with productId, attributes, and quantity
    shippingType,
    notes,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !phone || !address) {
    return res
      .status(400)
      .json(appError.createError(400, "data must be required", null));
  }

  // Validate products array
  if (!products || !Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json(appError.createError(400, "products array is required", null));
  }

  // Validate shipping type
  if (shippingType !== "home" && shippingType !== "office") {
    return res
      .status(400)
      .json(
        appError.createError(400, "shipping type must be home or office", null)
      );
  }

  // Extract state from address
  const state = shipping_prices.states.find((s) => address.includes(s.name));
  if (!state) {
    return res
      .status(400)
      .json(appError.createError(400, "invalid state in address", null));
  }

  const shippingPrice =
    shippingType === "home" ? state.home_shipping : state.office_shipping;

  // Process each product and calculate total price
  let totalPrice = shippingPrice;
  const orderProducts = [];

  for (const item of products) {
    const { productId, attributes, quantity } = item;

    // Validate quantity
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json(
          appError.createError(
            400,
            "quantity must be required and greater than 0",
            null
          )
        );
    }

    // Find product
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json(
          appError.createError(
            404,
            `product with id ${productId} not found`,
            null
          )
        );
    }

    // Add product to order products array
    orderProducts.push({
      productId,
      image: product.image,
      productName: product.name,
      productPrice: product.price,
      attributes,
      quantity,
    });

    // Add to total price
    totalPrice += product.price * quantity;
  }

  const order = new Order({
    firstName,
    lastName,
    phone,
    address,
    products: orderProducts,
    shippingType,
    shippingPrice,
    totalPrice,
    notes,
  });

  await order.save();
  res.status(200).json(appData.createData("order added successfully"));
});

const getOrders = asyncHandler(async (req,res) => {
  const orders = await Order.find({})
  res.status(200).json(appData.createData('orders fetched successfully',orders))
})

const updateStatus = asyncHandler(async (req,res) => {
  id = req.params.id
  orderStatus = req.body.status
  const order = await Order.findByIdAndUpdate(id,{status:orderStatus},{new:true})
  if(!order){
    return res.status(404).json(appError.createError(404,'order not found',null))
  }
  return res.status(200).json(appData.createData('status updated successfully',order))
})

module.exports = {
  addOrder,
  getOrders,
  updateStatus,
}