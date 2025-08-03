"use client";

import  {FC, useEffect, useRef, useState, useMemo} from "react";
import {useTheme} from "@/app/contextes/ThemeContext";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Card from "@/app/components/Card";
import {usePopularMovies} from "@/hooks/usePopularMovies";
import {Movie} from "@/lib/tmdb-types";
import MovieDetail from "@/app/components/MovieDetail";
import Modal from "@/app/components/Modal";
import Footer from "@/app/components/Footer";
import AirLoader from "@/app/components/Loader";
import Filter from "@/app/components/Filter";

const App: FC = () => {
    const {colors} = useTheme();
    const {pages, loadMore, hasMore, loading, error} = usePopularMovies();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    const uniqueMovies = useMemo(() => {
        const seen = new Set<number>();
        return pages.flat().filter((m) => {
            if (seen.has(m.id)) return false;
            seen.add(m.id);
            return true;
        });
    }, [pages]);

    useEffect(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && hasMore && !loading) loadMore();
                },
                {rootMargin: "200px"}
            );
        }
        const el = document.getElementById("load-more-trigger");
        if (el && observerRef.current) observerRef.current?.observe(el);
        return () => {
            if (el && observerRef.current) observerRef.current?.unobserve(el);
        };
    }, [loadMore, hasMore, loading]);

    const getRandomMovies = (movies: Movie[], count: number): Movie[] => {
        const shuffled = [...movies].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    const featuredRandomMovies = useMemo(() => getRandomMovies(uniqueMovies, 4), [uniqueMovies]);

    return (
        <div className="flex flex-col min-h-screen">
            <Modal isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)}>
                {selectedMovie && <MovieDetail movieId={selectedMovie.id}/>}
            </Modal>
            <section
                className="flex-grow p-4 md:p-8 lg:p-12 xl:p-16"
                style={{background: colors.background, color: colors.text}}
            >
                <Header/>
                <Hero title="Trending This Week" movies={featuredRandomMovies}/>

                <main className="pt-[100px]">
                    <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8"
                        style={{color: colors.primary}}>
                        Movie time – choose your vibe!
                    </h1>
                    {error && <p className="text-red-500">Error: {error}</p>}

                    <div className="relative ... mb-24 mt-20"><Filter/></div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {uniqueMovies.map((movie) => (
                            <Card
                                key={movie.id}
                                movie={movie}
                                isActive={movie.id === activeCardId}
                                onToggle={() => setActiveCardId(movie.id === activeCardId ? null : movie.id)}
                                onDetailsClick={() => {
                                    setSelectedMovie(movie);
                                    setActiveCardId(null);
                                }}
                            />
                        ))}
                    </div>

                    <div id="load-more-trigger" className="h-10 mb-20">
                        {loading && <div className="flex items-center justify-center "><AirLoader/></div>}
                    </div>
                </main>
            </section>

            <Footer/>
        </div>
    );
};

export default App;
