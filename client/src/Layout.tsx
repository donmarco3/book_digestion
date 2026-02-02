import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Book Digestion
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/books"
              className="text-sm text-gray-600 hover:text-gray-900"
              aria-label="Books"
            >
              Books
            </Link>
            <Link
              to="/notes"
              className="text-sm text-gray-600 hover:text-gray-900"
              aria-label="Notes"
            >
              Notes
            </Link>
          </div>
        </div>
      </header>
      <main className="py-6">
        <Outlet />
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Book Digestion
      </footer>
    </>
  );
}

export default Layout;
