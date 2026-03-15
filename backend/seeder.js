// =============================================
// seeder.js
// Run this ONCE to create admin + sample data
// Command: node seeder.js
// =============================================

const mongoose = require("mongoose");
const dotenv   = require("dotenv");
const path     = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const User       = require("./models/User");
const Course     = require("./models/Course");
const Enrollment = require("./models/Enrollment");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // ---- CREATE USERS ----
    const admin = await User.create({
      name:     "Admin User",
      email:    "admin@lms.com",
      password: "admin123",
      role:     "admin",
    });

    const instructor1 = await User.create({
      name:     "Ali Hassan",
      email:    "ali@lms.com",
      password: "ali123",
      role:     "instructor",
      bio:      "Full Stack Developer with 5 years experience",
    });

    const instructor2 = await User.create({
      name:     "Sara Ahmed",
      email:    "sara@lms.com",
      password: "sara123",
      role:     "instructor",
      bio:      "UI/UX Designer and Frontend Developer",
    });

    const student = await User.create({
      name:     "Test Student",
      email:    "student@lms.com",
      password: "student123",
      role:     "student",
    });

    console.log("👥 Users created");

    // ---- CREATE COURSES ----
    const courses = await Course.insertMany([
      {
        title:       "Complete MERN Stack Bootcamp",
        description: "Learn MongoDB, Express, React and Node.js from scratch. Build real-world projects and become a full stack developer.",
        instructor:  instructor1._id,
        category:    "Web Development",
        price:       49,
        isPublished: true,
        lessons: [
          { title: "Introduction to MERN Stack", content: "Overview of MongoDB, Express, React, Node.js", duration: "15 min", order: 1 },
          { title: "Setting Up Node.js",         content: "Install Node.js and create your first server", duration: "20 min", order: 2 },
          { title: "Express.js Basics",          content: "Routes, middleware, and REST APIs",            duration: "30 min", order: 3 },
          { title: "MongoDB & Mongoose",         content: "Database setup, schemas and models",           duration: "35 min", order: 4 },
          { title: "React Fundamentals",         content: "Components, props, state and hooks",           duration: "40 min", order: 5 },
        ],
      },
      {
        title:       "React JS Complete Guide",
        description: "Master React JS from basics to advanced concepts including hooks, context API, and React Router.",
        instructor:  instructor1._id,
        category:    "Web Development",
        price:       39,
        isPublished: true,
        lessons: [
          { title: "React Introduction",    content: "What is React and why use it",          duration: "10 min", order: 1 },
          { title: "JSX and Components",   content: "Understanding JSX syntax and components", duration: "25 min", order: 2 },
          { title: "useState Hook",        content: "Managing state in functional components", duration: "30 min", order: 3 },
          { title: "useEffect Hook",       content: "Side effects and lifecycle management",   duration: "30 min", order: 4 },
          { title: "React Router",         content: "Navigation and routing in React apps",    duration: "25 min", order: 5 },
        ],
      },
      {
        title:       "UI/UX Design Masterclass",
        description: "Learn the principles of UI/UX design, wireframing, prototyping, and how to create stunning user interfaces.",
        instructor:  instructor2._id,
        category:    "Design",
        price:       0,
        isPublished: true,
        lessons: [
          { title: "Design Principles",    content: "Color theory, typography and layout",   duration: "20 min", order: 1 },
          { title: "Wireframing",          content: "Creating wireframes for web apps",      duration: "25 min", order: 2 },
          { title: "Prototyping in Figma", content: "Build interactive prototypes in Figma", duration: "35 min", order: 3 },
        ],
      },
      {
        title:       "Node.js & Express API Development",
        description: "Build powerful REST APIs using Node.js and Express. Learn authentication, middleware and database integration.",
        instructor:  instructor1._id,
        category:    "Web Development",
        price:       29,
        isPublished: true,
        lessons: [
          { title: "Node.js Basics",         content: "Introduction to Node.js runtime",       duration: "20 min", order: 1 },
          { title: "Express Framework",      content: "Setting up Express server and routes",  duration: "25 min", order: 2 },
          { title: "REST API Design",        content: "Building RESTful APIs best practices",  duration: "30 min", order: 3 },
          { title: "JWT Authentication",     content: "Secure your API with JSON Web Tokens",  duration: "35 min", order: 4 },
        ],
      },
      {
        title:       "Python for Data Science",
        description: "Learn Python programming and data science fundamentals including NumPy, Pandas and data visualization.",
        instructor:  instructor2._id,
        category:    "Data Science",
        price:       59,
        isPublished: true,
        lessons: [
          { title: "Python Basics",          content: "Variables, loops and functions",        duration: "30 min", order: 1 },
          { title: "NumPy & Pandas",         content: "Data manipulation with Python",         duration: "40 min", order: 2 },
          { title: "Data Visualization",     content: "Charts and graphs with Matplotlib",     duration: "35 min", order: 3 },
        ],
      },
      {
        title:       "Digital Marketing Fundamentals",
        description: "Master digital marketing including SEO, social media marketing, email campaigns and Google Ads.",
        instructor:  instructor2._id,
        category:    "Marketing",
        price:       0,
        isPublished: true,
        lessons: [
          { title: "SEO Basics",             content: "Search engine optimization fundamentals", duration: "25 min", order: 1 },
          { title: "Social Media Marketing", content: "Growing your brand on social media",      duration: "30 min", order: 2 },
          { title: "Email Marketing",        content: "Building and managing email campaigns",   duration: "20 min", order: 3 },
        ],
      },
    ]);

    console.log(`📚 ${courses.length} courses created`);

    // ---- SUMMARY ----
    console.log("\n🎉 Database seeded successfully!\n");
    console.log("═══════════════════════════════════════");
    console.log("📧 LOGIN CREDENTIALS:");
    console.log("═══════════════════════════════════════");
    console.log("👑 ADMIN:");
    console.log("   Email:    admin@lms.com");
    console.log("   Password: admin123");
    console.log("───────────────────────────────────────");
    console.log("👨‍🏫 INSTRUCTOR 1:");
    console.log("   Email:    ali@lms.com");
    console.log("   Password: ali123");
    console.log("───────────────────────────────────────");
    console.log("👨‍🏫 INSTRUCTOR 2:");
    console.log("   Email:    sara@lms.com");
    console.log("   Password: sara123");
    console.log("───────────────────────────────────────");
    console.log("🎓 STUDENT:");
    console.log("   Email:    student@lms.com");
    console.log("   Password: student123");
    console.log("═══════════════════════════════════════\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error.message);
    process.exit(1);
  }
};

seedData();
