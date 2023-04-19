import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URL_MONGO);
  console.log("😎 ----> DB Up!");
} catch (error) {
  console.log("😒 ----> DB Down" + error);
}
