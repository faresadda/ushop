const database = require("./config/database");
const express = require("express");
const app = express();
require("dotenv").config();
const usersRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const appError = require("./utils/appError");
const cors = require("cors");
const apikeyMiddleware = require("./middlewares/apikeyMiddleware");

// Configure CORS
app.use(
  cors({
    origin: [process.env.BASE_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/ushop", usersRoutes);

app.use(apikeyMiddleware);
app.use(errorMiddleware);

const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.all("*", (req, res, next) => {
  return res.status(404).json(appError.createError(404, "not found"));
});

app.listen(process.env.PORT, () => {
  console.log("listenning on port ", process.env.PORT);
});
