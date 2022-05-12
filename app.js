const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;
