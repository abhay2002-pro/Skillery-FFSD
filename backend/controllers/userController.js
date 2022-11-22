import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // const file = req.file;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("Email already exists", 401));

  // Upload file on cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
        public_id: "tempid",
        url: "tempurl",
    },
  })
  sendToken(res, user, "Registered successfully", 201)
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // const file = req.file;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Incorrect email or password", 401));

  // Upload file on cloudinary

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Incorrect email or password", 401));

  sendToken(res, user, `Welcome back, ${user.name}`, 201)
});

export const logour = catchAsyncError(async (req, res, next) => {
  res.status(200).cookie("token", null, {
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Logged out successfully"
  })
})