import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, FolderArchive, Trash2, Upload } from 'lucide-react';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import { usePdfLibrary } from '../../hooks/usePdfLibrary';
import { usePageMeta } from '../../hooks/usePageMeta';

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function formatDate(ts) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(ts));
}

export default function LibraryPage() {
  usePageMeta('Library', 'Store and review your own PDF study materials offline.');
  const { items, loading, upload, remove } = usePdfLibrary();
  const confirm = useConfirm();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);

  async function handleFiles(fileList) {
    if (!fileList || fileList.length === 0) return;
    setMessage(null);
    setUploading(true);
    try {
      for (const file of fileList) {
        await upload(file);
      }
      setMessage({ tone: 'success', text: `Added ${fileList.length} file${fileList.length > 1 ? 's' : ''}.` });
    } catch (err) {
      setMessage({ tone: 'error', text: err.message || 'Failed to add file.' });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-100">
          <FolderArchive size={18} aria-hidden="true" />
          <p className="text-sm font-semibold">Personal library</p>
        </div>
        <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Your PDFs</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Upload TOPIK practice papers, answer keys, or your own notes. Files are stored only on this device — they never leave your browser.
        </p>
      </div>

      <Card>
        <label
          htmlFor="library-upload"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-brand-400 hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-brand-400 dark:hover:bg-brand-500/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-100">
            <Upload size={22} aria-hidden="true" />
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {uploading ? 'Adding…' : 'Tap to add a PDF'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">PDF files only · stays on this device</p>
          <input
            ref={inputRef}
            id="library-upload"
            type="file"
            accept="application/pdf"
            multiple
            className="sr-only"
            disabled={uploading}
            onChange={(event) => handleFiles(event.target.files)}
          />
        </label>
        {message ? (
          <p
            className={
              message.tone === 'success'
                ? 'mt-3 text-center text-xs font-semibold text-mint-700 dark:text-mint-100'
                : 'mt-3 text-center text-xs font-semibold text-coral-700 dark:text-coral-100'
            }
          >
            {message.text}
          </p>
        ) : null}
      </Card>

      {loading ? (
        <Card>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">Loading library…</p>
        </Card>
      ) : items.length === 0 ? (
        <EmptyState
          title="No PDFs yet"
          message="Upload a TOPIK past paper, an answer key, or any study PDF. It will appear here for offline practice."
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="transition hover:shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <Link to={`/library/${item.id}`} className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
                    <FileText size={20} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-950 dark:text-white">{item.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {formatBytes(item.size)} · added {formatDate(item.addedAt)}
                    </p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await confirm({
                      title: 'Remove this PDF?',
                      message: `"${item.name}" will be deleted from your library on this device.`,
                      confirmText: 'Remove',
                      cancelText: 'Keep',
                      tone: 'danger'
                    });
                    if (ok) remove(item.id);
                  }}
                  aria-label={`Remove ${item.name}`}
                  className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-coral-50 hover:text-coral-600 dark:hover:bg-coral-500/15 dark:hover:text-coral-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
