"use client";

import Image from "next/image";
import { UserCog, LogOut } from "lucide-react";

export default function AdminNavbar() {
  return (
    <nav className="w-full border-b border-gray-300 bg-[#1F3A93] text-white">
      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* LEFT : LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-unila.png"
            alt="Logo Sistem Monitoring Parkir"
            width={44}
            height={44}
            className="h-9 w-9 sm:h-10 sm:w-10"
            priority
          />

          <div className="text-xs font-semibold leading-tight sm:text-sm">
            Sistem Monitoring Parkir <br />
            Teknik Geodesi
          </div>
        </div>

        {/* RIGHT : ADMIN INFO */}
        <div className="flex items-center gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <UserCog className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Admin</span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 transition-colors hover:text-red-300"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
