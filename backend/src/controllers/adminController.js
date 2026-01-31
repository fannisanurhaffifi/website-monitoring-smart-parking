const { query } = require("../config/database");

/**
 * KF-02: Login Admin
 */
const loginAdmin = async (req, res) => {
  try {
    const { nama, password } = req.body;

    if (!nama || !password) {
      return res.status(400).json({
        status: "error",
        message: "Nama dan password wajib diisi",
      });
    }

    const rows = await query(
      "SELECT id_admin, nama, password FROM admin WHERE nama = ? LIMIT 1",
      [nama],
    );

    if (rows.length === 0 || rows[0].password !== password) {
      return res.status(401).json({
        status: "error",
        message: "Nama atau password admin salah",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Login admin berhasil",
      data: {
        id_admin: rows[0].id_admin,
        nama: rows[0].nama,
        role: "admin",
      },
    });
  } catch (err) {
    console.error("loginAdmin error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * KF-03: Verifikasi Akun Pengguna (AKTIF / NONAKTIF)
 */
const verifikasiPengguna = async (req, res) => {
  try {
    const { npm, status_akun } = req.body;

    if (!npm || status_akun === undefined) {
      return res.status(400).json({
        status: "error",
        message: "NPM dan status akun wajib diisi",
      });
    }

    const result = await query(
      "UPDATE pengguna SET status_akun = ? WHERE npm = ?",
      [status_akun, npm],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Status akun berhasil diperbarui",
    });
  } catch (err) {
    console.error("verifikasiPengguna error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * KF-05: Generate RFID
 */
const generateRFID = async (req, res) => {
  const { id_kendaraan } = req.body;

  if (!id_kendaraan) {
    return res.status(400).json({
      status: "error",
      message: "ID kendaraan wajib diisi",
    });
  }

  const kode_rfid = `RFID-${Date.now()}`;
  await query(
    "INSERT INTO rfid (id_kendaraan, kode_rfid, status_rfid) VALUES (?, ?, 1)",
    [id_kendaraan, kode_rfid],
  );

  return res.status(201).json({
    status: "success",
    message: "RFID berhasil dibuat",
    data: { kode_rfid },
  });
};

module.exports = {
  loginAdmin,
  verifikasiPengguna, // 🔥 WAJIB ADA
  generateRFID,
};
