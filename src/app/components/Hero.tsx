"use client"
import React, {useEffect, useState} from "react";
import {useTheme} from "@/app/contextes/ThemeContext";
import Image from "next/image";
import {usePopularMovies} from '@/hooks/usePopularMovies';
import {Movie} from "@/lib/tmdb-types";

interface HeroProps {
    title: string;
}

const Hero = ({title}: HeroProps) => {
    const {colors} = useTheme();
    const {pages, error} = usePopularMovies();
    const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const seen = new Set<number>();
        const unique = pages
            .flat()
            .filter((m) => {
                if (seen.has(m.id)) return false;
                seen.add(m.id);
                return true;
            })
            .slice(0, 4);
        setFeaturedMovies(unique);
    }, [pages]);

    return (
        <section className="w-full bg-gradient-to-r from-primary to-secondary text-white py-12 shadow-lg mt-20">
            <div className="max-w-screen-xl mx-auto px-6">
                <h1
                    className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-20"
                    style={{color: colors.primary}}
                >
                    {title}
                </h1>
                {error && <p className="text-center text-red-400 mb-4">Error: {error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {featuredMovies.map((movie) => (
                        <div style={{cursor: "pointer"}}
                             key={movie.id}
                             className="rounded-xl overflow-hidden shadow hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <Image
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                        : '/images/placeholder.png'
                                }
                                alt={movie.title}
                                width={150}
                                height={225}
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />
                            <div className="p-3 bg-black bg-opacity-60">
                                <p className="text-center text-sm font-semibold truncate">{movie.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
