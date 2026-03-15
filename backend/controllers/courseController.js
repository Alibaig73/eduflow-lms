const Course     = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// GET /api/courses — public
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (search)   filter.title = { $regex: search, $options: "i" };

    const courses = await Course.find(filter)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/courses/all — admin only (includes unpublished)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/courses/my — instructor's own courses
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/courses/:id — public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email bio");
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/courses — instructor
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    if (!title || !description)
      return res.status(400).json({ success: false, message: "Title and description required" });

    const course = await Course.create({
      title, description, category, price,
      instructor: req.user._id,
    });
    res.status(201).json({ success: true, message: "Course created", data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/courses/:id — instructor (own) or admin
const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    // Instructor can only edit their own course
    if (req.user.role === "instructor" && course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Not authorized to edit this course" });

    course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, message: "Course updated", data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/courses/:id — instructor (own) or admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    if (req.user.role === "instructor" && course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Not authorized to delete this course" });

    await Course.findByIdAndDelete(req.params.id);
    await Enrollment.deleteMany({ course: req.params.id });

    res.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/courses/:id/lessons — instructor
const addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Not authorized" });

    const { title, content, duration } = req.body;
    if (!title || !content)
      return res.status(400).json({ success: false, message: "Title and content required" });

    course.lessons.push({ title, content, duration, order: course.lessons.length + 1 });
    await course.save();

    res.status(201).json({ success: true, message: "Lesson added", data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCourses, getAllCourses, getMyCourses, getCourseById, createCourse, updateCourse, deleteCourse, addLesson };
