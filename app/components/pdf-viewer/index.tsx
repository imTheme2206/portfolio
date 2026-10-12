"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

// pdf.js touches browser-only APIs (DOMMatrix, workers), so it must not run during SSR.
const PdfPages = dynamic(
  () => import("./pdf-pages").then((mod) => mod.PdfPages),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[8.5/11] w-full rounded-sm bg-card ring-1 ring-primary/10" />
    ),
  },
);

type PdfViewerProps = {
  file: string;
  title: string;
  preview: string;
};

export const PdfViewer = ({ file, title, preview }: PdfViewerProps) => {
  const placeholder = (
    <div className="relative aspect-[8.5/11] w-full overflow-hidden rounded-sm bg-card ring-1 ring-primary/10">
      <Image
        src={preview}
        alt=""
        fill
        priority
        sizes="(min-width: 896px) 56rem, 100vw"
        className="object-cover object-top opacity-60"
      />
      <p className="absolute inset-x-0 bottom-6 text-center font-mono text-xs uppercase tracking-widest text-primary/65">
        Loading {title}…
      </p>
    </div>
  );

  const error = (
    <div className="grid aspect-[8.5/11] w-full place-items-center rounded-sm border border-primary/20 bg-card p-8 text-center">
      <div>
        <p className="font-heading text-2xl italic">
          The {title} couldn&apos;t be displayed.
        </p>
        <a
          href={file}
          download
          className="mt-4 inline-block font-mono text-xs uppercase tracking-widest underline underline-offset-4"
        >
          Download the PDF instead
        </a>
      </div>
    </div>
  );

  return (
    <PdfPages
      file={file}
      title={title}
      loading={placeholder}
      error={error}
    />
  );
};
