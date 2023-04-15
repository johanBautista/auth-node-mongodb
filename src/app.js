import "dotenv/config";
import "./database/connectdb.js";
import authRouter from "./routes/auth.router.js";
import express from "express";

const app = express();

app.use(express.json());
app.use("/api/v1", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 ----------> Server Up! http://localhost:" + PORT);
});
