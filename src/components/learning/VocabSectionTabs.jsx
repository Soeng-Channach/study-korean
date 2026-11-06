import clsx from 'clsx';
import { CalendarCheck, Languages } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Switch between the full word list and the 30-Day Plan. Both live under the
// "Vocab" tab of the phone bottom bar.
const tabs = [
  { to: '/vocabulary', label: 'Word list', icon: Languages },
  { to: '/plan', label: '30-Day Plan', icon: CalendarCheck }
];

export default function VocabSectionTabs({ className }) {
  return (
    <nav aria-label="Vocabulary sections" className={clsx('flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800', className)}>
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            clsx(
              'inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition sm:flex-none',
              isActive
                ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-950 dark:text-brand-100'
                : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
            )
          }
        >
          <Icon size={15} aria-hidden="true" /> {label}
        </NavLink>
      ))}
    </nav>
  );
}
