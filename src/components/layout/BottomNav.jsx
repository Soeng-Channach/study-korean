import clsx from 'clsx';
import { BookOpen, ClipboardCheck, Headphones, Languages, LayoutDashboard, Newspaper } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../lib/constants';

const mobileItems = navItems.slice(0, 6);
const iconMap = {
  BookOpen,
  ClipboardCheck,
  Headphones,
  Languages,
  LayoutDashboard,
  Newspaper
};

export default function BottomNav() {
  return (
    <nav
      className="z-30 grid flex-none grid-cols-6 border-t border-slate-200/80 bg-white/95 px-1 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5 backdrop-blur supports-[backdrop-filter]:bg-white/85 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/85 lg:hidden"
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
              clsx(
                'flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                isActive ? 'text-brand-700 dark:text-brand-100' : 'text-slate-500 dark:text-slate-400'
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={clsx(
                    'flex h-7 w-12 items-center justify-center rounded-full transition-colors',
                    isActive && 'bg-brand-100 dark:bg-brand-500/20'
                  )}
                >
                  {Icon ? <Icon size={19} aria-hidden="true" strokeWidth={isActive ? 2.5 : 2} /> : null}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
