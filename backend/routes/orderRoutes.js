const express = require("express");
const router = express.Router();
const ordersService = require("../controllers/orderController");
const nameValidator = require("../validators/nameValidator");
const phoneValidator = require("../validators/phoneValidator");
const addressValidator = require("../validators/addressValidator");
const {authorizationUser , authorizationAdmin} = require("../middlewares/authorization")

router.route("/addordernouser").post(nameValidator,phoneValidator,addressValidator,ordersService.addOrderNoUsers);
router.route("/addorderuser").post(authorizationUser,ordersService.addOrderUsers);

router.route("/getorders").get(authorizationUser,authorizationAdmin,ordersService.getOrders)
router.route("/getpendingorders").get(authorizationUser,authorizationAdmin,ordersService.getPendingOrders)
router.route("/getcancelledorders").get(authorizationUser,authorizationAdmin,ordersService.getCancelledOrders)
router.route("/getconfirmedorders").get(authorizationUser,authorizationAdmin,ordersService.getConfirmedOrders)
router.route("/getshippedorders").get(authorizationUser,authorizationAdmin,ordersService.getShippedOrders)
router.route("/getreturnedorders").get(authorizationUser,authorizationAdmin,ordersService.getReturnedOrders)
router.route("/getdeliveredorders").get(authorizationUser,authorizationAdmin,ordersService.getDeliveredOrders)

router.route("/updatestatus/:id").put(authorizationUser,authorizationAdmin,ordersService.updateStatus)

router.route("/getuserorders/:id").get(authorizationUser,ordersService.getUserOrders)

module.exports = router;
