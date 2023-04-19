import "dotenv/config";
import "./database/connectdb.js";
import authRouter from "./routes/auth.router.js";
import linkRouter from "./routes/task.router.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//cors
const whitelist = [process.env.ORIGIN1, process.env.ORIGIN2];
app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        return callback(null, true);
      }
      return callback(`🆘 Error de Cors ${origin}, no autorizado`);
    },
  })
);

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", linkRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 -----> Server Up! http://localhost:" + PORT);
});
