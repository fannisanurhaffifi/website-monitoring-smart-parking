"use client";

import { useState, useRef } from "react";

export default function ProfilMahasiswaPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [foto, setFoto] = useState<string | null>(null);

  const [profil, setProfil] = useState({
    nama: "Nama Mahasiswa",
    npm: "221506xxxx",
    noKendaraan: "BE 1234 XX",
    email: "email@student.unila.ac.id",
    tipeKendaraan: "Motor",
    warnaKendaraan: "Hitam",
    jurusan: "Teknik Geodesi",
    angkatan: "2022",
  });

  const [password, setPassword] = useState({
    baru: "",
    konfirmasi: "",
  });

  /* ================= HANDLER ================= */
  const handleChangeProfil = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfil({ ...profil, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (password.baru || password.konfirmasi) {
      if (password.baru !== password.konfirmasi) {
        alert("Konfirmasi kata sandi tidak sesuai");
        return;
      }
    }

    alert("Profil berhasil diperbarui");
    setPassword({ baru: "", konfirmasi: "" });
  };

  return (
    <div className="rounded-xl border border-[#1F3A93] bg-[#E9EBEE] p-8">
      {/* ================= HEADER ================= */}
      <div className="mb-10 flex flex-col items-center">
        {/* FOTO PROFIL */}
        <div className="relative">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-[#1F3A93] shadow-md">
            {foto ? (
              <img
                src={foto}
                alt="Foto Profil"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-400 text-sm text-white">
                Foto
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFotoChange}
            className="hidden"
          />
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 rounded-full border border-[#1F3A93] px-5 py-1.5
          text-xs font-semibold text-[#1F3A93] transition
          hover:bg-[#1F3A93] hover:text-white"
        >
          Ubah Foto Profil
        </button>

        {/* STATUS */}
        <div className="mt-4 flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700">
          <span className="h-2.5 w-2.5 rounded-full bg-green-600"></span>
          Akun Aktif
        </div>
      </div>

      <hr className="mb-8 border-gray-300" />

      {/* ================= INFORMASI PROFIL ================= */}
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Informasi Profil
      </h3>

      <form className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {/* ===== TIDAK BISA DIUBAH ===== */}
        <Field label="Nama Lengkap" value={profil.nama} disabled />
        <Field label="NPM" value={profil.npm} disabled />
        <Field label="Nomor Kendaraan" value={profil.noKendaraan} disabled />
        <Field label="Email" value={profil.email} disabled />

        {/* ===== BISA DIUBAH ===== */}
        <Field
          label="Tipe Kendaraan"
          name="tipeKendaraan"
          value={profil.tipeKendaraan}
          onChange={handleChangeProfil}
        />
        <Field
          label="Warna Kendaraan"
          name="warnaKendaraan"
          value={profil.warnaKendaraan}
          onChange={handleChangeProfil}
        />
        <Field
          label="Angkatan"
          name="angkatan"
          value={profil.angkatan}
          onChange={handleChangeProfil}
        />
      </form>

      {/* ================= PASSWORD ================= */}
      <hr className="my-8 border-gray-300" />

      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Ganti Kata Sandi
      </h3>

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <Field
          label="Kata Sandi Baru"
          name="baru"
          type="password"
          value={password.baru}
          onChange={handleChangePassword}
        />
        <Field
          label="Konfirmasi Kata Sandi"
          name="konfirmasi"
          type="password"
          value={password.konfirmasi}
          onChange={handleChangePassword}
        />
      </div>

      {/* ================= SIMPAN ================= */}
      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-[#1F3A93] px-8 py-2.5
          text-sm font-semibold text-white transition
          hover:bg-[#162C6E]"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE FIELD ================= */
function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg border px-4 py-2 text-sm transition
          ${
            disabled
              ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
              : "border-[#1F3A93] focus:ring-2 focus:ring-[#1F3A93]"
          }`}
      />
    </div>
  );
}
