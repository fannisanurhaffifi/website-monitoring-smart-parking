"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function StatistikKendaraan() {
  const [periode, setPeriode] = useState<"harian" | "mingguan" | "bulanan">(
    "harian",
  );

  const dataPeriode = {
    harian: {
      labels: [
        "06.00",
        "07.00",
        "08.00",
        "09.00",
        "10.00",
        "11.00",
        "12.00",
        "13.00",
        "14.00",
        "15.00",
        "16.00",
        "17.00",
      ],
      data: [12, 25, 40, 55, 48, 50, 45, 38, 42, 36, 28, 20],
    },
    mingguan: {
      labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
      data: [720, 680, 750, 800, 770],
    },
    bulanan: {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei"],
      data: [2800, 3000, 3200, 3500, 3700],
    },
  };

  const chartData = {
    labels: dataPeriode[periode].labels,
    datasets: [
      {
        label: "Jumlah Kendaraan",
        data: dataPeriode[periode].data,
        backgroundColor: "#1F3A93",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="rounded-lg bg-gray-200 p-4">
      {/* HEADER */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Statistik Kendaraan</h3>

        <select
          value={periode}
          onChange={(e) =>
            setPeriode(e.target.value as "harian" | "mingguan" | "bulanan")
          }
          className="rounded border px-2 py-1 text-xs"
        >
          <option value="harian">Harian (Per Jam)</option>
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
        </select>
      </div>

      {/* CHART */}
      <div className="h-[320px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.parsed.y} kendaraan`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text:
                    periode === "harian"
                      ? "Waktu (Jam)"
                      : periode === "mingguan"
                        ? "Hari"
                        : "Bulan",
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Jumlah Kendaraan",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
