
/** Один фільм із списку “popular” */
export interface Movie {
    id: number;
    title: string;
    poster_path: string ;
    vote_average: number;
}

/** Відповідь TMDB на запит популярних */
export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
