const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createUploadMiddleware = (folder) => {
  // Create uploads directory if it doesn't exist
  const uploadDir = `uploads/${folder}`;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const name = path.basename(file.originalname, path.extname(file.originalname)) + "-" + Date.now();
      cb(null, name + path.extname(file.originalname));
    },
  });

  return multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Not an image! Please upload only images."), false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });
};

const product = createUploadMiddleware("products");
const user = createUploadMiddleware("users");

module.exports = {
  product,
  user
};
