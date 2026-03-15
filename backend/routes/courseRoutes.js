const express = require("express");
const router  = express.Router();
const { getCourses, getAllCourses, getMyCourses, getCourseById, createCourse, updateCourse, deleteCourse, addLesson } = require("../controllers/courseController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/",           getCourses);                                // public
router.get("/all",        protect, authorize("admin"), getAllCourses); // admin
router.get("/my",         protect, authorize("instructor"), getMyCourses);
router.get("/:id",        getCourseById);                             // public
router.post("/",          protect, authorize("instructor","admin"), createCourse);
router.put("/:id",        protect, authorize("instructor","admin"), updateCourse);
router.delete("/:id",     protect, authorize("instructor","admin"), deleteCourse);
router.post("/:id/lessons", protect, authorize("instructor"), addLesson);

module.exports = router;
