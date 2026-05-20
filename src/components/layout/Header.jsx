import { Moon, Search, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const isOnline = useOnlineStatus();

  return (
    <header className="z-20 flex-none border-b border-slate-200 bg-paper/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-100">
            Korean TOPIK II
          </p>
          <h1 className="truncate text-lg font-bold text-slate-950 dark:text-white">Study dashboard</h1>
        </div>
        <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
          <div className="flex w-full max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <Search size={16} aria-hidden="true" />
            <span>Search lessons, words, tests</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={isOnline ? 'green' : 'rose'}>{isOnline ? 'Online' : 'Offline'}</Badge>
          <Button
            variant="secondary"
            className="aspect-square px-0"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </div>
    </header>
  );
}
