import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function TestCard({ test }) {
  const questionCount = test.sections.reduce((sum, section) => sum + section.questions.length, 0);
  const isGrammar = test.type === 'grammar';

  return (
    // id + scroll-margin let the category list scroll this card back into view
    // (clear of the sticky header) when you return from taking the test.
    <Card id={`test-${test.id}`} className="scroll-mt-56">
      <div className="flex flex-wrap gap-2">
        <Badge tone={isGrammar ? 'blue' : 'green'}>{isGrammar ? 'Grammar' : 'Vocabulary'}</Badge>
        <Badge>{test.durationMinutes} min</Badge>
      </div>
      <h4 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{test.title}</h4>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{test.description}</p>
      <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Clock size={16} aria-hidden="true" />
        {questionCount} questions
      </p>
      <Link to={`/mock-tests/${test.id}`}>
        <Button variant={isGrammar ? 'primary' : 'vocab'} className="mt-5 w-full">
          Start {isGrammar ? 'grammar' : 'vocabulary'} test
        </Button>
      </Link>
    </Card>
  );
}
