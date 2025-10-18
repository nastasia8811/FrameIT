"use client";
import React, { FC, ChangeEvent } from "react";
import { useTheme } from "@/app/contextes/ThemeContext";

export type SortOption = "rating-desc" | "rating-asc" | "title-asc" | "title-desc";

interface FilterProps {
    query: string;
    setQuery: (v: string) => void;
    sort: SortOption;
    setSort: (v: SortOption) => void;
}

const Filter: FC<FilterProps> = ({ query, setQuery, sort, setSort }) => {
    const { theme, colors } = useTheme();

    const isLight = theme === "light";

    const containerClasses = `
    relative flex items-center gap-3 rounded-2xl border p-2 pl-4 backdrop-blur transition 
    ${isLight
        ? "border-gray-300 bg-gray-50 focus-within:bg-gray-100"
        : "border-white/15 bg-white/5 focus-within:bg-white/10"}
  `;

    const textClasses = `
    w-full bg-transparent text-base focus:outline-none 
    ${isLight
        ? "text-gray-900 placeholder:text-gray-500"
        : "text-white placeholder:text-white/50"}
  `;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg
                        className={`h-5 w-5 ${isLight ? "text-gray-600" : "text-gray-400"}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </div>

                <label htmlFor="movie-search" className="sr-only">
                    Search movies
                </label>

                <div className={containerClasses}>
                    <input
                        type="text"
                        placeholder="Search title..."
                        aria-label="Search title"
                        className={textClasses}
                        style={{ color: colors.primary }}
                        value={query}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label className="sr-only" style={{ color: colors.primary }}>
                    Sort
                </label>

                <div className={containerClasses}>
                    <select
                        style={{ color: colors.primary }}
                        value={sort}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            setSort(e.target.value as SortOption)
                        }
                        className={textClasses}
                        aria-label="Sort"
                    >
                        <option value="rating-desc">Rating ↓</option>
                        <option value="rating-asc">Rating ↑</option>
                        <option value="title-asc">Title A–Z</option>
                        <option value="title-desc">Title Z–A</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filter;
