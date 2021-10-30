const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
//@DESC Register user
//@ROute POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password} = req.body;
  const user = await User.create({
    name,
    email,
    password,
 });
  //create a token
  sendTokenResponse(user, 200, res);
});
//@DESC Login user
//@ROute POST /api/v1/auth/Login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //simple email and password not empty validation check
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  //user check
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid User", 401));
  }
  //check if password matches
  const isMatch = await user.matchpassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Password", 401));
  } //cookie parse node left to integrate look into it on lect sending JWT in cookie
  sendTokenResponse(user, 200, res);
});

//GEt token from model also create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //create a token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

//@DESC Get current logged in user
//@ROute POST /api/v1/auth/me
// @access Private
exports.getme = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
