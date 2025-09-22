"use client";

import React, {useEffect, useState} from "react";
import {fetcher} from "@/lib/tmdb";
import Image from "next/image";

interface Video {
    key: string;
    site: string;
    type: string;
}

interface CastMember {
    id: number;
    name: string;
    profile_path: string | null;
}

interface MovieDetails {
    title: string;
    overview: string;
    videos: { results: Video[] };
    credits: { cast: CastMember[] };
}

type MovieDetailProps = {
    movieId: number;
};

const MovieDetail = ({movieId}: MovieDetailProps) => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const loadMovie = async () => {
            setLoading(true);
            try {
                const data = await fetcher<MovieDetails>(
                    `/movie/${movieId}?append_to_response=videos,credits`
                );
                if (isMounted) setMovie(data);
            } catch (e) {
                if (isMounted) setError((e as Error).message || "Failed to load movie details.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadMovie();
        return () => {
            isMounted = false;
        };
    }, [movieId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!movie) return null;

    const videos = movie.videos.results;
    const trailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    const cast = movie.credits.cast;

    return (
        <div className="text-left">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{movie.overview}</p>

            {trailer && (
                <div className="mb-4">
                    <iframe
                        className="w-full h-64 rounded"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="Movie Trailer"
                        allowFullScreen
                    />
                </div>
            )}

            {cast.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Top Cast</h3>
                    <ul className="flex gap-4 overflow-x-auto">
                        {cast.slice(0, 10).map((actor) => (
                            <li key={actor.id} className="w-24 text-center text-sm">
                                {actor.profile_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                        alt={actor.name}
                                        className="w-24 h-32 object-cover rounded"
                                    />
                                ) : (
                                    <div
                                        className="w-24 h-32 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                                        ?
                                    </div>
                                )}
                                <p className="mt-1">{actor.name}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default MovieDetail;
