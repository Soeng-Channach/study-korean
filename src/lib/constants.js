export const APP_NAME = 'TOPIK II';

export const STORAGE_KEYS = {
  theme: 'topik-theme',
  learningState: 'topik-learning-state',
  meaningLanguage: 'topik-meaning-language'
};

// Order matters: the first six entries make up the mobile bottom bar, and the
// `section` groups the desktop sidebar.
export const navSections = [
  { id: 'study', label: 'Study' },
  { id: 'practice', label: 'Practice' },
  { id: 'you', label: 'You' }
];

export const navItems = [
  { label: 'Home', path: '/', icon: 'LayoutDashboard', section: 'study' },
  { label: 'Vocab', path: '/vocabulary', icon: 'Languages', section: 'study' },
  { label: 'Grammar', path: '/grammar?level=TOPIK II', icon: 'BookOpen', section: 'study' },
  { label: 'Reading', path: '/reading', icon: 'Newspaper', section: 'study' },
  { label: 'Listen', path: '/listening', icon: 'Headphones', section: 'study' },
  { label: 'Tests', path: '/mock-tests', icon: 'ClipboardCheck', section: 'practice' },
  { label: '30-Day Plan', path: '/plan', icon: 'CalendarCheck', section: 'practice' },
  { label: 'Library', path: '/library', icon: 'FolderArchive', section: 'practice' },
  { label: 'Saved', path: '/bookmarks', icon: 'Star', section: 'you' },
  { label: 'Progress', path: '/progress', icon: 'ChartNoAxesColumnIncreasing', section: 'you' },
  { label: 'Settings', path: '/settings', icon: 'Settings', section: 'you' }
];
