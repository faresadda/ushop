const express = require("express");
const router = express.Router();
const usersService = require("../controllers/userController");
const userValidator = require("../validators/userValidator");
const passwordValidator = require("../validators/passwordValidator");
const verifyToken = require("../middlewares/verifyToken");

router
  .route("/register")
  .post(userValidator, passwordValidator, usersService.register);

router.route("/login").post(usersService.login);

router
  .route("/user/:id")
  .get(verifyToken, usersService.getUser)
  .put(verifyToken, userValidator, usersService.updateUser)
  .delete(verifyToken, usersService.deleteUser);

router
  .route("/updatepassword/:id")
  .put(passwordValidator, usersService.updatePassword);

router.route("/verifyemail/:id").post(usersService.verifyEmail);

router.route("/forgotpassword").post(usersService.forgotPassword);

router
  .route("/resetpassword/:id")
  .post(passwordValidator, usersService.resetPassword);

router.route("/resendcode/:id").put(usersService.resendCode);

router.route("/addphone/:id").put(verifyToken, usersService.addPhone);

router.route("/addaddress/:id").put(verifyToken, usersService.addAddress);

module.exports = router;
