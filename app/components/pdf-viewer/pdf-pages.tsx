"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// react-pdf requires workerSrc to be set in the same module that renders <Document>.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type PdfPagesProps = {
  file: string;
  title: string;
  loading: React.ReactNode;
  error: React.ReactNode;
};

export const PdfPages = ({ file, title, loading, error }: PdfPagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {width === undefined ? (
        loading
      ) : (
        <Document
          file={file}
          loading={loading}
          error={error}
          externalLinkTarget="_blank"
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          className="flex flex-col gap-6 sm:gap-10"
        >
          {Array.from({ length: pageCount }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={width}
              loading={null}
              aria-label={`${title}, page ${index + 1} of ${pageCount}`}
              className="overflow-hidden rounded-sm bg-white shadow-[0_1.5rem_4rem_rgba(20,18,16,0.14)] ring-1 ring-primary/10"
            />
          ))}
        </Document>
      )}
    </div>
  );
};
