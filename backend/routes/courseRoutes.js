import express from 'express';
import { addLecture, createCourse, getAllCourses, getCourseLectures } from '../controllers/courseController.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

// Get all courses data without lectures
router.route("/courses").get(getAllCourses);

// Create new course - only admin
router.route("/createcourse").post(singleUpload, createCourse);

// Add lecture, delete course, get course details
router.route("/course/:id").get(getCourseLectures).post(singleUpload, addLecture);

// Delete lecture
export default router