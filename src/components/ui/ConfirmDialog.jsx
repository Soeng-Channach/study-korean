import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmContext = createContext(null);

const toneStyles = {
  brand: {
    icon: 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-100',
    confirm:
      'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500'
  },
  warning: {
    icon: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-100',
    confirm:
      'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500'
  },
  danger: {
    icon: 'bg-coral-100 text-coral-700 dark:bg-coral-500/20 dark:text-coral-100',
    confirm:
      'bg-coral-600 text-white hover:bg-coral-700 focus-visible:ring-coral-500'
  }
};

const defaults = {
  title: 'Are you sure?',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  tone: 'brand'
};

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setState({ ...defaults, ...options, resolve });
    });
  }, []);

  const close = useCallback(
    (result) => {
      setState((current) => {
        if (!current) return null;
        current.resolve(result);
        return null;
      });
    },
    []
  );

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state ? <ConfirmDialog state={state} onClose={close} /> : null}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used inside <ConfirmProvider>');
  }
  return ctx;
}

function ConfirmDialog({ state, onClose }) {
  const confirmRef = useRef(null);
  const tone = toneStyles[state.tone] || toneStyles.brand;

  useEffect(() => {
    confirmRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose(false);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        onClose(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose(false);
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone.icon}`}
            aria-hidden="true"
          >
            <AlertTriangle size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 id="confirm-dialog-title" className="text-base font-bold text-slate-950 dark:text-white">
              {state.title}
            </h3>
            {state.message ? (
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {state.message}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
          >
            {state.cancelText}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={() => onClose(true)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${tone.confirm}`}
          >
            {state.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
