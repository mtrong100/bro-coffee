export default function Footer() {
  return (
    <footer
      className="
        relative
        bg-linear-to-r from-stone-50 via-zinc-50 to-stone-100
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
        border-t border-zinc-200 dark:border-zinc-800
        py-10
      "
    >
      {/* subtle top glow */}
      <div
        className="
          absolute inset-x-0 -top-px h-px
          bg-linear-to-r from-transparent via-amber-400/40 to-transparent
        "
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-amber-700 dark:text-amber-400">
              Bro Coffee
            </span>
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-500 italic">
            Ghi lại từng ly cà phê đáng nhớ ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
