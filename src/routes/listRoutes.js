const express = require("express");
const router = express.Router();
const {
  getLists,
  setList,
  updateList,
  deleteList,
} = require("../controllers/listController");

router.route("/").get(getLists).post(setList);
router.route("/:id").put(updateList).delete(deleteList);

module.exports = router;
