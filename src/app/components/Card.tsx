import {FC, useEffect, useState} from 'react';
import type {Movie} from '@/lib/tmdb-types';
import Image from 'next/image';
import {useTheme} from "@/app/contextes/ThemeContext";
import {SVG_PLACEHOLDER} from "@/lib/placeholder";

const Card: FC<{
    movie: Movie;
    onDetailsClick: () => void;
    isActive: boolean;
    onToggle: () => void;
}> = ({movie, onDetailsClick, isActive, onToggle}) => {
    const {  colors } = useTheme();
    const {id, title, poster_path, vote_average} = movie;
    const [providerLink, setProviderLink] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProvider() {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                );
                const data = await res.json();
                const us = data.results?.US;
                if (us?.link) {
                    setProviderLink(us.link);
                }
            } catch (e) {
                console.error('Failed to load provider info:', e);
            }
        }

        fetchProvider();
    }, [id]);

    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : SVG_PLACEHOLDER

    return (
        <div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition flex flex-col h-full cursor-pointer"
            onClick={onToggle}
        >
            <Image
                src={posterUrl}
                alt={title}
                width={500}
                height={650}
                className="object-cover transition-opacity duration-300"
            />

            {isActive && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 backdrop-blur-sm">
                    <button
                        className="bg-white/70 dark:bg-gray-700/70 text-black dark:text-white py-2 px-4 rounded shadow hover:bg-white hover:dark:bg-gray-600"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDetailsClick();
                        }}
                    >
                        Details
                    </button>
                    {providerLink && (
                        <a
                            href={providerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/70 dark:bg-gray-700/70 text-black dark:text-white py-2 px-4 rounded shadow hover:bg-white hover:dark:bg-gray-600"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Watch movie
                        </a>
                    )}
                </div>
            )}

            <div className="p-4 flex flex-col justify-between flex-grow" style={{ color: colors.primaryGeneral }}>
                <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
                <p className="mt-1 text-sm">⭐ {vote_average?.toFixed(1)}</p>
            </div>
        </div>
    );
};

export default Card;
