const User       = require("../models/User");
const Course     = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// GET /api/users — admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/users/:id — admin only
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.role === "admin")
      return res.status(400).json({ success: false, message: "Cannot delete an admin" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: `User "${user.name}" deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/users/analytics — admin only
const getAnalytics = async (req, res) => {
  try {
    const totalUsers       = await User.countDocuments();
    const totalStudents    = await User.countDocuments({ role: "student" });
    const totalInstructors = await User.countDocuments({ role: "instructor" });
    const totalCourses     = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const publishedCourses = await Course.countDocuments({ isPublished: true });

    res.json({
      success: true,
      data: { totalUsers, totalStudents, totalInstructors, totalCourses, totalEnrollments, publishedCourses },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/users/profile — any logged in user
const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id, { name, bio }, { new: true, runValidators: true }
    ).select("-password");
    res.json({ success: true, message: "Profile updated", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, getAnalytics, updateProfile };
