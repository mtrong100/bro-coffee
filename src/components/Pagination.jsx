export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 pt-4">
      <PageButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Trước
      </PageButton>

      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {page} / {totalPages}
      </span>

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
        px-4 py-2 rounded-lg text-sm font-medium
        border border-slate-200 dark:border-slate-700
        bg-white dark:bg-gray-800
        text-slate-700 dark:text-slate-300
        hover:bg-slate-50 dark:hover:bg-gray-700
        disabled:opacity-40 disabled:cursor-not-allowed
        transition
      "
    >
      {children}
    </button>
  );
}
