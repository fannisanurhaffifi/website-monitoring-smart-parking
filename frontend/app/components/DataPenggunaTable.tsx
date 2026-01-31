"use client";

import Link from "next/link";
import { Check, Ban, Trash2 } from "lucide-react";

type User = {
  id: string;
  npm: string;
  nama: string;
  noKendaraan: string;
  status: "Aktif" | "Menunggu" | "Diblokir";
};

const users: User[] = [
  {
    id: "U001",
    npm: "2217051001",
    nama: "Andi Pratama",
    noKendaraan: "BE 1234 XX",
    status: "Aktif",
  },
  {
    id: "U002",
    npm: "2217051002",
    nama: "Siti Aisyah",
    noKendaraan: "BE 5678 YY",
    status: "Menunggu",
  },
];

export default function DataPenggunaTable() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <Th>NPM</Th>
            <Th>Nama</Th>
            <Th>No Kendaraan</Th>
            <Th>Status</Th>
            <Th>Aksi</Th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t text-center transition hover:bg-[#F4F6F8]"
            >
              <Td>{user.npm}</Td>

              {/* ===== NAMA (LINK KE DETAIL) ===== */}
              <Td>
                <Link
                  href={`/admin/pengguna-parkir/${user.id}`}
                  className="font-semibold text-[#1F3A93] hover:underline"
                >
                  {user.nama}
                </Link>
              </Td>

              <Td>{user.noKendaraan}</Td>

              {/* ===== STATUS ===== */}
              <Td>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold
                    ${
                      user.status === "Aktif"
                        ? "bg-green-100 text-green-700"
                        : user.status === "Menunggu"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                >
                  {user.status}
                </span>
              </Td>

              {/* ===== AKSI ===== */}
              <Td>
                <div className="flex justify-center gap-2">
                  {/* VALIDASI */}
                  <button
                    title="Validasi"
                    className="rounded-md bg-green-600 p-2 text-white transition hover:bg-green-700"
                  >
                    <Check size={14} />
                  </button>

                  {/* BLOKIR */}
                  <button
                    title="Blokir"
                    className="rounded-md bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                  >
                    <Ban size={14} />
                  </button>

                  {/* HAPUS */}
                  <button
                    title="Hapus"
                    className="rounded-md bg-red-600 p-2 text-white transition hover:bg-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===== REUSABLE CELL ===== */
function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-xs font-semibold text-gray-700">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2 text-xs">{children}</td>;
}
