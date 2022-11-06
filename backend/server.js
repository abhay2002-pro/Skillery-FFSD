import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB()
  .then((connection) => {
    console.log(`MongoDB connected with ${connection.host}`);
  })
  .catch((err) => {
    console.log(`Mongo error : ${err.message}`);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
