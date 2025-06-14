const express = require("express");
const router = express.Router();
const usersService = require("../controllers/userController");
const userValidator = require("../validators/userValidator");
const passwordValidator = require("../validators/passwordValidator");
const nameValidator = require("../validators/nameValidator")
const phoneValidator = require("../validators/phoneValidator")
const addressValidator = require("../validators/addressValidator")

const {
  authorizationUser,
  authorizationAdmin,
} = require("../middlewares/authorization");

router
  .route("/register")
  .post(userValidator,nameValidator, passwordValidator, usersService.register);

router.route("/login").post(usersService.login);

router
  .route("/user/:id")
  .get(authorizationUser, usersService.getUser)
  .put(authorizationUser, userValidator,nameValidator, usersService.updateUser)
  .delete(authorizationUser, usersService.deleteUser);

router
  .route("/updatepassword/:id")
  .put(passwordValidator, usersService.updatePassword);

router.route("/verifyemail/:id").post(usersService.verifyEmail);

router.route("/forgotpassword").post(usersService.forgotPassword);

router
  .route("/resetpassword/:id")
  .post(passwordValidator, usersService.resetPassword);

router.route("/resendcode/:id").put(usersService.resendCode);

router.route("/addphone/:id").put(authorizationUser,phoneValidator, usersService.addPhone);

router.route("/addaddress/:id").put(authorizationUser,addressValidator, usersService.addAddress);

// New route for getting all users (admin only)
router.route("/users").get(authorizationUser, authorizationAdmin, usersService.getUsers);
router.route("/admins").get(authorizationUser, authorizationAdmin, usersService.getAdmins);

module.exports = router;
