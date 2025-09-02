"use client";

import { FC, useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import { useTheme } from "@/app/contextes/ThemeContext";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Card from "@/app/components/Card";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { Movie } from "@/lib/tmdb-types";
import MovieDetail from "@/app/components/MovieDetail";
import Modal from "@/app/components/Modal";
import Footer from "@/app/components/Footer";
import AirLoader from "@/app/components/Loader";
import Filter from "@/app/components/Filter";

const App: FC = () => {
    const { colors } = useTheme();
    const { pages, loadMore, hasMore, loading, error } = usePopularMovies();
    const observerRef = useRef<IntersectionObserver | null>(null);

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const [sort, setSort] =
        useState<"rating-desc" | "rating-asc" | "title-asc" | "title-desc">("rating-desc");

    const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);

    const uniqueMovies = useMemo(() => {
        const seen = new Set<number>();
        return pages.flat().filter((m) => {
            if (seen.has(m.id)) return false;
            seen.add(m.id);
            return true;
        });
    }, [pages]);

    useEffect(() => {
        if (featuredMovies.length === 0 && uniqueMovies.length >= 4) {
            const shuffled = [...uniqueMovies].sort(() => Math.random() - 0.5);
            setFeaturedMovies(shuffled.slice(0, 4));
        }
    }, [uniqueMovies, featuredMovies.length]);

    const filteredMovies = useMemo(() => {
        const q = deferredQuery.trim().toLowerCase();

        let arr = uniqueMovies;
        if (q) arr = arr.filter((m) => m.title.toLowerCase().includes(q));

        return [...arr].sort((a, b) => {
            switch (sort) {
                case "rating-asc":
                    return (a.vote_average ?? 0) - (b.vote_average ?? 0);
                case "title-asc":
                    return a.title.localeCompare(b.title);
                case "title-desc":
                    return b.title.localeCompare(a.title);
                default:
                    return (b.vote_average ?? 0) - (a.vote_average ?? 0); // rating-desc
            }
        });
    }, [uniqueMovies, deferredQuery, sort]);

    useEffect(() => {
        const el = document.getElementById("load-more-trigger");
        if (!el) return;

        const obs =
            observerRef.current ??
            (observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && hasMore && !loading) loadMore();
                },
                { rootMargin: "200px" }
            ));

        obs.observe(el);
        return () => {
            obs.unobserve(el);
        };
    }, [loadMore, hasMore, loading]);

    // IDs
    const heroHeadingId = "hero-heading";
    const catalogHeadingId = "catalog-heading";
    const modalTitleId = selectedMovie ? `movie-title-${selectedMovie.id}` : undefined;

    return (
        <div className="flex flex-col min-h-screen" style={{ background: colors.background, color: colors.text }}>
            <Header />

            <main role="main" id="main" className="flex-grow">

                <section aria-labelledby={heroHeadingId} className="p-4 md:p-8 lg:p-12 xl:p-16">
                    <Hero title="Trending This Week" movies={featuredMovies} headingId={heroHeadingId} />
                </section>

                {/* Каталог фильмов — основной контент страницы */}
                <section aria-labelledby={catalogHeadingId} className="pt-[100px] max-w-screen-xl mx-auto p-4">
                    <h1
                        id={catalogHeadingId}
                        className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8"
                        style={{ color: colors.primary }}
                    >
                        Movie time – choose your vibe!
                    </h1>

                    {error && <p role="alert" className="text-red-500">Error: {error}</p>}

                    <div className="relative mb-24 mt-20">
                        <Filter query={query} setQuery={setQuery} sort={sort} setSort={setSort} />
                    </div>

                    <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {filteredMovies.map((movie) => (
                            <li role="listitem" key={movie.id}>
                                <Card
                                    movie={movie}
                                    isActive={movie.id === activeCardId}
                                    onToggle={() => setActiveCardId(movie.id === activeCardId ? null : movie.id)}
                                    onDetailsClick={() => {
                                        setSelectedMovie(movie);
                                        setActiveCardId(null);
                                    }}
                                />
                            </li>
                        ))}
                    </ul>

                    <div id="load-more-trigger" className="h-10 mb-20" aria-live="polite" aria-atomic="true">
                        {loading && (
                            <div className="flex items-center justify-center">
                                <AirLoader />
                                <span className="sr-only">Loading more movies…</span>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />

            <Modal isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} ariaLabelledby={modalTitleId}>
                {selectedMovie && (
                    <div>
                        <h2 id={modalTitleId} className="sr-only">{selectedMovie.title}</h2>
                        <MovieDetail movieId={selectedMovie.id} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default App;
