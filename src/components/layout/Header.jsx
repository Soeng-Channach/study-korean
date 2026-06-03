import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import Badge from '../ui/Badge';
import GlobalSearch from './GlobalSearch';

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
          <div className="w-full max-w-md">
            <GlobalSearch />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={isOnline ? 'green' : 'rose'}>{isOnline ? 'Online' : 'Offline'}</Badge>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:h-9 sm:w-9 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
