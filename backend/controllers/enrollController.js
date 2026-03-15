const Enrollment = require("../models/Enrollment");
const Course     = require("../models/Course");

// POST /api/enroll — student
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId)
      return res.status(400).json({ success: false, message: "courseId is required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    if (!course.isPublished)
      return res.status(400).json({ success: false, message: "Course is not published yet" });

    const already = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (already)
      return res.status(409).json({ success: false, message: "Already enrolled in this course" });

    const enrollment = await Enrollment.create({ student: req.user._id, course: courseId });

    // Increment enrolled count
    await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

    res.status(201).json({ success: true, message: "Enrolled successfully!", data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/enroll/my-courses — student
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({ path: "course", populate: { path: "instructor", select: "name" } })
      .sort({ createdAt: -1 });

    res.json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/enroll/progress — student update progress
const updateProgress = async (req, res) => {
  try {
    const { courseId, progress } = req.body;
    const enrollment = await Enrollment.findOneAndUpdate(
      { student: req.user._id, course: courseId },
      { progress, isCompleted: progress >= 100, completedAt: progress >= 100 ? new Date() : null },
      { new: true }
    );
    if (!enrollment)
      return res.status(404).json({ success: false, message: "Enrollment not found" });

    res.json({ success: true, message: "Progress updated", data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { enrollCourse, getMyCourses, updateProgress };
