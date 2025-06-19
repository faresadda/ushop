const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    image : String,
    
    firstName: {
      type: String,
      required: true,
      minlength: [2, "Too short first name"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [2, "Too short last name"],
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Too short password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: Number,
      default: null,
    },
    token: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    orders : Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema, "users");
