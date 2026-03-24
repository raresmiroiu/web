"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    if (totalPages <= 1) return null;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 32 }}>
            <Link
                href={isFirstPage ? "#" : createPageURL(currentPage - 1)}
                style={{
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "1px solid #2e332e",
                    background: isFirstPage ? "transparent" : "#131614",
                    color: isFirstPage ? "#5c5f5a" : "#e8e4db",
                    fontSize: 13,
                    textDecoration: "none",
                    pointerEvents: isFirstPage ? "none" : "auto",
                    transition: "border-color 0.2s"
                }}
            >
                Înapoi
            </Link>

            <div style={{ fontSize: 13, color: "#9e9b94", margin: "0 8px" }}>
                Pagina <span style={{ color: "#c9a84c" }}>{currentPage}</span> din {totalPages}
            </div>

            <Link
                href={isLastPage ? "#" : createPageURL(currentPage + 1)}
                style={{
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "1px solid #2e332e",
                    background: isLastPage ? "transparent" : "#131614",
                    color: isLastPage ? "#5c5f5a" : "#e8e4db",
                    fontSize: 13,
                    textDecoration: "none",
                    pointerEvents: isLastPage ? "none" : "auto",
                    transition: "border-color 0.2s"
                }}
            >
                Înainte
            </Link>
        </div>
    );
}
