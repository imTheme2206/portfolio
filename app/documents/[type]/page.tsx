import { DocumentBackLink } from "@/app/components/document-back-link";
import { PdfViewer } from "@/app/components/pdf-viewer";
import { documents } from "@/app/constants";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type DocumentPageProps = {
  params: Promise<{ type: string }>;
};

const findDocument = (slug: string) =>
  documents.find((document) => document.type.toLowerCase() === slug);

export const dynamicParams = false;

export const generateStaticParams = () =>
  documents.map((document) => ({ type: document.type.toLowerCase() }));

export const generateMetadata = async ({
  params,
}: DocumentPageProps): Promise<Metadata> => {
  const document = findDocument((await params).type);
  if (!document) return {};

  return {
    title: `${document.type} • Worrachit Pongkatekarm`,
    description: document.label,
  };
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const document = findDocument((await params).type);
  if (!document) notFound();

  return (
    <main className="relative z-20 min-h-dvh bg-background text-primary">
      <div className="mx-auto w-full max-w-4xl px-5 pb-28 pt-9 sm:px-10 sm:pt-12">
        <header className="grid gap-6 border-t border-primary/20 pt-6">
          <DocumentBackLink className="w-fit font-mono text-xs uppercase tracking-widest text-primary/65 transition-[color,scale] duration-150 ease-out-strong hover:text-animated-accent focus-visible:text-animated-accent active:scale-[0.97]" />

          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <h1 className="font-heading text-5xl italic leading-none tracking-tight sm:text-7xl">
                {document.type}
                <span className="text-animated-accent">.</span>
              </h1>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-primary/65">
                {document.label}
              </p>
            </div>

            <a
              href={document.href}
              download
              data-cursor="clickable"
              className="inline-flex min-h-12 items-center rounded-full border border-primary/25 px-5 font-mono text-xs uppercase tracking-widest transition-[border-color,color,scale] duration-150 ease-out-strong hover:border-primary/60 hover:text-animated-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current active:scale-[0.97]"
            >
              Download PDF ↓
            </a>
          </div>
        </header>

        <div className="mt-10 sm:mt-14">
          <PdfViewer
            file={document.href}
            title={document.type}
            preview={document.preview}
          />
        </div>
      </div>
    </main>
  );
}
