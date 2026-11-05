import clsx from 'clsx';
import { Languages, Moon, RotateCcw, Sun, Wifi, WifiOff } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import { useLearning } from '../../context/LearningContext';
import { usePreferences } from '../../context/PreferencesContext';
import { MEANING_LANGUAGES } from '../../lib/meaningLanguage';
import { useTheme } from '../../context/ThemeContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export default function SettingsPage() {
  usePageMeta('Settings', 'Manage TOPIK II PWA preferences.');
  const { isDark, toggleTheme } = useTheme();
  const { dispatch } = useLearning();
  const { meaningLanguage, setMeaningLanguage } = usePreferences();
  const isOnline = useOnlineStatus();
  const confirm = useConfirm();

  async function handleReset() {
    const ok = await confirm({
      title: 'Reset all progress?',
      message:
        'This will clear all completions, saved items, vocabulary stats, and mock test attempts on this device. This cannot be undone.',
      confirmText: 'Reset progress',
      cancelText: 'Keep my progress',
      tone: 'danger'
    });
    if (ok) dispatch({ type: 'reset-progress' });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Settings</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Preferences and offline app status.</p>
      </div>
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Theme</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Follows your system setting until you choose one here.
            </p>
          </div>
          <Button variant="secondary" icon={isDark ? Sun : Moon} onClick={toggleTheme}>
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </div>
      </Card>
      <Card>
        <div className="flex items-start gap-3">
          <Languages size={20} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-100" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h3 id="meaning-language-label" className="font-bold text-slate-950 dark:text-white">
              Vocabulary meaning language
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Used for vocabulary, quizzes and grammar lessons.
            </p>
            <div
              role="radiogroup"
              aria-labelledby="meaning-language-label"
              className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800"
            >
              {MEANING_LANGUAGES.map((option) => {
                const active = option.value === meaningLanguage;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    title={option.description}
                    onClick={() => setMeaningLanguage(option.value)}
                    className={clsx(
                      'rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40',
                      active
                        ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-950 dark:text-brand-100'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {MEANING_LANGUAGES.find((option) => option.value === meaningLanguage)?.description}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-bold text-slate-950 dark:text-white">Offline support</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              The app shell and bundled learning data are cached by the service worker after the production app loads
              once, so every lesson, quiz and test keeps working without a connection.
            </p>
          </div>
          <Badge tone={isOnline ? 'green' : 'amber'} className="shrink-0 gap-1">
            {isOnline ? <Wifi size={12} aria-hidden="true" /> : <WifiOff size={12} aria-hidden="true" />}
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </Card>
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Progress data</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Clear local bookmarks, completions, quiz stats, and tests.
            </p>
          </div>
          <Button variant="danger" icon={RotateCcw} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
}
