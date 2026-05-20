import { BookOpenCheck, Clock, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockTests } from '../../data/mockTests';
import { usePageMeta } from '../../hooks/usePageMeta';

const testGroups = [
  {
    type: 'grammar',
    title: 'Grammar tests',
    description: 'Practice TOPIK II grammar patterns, usage, and meaning.',
    icon: BookOpenCheck
  },
  {
    type: 'vocabulary',
    title: 'Vocabulary tests',
    description: 'Check word meanings, context, and recognition.',
    icon: Languages
  }
];

export default function MockTestListPage() {
  usePageMeta('Tests', 'Take separate offline TOPIK II grammar and vocabulary tests.');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Tests</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Choose focused grammar or vocabulary tests. Results are saved offline.
        </p>
      </div>

      {testGroups.map((group) => {
        const tests = mockTests.filter((test) => test.type === group.type);
        const Icon = group.icon;

        return (
          <section key={group.type}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
                <Icon size={22} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">{group.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{group.description}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {tests.map((test) => (
                <Card key={test.id}>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={group.type === 'grammar' ? 'blue' : 'green'}>
                      {group.type === 'grammar' ? 'Grammar' : 'Vocabulary'}
                    </Badge>
                    <Badge>{test.durationMinutes} min</Badge>
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{test.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {test.description}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Clock size={16} aria-hidden="true" />
                    {test.sections.reduce((sum, section) => sum + section.questions.length, 0)} questions
                  </p>
                  <Link to={`/mock-tests/${test.id}`}>
                    <Button className="mt-5 w-full">Start {group.type} test</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
