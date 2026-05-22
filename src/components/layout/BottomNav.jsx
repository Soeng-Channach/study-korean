import { BookOpen, ClipboardCheck, FolderArchive, Languages, LayoutDashboard, Newspaper } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../lib/constants';

const mobileItems = navItems.slice(0, 6);
const iconMap = {
  BookOpen,
  ClipboardCheck,
  FolderArchive,
  Languages,
  LayoutDashboard,
  Newspaper
};

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t border-slate-200 bg-white px-1 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 dark:border-slate-800 dark:bg-slate-950 lg:hidden"
      aria-label="Mobile navigation"
    >
      {mobileItems.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              [
                'flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold transition',
                isActive
                  ? 'text-brand-700 dark:text-brand-100'
                  : 'text-slate-500 dark:text-slate-400'
              ].join(' ')
            }
          >
            {Icon ? <Icon size={19} aria-hidden="true" /> : null}
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
