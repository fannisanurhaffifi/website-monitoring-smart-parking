"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DaftarPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    npm: "",
    nama: "",
    email: "",
    angkatan: "",
    password: "",
    plat_nomor: "",
    jenis_kendaraan: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registrasi berhasil, menunggu verifikasi admin");
      router.push("/login");
    } catch (error) {
      alert("Gagal terhubung ke server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="npm" onChange={handleChange} placeholder="NPM" />
      <input name="nama" onChange={handleChange} placeholder="Nama" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="angkatan" onChange={handleChange} placeholder="Angkatan" />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        name="plat_nomor"
        onChange={handleChange}
        placeholder="Plat Nomor"
      />

      <button type="submit">Daftar</button>
    </form>
  );
}
