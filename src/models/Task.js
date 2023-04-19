import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    // trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Task = model("Task", taskSchema);
