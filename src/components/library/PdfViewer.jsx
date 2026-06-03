import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const options = { cMapUrl: 'cmaps/', cMapPacked: true };

export default function PdfViewer({ blob, src, className = '' }) {
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
          {numPages && pageWidth > 0
            ? Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
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
