export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 pt-6">
      <PageButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Trước
      </PageButton>

      <div
        className="
          px-4 py-2 rounded-xl text-sm font-semibold
          bg-linear-to-r from-amber-500/15 to-amber-400/10
          dark:from-zinc-800 dark:to-zinc-900
          text-zinc-700 dark:text-zinc-300
          border border-zinc-200 dark:border-zinc-800
        "
      >
        {page} / {totalPages}
      </div>

      <PageButton
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Sau
      </PageButton>
    </div>
  );
}

/* ===== SMALL BUTTON ===== */
function PageButton({ children, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="
        px-5 py-2.5 rounded-xl text-sm font-semibold
        bg-zinc-50 dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        text-zinc-700 dark:text-zinc-300
        hover:bg-amber-50 dark:hover:bg-zinc-800
        hover:border-amber-300 dark:hover:border-zinc-700
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all
      "
    >
      {children}
    </button>
  );
}
