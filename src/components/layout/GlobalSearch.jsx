import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ClipboardCheck,
  Headphones,
  Languages,
  Newspaper,
  Search,
  X
} from 'lucide-react';
import { SEARCH_TYPES, searchAll } from '../../lib/search';

const typeIcon = {
  vocab: Languages,
  grammar: BookOpen,
  reading: Newspaper,
  listening: Headphones,
  test: ClipboardCheck
};

const isMac =
  typeof navigator !== 'undefined' && /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);

export default function GlobalSearch() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchAll(query), [query]);

  // Keep the highlighted row valid as results change.
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Close the dropdown when clicking outside of the search.
  useEffect(() => {
    function onPointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  // Global shortcut: Cmd/Ctrl+K focuses the search.
  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const goTo = (item) => {
    if (!item) return;
    setOpen(false);
    setQuery('');
    inputRef.current?.blur();
    navigate(item.to);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      if (results.length > 0) {
        event.preventDefault();
        goTo(results[activeIndex]);
      }
    } else if (event.key === 'Escape') {
      if (query) {
        setQuery('');
      } else {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <Search size={16} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search lessons, words, tests"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="global-search-results"
          aria-autocomplete="list"
          className="min-w-0 flex-1 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="rounded p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        ) : (
          <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 lg:inline-flex dark:border-slate-700 dark:text-slate-500">
            {isMac ? '⌘' : 'Ctrl'} K
          </kbd>
        )}
      </div>

      {showDropdown ? (
        <div
          id="global-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No results for <span className="font-semibold text-slate-700 dark:text-slate-200">“{query.trim()}”</span>
            </div>
          ) : (
            <>
              <ul className="max-h-[min(70vh,26rem)] overflow-y-auto py-1">
                {results.map((item, index) => {
                  const Icon = typeIcon[item.type] || Search;
                  const active = index === activeIndex;
                  return (
                    <li key={`${item.type}-${item.id}`} role="option" aria-selected={active}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => goTo(item)}
                        className={[
                          'flex w-full items-center gap-3 px-3 py-2 text-left transition',
                          active ? 'bg-brand-50 dark:bg-brand-500/15' : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        ].join(' ')}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          <Icon size={16} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </span>
                          {item.subtitle ? (
                            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                              {item.subtitle}
                            </span>
                          ) : null}
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-0.5 text-[10px] font-semibold uppercase tracking-wide">
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
                            {SEARCH_TYPES[item.type]?.label || item.type}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500">{item.level}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between border-t border-slate-100 px-3 py-1.5 text-[10px] text-slate-400 dark:border-slate-800 dark:text-slate-500">
                <span>
                  <kbd className="font-semibold">↑</kbd> <kbd className="font-semibold">↓</kbd> to navigate
                </span>
                <span>
                  <kbd className="font-semibold">↵</kbd> open · <kbd className="font-semibold">esc</kbd> close
                </span>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
