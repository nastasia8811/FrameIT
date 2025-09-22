"use client";
import Image from "next/image";
import { useTheme } from "@/app/contextes/ThemeContext";
import { SVG_PLACEHOLDER } from "@/lib/placeholder";
import {Movie} from "@/lib/tmdb-types";

export interface HeroProps {
    title: string;
    movies: Movie[];
    id?: string;

}

const Hero = ({ title, movies, id }: HeroProps) => {
    const { colors } = useTheme();

    return (
        <section className="w-full bg-gradient-to-r from-primary to-secondary text-white py-12 shadow-lg mt-20">
            <div className="max-w-screen-xl mx-auto px-6">
                <h1
                    className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-20"
                    style={{ color: colors.primary }}
                >
                    {title}
                </h1>

                <div id={id}className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <div
                            style={{ cursor: "pointer" }}
                            key={movie.id}
                            className="rounded-xl overflow-hidden shadow hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <Image
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : SVG_PLACEHOLDER}
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
}
export default Hero
