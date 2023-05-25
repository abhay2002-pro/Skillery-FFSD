import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/Stats.js";
import fs from "fs";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const courses = await Course.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  }).select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const getInstructorCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find({ createdBy: req.user.name }).select(
    "-lectures"
  );
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please add all fields", 400));

  const file = req.file;
  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course Created Successfully. You can add lectures now.",
  });
});

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

// Max video size 100mb
export const addLecture = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  if (req.user.role == "instructor" && course.createdBy != req.user.name) {
    return next(new ErrorHandler("THe course is from another instructor", 404));
  }

  const file = req.file;
  console.log(file);
  course.lectures.push({
    title,
    description,
    video: {
      filename: file.filename,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added in Course",
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  if (req.user.role == "instructor" && course.createdBy != req.user.name) {
    return next(new ErrorHandler("THe course is from another instructor", 404));
  }

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  if (req.user.role == "instructor" && course.createdBy != req.user.name) {
    return next(new ErrorHandler("THe course is from another instructor", 404));
  }

  const lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });

  const filePath = process.env.FILE_UPLOAD_PATH + "/" + lecture.video.filename;
  console.log(filePath);
  fs.stat(filePath, function (err, stats) {
    if (err) {
      throw new ErrorHandler("Lecture not found", 404);
    }

    fs.unlink(filePath, function (err) {
      if (err) {
        throw new ErrorHandler("Lecture not found", 404);
      }
    });
  });

  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture Deleted Successfully",
  });
});

export const getCourseLecture = catchAsyncError(async (req, res, next) => {
  const videoRange = req.headers.range;
  console.log(videoRange);
  if (videoRange) {
    const videoPath = process.env.FILE_UPLOAD_PATH + "/" + req.params.id;
    const videoStat = fs.statSync(videoPath);
    const filesize = videoStat.size;

    const parts = videoRange.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[0], 10) : filesize - 1;

    const chunksize = end - start + 1;
    console.log(chunksize)
    const file = fs.createReadStream(videoPath, { start, end });

    const header = {
      "Content-Range": `bytes ${start}-${end}/${filesize}`,

      "Accept-Ranges": "bytes",

      "Content-Length": chunksize,

      "Content-Type": "video",
    };
    res.writeHead(206, header);
    console.log("yeah!!");
    file.pipe(res);
  } else {

    const head = {
      "Content-Length": fileSize,

      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);

    fs.createReadStream(videoPath).pipe(res);
  }
});

Course.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const courses = await Course.find({});

  let totalViews = 0;

  for (let i = 0; i < courses.length; i++) {
    totalViews += courses[i].views;
  }
  stats[0].views = totalViews;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});
