import { BookOpenCheck, Languages } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { mockTests } from '../../data/mockTests';
import { usePageMeta } from '../../hooks/usePageMeta';
import TestCard from './TestCard';

const categoryConfig = {
  grammar: {
    title: 'Grammar tests',
    description: 'Focused TOPIK II grammar tests. Each test covers core meaning questions in 10-question sets.',
    icon: BookOpenCheck
  },
  vocabulary: {
    title: 'Vocabulary tests',
    description: 'Focused TOPIK II vocabulary tests for word meanings, context, and recognition.',
    icon: Languages
  }
};

export default function TestCategoryPage({ category }) {
  const params = useParams();
  const type = category ?? params.type;
  const config = categoryConfig[type];
  const tests = mockTests.filter((test) => test.type === type);
  const Icon = config?.icon;

  usePageMeta(config?.title || 'Tests', config?.description || 'TOPIK II tests.');

  if (!config) {
    return <EmptyState title="Test type not found" message="Choose grammar or vocabulary tests from the tests page." />;
  }

  return (
    <div className="space-y-5">
      <Link to="/mock-tests" className="text-sm font-semibold text-brand-600 dark:text-brand-100">
        Back to test types
      </Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            <Icon size={24} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{config.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{config.description}</p>
          </div>
        </div>
        <Link to={type === 'grammar' ? '/mock-tests/vocabulary' : '/mock-tests/grammar'}>
          <Button variant="secondary">
            View {type === 'grammar' ? 'vocabulary' : 'grammar'} tests
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}
