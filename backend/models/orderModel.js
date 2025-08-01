const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId : mongoose.Schema.Types.ObjectId ,

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    products: [
      {
        _id : false , 
        
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productPrice: {
          type: Number,
          required: true,
        },

        attributes: {
          type: Object,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingType: {
      type: String,
      enum: ["office", "home"],
      required: true,
    },

    shippingPrice: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending" , "cancelled" , "confirmed" , "shipped" , "returned" , "delivered" ],
      default: "pending",
    },

    notes: String,

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema, "orders");
