import {
  BookOpen,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FolderArchive,
  Languages,
  LayoutDashboard,
  Newspaper
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../lib/constants';

const iconMap = {
  BookOpen,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FolderArchive,
  Languages,
  LayoutDashboard,
  Newspaper
};

export default function Sidebar() {
  return (
    <aside className="hidden h-full w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-950 lg:block">
      <nav className="space-y-1" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                ].join(' ')
              }
            >
              {Icon ? <Icon size={18} aria-hidden="true" /> : null}
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
