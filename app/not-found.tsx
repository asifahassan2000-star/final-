import Link from 'next/link';

export const dynamic = 'force-static';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#0A1931]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-800">Page Not Found</h2>
      <p className="mt-2 text-slate-600 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-full bg-[#0A1931] text-white font-medium hover:bg-[#152a4d] transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
