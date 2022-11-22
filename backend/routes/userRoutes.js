import express from 'express';
import { register, login } from '../controllers/userController.js';


const router = express.Router();

// To register a new user
router.route("/register").post(register)

//Login
router.route("/login").post(login)
//Logout
//Get my Profile

//ChangePassword
//UpdateProfile
//UpdateProfilePicture

//ForgetPassword
//ResetPassword

//AddtoPlaylist
//RemoveFromPlaylist

export default router