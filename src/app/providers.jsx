import { ConfirmProvider } from '../components/ui/ConfirmDialog.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import { LearningProvider } from '../context/LearningContext.jsx';
import { PreferencesProvider } from '../context/PreferencesContext.jsx';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <LearningProvider>
          <ConfirmProvider>{children}</ConfirmProvider>
        </LearningProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
