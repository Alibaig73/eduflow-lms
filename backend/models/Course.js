const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  duration:{ type: String, default: "0 min" },
  order:   { type: Number, default: 0 },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String, required: [true, "Title is required"], trim: true,
  },
  description: {
    type: String, required: [true, "Description is required"],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,
  },
  category: {
    type: String,
    enum: ["Web Development","Data Science","Design","Marketing","Business","Other"],
    default: "Web Development",
  },
  price:     { type: Number, default: 0, min: 0 },
  thumbnail: { type: String, default: "" },
  lessons:   [lessonSchema],
  isPublished: { type: Boolean, default: false },
  enrolledCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
