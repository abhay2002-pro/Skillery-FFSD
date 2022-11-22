import express from 'express';
import { register, login, logout, getMyProfile, changePassword, updateProfile, updateProfilePicture } from '../controllers/userController.js';
import {isAuthenticated} from "../middlewares/auth"

const router = express.Router();

// To register a new user
router.route("/register").post(register)

//Login
router.route("/login").post(login)

//Logout
router.route("/logout").post(logout)

//Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile)

//ChangePassword
router.route("/changePassword").put(isAuthenticated, changePassword)

//UpdateProfile
router.route("/updateProfile").put(isAuthenticated, updateProfile)

//UpdateProfilePicture
router.route("/updateProfilePicture").put(isAuthenticated, updateProfilePicture)

//ForgetPassword
//ResetPassword

//AddtoPlaylist
//RemoveFromPlaylist

export default router