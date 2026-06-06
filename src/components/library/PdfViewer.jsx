import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const options = { cMapUrl: 'cmaps/', cMapPacked: true };

export default function PdfViewer({ blob, src, pageRange, className = '' }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  const file = useMemo(() => src ?? blob ?? null, [blob, src]);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const element = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setContainerWidth(width);
    });
    observer.observe(element);
    setContainerWidth(element.clientWidth);
    return () => observer.disconnect();
  }, []);

  const pageWidth = Math.max(0, containerWidth - 24);
  const visiblePages = useMemo(() => {
    if (!numPages) return [];

    const start = Math.max(1, Math.min(pageRange?.start || 1, numPages));
    const end = Math.max(start, Math.min(pageRange?.end || numPages, numPages));

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [numPages, pageRange?.end, pageRange?.start]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full overflow-y-auto overscroll-contain bg-slate-100 dark:bg-slate-900 ${className}`}
    >
      {error ? (
        <div className="flex h-full items-center justify-center p-6 text-center">
          <p className="text-sm text-coral-700 dark:text-coral-100">
            Could not load this PDF. The file may be corrupted or unsupported.
          </p>
        </div>
      ) : (
        <Document
          file={file}
          options={options}
          loading={
            <div className="flex h-full items-center justify-center p-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">Rendering PDF…</p>
            </div>
          }
          error={null}
          onLoadSuccess={({ numPages: count }) => {
            setError(null);
            setNumPages(count);
          }}
          onLoadError={(err) => setError(err)}
          className="flex flex-col items-center gap-3 py-3"
        >
          {pageWidth > 0
            ? visiblePages.map((pageNumber) => (
                <Page
                  key={pageNumber}
                  pageNumber={pageNumber}
                  width={pageWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="overflow-hidden rounded-md shadow-md ring-1 ring-slate-300 dark:ring-slate-700"
                  loading={
                    <div
                      style={{ width: pageWidth, height: pageWidth * 1.414 }}
                      className="rounded-md bg-slate-200 dark:bg-slate-800"
                    />
                  }
                />
              ))
            : null}
        </Document>
      )}
    </div>
  );
}
