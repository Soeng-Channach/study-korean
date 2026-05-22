import { ConfirmProvider } from '../components/ui/ConfirmDialog.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import { LearningProvider } from '../context/LearningContext.jsx';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <LearningProvider>
        <ConfirmProvider>{children}</ConfirmProvider>
      </LearningProvider>
    </ThemeProvider>
  );
}
