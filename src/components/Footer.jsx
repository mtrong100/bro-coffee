export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Bro Coffee
          </div>
          <div className="text-gray-500 dark:text-gray-500 text-sm">
            Ghi lại từng ly cà phê đáng nhớ
          </div>
        </div>
      </div>
    </footer>
  );
}
