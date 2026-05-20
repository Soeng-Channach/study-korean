import { ThemeProvider } from '../context/ThemeContext.jsx';
import { LearningProvider } from '../context/LearningContext.jsx';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <LearningProvider>{children}</LearningProvider>
    </ThemeProvider>
  );
}
