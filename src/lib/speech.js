const KOREAN_LANG = 'ko-KR';

let cachedVoice = null;

function getSynth() {
  if (typeof window === 'undefined') return null;
  return window.speechSynthesis || null;
}

export function isSpeechSupported() {
  return Boolean(getSynth()) && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

function pickKoreanVoice() {
  const synth = getSynth();
  if (!synth) return null;
  if (cachedVoice && cachedVoice.lang?.toLowerCase().startsWith('ko')) return cachedVoice;
  const voices = synth.getVoices();
  if (!voices?.length) return null;
  const exact = voices.find((v) => v.lang === KOREAN_LANG);
  const partial = voices.find((v) => v.lang?.toLowerCase().startsWith('ko'));
  cachedVoice = exact || partial || null;
  return cachedVoice;
}

export function speakKorean(text, options = {}) {
  const synth = getSynth();
  if (!synth || !text) return false;
  try {
    synth.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = KOREAN_LANG;
    utterance.rate = options.rate ?? 0.95;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;
    const voice = pickKoreanVoice();
    if (voice) utterance.voice = voice;
    synth.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function cancelSpeech() {
  const synth = getSynth();
  if (synth) synth.cancel();
}

if (typeof window !== 'undefined' && getSynth()) {
  // Voices load asynchronously on some browsers (Chrome). Refresh cache when ready.
  getSynth().addEventListener?.('voiceschanged', () => {
    cachedVoice = null;
    pickKoreanVoice();
  });
}
