const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {product} = require("../middlewares/upload");
const {
  authorizationAdmin,
  authorizationUser,
} = require("../middlewares/authorization");

router
  .route("/product")
  .post(
    authorizationUser,
    authorizationAdmin,
    product.single("image"),
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
    product.single("image"),
    productController.updateProduct
  );

module.exports = router;
