import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { readings } from '../../data/reading';
import { usePageMeta } from '../../hooks/usePageMeta';

function ReadingQuestionCard({ question, fallbackPassage, fallbackNumber, revealed, selected, onSelect }) {
  const questionNumber = question.questionNumber || fallbackNumber;
  const points = question.points || 2;
  const instruction =
    question.instruction || `※ [${questionNumber}]( )에 들어갈 말로 가장 알맞은 것을 고르십시오. (각 ${points}점)`;
  const passage = question.passage || fallbackPassage;

  return (
    <Card className="scroll-mt-24 p-4 shadow-md sm:p-6">
      <div className="rounded-md bg-slate-200 px-4 py-4 text-base font-black leading-7 text-slate-950 dark:bg-slate-700 dark:text-white sm:px-5 sm:text-lg">
        {instruction}
      </div>

      <div className="mt-5 flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-100 text-2xl font-black text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100">
          {questionNumber}
        </div>
        <h3 className="min-w-0 flex-1 text-xl font-black leading-8 text-slate-950 dark:text-white sm:text-2xl">
          {question.question}
        </h3>
        <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-md bg-slate-200 px-2 py-2 text-base font-black leading-5 text-slate-900 dark:bg-slate-700 dark:text-white">
          <span>{points}</span>
          <span>점</span>
        </div>
      </div>

      {question.image ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
          <img
            src={question.image}
            alt={`Question ${questionNumber} stimulus`}
            className="mx-auto max-h-[32rem] w-auto max-w-full rounded-md object-contain"
          />
        </div>
      ) : null}

      {passage ? (
        <div className="mt-4 rounded-md bg-slate-100 px-4 py-4 text-lg leading-8 text-slate-950 dark:bg-slate-800 dark:text-slate-100 sm:px-5">
          <p className="whitespace-pre-line">{passage}</p>
        </div>
      ) : null}

      <div className="mt-4 space-y-2.5">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = question.answer === index;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (!revealed) onSelect(index);
              }}
              className={[
                'flex min-h-16 w-full items-center gap-4 rounded-md border px-4 py-3 text-left text-lg font-semibold leading-7 transition [overflow-wrap:anywhere] sm:px-5',
                isSelected && !revealed
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100'
                  : '',
                revealed && isCorrect
                  ? 'border-mint-500 bg-mint-100 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100'
                  : '',
                revealed && isSelected && !isCorrect
                  ? 'border-coral-500 bg-coral-100 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100'
                  : '',
                !isSelected && (!revealed || !isCorrect)
                  ? 'border-slate-200 bg-white text-slate-950 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                  : ''
              ].join(' ')}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-base font-black text-slate-700 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100">
                {index + 1}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {revealed ? (
        <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {question.explanation}
        </p>
      ) : null}
    </Card>
  );
}

export default function ReadingDetailPage() {
  const { id } = useParams();
  const reading = readings.find((item) => item.id === id);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const { dispatch } = useLearning();

  usePageMeta(reading?.title || 'Reading practice', 'TOPIK II reading comprehension practice.');

  if (!reading) {
    return <EmptyState title="Reading not found" message="This passage is not available in the offline library." />;
  }

  const questions = reading.questions || [];
  const answeredCount = questions.filter((question) => selectedAnswers[question.id] !== undefined).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const correctCount = revealed
    ? questions.filter((question) => selectedAnswers[question.id] === question.answer).length
    : 0;

  function checkAnswers() {
    const nextCorrectCount = questions.filter((question) => selectedAnswers[question.id] === question.answer).length;
    setRevealed(true);
    if (allAnswered && nextCorrectCount === questions.length) {
      dispatch({ type: 'complete-reading', id: reading.id });
    }
  }

  function resetAnswers() {
    setSelectedAnswers({});
    setRevealed(false);
  }

  return (
    <article className="mx-auto max-w-4xl space-y-5">
      <Link to="/reading" className="text-sm font-semibold text-brand-600 dark:text-brand-100">Back to reading</Link>
      <Card className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{reading.level}</Badge>
          <Badge>{reading.topic}</Badge>
          {reading.source ? <Badge tone="slate">Imported</Badge> : null}
        </div>
        <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{reading.title}</h2>
        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          {answeredCount} of {questions.length} answered
        </p>
        {revealed ? (
          <p className="mt-3 rounded-lg bg-brand-50 p-3 text-sm font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            Score: {correctCount} / {questions.length}
          </p>
        ) : null}
      </Card>

      {questions.map((question, index) => (
        <ReadingQuestionCard
          key={question.id}
          question={question}
          fallbackPassage={reading.passage}
          fallbackNumber={index + 1}
          selected={selectedAnswers[question.id]}
          revealed={revealed}
          onSelect={(optionIndex) =>
            setSelectedAnswers((current) => ({
              ...current,
              [question.id]: optionIndex
            }))
          }
        />
      ))}

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-950 dark:text-white">
              {revealed ? 'Answers checked' : allAnswered ? 'Ready to check' : `${questions.length - answeredCount} questions left`}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              All questions are shown on this one page.
            </p>
          </div>
          <div className="flex gap-2">
            {revealed ? (
              <Button variant="secondary" onClick={resetAnswers}>
                Try again
              </Button>
            ) : null}
            <Button disabled={!allAnswered || revealed} onClick={checkAnswers}>
              Check answers
            </Button>
          </div>
        </div>
      </Card>
    </article>
  );
}
