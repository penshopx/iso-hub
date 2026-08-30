import { Lock, AlertTriangle, Loader2 } from "lucide-react";
import { ApiError } from "@/hooks/use-qms";

export function UnauthorizedState({ message = "You need to be signed in to view and manage QMS data." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
        <Lock className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Sign In Required</h2>
      <p className="text-neutral-400 mb-6 max-w-md">{message}</p>
      <a
        href={`/api/login?returnTo=${encodeURIComponent(window.location.pathname)}`}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors border border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
      >
        Sign In
      </a>
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error: Error; onRetry: () => void }) {
  if (error instanceof ApiError && error.status === 401) {
    return <UnauthorizedState />;
  }
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-red-500/30 bg-red-500/5 rounded-lg my-8 mx-auto max-w-lg">
      <AlertTriangle className="w-10 h-10 text-red-400 mb-3" />
      <h3 className="text-lg font-semibold text-red-400 mb-1">Failed to load data</h3>
      <p className="text-sm text-neutral-400 mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-medium border border-neutral-700 transition-colors"
      >
        Retry Request
      </button>
    </div>
  );
}

export function LoadingState({ message = "Loading QMS data..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
      <p className="text-neutral-400">{message}</p>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string, description: string, action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-neutral-800 border-dashed rounded-lg bg-neutral-900/50">
      <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-neutral-400 mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  );
}
