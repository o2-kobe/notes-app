require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
mongoose
  .connect(config.connectionString)
  .then(() => console.log("DB Connected.."));

const User = require("./models/userModel");
const Note = require("./models/noteModel");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

const jwt = require("jsonwebtoken");
const authenticateToken = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Hey" });
});

// Signup
app.post("/signup", async (req, res) => {
  // Get details from request body
  const { fullName, email, password } = req.body;

  // Check if for required  details
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  // Check if the user exists
  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.status(409).json({
      //the 409 statusCode shows the req was successful due to a confilct with the body
      error: true,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ fullName, email, password: hashedPassword });
  await user.save();

  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "36000m",
    }
  );

  return res.status(201).json({
    error: false,
    user: {
      fullName: user.fullName,
      email: user.email,
    },
    accessToken,
    message: "Registration Succesful!",
  });
});

// Login
app.post("/login", async (req, res) => {
  // Check if the user exists
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({
      error: true,
      message: "Email is required",
    });
  }

  if (!password) {
    res.status(400).json({
      error: true,
      message: "Password is required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error: true,
      message: "User does not exist",
    });
  }

  // Use bcrypt to compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (user.email === email && isPasswordValid) {
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "36000m",
      }
    );

    res.status(200).json({
      error: false,
      message: "Login succesful!",
      email: user.email,
      accessToken,
    });
  } else {
    return res.status(401).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});

// Get user
app.get("/user", authenticateToken, async (req, res) => {
  const { user } = req;

  const isUser = await User.findOne({ _id: user._id }).select("email fullName");

  if (!isUser) {
    return res.sendStatus(401);
  }

  res.json({
    user: isUser,
    message: "",
  });
});

// Get All Notes
app.get("/note", authenticateToken, async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: true,
      message: "User is not authenticated",
    });
  }

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 }); //this is used to find for notes created by that specific user

    res.status(200).json({
      error: false,
      results: notes.length,
      notes,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// Get one Note
app.get("/note/:id", authenticateToken, async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: true,
      message: "User not authenticated",
    });
  }

  const note = await Note.findById(req.params.id);

  res.status(200).json({
    error: false,
    note,
  });
});

// Create note
app.post("/note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req;

  if (!title) {
    return res.status(400).json({
      error: true,
      message: "Title is required",
    });
  }

  if (!content) {
    return res.status(400).json({
      error: true,
      message: "Content is required",
    });
  }

  if (!user) {
    return res
      .status(401)
      .json({ error: true, message: "User not authenticated" });
  }

  try {
    // Create Note instance
    const newNote = new Note({
      title,
      content,
      tags: tags || [],
      userId: user.id,
    });

    // Save to database
    await newNote.save();

    console.log(user._id);

    return res.status(201).json({
      error: false,
      newNote,
      message: "Note created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An unexpected error occurred while creating the note.",
    });
  }
});

// Edit note
app.patch("/note/:id", authenticateToken, async (req, res) => {
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid note ID format" });
  }

  if (!req.body) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  const { user } = req;

  if (!user) {
    return res
      .status(401)
      .json({ error: true, message: "User not authenticated" });
  }

  try {
    const updatedDocument = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedDocument) {
      return res
        .status(404)
        .json({ error: true, message: "Document does not exist" });
    }

    res.status(200).json({
      error: false,
      updatedDocument,
      message: "Note successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "An error occurred while updating the note",
      details: error.message,
    });
  }
});

//Delete Note
app.delete("/note/:id", authenticateToken, async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: true,
      message: "User is not authenticated",
    });
  }

  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Note successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "An error occurred while deleting the note",
    });
  }
});

// Update Ispinned
app.patch("/update-note-ispinned/:id", authenticateToken, async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: true,
      message: "User is not authenticated",
    });
  }

  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      [
        {
          $set: {
            isPinned: { $not: "$isPinned" }, // Toggles boolean value
          },
        },
      ],
      { new: true } // Return updated document
    );

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      error: false,
      note,
      message: "Note successfuly updated",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "An error occured while updating note",
    });
  }
});

app.listen(8000, () => console.log("App started successfully"));

module.exports = app;
