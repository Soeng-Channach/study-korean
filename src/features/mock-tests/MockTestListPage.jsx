import { BookOpenCheck, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockTests } from '../../data/mockTests';
import { usePageMeta } from '../../hooks/usePageMeta';

const testTypes = [
  {
    type: 'grammar',
    title: 'Grammar tests',
    description: 'Practice grammar core meanings in separate 10-question coverage tests.',
    icon: BookOpenCheck,
    path: '/mock-tests/grammar'
  },
  {
    type: 'vocabulary',
    title: 'Vocabulary tests',
    description: 'Practice vocabulary meanings and word usage in focused mini tests.',
    icon: Languages,
    path: '/mock-tests/vocabulary'
  }
];

export default function MockTestListPage() {
  usePageMeta('Tests', 'Choose separate offline TOPIK II grammar or vocabulary tests.');

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Tests</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Choose one test type. Grammar and vocabulary are now separated into their own pages.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testTypes.map((item) => {
          const Icon = item.icon;
          const count = mockTests.filter((test) => test.type === item.type).length;

          return (
            <Card key={item.type} className="flex h-full flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {count} available tests
              </p>
              <Link to={item.path}>
                <Button className="mt-5 w-full">Open {item.title.toLowerCase()}</Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
