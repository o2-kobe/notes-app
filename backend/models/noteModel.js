const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, "A note requires a title"],
  },
  content: {
    type: String,
    required: [true, "A note requires a content"],
  },
  tags: {
    type: [String],
    default: [],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date().getTime(),
  },
});

const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
