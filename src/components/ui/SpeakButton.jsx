import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { isSpeechSupported, speakKorean } from '../../lib/speech';

export default function SpeakButton({ text, size = 14, className = '', label = 'Play pronunciation' }) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(isSpeechSupported());
  }, []);

  if (!supported || !text) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        speakKorean(text);
      }}
      className={
        className ||
        'inline-flex items-center justify-center rounded-full p-1.5 text-slate-500 transition hover:bg-brand-50 hover:text-brand-700 active:scale-95 dark:text-slate-400 dark:hover:bg-brand-500/10 dark:hover:text-brand-100'
      }
      aria-label={label}
      title={label}
    >
      <Volume2 size={size} aria-hidden="true" />
    </button>
  );
}
