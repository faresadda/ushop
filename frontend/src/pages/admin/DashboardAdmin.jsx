import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaMoneyBillWave,
  FaEye,
  FaChartBar,
} from "react-icons/fa";

const chartDataSample = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Apr", sales: 2780, revenue: 3908 },
  { month: "May", sales: 1890, revenue: 4800 },
  { month: "Jun", sales: 2390, revenue: 3800 },
  { month: "Jul", sales: 3490, revenue: 4300 },
];

export default function Dashboard() {

  const [stats, setStats] = useState({
    visitors: 25000,
    sales: 914001,
    products: 1200,
    revenue: 4594878,
    orders: 980,
    users: 5000,
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        visitors: 25000,
        sales: 914001,
        products: 1200,
        revenue: 4594878,
        orders: 980,
        users: 5000,
      });
      setChartData(chartDataSample);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="flex-1 p-6 min-h-screen bg-white">
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <StatCard
              icon={<FaEye />}
              label="Visitors"
              value={stats.visitors.toLocaleString()}
              color="bg-gray-700"
            />
            <StatCard
              icon={<FaChartBar />}
              label="Sales"
              value={stats.sales.toLocaleString()}
              color="bg-blue-500"
            />
            <StatCard
              icon={<FaBoxOpen />}
              label="Products"
              value={stats.products}
              color="bg-red-500"
            />
            <StatCard
              icon={<FaMoneyBillWave />}
              label="Revenue"
              value={`$${stats.revenue.toLocaleString()}`}
              color="bg-green-500"
            />
            <StatCard
              icon={<FaShoppingCart />}
              label="Orders"
              value={stats.orders}
              color="bg-yellow-500"
            />
            <StatCard
              icon={<FaUsers />}
              label="Users"
              value={stats.users}
              color="bg-purple-500"
            />
          </div>

          {/* Chart Full Width */}
          <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-center">
            <div className="w-full" style={{ aspectRatio: "4 / 3" }}>
              <h2 className="text-lg font-semibold mb-4 text-tertiary">
                Sales & Revenue
              </h2>
              <SalesRevenueChart data={chartData} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, color }) {
  return (
    <div
      className={`rounded-xl shadow p-6 flex flex-col items-center ${color}`}
    >
      <div className="text-3xl mb-2 text-white">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-gray-200">{label}</div>
    </div>
  );
}

// Sales & Revenue Chart (Line Chart)
function SalesRevenueChart({ data }) {
  if (!data.length)
    return (
      <div className="h-40 flex items-center justify-center text-gray-400">
        No Data
      </div>
    );
  const maxSales = Math.max(...data.map((d) => d.sales));
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  const ySteps = 5;
  const maxY = Math.max(maxSales, maxRevenue);
  const step = Math.ceil(maxY / ySteps);

  return (
    <svg
      viewBox="0 0 440 330"
      className="w-full"
      style={{ height: "75vw", maxHeight: 330 }}
    >
      {/* Y Axis Values */}
      {[...Array(ySteps + 1)].map((_, i) => {
        const y = 270 - (i * 250) / ySteps;
        const value = i * step;
        return (
          <g key={i}>
            <text x="0" y={y + 5} fontSize="12" fill="#bbb">
              {value}
            </text>
            <line
              x1="40"
              y1={y}
              x2="420"
              y2={y}
              stroke="#eee"
              strokeDasharray="2,2"
            />
          </g>
        );
      })}
      {/* Sales Line */}
      <polyline
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        points={data
          .map((d, i) => `${i * 55 + 55},${270 - (d.sales / maxY) * 250}`)
          .join(" ")}
      />
      {/* Revenue Line */}
      <polyline
        fill="none"
        stroke="#22c55e"
        strokeWidth="3"
        points={data
          .map((d, i) => `${i * 55 + 55},${270 - (d.revenue / maxY) * 250}`)
          .join(" ")}
      />
      {/* Month Labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={i * 55 + 55}
          y={295}
          fontSize="12"
          textAnchor="middle"
          fill="#888"
        >
          {d.month}
        </text>
      ))}
      {/* Legend */}
      <rect x="340" y="20" width="14" height="14" fill="#3b82f6" />
      <text x="360" y="32" fontSize="12" fill="#3b82f6">
        Sales
      </text>
      <rect x="340" y="45" width="14" height="14" fill="#22c55e" />
      <text x="360" y="57" fontSize="12" fill="#22c55e">
        Revenue
      </text>
    </svg>
  );
}
