const asyncHandler = require("express-async-handler");

const List = require("../models/List");
const Task = require("../models/Task");

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json(tasks);
});

// @desc    Get task
// @route   GET /api/tasks/:id
// @access  Public
const getTaskOfList = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ list: req.params.id });

  res.status(200).json(tasks);
});

// @desc    Set task
// @route   POST /api/tasks
// @access  Public
const setTask = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  const { name, list, description, dueDate, priority, note } = req.body;

  const task = await Task.create({
    name,
    list,
    description,
    dueDate,
    priority,
    note,
  });

  res.status(201).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = asyncHandler(async (req, res) => {
  const task = Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const updatedTask = Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

// @desc    Delete tasks
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, getTaskOfList, setTask, updateTask, deleteTask };
