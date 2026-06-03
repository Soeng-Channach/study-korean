export const APP_NAME = 'TOPIK II';

export const STORAGE_KEYS = {
  theme: 'topik-theme',
  learningState: 'topik-learning-state'
};

export const navItems = [
  { label: 'Home', path: '/', icon: 'LayoutDashboard' },
  { label: 'Vocab', path: '/vocabulary', icon: 'Languages' },
  { label: 'Grammar', path: '/grammar', icon: 'BookOpen' },
  { label: 'Reading', path: '/reading', icon: 'Newspaper' },
  { label: 'Listen', path: '/listening', icon: 'Headphones' },
  { label: 'Tests', path: '/mock-tests', icon: 'ClipboardCheck' },
  { label: 'Saved', path: '/bookmarks', icon: 'Star' },
  { label: 'Progress', path: '/progress', icon: 'ChartNoAxesColumnIncreasing' }
];
