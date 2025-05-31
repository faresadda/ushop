const User = require("../models/userModel");
const appError = require("../utils/appError");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createToken = require("../utils/createToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const appData = require("../utils/appData");
const { error } = require("console");

//
const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id, { password: 0 });
  if (!user) {
    return res
      .status(404)
      .json(appError.createError(404, "this id is not found", null));
  }
  res
    .status(200)
    .json(appData.createData("user data fetched successfully", user));
});

//
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, birthday, gender, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json(appError.createError(400, "email already registered", null));
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(appError.createError(400, errors.array(), null));
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create verification code
  const verificationCode = crypto.randomInt(10000, 99999);
  await sendEmail({
    email: email,
    subject: "verification code",
    message: `Your verification code is ${verificationCode}`,
  });

  const newUser = new User({
    firstName,
    lastName,
    birthday,
    gender,
    email,
    password: hash,
    verificationCode,
  });

  // create token
  const token = await createToken({ id: newUser._id });
  newUser.token = token;
  await newUser.save();
  const user = await User.findOne({ email: email }, { _id: 1 });
  res.status(200).json(appData.createData("registre successfully", user));
});

//
const verifyEmail = asyncHandler(async (req, res) => {
  const verificationCode = req.body.verificationCode;
  const id = req.params.id;
  const type = req.body.type;
  const user = await User.findById(id, { password: 0 });

  if (!user) {
    return res
      .status(404)
      .json(appError.createError(404, "user not found", null));
  }

  if (user.verificationCode != verificationCode) {
    return res
      .status(400)
      .json(appError.createError(400, "invalid verification code", null));
  }

  await user.save();
  if (type === "activate") {
    user.verificationCode = null;
    user.isVerified = true;
    res
      .status(200)
      .json(appData.createData("email verified successfully", user));
  } else if (type === "reset") {
    res
      .status(200)
      .json(
        appData.createData("email verified successfully", { id: user._id })
      );
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(400)
      .json(appError.createError(400, "invalid email or password", null));
  }
  const verifyPassword = await bcrypt.compare(password, user.password);
  if (verifyPassword) {
    const token = await createToken({ id: user._id });
    const update = await User.findByIdAndUpdate(
      user._id,
      { $set: { token: token } },
      { new: true }
    ).select("-password");
    const userVerify = await User.findOne({ email: email }, { isVerified: 1 });
    res
      .status(200)
      .json(
        appData.createData(
          "login successfully",
          update.isVerified ? update : userVerify
        )
      );
  } else {
    res
      .status(400)
      .json(appError.createError(400, "invalid email or password", null));
  }
});

//
const updatePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
  const id = req.params.id;
  var user = await User.findById(id);
  const verifyPassword = await bcrypt.compare(password, user.password);
  user = await User.findById(id, { password: 0 });
  if (verifyPassword) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(appError.createError(400, errors.array(), user));
    }
    const hash = await bcrypt.hash(newPassword, 10);
    const token = await createToken({ id: user._id });
    const updatePassword = await User.findByIdAndUpdate(
      user._id,
      { $set: { password: hash, token: token } },
      { new: true }
    ).select("-password");
    res
      .status(200)
      .json(
        appData.createData("password updated successfully", updatePassword)
      );
  } else {
    res.status(400).json(appError.createError(400, "password is wrong", user));
  }
});

//
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id, { password: 0 });
  const email = req.body.email;
  if (email !== user.email) {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json(appError.createError(400, "email already registered", user));
    }
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(appError.createError(400, errors.array(), user));
  }
  const updateUser = await User.findByIdAndUpdate(
    id,
    { $set: { ...req.body } },
    { new: true }
  ).select("-password");
  if (!user) {
    return res
      .status(404)
      .json(appError.createError(404, "this id is not found", null));
  }
  res.status(200).json(appData.createData("update successfully", updateUser));
});

//
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const password = req.body.password;
  var user = await User.findById(id);
  const verifyPassword = await bcrypt.compare(password, user.password);
  if (verifyPassword) {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res
        .status(400)
        .json(appError.createError(404, "this id is not found"));
    }
    res.status(200).json(appData.createData("user deleted successfully", null));
    var user = await User.findById(id, { password: 0 });
  } else {
    res.status(400).json(appError.createError(400, "password is wrong", user));
  }
});

//
const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;
  var user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json(appError.createError(404, "invalid email"));
  }
  const verificationCode = crypto.randomInt(10000, 99999);
  user = await User.findOneAndUpdate(
    { email: email },
    { $set: { verificationCode: verificationCode } },
    { new: true }
  );
  await sendEmail({
    email: email,
    subject: "verification code",
    message: `Your account verification code is ${verificationCode}`,
  });
  user = await User.findOne({ email: email }, { _id: 1 });
  res
    .status(200)
    .json(appData.createData("verification code sent successfully", user));
});

//
const resetPassword = asyncHandler(async (req, res) => {
  const password = req.body.password;
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json(appError.createError(404, "invalid email"));
  }

  const verificationCode = req.body.verificationCode;
  if (user.verificationCode == verificationCode) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(appError.createError(400, errors.array(), null));
    }

    const hash = await bcrypt.hash(password, 10);
    const update = await User.findByIdAndUpdate(
      id,
      { $set: { password: hash, verificationCode: null } },
      { new: true }
    );
    res
      .status(200)
      .json(appData.createData("password updated successfully", null));
  } else {
    res
      .status(400)
      .json(appError.createError(400, "verification code is wrong"));
  }
});

const resendCode = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const verificationCode = crypto.randomInt(10000, 99999);
  const update = await User.findByIdAndUpdate(
    id,
    { $set: { verificationCode: verificationCode } },
    { new: true }
  );
  await sendEmail({
    email: update.email,
    subject: "verification code",
    message: `Your account verification code is ${verificationCode}`,
  });
  res
    .status(200)
    .json(appData.createData("verification code sent successfully", null));
});

const addPhone = asyncHandler(async (req, res) => {
  const phone = req.body.phone;
  const id = req.params.id;
  const user = await User.findById(id, { password: 0 });
  if (!user) {
    return res
      .status(400)
      .json(appError.createError(400, "user not found", null));
  }
  const updateUser = await User.findByIdAndUpdate(
    id,
    { $set: { phone: phone } },
    { new: true }
  ).select("-password");
  res
    .status(200)
    .json(appData.createData("phone added successfully", updateUser));
});

const addAddress = asyncHandler(async (req, res) => {
  const address = req.body.address;
  const id = req.params.id;
  const user = await User.findById(id, { password: 0 });
  if (!user) {
    return res
      .status(400)
      .json(appError.createError(400, "user not found", null));
  }
  const updateUser = await User.findByIdAndUpdate(
    id,
    { $set: { address: address } },
    { new: true }
  ).select("-password");
  res
    .status(200)
    .json(appData.createData("address added successfully", updateUser));
});

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
  updatePassword,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendCode,
  addPhone,
  addAddress
};
