import React from 'react';
import type { Movie } from '@/lib/tmdb-types';
import Image from 'next/image';
import {useTheme} from "@/app/contextes/ThemeContext";


const Card: React.FC<{ movie: Movie }> = ({ movie }) => {
    const { id, title, poster_path, vote_average } = movie;
    const {  colors } = useTheme();

    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : '/placeholder.png';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition flex flex-col">
            <Image
                src={posterUrl}
                alt={title}
                width={500}
                height={700}
                className="object-cover"
                loading="lazy"
            />
            <div className="p-4 flex flex-col justify-between flex-1"  style={{ color: colors.primaryGeneral }}>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm">⭐ {vote_average.toFixed(1)}</p>
            </div>
        </div>

    );
};

export default Card;
