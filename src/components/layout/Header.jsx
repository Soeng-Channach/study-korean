import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Moon, Search, Settings, Sun, WifiOff, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import BrandMark from './BrandMark';
import GlobalSearch from './GlobalSearch';

const iconButton =
  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const isOnline = useOnlineStatus();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // Collapse the mobile search row whenever the route changes.
  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative z-50 flex-none border-b border-slate-200/80 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-slate-800 dark:bg-slate-950/80 dark:supports-[backdrop-filter]:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          aria-label="TOPIK Study home"
        >
          <BrandMark />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[15px] font-extrabold tracking-tight text-slate-950 dark:text-white">
              TOPIK Study
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-200 sm:block">
              Korean · offline ready
            </span>
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
          <div className="w-full max-w-md">
            <GlobalSearch />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {!isOnline ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-100 dark:ring-amber-500/30"
              role="status"
            >
              <WifiOff size={13} aria-hidden="true" />
              Offline
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label={searchOpen ? 'Close search' : 'Search'}
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
            className={clsx(iconButton, 'md:hidden')}
          >
            {searchOpen ? <X size={16} /> : <Search size={16} />}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className={iconButton}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <NavLink
            to="/settings"
            aria-label="Settings"
            title="Settings"
            className={({ isActive }) =>
              clsx(
                iconButton,
                isActive &&
                  'bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-500/15 dark:text-brand-100 dark:ring-brand-500/30'
              )
            }
          >
            <Settings size={16} />
          </NavLink>
        </div>
      </div>

      {searchOpen ? (
        <div id="mobile-search" className="border-t border-slate-200/80 px-4 pb-3 pt-2.5 md:hidden dark:border-slate-800">
          <GlobalSearch autoFocus onNavigate={() => setSearchOpen(false)} />
        </div>
      ) : null}
    </header>
  );
}
