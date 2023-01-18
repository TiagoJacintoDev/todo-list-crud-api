const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ["Low", "Medium", "High", "Urgent"] },
  note: String,
});

module.exports = mongoose.model("Task", taskSchema);
