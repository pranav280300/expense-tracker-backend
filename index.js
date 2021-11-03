const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const color = require("colors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
//load enc vars
dotenv.config({ path: "./config/config.env" });
//CONNECT TO DB
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
//Body parser
app.use(express.json());
//DEv logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//FILE UPLOAD
app.use(express.static("public"));
app.use(cookieParser());
//Route Files
const authRouters = require("./routes/auth");
const CategoryRouters = require('./routes/category');

//app.use(logger)
//Mount Routers
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/categories", CategoryRouters);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold);
});
//handle unhandled rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
