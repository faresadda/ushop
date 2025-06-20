const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const appError = require("../utils/appError");
const appData = require("../utils/appData");
const shipping_prices = require("../shipping_prices.json");
const User = require("../models/userModel");

const addOrderNoUsers = asyncHandler(async (req, res) => {
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

const addOrderUsers = asyncHandler(async (req, res) => {
  const {
    userId,
    phone,
    address,
    products, // Array of products with productId, attributes, and quantity
    shippingType,
    notes,
  } = req.body;

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


  // Process each product and calculate total price
  let totalPrice = 0;
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

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json(appError.createError(404, "user not found", null));
  }

  let order;
  let userAddress;
  let userPhone;
  // Validate required fields
  if (!user.address) {
    if(!user.phone){
    if (!phone || !address) {
      return res
        .status(400)
        .json(
          appError.createError(400, "phone and address must be required", null)
        );
    }
    userPhone = phone
    await User.findByIdAndUpdate(userId, {
      $set: {
        phone: phone,
        address: address,
        orders: user.orders ? user.orders + 1 : 1,
      },
    });
  }
    if(user.phone){
      if (!address) {
        return res
          .status(400)
          .json(appError.createError(400, "address must be required", null));
      }
  
      await User.findByIdAndUpdate(userId, {
        $set: { address: address, orders: user.orders ? user.orders + 1 : 1 },
      });
      userPhone = user.phone
  }
  userAddress = address
  }
  if (user.address) {
    if(!user.phone){
      if (!phone) {
        return res
          .status(400)
          .json(appError.createError(400, "phone must be required", null));
      }
  
      userPhone = phone
      await User.findByIdAndUpdate(userId, {
        $set: { phone: phone, orders: user.orders ? user.orders + 1 : 1 },
      });
  }
    if(user.phone){
      userPhone = user.phone
      await User.findByIdAndUpdate(userId, {
        $set: { orders: user.orders ? user.orders + 1 : 1 },
      });
    }
  userAddress = user.address
  }

  const state = shipping_prices.states.find((s) => userAddress.includes(s.name));
  if (!state) {
    return res
      .status(400)
      .json(appError.createError(400, "invalid state in address", null));
  }

  const shippingPrice =
    shippingType === "home" ? state.home_shipping : state.office_shipping;

  totalPrice += shippingPrice

  order = new Order({
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: userPhone,
    address: userAddress,
    products: orderProducts,
    shippingType,
    shippingPrice,
    totalPrice,
    notes,
  });

  await order.save();
  res.status(200).json(appData.createData("order added successfully"));
})

    
const getOrders = asyncHandler(async (req, res) => {
  const orders = (await Order.find({})).reverse();
  res
    .status(200)
    .json(appData.createData("orders fetched successfully", orders));
});

const getPendingOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "pending" }).reverse();
  res
    .status(200)
    .json(appData.createData("pending orders fetched successfully", orders));
});

const getCancelledOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "cancelled" }).reverse();
  res
    .status(200)
    .json(appData.createData("cancelled orders fetched successfully", orders));
});

const getConfirmedOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "confirmed" }).reverse();
  res
    .status(200)
    .json(appData.createData("confirmed orders fetched successfully", orders));
});

const getShippedOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "shipped" }).reverse();
  res
    .status(200)
    .json(appData.createData("shipped orders fetched successfully", orders));
});

const getReturnedOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "returned" }).reverse();
  res
    .status(200)
    .json(appData.createData("returned orders fetched successfully", orders));
});

const getDeliveredOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "delivered" }).reverse();
  res
    .status(200)
    .json(appData.createData("delivered orders fetched successfully", orders));
});

const updateStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const orderStatus = req.body.status;
  const order = await Order.findByIdAndUpdate(
    id,
    { status: orderStatus },
    { new: true }
  );
  if (!order) {
    return res
      .status(404)
      .json(appError.createError(404, "order not found", null));
  }
  return res
    .status(200)
    .json(appData.createData("status updated successfully", order));
});

const getUserOrders = asyncHandler(async (req,res) => {
  const id = req.params.id
  const userOrders = await Order.find({userId : id}).reverse()
  if(!userOrders){
    return res.status(404).json(appError.createError(404,"User not found"))
  }
  res.status(200).json(appData.createData("User orders fetched successfully",userOrders))
})

module.exports = {
  addOrderNoUsers,
  addOrderUsers,
  getOrders,
  getPendingOrders,
  getCancelledOrders,
  getConfirmedOrders,
  getShippedOrders,
  getReturnedOrders,
  getDeliveredOrders,
  updateStatus,
  getUserOrders,
};
