import { Loader2 } from 'lucide-react';
import Card from './Card';

// Shown while a code-split route chunk (and its dataset) is downloading.
export default function RouteFallback() {
  return (
    <Card className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 className="mb-4 animate-spin text-slate-400" size={32} aria-hidden="true" />
      <p role="status" className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        Loading…
      </p>
    </Card>
  );
}
