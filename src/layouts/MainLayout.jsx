// src/layouts/MainLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-linear-to-br
        from-stone-50 via-zinc-50 to-stone-100
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
        transition-colors duration-300
      "
    >
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
