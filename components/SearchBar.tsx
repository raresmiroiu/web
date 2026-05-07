"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useRef, useTransition } from "react";

interface Props {
  placeholder?: string;
}

export default function SearchBar({ placeholder = "Caută..." }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      // Reset to page 1 on new search
      params.delete("page");
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams],
  );

  const defaultValue = searchParams.get("q") ?? "";

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-inner">
        {/* Search icon */}
        <svg
          className="search-bar-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        <input
          ref={inputRef}
          id="search-input"
          type="search"
          className="search-bar-input"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Loading indicator */}
        {isPending && (
          <div className="search-bar-spinner" aria-label="Se caută..." />
        )}

        {/* Clear button */}
        {defaultValue && !isPending && (
          <button
            className="search-bar-clear"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              handleSearch("");
            }}
            aria-label="Șterge căutarea"
            type="button"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
