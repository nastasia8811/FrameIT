import { useState, useEffect } from 'react';
import { fetcher } from "@/lib/tmdb"
import type { MoviesResponse, Movie } from '@/lib/tmdb-types';

export const usePopularMovies=()=> {
    const [pages, setPages] = useState<Movie[][]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPage(page: number) {
            setLoading(true);
            try {
                const data = await fetcher<MoviesResponse>(`/movie/popular?page=${page}`);
                setPages(prev => [...prev, data.results]);
                setHasMore(page < data.total_pages);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        loadPage(currentPage);
    }, [currentPage]);

    const loadMore = () => {
        if (hasMore && !loading) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return {
        pages,
        loadMore,
        hasMore, // whether more pages exist
        loading,
        error,
    };
}
