import {FC, useEffect, useState, KeyboardEvent} from 'react';
import type {Movie} from '@/lib/tmdb-types';
import Image from 'next/image';
import {useTheme} from "@/app/contextes/ThemeContext";
import {SVG_PLACEHOLDER} from "@/lib/placeholder";
import {fetcher} from "@/lib/tmdb";

interface WatchProviderResponse {
    results: Record<string, { link?: string }>;
}

const Card: FC<{
    movie: Movie;
    onDetailsClick: () => void;
    isActive: boolean;
    onToggle: () => void;
}> = ({movie, onDetailsClick, isActive, onToggle}) => {
    const {colors} = useTheme();
    const {id, title, poster_path, vote_average} = movie;
    const [providerLink, setProviderLink] = useState<string | null>(null);

    useEffect(() => {
        if (!isActive) return;
        let cancelled = false;

        async function fetchProvider() {
            try {
                const data = await fetcher<WatchProviderResponse>(
                    `/movie/${id}/watch/providers`
                );
                const us = data.results?.US;
                if (!cancelled && us?.link) {
                    setProviderLink(us.link);
                }
            } catch (e) {
                console.error('Failed to load provider info:', e);
            }
        }

        fetchProvider();
        return () => { cancelled = true; };
    }, [id, isActive]);

    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : SVG_PLACEHOLDER;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`Toggle details for ${title}`}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition flex flex-col h-full cursor-pointer"
            onClick={onToggle}
            onKeyDown={handleKeyDown}
        >
            <Image
                src={posterUrl}
                alt={title}
                width={500}
                height={650}
                className="object-cover transition-opacity duration-300"
            />

            {isActive && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                    <button
                        className="inline-flex items-center gap-2 rounded-2xl bg-white/70 py-2 px-4 text-black backdrop-blur transition hover:bg-white/30 active:scale-[0.98]"
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
                            className="inline-flex items-center gap-2 rounded-2xl bg-white/70 py-2 px-4 text-black backdrop-blur transition hover:bg-white/30 active:scale-[0.98]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Watch movie
                        </a>
                    )}
                </div>
            )}

            <div className="p-4 flex flex-col justify-between flex-grow" style={{color: colors.primaryGeneral}}>
                <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
                <p className="mt-1 text-sm">⭐ {vote_average?.toFixed(1) ?? 'N/A'}</p>
            </div>
        </div>
    );
};

export default Card;