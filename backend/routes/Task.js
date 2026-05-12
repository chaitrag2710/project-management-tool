const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["To-Do", "In Progress", "Done"],
    default: "To-Do",
  },
});

module.exports = mongoose.model("Task", taskSchema);