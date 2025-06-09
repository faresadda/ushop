const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    image: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: [2, "Too short name"],
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "Too short description"],
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
    },
    attributes: [
      {
        _id: false,
        name: { type: String },
        values: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema, "products");
