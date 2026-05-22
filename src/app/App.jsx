import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout.jsx';
import BookmarksPage from '../features/bookmarks/BookmarksPage.jsx';
import DashboardPage from '../features/dashboard/DashboardPage.jsx';
import GrammarDetailPage from '../features/grammar/GrammarDetailPage.jsx';
import GrammarListPage from '../features/grammar/GrammarListPage.jsx';
import LibraryPage from '../features/library/LibraryPage.jsx';
import LibraryPracticePage from '../features/library/LibraryPracticePage.jsx';
import LibraryReaderPage from '../features/library/LibraryReaderPage.jsx';
import MockTestListPage from '../features/mock-tests/MockTestListPage.jsx';
import MockTestPage from '../features/mock-tests/MockTestPage.jsx';
import MockTestResultPage from '../features/mock-tests/MockTestResultPage.jsx';
import TestCategoryPage from '../features/mock-tests/TestCategoryPage.jsx';
import ProgressPage from '../features/progress/ProgressPage.jsx';
import ReadingDetailPage from '../features/reading/ReadingDetailPage.jsx';
import ReadingListPage from '../features/reading/ReadingListPage.jsx';
import SettingsPage from '../features/settings/SettingsPage.jsx';
import VocabularyPage from '../features/vocabulary/VocabularyPage.jsx';
import VocabularyQuizPage from '../features/vocabulary/VocabularyQuizPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="grammar" element={<GrammarListPage />} />
        <Route path="grammar/:id" element={<GrammarDetailPage />} />
        <Route path="reading" element={<ReadingListPage />} />
        <Route path="reading/:id" element={<ReadingDetailPage />} />
        <Route path="vocabulary" element={<VocabularyPage />} />
        <Route path="vocabulary/quiz" element={<VocabularyQuizPage />} />
        <Route path="mock-tests" element={<MockTestListPage />} />
        <Route path="mock-tests/grammar" element={<TestCategoryPage category="grammar" />} />
        <Route path="mock-tests/vocabulary" element={<TestCategoryPage category="vocabulary" />} />
        <Route path="mock-tests/:id" element={<MockTestPage />} />
        <Route path="mock-tests/:id/result" element={<MockTestResultPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="library/:id" element={<LibraryReaderPage />} />
        <Route path="library/:id/practice" element={<LibraryPracticePage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
