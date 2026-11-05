// Which language vocabulary meanings are shown (and quizzed) in.
export const MEANING_LANGUAGES = [
  { value: 'both', label: 'Both', description: 'English with Khmer underneath' },
  { value: 'en', label: 'English', description: 'English meanings only' },
  { value: 'km', label: 'ខ្មែរ', description: 'Khmer meanings only' }
];

// Main text for a word's meaning in the chosen language. `englishMeaning`
// lets callers pass a user-edited English meaning.
export function primaryMeaning(word, language, englishMeaning = word?.meaning) {
  if (language === 'km' && word?.meaningKm) return word.meaningKm;
  return englishMeaning;
}

// Secondary line shown under the main meaning, or null.
export function secondaryMeaning(word, language) {
  return language === 'both' && word?.meaningKm ? word.meaningKm : null;
}
