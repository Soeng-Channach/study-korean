import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import QuizOption from '../../components/learning/QuizOption';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useLearning } from '../../context/LearningContext';
import { vocabulary } from '../../data/vocabulary';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function VocabularyQuizPage() {
  usePageMeta('Vocabulary Quiz', 'Offline TOPIK II vocabulary quiz.');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const { dispatch } = useLearning();
  const word = vocabulary[index];

  const options = useMemo(() => {
    const distractors = vocabulary.filter((item) => item.id !== word.id).slice(0, 3).map((item) => item.meaning);
    return [word.meaning, ...distractors].sort();
  }, [word]);

  const correctIndex = options.indexOf(word.meaning);

  function submit() {
    setRevealed(true);
    dispatch({ type: 'record-vocab-answer', wordId: word.id, correct: selected === correctIndex });
  }

  function next() {
    setSelected(null);
    setRevealed(false);
    setIndex((current) => (current + 1) % vocabulary.length);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link to="/vocabulary" className="text-sm font-semibold text-brand-600 dark:text-brand-100">Back to vocabulary</Link>
      <Card>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Question {index + 1} of {vocabulary.length}
        </p>
        <h2 className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">{word.word}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{word.example}</p>
        <div className="mt-6 space-y-3">
          {options.map((option, optionIndex) => (
            <QuizOption
              key={option}
              option={option}
              selected={selected === optionIndex}
              correct={correctIndex === optionIndex}
              revealed={revealed}
              onClick={() => {
                if (!revealed) setSelected(optionIndex);
              }}
            />
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <Button className="flex-1" disabled={selected === null || revealed} onClick={submit}>
            Check
          </Button>
          <Button className="flex-1" variant="secondary" disabled={!revealed} onClick={next}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
