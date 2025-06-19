const User = require("../models/userModel");
const appError = require("../utils/appError");

const checkUserPhone = async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json(appError.createError(404, "User not found", null));
    }
    if (user.phone) {
      if (!req.body.phone) {
        return res
          .status(400)
          .json(appError.createError(400, "Phone must be required", null));
      }

      if (!/^0[567][0-9]{8}$/.test(req.body.phone)) {
        return res
          .status(400).json(appError.createError(400,
            "Phone must start with 05, 06, or 07 and consist of 10 numbers",null));
      }
    }

    return next();
  } catch (error) {
    return res.status(500).json(appError.createError(500, error.message, null));
  }
};

module.exports = checkUserPhone;
