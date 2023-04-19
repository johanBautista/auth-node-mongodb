import { Task } from "../models/Task.js";

export const allTasksMock = async (req, res) => {
  try {
    const tasksMock = [
      { title: "Task1", description: "Task -- 1" },
      { title: "Task2", description: "Task -- 2" },
      { title: "Task3", description: "Task -- 3" },
      { title: "Task4", description: "Task -- 4" },
    ];
    res.json({ tasksMock });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const allTasksUser = async (req, res) => {
  try {
    const tasks = await Task.find({ uid: req.uid });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const newTaskUser = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, uid: req.uid });
    await task.save();

    return res.json({ success: "task create 🦠" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: "No existe esta tarea" });
    if (!task.uid.equals(req.uid)) return res.status(401).json({ error: "No tiene acceso a esta Task" });

    return res.json({ task });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      res.status(404).json({ error: "Formtao id incorrecto" });
    }
    res.status(500).json({ error: error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: "tasks no encontrada" });
    if (!task.uid.equals(req.uid)) return res.status(401).json({ error: "No tiene acceso a esta Task" });
    
    const updateTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });

    return res.json({ ok: true, task: updateTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const removeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: "No existe esta tarea" });
    if (!task.uid.equals(req.uid)) return res.status(401).json({ error: "No tiene acceso a esta Task" });

    await task.deleteOne();

    return res.json({ success: "Task eliminada" });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      res.status(404).json({ error: "Formtao id incorrecto" });
    }
    res.status(500).json({ error: error });
  }
};
