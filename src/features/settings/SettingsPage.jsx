import { Moon, RotateCcw, Sun } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useLearning } from '../../context/LearningContext';
import { useTheme } from '../../context/ThemeContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export default function SettingsPage() {
  usePageMeta('Settings', 'Manage TOPIK II PWA preferences.');
  const { isDark, toggleTheme } = useTheme();
  const { dispatch } = useLearning();
  const isOnline = useOnlineStatus();

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
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Switch between light and dark modes.</p>
          </div>
          <Button variant="secondary" icon={isDark ? Sun : Moon} onClick={toggleTheme}>
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </div>
      </Card>
      <Card>
        <h3 className="font-bold text-slate-950 dark:text-white">Offline support</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          The app shell and bundled learning data are cached by the service worker after the production app loads once.
        </p>
        <p className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
          Current network status: {isOnline ? 'Online' : 'Offline'}
        </p>
      </Card>
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Progress data</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Clear local bookmarks, completions, quiz stats, and tests.</p>
          </div>
          <Button variant="danger" icon={RotateCcw} onClick={() => dispatch({ type: 'reset-progress' })}>
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
}
