import { Coffee, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-linear-to-br
        from-stone-50 via-zinc-50 to-stone-100
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
      "
    >
      <div className="text-center max-w-md px-6">
        {/* Icon */}
        <div className="relative inline-flex mb-6">
          <div
            className="
              absolute -inset-4
              bg-linear-to-r from-amber-400 to-amber-500
              blur-xl opacity-25
              rounded-full
            "
          />
          <Coffee
            className="relative text-amber-600 dark:text-amber-400"
            size={56}
          />
        </div>

        {/* Title */}
        <h1
          className="
            text-7xl font-extrabold mb-2
            bg-linear-to-r from-amber-600 to-amber-500
            dark:from-amber-400 dark:to-amber-300
            bg-clip-text text-transparent
          "
        >
          404
        </h1>

        <h2 className="text-xl font-semibold mb-3">Không tìm thấy trang</h2>

        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển. Có thể bạn nên
          quay lại trang chính và tiếp tục uống cà phê ☕
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="
              inline-flex items-center gap-2 px-4 py-2
              rounded-lg border
              border-zinc-200 dark:border-zinc-700
              text-zinc-700 dark:text-zinc-300
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition
            "
          >
            <ArrowLeft size={16} />
            Quay lại
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              inline-flex items-center gap-2 px-4 py-2
              rounded-lg
              bg-linear-to-r from-amber-500 to-amber-600
              text-white
              hover:opacity-90 transition
            "
          >
            <Home size={16} />
            Trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
5;
