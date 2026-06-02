import { useMemo, useState } from 'react';
import { BookOpenCheck, Languages } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import LevelTabs from '../../components/ui/LevelTabs';
import StickyHeader from '../../components/ui/StickyHeader';
import { countByLevel, levelOf } from '../../lib/levels';
import { mockTests } from '../../data/mockTests';
import { usePageMeta } from '../../hooks/usePageMeta';
import TestCard from './TestCard';

const categoryConfig = {
  grammar: {
    title: 'Grammar Test',
    description: 'Focused TOPIK I and II grammar tests. Each test covers core meaning questions in 10-question sets.',
    icon: BookOpenCheck
  },
  vocabulary: {
    title: 'Vocabulary Test',
    description: 'Focused TOPIK I and II vocabulary tests for word meanings, context, and recognition.',
    icon: Languages
  }
};

export default function TestCategoryPage({ category }) {
  const params = useParams();
  const type = category ?? params.type;
  const config = categoryConfig[type];
  const Icon = config?.icon;
  const [level, setLevel] = useState('TOPIK I');

  const typeTests = useMemo(() => mockTests.filter((test) => test.type === type), [type]);
  const levelCounts = useMemo(() => countByLevel(typeTests), [typeTests]);
  const tests = useMemo(() => typeTests.filter((test) => levelOf(test) === level), [typeTests, level]);

  usePageMeta(config?.title || 'Tests', config?.description || 'TOPIK tests.');

  if (!config) {
    return <EmptyState title="Test type not found" message="Choose grammar or vocabulary tests from the tests page." />;
  }

  const isGrammar = type === 'grammar';
  const switchClass = isGrammar
    ? 'bg-gradient-to-r from-coral-500 to-pink-500 text-white shadow-md shadow-coral-500/30 hover:from-coral-700 hover:to-pink-600 hover:shadow-lg hover:shadow-coral-500/45 focus-visible:ring-coral-500'
    : 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-600/25 hover:from-brand-700 hover:to-brand-600 hover:shadow-lg hover:shadow-brand-600/40 focus-visible:ring-brand-500';

  return (
    <div className="space-y-5">
      <StickyHeader>
        <Link
          to={isGrammar ? '/mock-tests/vocabulary' : '/mock-tests/grammar'}
          className={`inline-flex w-fit items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${switchClass}`}
        >
          {isGrammar ? 'Vocabulary' : 'Grammar'} Test
        </Link>
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            <Icon size={24} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{config.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{config.description}</p>
          </div>
        </div>
        <LevelTabs value={level} onChange={setLevel} counts={levelCounts} accent={isGrammar ? 'brand' : 'coral'} />
      </StickyHeader>

      {tests.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No {level} {config.title.toLowerCase()}s yet.</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Add tests with level: &#39;{level}&#39; to src/data/mockTests.js and they will appear here.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      )}
    </div>
  );
}
