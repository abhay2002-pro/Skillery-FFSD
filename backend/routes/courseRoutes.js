import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import {
  authorizeAdmin,
  isAuthenticated,
  authorizeSubscribers,
} from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The course ID
 *         title:
 *           type: string
 *           description: The course title
 *         description:
 *           type: string
 *           description: The course description
 *       example:
 *         id: 1
 *         title: JavaScript Basics
 *         description: A beginner's guide to JavaScript
 *     Lecture:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - videoUrl
 *       properties:
 *         id:
 *           type: integer
 *           description: The lecture ID
 *         title:
 *           type: string
 *           description: The lecture title
 *         description:
 *           type: string
 *           description: The lecture description
 *         videoUrl:
 *           type: string
 *           format: url
 *           description: The URL of the lecture video
 *       example:
 *         id: 1
 *         title: Introduction to JavaScript
 *         description: An overview of JavaScript
 *         videoUrl: https://example.com/videos/intro-to-js.mp4
 *     CourseWithLectures:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - lectures
 *       properties:
 *         id:
 *           type: integer
 *           description: The course ID
 *         title:
 *           type: string
 *           description: The course title
 *         description:
 *           type: string
 *           description: The course description
 *         lectures:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Lecture'
 *           description: The list of lectures for the course
 *       example:
 *         id: 1
 *         title: JavaScript Basics
 *         description: A beginner's guide to JavaScript
 *         lectures:
 *           - id: 1
 *             title: Introduction to JavaScript
 *             description: An overview of JavaScript
 *             videoUrl: https://example.com/videos/intro-to-js.mp4
 */



// Get All courses without lectures
/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     description: Returns a list of all courses without their lectures
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.route("/courses").get(getAllCourses);

// create new course - only admin
/**
 * @swagger
 * /createcourse:
 *   post:
 *     summary: Create a new course
 *     description: Creates a new course with a title, description, and thumbnail image. Only authenticated admin users can create a new course.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course
 *               description:
 *                 type: string
 *                 description: The description of the course
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: The thumbnail image of the course
 *             required:
 *               - title
 *               - description
 *               - thumbnail
 *     responses:
 *       201:
 *         description: The newly created course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add lecture, Delete Course, Get Course Details
/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get details for a specific course
 *     description: Returns details for a specific course, including the course title, description, and a list of its lectures. Only authenticated subscribers can view course details.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the course to retrieve details for
 *     responses:
 *       200:
 *         description: The details for the requested course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseDetails'
 *
 *   post:
 *     summary: Add a new lecture to a course
 *     description: Adds a new lecture to a course, including a title, description, and video file. Only authenticated admin users can add lectures to a course.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the course to add the lecture to
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the lecture
 *               description:
 *                 type: string
 *                 description: The description of the lecture
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: The video file of the lecture
 *             required:
 *               - title
 *               - description
 *               - video
 *     responses:
 *       201:
 *         description: The newly created lecture
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *
 *   delete:
 *     summary: Delete a course
 *     description: Deletes a course with the specified ID. Only authenticated admin users can delete a course.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the course to delete
 *     responses:
 *       204:
 *         description: The course was successfully deleted
 *
 * /lecture:
 *   delete:
 *     summary: Delete a lecture
 *     description: Deletes a lecture with the specified ID. Only authenticated admin users can delete a lecture.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the lecture to delete
 *     responses:
 *       204:
 *         description: The lecture was successfully deleted
 */
router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete Lecture
/**
 * @swagger
 * /lecture:
 *   delete:
 *     summary: Delete a lecture
 *     description: Deletes a lecture with the specified ID. Only authenticated admin users can delete a lecture.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the lecture to delete
 *     responses:
 *       204:
 *         description: The lecture was successfully deleted
 *       404:
 *         description: The lecture with the specified ID was not found
 *       401:
 *         description: Authentication credentials were missing or invalid
 *       403:
 *         description: The user does not have permission to delete the lecture
 *       500:
 *         description: An internal server error occurred while attempting to delete the lecture
 */
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
