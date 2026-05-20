import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuizOption from '../../components/learning/QuizOption';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { readings } from '../../data/reading';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ReadingDetailPage() {
  const { id } = useParams();
  const reading = readings.find((item) => item.id === id);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const { dispatch } = useLearning();

  usePageMeta(reading?.title || 'Reading practice', 'TOPIK II reading comprehension practice.');

  if (!reading) {
    return <EmptyState title="Reading not found" message="This passage is not available in the offline library." />;
  }

  const question = reading.questions[0];

  function checkAnswer() {
    setRevealed(true);
    if (selected === question.answer) {
      dispatch({ type: 'complete-reading', id: reading.id });
    }
  }

  return (
    <article className="mx-auto max-w-3xl space-y-5">
      <Link to="/reading" className="text-sm font-semibold text-brand-600 dark:text-brand-100">Back to reading</Link>
      <Card>
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{reading.level}</Badge>
          <Badge>{reading.topic}</Badge>
        </div>
        <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{reading.title}</h2>
        <p className="mt-5 whitespace-pre-line text-lg leading-9 text-slate-800 dark:text-slate-100">{reading.passage}</p>
      </Card>
      <Card>
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">{question.question}</h3>
        <div className="mt-4 space-y-3">
          {question.options.map((option, index) => (
            <QuizOption
              key={option}
              option={option}
              selected={selected === index}
              correct={question.answer === index}
              revealed={revealed}
              onClick={() => {
                if (!revealed) setSelected(index);
              }}
            />
          ))}
        </div>
        {revealed ? (
          <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {question.explanation}
          </p>
        ) : null}
        <Button className="mt-5 w-full" disabled={selected === null || revealed} onClick={checkAnswer}>
          Check answer
        </Button>
      </Card>
    </article>
  );
}
