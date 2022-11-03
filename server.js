const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// internal imports
const dbConnect = require("./config/db");
const { PORT, NODE_ENV } = require("./config/index");
const authRoute = require("./routes/auth/authRoute");
const adminRoute = require("./routes/admin/adminRoutes");
const studentRoute = require("./routes/student/studentRoute");

app = express();
const startServer = () => {
  try {
    dbConnect();
    // middlewares
    if (NODE_ENV === "development") {
      app.use(morgan("dev"));
    }
    
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Route Part
    app.use("/auth", authRoute);
    app.use("/admin", adminRoute);
    app.use("/users", studentRoute);

    app.listen(PORT, () => console.log(`server running on port ` + PORT));
  } catch (error) {
    console.log(error);
  }
};
startServer();
