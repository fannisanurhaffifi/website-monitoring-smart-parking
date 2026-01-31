"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type RiwayatParkir = {
  tanggal: string;
  slot: string;
  waktu: string;
};

export default function UserDetailPage() {
  const router = useRouter();

  /* ===== DATA USER (SIMULASI DB) ===== */
  const [user, setUser] = useState({
    id: "U001",
    nama: "Andi Pratama",
    npm: "2217051001",
    email: "andi@student.unila.ac.id",
    rfid: "RFID-9A83K21",
    status: "Aktif" as "Aktif" | "Diblokir",
    kesempatanParkir: 70,
    foto: null as string | null, // ← foto profil
  });

  const [kesempatanBaru, setKesempatanBaru] = useState(user.kesempatanParkir);

  const riwayatParkir: RiwayatParkir[] = [
    { tanggal: "12/01/26", slot: "Slot A01", waktu: "08.00 - 10.00" },
    { tanggal: "14/01/26", slot: "Slot B03", waktu: "09.10 - 11.30" },
  ];

  /* ===== HANDLER ===== */
  const handleSimpanKesempatan = () => {
    setUser({ ...user, kesempatanParkir: kesempatanBaru });
    alert("Kesempatan parkir berhasil diperbarui");
  };

  const handleToggleStatus = () => {
    setUser({
      ...user,
      status: user.status === "Aktif" ? "Diblokir" : "Aktif",
    });
  };

  const handleHapusUser = () => {
    if (!confirm(`Hapus pengguna ${user.nama}?`)) return;
    alert("Pengguna berhasil dihapus");
    router.push("/admin/pengguna-parkir");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ================= HEADER ================= */}
      <div className="rounded-xl border border-[#1F3A93] bg-white p-6">
        <h1 className="text-lg font-semibold text-[#1F3A93]">
          Detail Pengguna Parkir
        </h1>
        <p className="text-xs text-gray-500">
          Informasi lengkap pengguna & kontrol admin
        </p>
      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-sm sm:flex-row">
        {/* FOTO */}
        <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#1F3A93]">
          {user.foto ? (
            <img
              src={user.foto}
              alt="Foto Profil"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-400 text-xs text-white">
              Foto
            </div>
          )}
        </div>

        {/* IDENTITAS */}
        <div className="flex-1 space-y-1 text-sm">
          <p className="text-base font-semibold text-gray-800">{user.nama}</p>
          <p className="text-xs text-gray-500">NPM: {user.npm}</p>
          <p className="text-xs text-gray-500">{user.email}</p>

          <span
            className={`mt-2 inline-block rounded-full px-4 py-1 text-xs font-semibold
              ${
                user.status === "Aktif"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {user.status}
          </span>
        </div>
      </div>

      {/* ================= INFORMASI TEKNIS ================= */}
      <div className="grid grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-3">
        <Info label="User ID" value={user.id} />
        <Info label="RFID" value={user.rfid} />
        <Info
          label="Kesempatan Parkir"
          value={`${user.kesempatanParkir} kali`}
        />
      </div>

      {/* ================= KESEMPATAN PARKIR ================= */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-800">
          Manajemen Kesempatan Parkir
        </h2>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <input
            type="number"
            min={0}
            value={kesempatanBaru}
            onChange={(e) => setKesempatanBaru(Number(e.target.value))}
            className="w-28 rounded-md border border-gray-300 px-3 py-1
              focus:border-[#1F3A93] focus:outline-none"
          />

          <button
            onClick={handleSimpanKesempatan}
            className="rounded-md bg-[#1F3A93] px-5 py-2 text-xs font-semibold text-white
              transition hover:bg-[#162C6E]"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* ================= RIWAYAT PARKIR ================= */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-800">
          Riwayat Parkir
        </h2>

        {riwayatParkir.length ? (
          <ul className="space-y-2 text-xs">
            {riwayatParkir.map((item, i) => (
              <li
                key={i}
                className="rounded-md border border-gray-200 px-4 py-2 text-gray-700"
              >
                {item.tanggal} • {item.slot} • {item.waktu}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500">Belum ada riwayat parkir</p>
        )}
      </div>

      {/* ================= ACTION ================= */}
      <div className="flex flex-wrap justify-between gap-3 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex gap-3">
          <button
            onClick={handleToggleStatus}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition
              ${
                user.status === "Aktif"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
          >
            {user.status === "Aktif" ? "Blokir Pengguna" : "Aktifkan Pengguna"}
          </button>

          <button
            onClick={handleHapusUser}
            className="rounded-md border border-red-600 px-5 py-2 text-sm font-semibold
              text-red-600 transition hover:bg-red-50"
          >
            Hapus Pengguna
          </button>
        </div>

        <button
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 px-5 py-2 text-sm
            transition hover:bg-gray-100"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE INFO ================= */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
