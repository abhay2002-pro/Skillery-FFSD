import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";

connectDB()
.then((connection) => {
  console.log(`MongoDB connected with ${connection.host}`);
})
.catch((err) => {
  console.log(`Mongo error : ${err.message}`);
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
