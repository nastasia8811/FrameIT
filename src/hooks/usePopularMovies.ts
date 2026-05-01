import { useState, useEffect, useCallback, useRef } from 'react';
import { fetcher } from "@/lib/tmdb";
import type { MoviesResponse, Movie } from '@/lib/tmdb-types';

export const usePopularMovies = () => {
    const [pages, setPages] = useState<Movie[][]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadedPagesRef = useRef(new Set<number>());

    useEffect(() => {
        if (loadedPagesRef.current.has(currentPage)) return;
        loadedPagesRef.current.add(currentPage);

        let cancelled = false;

        async function loadPage(page: number) {
            setLoading(true);
            try {
                const data = await fetcher<MoviesResponse>(`/movie/popular?page=${page}`);
                if (!cancelled) {
                    setPages(prev => [...prev, data.results]);
                    setHasMore(page < data.total_pages);
                }
            } catch (e: unknown) {
                if (!cancelled) {
                    if (e instanceof Error) {
                        setError(e.message);
                    } else {
                        setError("Unknown error");
                    }
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadPage(currentPage);
        return () => { cancelled = true; };
    }, [currentPage]);

    const loadMore = useCallback(() => {
        if (hasMore && !loading) {
            setCurrentPage(prev => prev + 1);
        }
    }, [hasMore, loading]);

    return {
        pages,
        loadMore,
        hasMore,
        loading,
        error,
    };
};
