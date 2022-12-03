import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseLectures,
  deleteLecture
} from "../controllers/courseController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get all courses data without lectures
router.route("/courses").get(getAllCourses);

// Create new course - only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add lecture, delete course, get course details
router
  .route("/course/:id")
  .get(isAuthenticated, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete lecture
router
  .route("/lecture")
  .delete(isAuthenticated, authorizeAdmin, deleteLecture);



export default router;
