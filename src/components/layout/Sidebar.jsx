import clsx from 'clsx';
import {
  BookOpen,
  CalendarCheck,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FolderArchive,
  Headphones,
  Languages,
  LayoutDashboard,
  Newspaper,
  Settings,
  Star
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { navItems, navSections } from '../../lib/constants';

const iconMap = {
  BookOpen,
  CalendarCheck,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FolderArchive,
  Headphones,
  Languages,
  LayoutDashboard,
  Newspaper,
  Settings,
  Star
};

const isMac =
  typeof navigator !== 'undefined' && /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);

export default function Sidebar() {
  const { state } = useLearning();
  const savedCount = state.bookmarkedGrammarIds.length + (state.bookmarkedVocabIds || []).length;

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-5 dark:border-slate-800 dark:bg-slate-950 lg:flex">
      <nav className="flex-1 space-y-6" aria-label="Primary navigation">
        {navSections.map((section) => {
          const items = navItems.filter((item) => item.section === section.id);
          if (items.length === 0) return null;
          return (
            <div key={section.id}>
              <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const Icon = iconMap[item.icon];
                  const badge = item.path === '/bookmarks' && savedCount > 0 ? savedCount : null;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                          clsx(
                            'group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                            isActive
                              ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              aria-hidden="true"
                              className={clsx(
                                'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-600 transition-opacity dark:bg-brand-400',
                                isActive ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {Icon ? (
                              <Icon
                                size={18}
                                aria-hidden="true"
                                strokeWidth={isActive ? 2.4 : 2}
                                className={clsx(
                                  'shrink-0 transition',
                                  isActive
                                    ? 'text-brand-600 dark:text-brand-200'
                                    : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                                )}
                              />
                            ) : null}
                            <span className="flex-1 truncate">{item.label}</span>
                            {badge ? (
                              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-amber-800 dark:bg-amber-500/20 dark:text-amber-100">
                                {badge}
                              </span>
                            ) : null}
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
      <p className="mt-6 px-3 text-[11px] leading-5 text-slate-400 dark:text-slate-500">
        Press{' '}
        <kbd className="rounded border border-slate-200 px-1 py-0.5 font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {isMac ? 'Cmd' : 'Ctrl'} K
        </kbd>{' '}
        to search anything.
      </p>
    </aside>
  );
}
