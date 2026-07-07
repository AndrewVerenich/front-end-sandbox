import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <header className="mb-6 border-b border-slate-700 pb-4">
        <Link to="/" className="text-xl font-semibold text-sky-400 hover:text-sky-300">
          Book Slot
        </Link>
        <p className="mt-1 text-sm text-slate-400">Barber appointment booking demo</p>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
