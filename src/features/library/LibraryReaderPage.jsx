import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Play, Trash2 } from 'lucide-react';
import PdfViewer from '../../components/library/PdfViewer';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import { deletePdf, getPdf } from '../../lib/db';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function LibraryReaderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [entry, setEntry] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  usePageMeta(entry?.name || 'PDF reader', 'Read a stored PDF from your library.');

  useEffect(() => {
    let blobUrl = null;
    let cancelled = false;

    (async () => {
      const result = await getPdf(id);
      if (cancelled) return;
      if (result?.blob) {
        blobUrl = URL.createObjectURL(result.blob);
        setEntry(result);
        setUrl(blobUrl);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [id]);

  async function handleDelete() {
    if (!entry) return;
    const ok = await confirm({
      title: 'Remove this PDF?',
      message: `"${entry.name}" will be deleted from your library on this device.`,
      confirmText: 'Remove',
      cancelText: 'Keep',
      tone: 'danger'
    });
    if (!ok) return;
    await deletePdf(entry.id);
    navigate('/library');
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">Opening PDF…</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <EmptyState
        title="PDF not found"
        message="This PDF is not in your library anymore. Go back and pick another one."
      />
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-12rem)] max-w-5xl flex-col gap-3 lg:h-[calc(100vh-7rem)]">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to="/library"
          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200 dark:bg-slate-900 dark:text-brand-100 dark:ring-slate-700 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Library
        </Link>
        <h2 className="min-w-0 flex-1 truncate text-sm font-bold text-slate-950 dark:text-white sm:text-base">
          {entry.name}
        </h2>
        <Link
          to={`/library/${entry.id}/practice`}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-brand-600/25 transition hover:from-brand-700 hover:to-brand-600"
        >
          <Play size={14} /> Practice
        </Link>
        {url ? (
          <a
            href={url}
            download={entry.name}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800"
            aria-label={`Download ${entry.name}`}
          >
            <Download size={14} /> Save
          </a>
        ) : null}
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-coral-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-coral-50 dark:bg-slate-900 dark:text-coral-100 dark:ring-slate-700 dark:hover:bg-coral-500/15"
          aria-label={`Remove ${entry.name}`}
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <PdfViewer blob={entry.blob} />
      </div>
    </div>
  );
}
