import "dotenv/config";
import "./database/connectdb.js";
import authRouter from "./routes/auth.router.js";
import linkRouter from "./routes/task.router.js";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", linkRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 ----------> Server Up! http://localhost:" + PORT);
});
