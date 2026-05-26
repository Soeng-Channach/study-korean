const voiceCache = new Map();

function getSynth() {
  if (typeof window === 'undefined') return null;
  return window.speechSynthesis || null;
}

export function isSpeechSupported() {
  return Boolean(getSynth()) && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

function pickVoice(lang) {
  const synth = getSynth();
  if (!synth) return null;
  const prefix = lang.split('-')[0].toLowerCase();
  const cached = voiceCache.get(prefix);
  if (cached) return cached;
  const voices = synth.getVoices();
  if (!voices?.length) return null;
  const exact = voices.find((v) => v.lang === lang);
  const partial = voices.find((v) => v.lang?.toLowerCase().startsWith(prefix));
  const voice = exact || partial || null;
  if (voice) voiceCache.set(prefix, voice);
  return voice;
}

export function speak(text, lang = 'ko-KR', options = {}) {
  const synth = getSynth();
  if (!synth || !text) return false;
  try {
    synth.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = options.rate ?? 0.95;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;
    synth.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function speakKorean(text, options = {}) {
  return speak(text, 'ko-KR', options);
}

export function speakEnglish(text, options = {}) {
  return speak(text, 'en-US', options);
}

export function cancelSpeech() {
  const synth = getSynth();
  if (synth) synth.cancel();
}

if (typeof window !== 'undefined' && getSynth()) {
  // Voices load asynchronously on some browsers (Chrome). Refresh cache when ready.
  getSynth().addEventListener?.('voiceschanged', () => {
    voiceCache.clear();
  });
}
