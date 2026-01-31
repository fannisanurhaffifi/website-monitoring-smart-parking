const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  verifikasiPengguna,
  generateRFID,
} = require("../controllers/adminController");

// LOGIN ADMIN
router.post("/login", loginAdmin);

// VERIFIKASI PENGGUNA
router.put("/verifikasi", verifikasiPengguna);

// RFID
router.post("/rfid", generateRFID);

module.exports = router;
