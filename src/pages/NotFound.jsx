import { Coffee, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br
        from-stone-50 via-zinc-50 to-stone-100
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
        text-zinc-800 dark:text-zinc-200
      "
    >
      <div className="text-center max-w-md px-6">
        {/* Icon */}
        <div className="relative inline-flex mb-8">
          <div
            className="
              absolute -inset-6
              bg-gradient-to-r from-amber-400 to-amber-500
              blur-2xl opacity-20
              rounded-full
            "
          />
          <div className="relative p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-amber-500/10 border border-amber-100 dark:border-amber-900/30">
            <Coffee
              className="text-amber-600 dark:text-amber-400"
              size={64}
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className="
            text-8xl font-black mb-4 tracking-tighter
            bg-gradient-to-r from-amber-600 to-amber-500
            dark:from-amber-400 dark:to-amber-300
            bg-clip-text text-transparent
            drop-shadow-sm
          "
        >
          404
        </h1>

        <h2 className="text-2xl font-bold mb-3 text-zinc-800 dark:text-zinc-100">
          Không tìm thấy trang
        </h2>

        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
          Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
          <br />
          Có thể bạn nên quay lại trang chính và tiếp tục thưởng thức cà phê ☕
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="
              inline-flex items-center gap-2 px-6 py-3
              rounded-xl border
              border-zinc-200 dark:border-zinc-700
              text-zinc-600 dark:text-zinc-300
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              hover:text-zinc-900 dark:hover:text-zinc-100
              transition-all duration-300
              font-medium
            "
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              inline-flex items-center gap-2 px-6 py-3
              rounded-xl
              bg-gradient-to-r from-amber-500 to-amber-600
              hover:from-amber-600 hover:to-amber-700
              text-white
              shadow-lg shadow-amber-500/25
              hover:shadow-xl hover:shadow-amber-500/30
              hover:-translate-y-0.5
              transition-all duration-300
              font-medium
            "
          >
            <Home size={18} />
            Trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
