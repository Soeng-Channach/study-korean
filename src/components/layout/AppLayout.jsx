import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-paper text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 overflow-hidden">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-y-auto px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 lg:px-8 lg:pb-10">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
