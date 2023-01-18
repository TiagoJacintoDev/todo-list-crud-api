const asyncHandler = require("express-async-handler");

const List = require("../models/List");
const Task = require("../models/Task");

// @desc    Get lists
// @route   GET /api/lists
// @access  Public
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find();

  res.status(200).json(lists);
});

// @desc    Set lists
// @route   POST /api/lists
// @access  Public
const setList = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  const list = await List.create({
    name: req.body.name,
  });

  res.status(201).json(list);
});

// @desc    Update list
// @route   PUT /api/lists/:id
// @access  Public
const updateList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Delete list
// @route   DELETE /api/lists/:id
// @access  Public
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  await list.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLists,
  setList,
  updateList,
  deleteList,
};
