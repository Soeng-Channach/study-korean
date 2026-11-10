import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout.jsx';
import RouteFallback from '../components/ui/RouteFallback.jsx';

// Routes are code-split so a visitor only downloads the datasets for the section
// they open. The dashboard is the landing route and deliberately eager, so first
// paint needs no extra round trip; it reads counts from data/catalog.js rather
// than importing the content itself.
import DashboardPage from '../features/dashboard/DashboardPage.jsx';

const BookmarksPage = lazy(() => import('../features/bookmarks/BookmarksPage.jsx'));
const GrammarDetailPage = lazy(() => import('../features/grammar/GrammarDetailPage.jsx'));
const GrammarListPage = lazy(() => import('../features/grammar/GrammarListPage.jsx'));
const LibraryPage = lazy(() => import('../features/library/LibraryPage.jsx'));
const LibraryPracticePage = lazy(() => import('../features/library/LibraryPracticePage.jsx'));
const LibraryReaderPage = lazy(() => import('../features/library/LibraryReaderPage.jsx'));
const ListeningDetailPage = lazy(() => import('../features/listening/ListeningDetailPage.jsx'));
const ListeningListPage = lazy(() => import('../features/listening/ListeningListPage.jsx'));
const MockTestListPage = lazy(() => import('../features/mock-tests/MockTestListPage.jsx'));
const MockTestPage = lazy(() => import('../features/mock-tests/MockTestPage.jsx'));
const MockTestResultPage = lazy(() => import('../features/mock-tests/MockTestResultPage.jsx'));
const TestCategoryPage = lazy(() => import('../features/mock-tests/TestCategoryPage.jsx'));
const PlanDayPage = lazy(() => import('../features/plan/PlanDayPage.jsx'));
const PlanOverviewPage = lazy(() => import('../features/plan/PlanOverviewPage.jsx'));
const ProgressPage = lazy(() => import('../features/progress/ProgressPage.jsx'));
const ReadingDetailPage = lazy(() => import('../features/reading/ReadingDetailPage.jsx'));
const ReadingListPage = lazy(() => import('../features/reading/ReadingListPage.jsx'));
const SettingsPage = lazy(() => import('../features/settings/SettingsPage.jsx'));
const WritingGuidePage = lazy(() => import('../features/writing/WritingGuidePage.jsx'));
const WritingListPage = lazy(() => import('../features/writing/WritingListPage.jsx'));
const WritingPracticePage = lazy(() => import('../features/writing/WritingPracticePage.jsx'));
const VocabularyPage = lazy(() => import('../features/vocabulary/VocabularyPage.jsx'));
const VocabularyQuizPage = lazy(() => import('../features/vocabulary/VocabularyQuizPage.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route
          element={
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          }
        >
          <Route path="grammar" element={<GrammarListPage />} />
          <Route path="grammar/:id" element={<GrammarDetailPage />} />
          <Route path="reading" element={<ReadingListPage />} />
          <Route path="reading/:id" element={<ReadingDetailPage />} />
          <Route path="listening" element={<ListeningListPage />} />
          <Route path="listening/:id" element={<ListeningDetailPage />} />
          <Route path="vocabulary" element={<VocabularyPage />} />
          <Route path="vocabulary/quiz" element={<VocabularyQuizPage />} />
          <Route path="writing" element={<WritingListPage />} />
          <Route path="writing/guide" element={<WritingGuidePage />} />
          <Route path="writing/:id" element={<WritingPracticePage />} />
          <Route path="plan" element={<PlanOverviewPage />} />
          <Route path="plan/:day" element={<PlanDayPage />} />
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
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
