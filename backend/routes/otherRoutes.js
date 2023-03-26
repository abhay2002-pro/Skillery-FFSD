import express from "express";
import {
  contact,
  courseRequest,
  getDashboardStats,
} from "../controllers/otherController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Other
 *   description: Endpoints for handling miscellaneous requests
 * 
 * /contact:
 *   post:
 *     summary: Send a message through the contact form
 *     description: Sends a message through the contact form with the provided details.
 *     tags: [Other]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person sending the message
 *               email:
 *                 type: string
 *                 description: Email of the person sending the message
 *               message:
 *                 type: string
 *                 description: The message to be sent
 *     responses:
 *       200:
 *         description: The message was successfully sent
 *       400:
 *         description: The request was malformed or missing required parameters
 *       500:
 *         description: An internal server error occurred while attempting to send the message
 * 
 * /courserequest:
 *   post:
 *     summary: Submit a course request
 *     description: Submits a course request with the provided details.
 *     tags: [Other]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person submitting the course request
 *               email:
 *                 type: string
 *                 description: Email of the person submitting the course request
 *               course:
 *                 type: string
 *                 description: The course the person is requesting
 *               message:
 *                 type: string
 *                 description: Any additional information the person wants to provide
 *     responses:
 *       200:
 *         description: The course request was successfully submitted
 *       400:
 *         description: The request was malformed or missing required parameters
 *       500:
 *         description: An internal server error occurred while attempting to submit the course request
 * 
 * /admin/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     description: Retrieves statistics for the admin dashboard. Only authenticated admin users can access this endpoint.
 *     tags: [Other]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The dashboard statistics were successfully retrieved
 *       401:
 *         description: Authentication credentials were missing or invalid
 *       403:
 *         description: The user does not have permission to access the admin dashboard
 *       500:
 *         description: An internal server error occurred while attempting to retrieve the dashboard statistics
 */
// contact form
router.route("/contact").post(contact);

// Request form
router.route("/courserequest").post(courseRequest);

// Get Admin Dashboard Stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
