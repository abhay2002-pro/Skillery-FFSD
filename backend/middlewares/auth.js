import jwt from "jsonwebtoken"
import ErrorHandler from '../utils/errorHandler'
import {catchAsyncError} from "./catchAsyncError"
import {user} from "../models/User"


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) return next(new ErrorHandler("Not Logged In", 401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await user.findById(decoded._id);
    next();
})