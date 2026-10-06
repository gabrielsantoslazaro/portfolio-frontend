import Link from "next/link";
import DynamicIcon from "@/components/common/DynamicIcon";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
        <DynamicIcon name="Compass" className="w-8 h-8 animate-spin-slow" />
      </div>
      <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-2">404</h1>
      <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">
        Page Not Found
      </h2>
      <p className="max-w-md text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        The page you are looking for does not exist or might have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm transition-all"
      >
        <DynamicIcon name="ArrowLeft" className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
