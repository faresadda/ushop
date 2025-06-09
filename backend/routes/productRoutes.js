const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");
const {
  authorizationAdmin,
  authorizationUser,
} = require("../middlewares/authorization");

router
  .route("/product")
  .post(
    authorizationUser,
    authorizationAdmin,
    upload.single("image"),
    productController.addProduct
  )
  .get(productController.getProducts);

router
  .route("/product/:id")
  .get(productController.getProduct)
  .delete(
    authorizationUser,
    authorizationAdmin,
    productController.deleteProduct
  )
  .put(
    authorizationUser,
    authorizationAdmin,
    upload.single("image"),
    productController.updateProduct
  );

module.exports = router;
