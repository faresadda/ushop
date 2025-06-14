const express = require("express");
const router = express.Router();
const ordersService = require("../controllers/orderController");
const nameValidator = require("../validators/nameValidator");
const phoneValidator = require("../validators/phoneValidator");
const addressValidator = require("../validators/addressValidator");
const {authorizationUser , authorizationAdmin} = require("../middlewares/authorization")

router.route("/order")
  .post(
    nameValidator,
    phoneValidator,
    addressValidator,
    ordersService.addOrder
  );

router.route("/getorders").get(authorizationUser,authorizationAdmin,ordersService.getOrders)

router.route("/updatestatus").put(authorizationUser,authorizationAdmin,ordersService.updateStatus)

module.exports = router;
