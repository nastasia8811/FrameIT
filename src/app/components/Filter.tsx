"use client";
import { FC, ChangeEvent } from "react";
import { useTheme } from "@/app/contextes/ThemeContext";

export type SortOption = "rating-desc" | "rating-asc" | "title-asc" | "title-desc";

interface FilterProps {
    query: string;
    setQuery: (v: string) => void;
    sort: SortOption;
    setSort: (v: SortOption) => void;
}

const Filter: FC<FilterProps> = ({ query, setQuery, sort, setSort }) => {
    const { colors } = useTheme();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search title..."
                    aria-label="Search title"
                    className="pl-10 pr-4 py-2 border rounded-md w-full bg-transparent"
                    style={{ color: colors.primary }}
                    value={query}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                />
            </div>

            <div>
                <label className="sr-only" style={{ color: colors.primary }}>Sort</label>
                <select
                    style={{ color: colors.primary }}
                    value={sort}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as SortOption)}
                    className="w-full border rounded-md py-2 px-3 bg-transparent"
                    aria-label="Sort"
                >
                    <option value="rating-desc">Rating ↓</option>
                    <option value="rating-asc">Rating ↑</option>
                    <option value="title-asc">Title A–Z</option>
                    <option value="title-desc">Title Z–A</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
