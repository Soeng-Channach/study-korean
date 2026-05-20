import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizOption from '../../components/learning/QuizOption';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { mockTests } from '../../data/mockTests';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function MockTestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = mockTests.find((item) => item.id === id);
  const { dispatch } = useLearning();
  const questions = useMemo(() => test?.sections.flatMap((section) => section.questions) || [], [test]);
  const [answers, setAnswers] = useState({});

  usePageMeta(test?.title || 'Mock test', 'Offline TOPIK II mock test.');

  if (!test) {
    return <EmptyState title="Test not found" message="This mock test is not available in the offline library." />;
  }

  function submit() {
    const correct = questions.filter((question) => answers[question.id] === question.answer).length;
    const attempt = {
      testId: test.id,
      title: test.title,
      score: Math.round((correct / questions.length) * 100),
      correct,
      total: questions.length,
      completedAt: new Date().toISOString()
    };
    dispatch({ type: 'record-test-attempt', attempt });
    navigate(`/mock-tests/${test.id}/result`, { state: attempt });
  }

  const allAnswered = questions.every((question) => answers[question.id] !== undefined);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Card>
        <p className="text-sm font-semibold capitalize text-slate-500 dark:text-slate-400">
          {test.type} test · {test.durationMinutes} minute mini test
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{test.title}</h2>
        {test.description ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{test.description}</p>
        ) : null}
      </Card>
      {questions.map((question, questionIndex) => (
        <Card key={question.id}>
          <h3 className="font-bold text-slate-950 dark:text-white">
            {questionIndex + 1}. {question.prompt}
          </h3>
          <div className="mt-4 space-y-3">
            {question.options.map((option, optionIndex) => (
              <QuizOption
                key={option}
                option={option}
                selected={answers[question.id] === optionIndex}
                correct={false}
                revealed={false}
                onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
              />
            ))}
          </div>
        </Card>
      ))}
      <Button className="w-full" disabled={!allAnswered} onClick={submit}>Submit test</Button>
    </div>
  );
}
