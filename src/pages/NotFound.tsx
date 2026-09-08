import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-8xl font-bold text-navy-100 mb-4">404</p>
        <h1 className="font-display text-2xl font-bold text-navy-950 mb-3">Page not found</h1>
        <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-navy-950 text-white text-sm font-semibold rounded-xl hover:bg-navy-900 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
