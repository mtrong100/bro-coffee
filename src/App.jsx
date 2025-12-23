import { useEffect, useState, useMemo } from "react";
import {
  Coffee,
  Database,
  DollarSign,
  Zap,
  RefreshCw,
  Loader,
  AlertCircle,
} from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";
import DataTable from "./components/DataTable";
import StatCard from "./components/StatCard";
import Footer from "./components/Footer";

/* ================= CONFIG ================= */
const SHEET_ID = "1HfBkmmybTAdJA4KaHPg9GjIVtm_HfQZwxBmPzrTly1A";
const SHEET_NAME = "Sheet1";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

const HEADERS = [
  "date",
  "time",
  "session",
  "place",
  "drink",
  "price",
  "imageUrl",
];

/* ================= HELPERS ================= */
const parseCSV = (csv) => {
  const rows = csv.split("\n").filter(Boolean);

  return rows.slice(1).map((row) => {
    const values = row
      .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
      .map((v) => v.replace(/^"|"$/g, "").trim());

    return HEADERS.reduce((acc, key, i) => {
      acc[key] = values[i] || "";
      return acc;
    }, {});
  });
};

const parseVND = (value) => Number(String(value).replace(/[^\d]/g, "")) || 0;

/* ================= APP ================= */
export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  console.log(data);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(SHEET_URL);
      if (!res.ok) throw new Error("Không thể tải Google Sheets");

      const csv = await res.text();
      const parsed = parseCSV(csv).filter((row) => row.drink || row.price);
      const dataWithoutLastItem = parsed.length > 0 ? parsed.slice(0, -1) : [];

      setData(dataWithoutLastItem);
      setLastUpdated(new Date().toLocaleTimeString("vi-VN"));
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= STATS ================= */
  const totalRecords = data.length;

  const totalAmount = useMemo(
    () => data.reduce((sum, row) => sum + parseVND(row.price), 0),
    [data]
  );

  const formattedTotalAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalAmount);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-emerald-200/50 dark:border-emerald-900/30 shadow-lg shadow-emerald-100/20 dark:shadow-gray-950/20">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-3 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <Coffee className="relative text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="font-bold text-2xl bg-linear-to-r from-emerald-700 via-teal-600 to-emerald-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-300 bg-clip-text text-transparent">
                Bro Coffee
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-all duration-200 hover:scale-105 active:scale-95"
              title="Refresh data"
            >
              <RefreshCw size={20} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container mx-auto px-4 py-6">
        {/* ===== Stats Cards ===== */}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<Database />}
              label="Tổng bản ghi"
              value={totalRecords}
              variant="indigo"
            />
            <StatCard
              icon={<DollarSign />}
              label="Tổng tiền"
              value={formattedTotalAmount}
              variant="green"
            />
            <StatCard
              icon={<Zap />}
              label="Cập nhật lúc"
              value={lastUpdated}
              variant="rose"
            />
          </div>
        )}

        {/* ===== Loading ===== */}
        {loading && (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Loader
                className="animate-spin mx-auto mb-4 text-emerald-600 dark:text-emerald-400 relative"
                size={48}
              />
            </div>
            <p className="text-emerald-700/80 dark:text-emerald-300/80 font-medium mt-4">
              Đang pha cà phê và tải dữ liệu...
            </p>
            <p className="text-emerald-600/60 dark:text-emerald-400/60 text-sm mt-2">
              Vui lòng đợi trong giây lát
            </p>
          </div>
        )}

        {/* ===== Error ===== */}
        {error && (
          <div className="mb-6 p-6 bg-linear-to-r from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10 border border-rose-200 dark:border-rose-800/30 rounded-2xl text-rose-700 dark:text-rose-300 flex items-center gap-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-full">
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Lỗi tải dữ liệu</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* ===== Table ===== */}
        {!loading && !error && <DataTable data={data} />}
      </main>

      <Footer />
    </div>
  );
}
