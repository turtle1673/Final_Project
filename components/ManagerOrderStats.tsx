"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type OrderByStatus = {
  orderStatus: string;
  _count: { _all: number };
};

type StatsData = {
  orderThisDay: number;
  orderThisMonth: number;
  revenueThisDay: number;
  revenueThisMonth: number;
  avgOrderValue: number | string;
  orderByStatus: OrderByStatus[];
};

export default function ManagerOrdersStats() {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    fetch("/api/stats/orders")
      .then((res) => res.json())
      .then((data) => setStats(data.data));
  }, [])

  if (!stats) return <p>Loading...</p>;

  // Pie chart data
  const pieData = {
    labels: stats.orderByStatus.map((s) => s.orderStatus),
    datasets: [
      {
        label: "# of Orders",
        data: stats.orderByStatus.map((s) => s._count._all),
        backgroundColor: ["#facc15 ", "#ef4444", "#16a34a"], // PENDING, COMPLETED, CANCELLED
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 col-span-2">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-teal-500">จำนวนคำสั่งซื้อวันนี้</h2>
          <p className="text-2xl font-bold">{stats.orderThisDay}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-teal-500">จำนวนคำสั่งซื้อเดือนนี้</h2>
          <p className="text-2xl font-bold">{stats.orderThisMonth}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-teal-500">ยอดขายของวันนี้</h2>
          <p className="text-2xl font-bold">{stats.revenueThisDay} บาท</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-teal-500">ยอดขายของเดือนนี้</h2>
          <p className="text-2xl font-bold">{stats.revenueThisMonth} บาท</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-teal-500">ราคาเฉลี่ย</h2>
          <p className="text-2xl font-bold">{stats.avgOrderValue} บาท</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="p-4 bg-white shadow rounded col-span-2 md:col-span-1">
        <h2 className="text-lg font-semibold mb-4">pie chart order status</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
