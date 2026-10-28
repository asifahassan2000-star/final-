'use client';

export const dynamic = 'force-static';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#0A1931]">500</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-800">Something went wrong</h2>
      <p className="mt-2 text-slate-600 max-w-md">
        An unexpected error occurred. Please try refreshing the page.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-2.5 rounded-full bg-[#0A1931] text-white font-medium hover:bg-[#152a4d] transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
