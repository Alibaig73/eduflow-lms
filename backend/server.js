const path    = require("path");
const dotenv  = require("dotenv");

// Load .env FIRST with explicit path
dotenv.config({ path: path.join(__dirname, ".env") });

const express   = require("express");
const connectDB = require("./config/db");

// Test print — delete this line after it works
console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "YES ✅" : "NO ❌");

connectDB();

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth",    require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/users",   require("./routes/userRoutes"));
app.use("/api/enroll",  require("./routes/enrollRoutes"));

// Root
app.get("/", (req, res) => {
  res.json({ message: "🎓 LMS API Running!" });
});

// 404
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

app.listen(PORT, () => console.log(`✅ LMS Server running at http://localhost:${PORT}`));