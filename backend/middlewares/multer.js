import multer from "multer";
import fs from "fs";

function destinationPath(req, file, callback) {
  var stat = null;
  try {
    stat = fs.statSync(process.env.FILE_UPLOAD_PATH);
  } catch (err) {
    fs.mkdirSync(process.env.FILE_UPLOAD_PATH);
  }
  callback(null, process.env.FILE_UPLOAD_PATH);
}

function fileNameConvention(req, file, callback) {
  callback(null, Date.now() + "-" + file.originalname.replace(/ /g, "_"));
}

const videoStorage = multer.diskStorage({
  destination: destinationPath,
  filename: fileNameConvention,
});

const videoFilter = (req, file, callback) => {
    if(file.mimetype.split("/")[1] === 'video'){
        callback(null, true);
    } else {
        callback(new Error("Not a video!!"), false);
    }
}

export const singleUploadVideo = multer({ storage: videoStorage, file: videoFilter  }).single("file");

export const singleUploadImage = multer({ storage: multer.memoryStorage() }).single("file");