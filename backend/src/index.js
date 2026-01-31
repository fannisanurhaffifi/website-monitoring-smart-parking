require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectToDatabase } = require("./config/database");

const penggunaRoutes = require("./routes/penggunaRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// CEK DB
connectToDatabase();

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server & Database aktif",
  });
});

// ================= ROUTES =================

// MAHASISWA
app.use("/api", penggunaRoutes);
// hasil:
// POST /api/login
// POST /api/register

// ADMIN  🔥 INI KUNCI
app.use("/api/admin", adminRoutes);
// hasil:
// POST /api/admin/login
// POST /api/admin/rfid
// dst

// ==========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di port ${PORT}`);
});
