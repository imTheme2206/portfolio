"use client";

import { rememberHomeScroll, hasRememberedHomeScroll } from "@/app/hook/use-restore-scroll";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const markDocumentVisitFromHome = rememberHomeScroll;

// Coming from the home page, go back in history; the home page restores the saved
// scroll position. Opened directly (shared link, new tab), there's no home entry to
// go back to, so fall back to the contact anchor.
export const DocumentBackLink = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const opensElsewhere =
      event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;
    if (opensElsewhere || !hasRememberedHomeScroll()) return;

    event.preventDefault();
    router.back();
  };

  return (
    <Link
      href="/#contact-section"
      data-cursor="clickable"
      onClick={handleClick}
      className={className}
    >
      ← Back
    </Link>
  );
};
