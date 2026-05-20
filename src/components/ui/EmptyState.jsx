import { BookOpen } from 'lucide-react';
import Card from './Card';

export default function EmptyState({ title, message }) {
  return (
    <Card className="flex flex-col items-center justify-center py-12 text-center">
      <BookOpen className="mb-4 text-slate-400" size={36} aria-hidden="true" />
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">{message}</p>
    </Card>
  );
}
