const database = require("./config/database");
const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const error = require("./middlewares/error");
const appError = require("./utils/appError");
const cors = require("cors");
const apikey = require("./middlewares/apikey");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());

app.use(express.json());

// URL: http://domain/uploads/products/image.jpg
app.use("/uploads", express.static("uploads"));

app.use(apikey);

// Mount routes
app.use("/api/ushop", userRoutes);
app.use("/api/ushop", productRoutes);
app.use("/api/ushop", orderRoutes);

app.use(error);

app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.all("*", (req, res, next) => {
  return res.status(404).json(appError.createError(404, "not found"));
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
