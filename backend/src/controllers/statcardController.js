const db = require("../config/database");

const getStatCardParkir = async (req, res) => {
  try {
    const { npm } = req.query;

    // ===== TOTAL SLOT PARKIR (FISIK) =====
    const slotRows = await db.query(`
      SELECT SUM(jumlah) AS total_slot
      FROM slot_parkir
    `);
    const total_slot = slotRows[0]?.total_slot || 0;

    // ===== TERISI (KENDARAAN SEDANG PARKIR) =====
    const terisiRows = await db.query(`
      SELECT COUNT(*) AS terisi
      FROM log_parkir
      WHERE status_parkir = 'MASUK'
    `);
    const terisi = terisiRows[0]?.terisi || 0;

    // ===== TERSEDIA (SLOT FISIK) =====
    // Karena di parkirController.js sudah ada query "UPDATE slot_parkir SET jumlah = jumlah - 1",
    // maka total_slot sudah merupakan angka slot yang masih tersedia.
    const tersedia = total_slot;

    // ===== BATAS PARKIR & TERPAKAI (DARI TABEL KUOTA) =====
    let batas_parkir = 0;
    let jumlah_terpakai = 0;

    if (npm) {
      // Ambil record terbaru (untuk mendapatkan bulan ini atau base quota)
      const kuotaRows = await db.query(`
        SELECT batas_parkir, jumlah_terpakai FROM kuota_parkir 
        WHERE npm = ? 
        ORDER BY id_kuota DESC LIMIT 1
      `, [npm]);

      if (kuotaRows.length > 0) {
        batas_parkir = kuotaRows[0].batas_parkir;
        jumlah_terpakai = kuotaRows[0].jumlah_terpakai;
      } else {
        // Fallback ke kuota global
        const globalKuota = await db.query(`
          SELECT batas_parkir FROM kuota_parkir 
          WHERE npm IS NULL 
          ORDER BY id_kuota DESC LIMIT 1
        `);
        batas_parkir = globalKuota[0]?.batas_parkir || 0;
      }
    } else {
      const globalKuota = await db.query(`
        SELECT batas_parkir FROM kuota_parkir 
        WHERE npm IS NULL 
        ORDER BY id_kuota DESC LIMIT 1
      `);
      batas_parkir = globalKuota[0]?.batas_parkir || 0;
    }

    // ===== KESEMPATAN PARKIR =====
    const kesempatan_parkir = npm ? Math.max(batas_parkir - jumlah_terpakai, 0) : batas_parkir;

    // ===== RESPONSE =====
    res.json({
      success: true,
      data: {
        terisi,
        tersedia,
        kesempatan_parkir,
      },
    });
  } catch (error) {
    console.error("StatCard Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data statcard",
    });
  }
};

module.exports = { getStatCardParkir };

