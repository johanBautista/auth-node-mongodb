import "dotenv/config";
import "./database/connectdb.js";
import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 ----------> Server Up! http://localhost:" + PORT);
});
