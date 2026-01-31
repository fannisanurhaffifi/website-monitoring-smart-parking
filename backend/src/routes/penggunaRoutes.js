const express = require("express");
const router = express.Router();

// Import controller pengguna
const {
  registerPengguna,
  loginPengguna,
  editProfilPengguna,
  riwayatParkirPengguna,
} = require("../controllers/penggunaController");

// ===================================
// ROUTES PENGGUNA
// ===================================

// KF-01 & KF-04: Registrasi pengguna + data kendaraan
router.post("/register", registerPengguna);

// KF-02: Login pengguna
router.post("/login", loginPengguna);

// KF-13: Edit profil pengguna
router.put("/profil", editProfilPengguna);

// KF-14: Riwayat parkir pengguna
router.get("/riwayat-parkir/:npm", riwayatParkirPengguna);

// ===================================

module.exports = router;
