const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTaskOfList,
  setTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/").get(getTasks).post(setTask);
router.route("/:id").get(getTaskOfList).put(updateTask).delete(deleteTask);

module.exports = router;
