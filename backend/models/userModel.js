const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have an email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  createdAt: {
    type: Date,
    default: new Date().getTime(),
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
