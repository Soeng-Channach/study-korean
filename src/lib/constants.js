export const APP_NAME = 'TOPIK II';

export const STORAGE_KEYS = {
  theme: 'topik-theme',
  learningState: 'topik-learning-state',
  meaningLanguage: 'topik-meaning-language'
};

// Order matters: entries with `mobile: true` make up the phone bottom bar (in
// this order), and `section` groups the desktop sidebar. `shortLabel` is used
// in the bottom bar when the full label is too long. `alsoActive` lists other
// paths that highlight the item (the 30-Day Plan lives under Vocab on phones).
export const navSections = [
  { id: 'study', label: 'Study' },
  { id: 'practice', label: 'Practice' },
  { id: 'you', label: 'You' }
];

export const navItems = [
  { label: 'Home', path: '/', icon: 'LayoutDashboard', section: 'study', mobile: true },
  { label: 'Vocab', path: '/vocabulary', icon: 'Languages', section: 'study', mobile: true, alsoActive: ['/plan'] },
  { label: 'Grammar', path: '/grammar?level=TOPIK II', icon: 'BookOpen', section: 'study', mobile: true },
  { label: 'Reading', path: '/reading', icon: 'Newspaper', section: 'study', mobile: true },
  { label: 'Listen', path: '/listening', icon: 'Headphones', section: 'study', mobile: true },
  { label: 'Tests', path: '/mock-tests', icon: 'ClipboardCheck', section: 'practice', mobile: true },
  { label: '30-Day Plan', path: '/plan', icon: 'CalendarCheck', section: 'practice' },
  { label: 'Library', path: '/library', icon: 'FolderArchive', section: 'practice' },
  { label: 'Saved', path: '/bookmarks', icon: 'Star', section: 'you' },
  { label: 'Progress', path: '/progress', icon: 'ChartNoAxesColumnIncreasing', section: 'you' },
  { label: 'Settings', path: '/settings', icon: 'Settings', section: 'you' }
];
