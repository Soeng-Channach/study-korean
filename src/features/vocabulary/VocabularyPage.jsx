import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { vocabulary } from '../../data/vocabulary';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function VocabularyPage() {
  usePageMeta('Vocabulary', 'Review TOPIK II vocabulary and start offline quizzes.');
  const { vocabProgress, state } = useLearning();

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Vocabulary</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Review key words and test recognition.</p>
        </div>
        <Link to="/vocabulary/quiz">
          <Button>Start quiz</Button>
        </Link>
      </div>
      <Card>
        <ProgressBar value={vocabProgress} label="Words mastered" />
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {state.vocabularyStats.correctAnswers} correct from {state.vocabularyStats.totalAnswered} answers
        </p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {vocabulary.map((word) => (
          <Card key={word.id}>
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{word.level}</Badge>
              <Badge>{word.partOfSpeech}</Badge>
              {state.vocabularyStats.masteredWordIds.includes(word.id) ? <Badge tone="green">Mastered</Badge> : null}
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">{word.word}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">{word.meaning}</p>
            <p className="mt-4 text-sm text-slate-700 dark:text-slate-200">{word.example}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{word.exampleMeaning}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
