import { Router } from "express";
import { bodyTaskValidator, paramsTaskValidator } from "../middlewares/validationManager.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  allTasksMock,
  allTasksUser,
  getTask,
  newTaskUser,
  removeTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

//all tasks
router.get("/mock", allTasksMock);
router.get("/", requireToken, allTasksUser);
router.post("/", requireToken, bodyTaskValidator, newTaskUser);
router.get("/:id", requireToken, paramsTaskValidator, getTask);
router.put("/:id", requireToken, paramsTaskValidator, bodyTaskValidator, updateTask);
router.delete("/:id", requireToken, removeTask);

export default router;
