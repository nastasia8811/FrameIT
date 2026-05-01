"use client";
import Image from "next/image";
import { useTheme } from "@/app/contextes/ThemeContext";
import { SVG_PLACEHOLDER } from "@/lib/placeholder";
import {Movie} from "@/lib/tmdb-types";

export interface PopularMoviesProps {
    title: string;
    movies: Movie[];
    id?: string;
    onMovieClick?: (movie: Movie) => void;
}

const PopularMovies = ({ title, movies, id, onMovieClick }: PopularMoviesProps) => {
    const { colors } = useTheme();

    return (
        <section id="popular" className="w-full bg-gradient-to-r from-primary to-secondary text-white py-12 shadow-lg">
            <div className="max-w-screen-xl mx-auto px-6">
                <h2
                    className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-20"
                    style={{ color: colors.primary }}
                >
                    {title}
                </h2>

                <div id={id} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <div
                            role="button"
                            tabIndex={0}
                            aria-label={`View details for ${movie.title}`}
                            key={movie.id}
                            className="rounded-xl overflow-hidden shadow hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => onMovieClick?.(movie)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onMovieClick?.(movie);
                                }
                            }}
                        >
                            <Image
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : SVG_PLACEHOLDER}
                                width={150}
                                height={225}
                                className="object-cover w-full h-full"
                                loading="lazy"
                                alt={movie.title}
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
}
export default PopularMovies;