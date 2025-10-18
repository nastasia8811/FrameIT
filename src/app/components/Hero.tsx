"use client";
import { useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion, cubicBezier, type Variants } from "framer-motion";
import Link from "next/link";
import {useTheme} from "@/app/contextes/ThemeContext";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * i,
            duration: 0.6,
            ease: cubicBezier(0.22, 1, 0.36, 1),
        },
    }),
};

const BACKGROUND_SRC = "/heroBackground.jpg";
const LIGHT_BACKGROUND_SRC = "/light_background.jpg";
const TITLE = "Stream new worlds, nightly.";
const SUBTITLE = "Dive into thousands of films — from cult classics to fresh premieres.";

const Hero=()=> {
    const reduce = useReducedMotion();
    const { theme } = useTheme();
    const kenBurns = useMemo(() => {
        return reduce
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 } }
            : {
                initial: { scale: 1, opacity: 0 },
                animate: { scale: 1.08, opacity: 1 },
                transition: { duration: 16, ease: "easeOut" as const },
            };
    }, [reduce]);

    return (
        <section
            className={[
                "relative isolate overflow-hidden text-white",
                "min-h-[100svh]",
                "pt-24 md:pt-28",
                "px-4 md:px-8 lg:px-12 xl:px-16",
            ].join(" ")}
            role="region"
            aria-label="Hero section"
        >
            <div className="absolute inset-0 -z-10">
                <motion.div className="absolute inset-0" {...kenBurns}>
                    <Image
                        src={ theme === "dark" ? BACKGROUND_SRC : LIGHT_BACKGROUND_SRC}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover [filter:grayscale(8%)_saturate(115%)_brightness(70%)]"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" aria-hidden />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_60px_rgba(0,0,0,0.65)]" aria-hidden />
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 py-12 md:grid-cols-12 md:gap-8 md:py-20 lg:py-24">
                <div className="md:col-span-7 lg:col-span-7 flex flex-col gap-6">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={fadeUp}
                        className="text-balance font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl"
                    >
                        {TITLE}
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        variants={fadeUp}
                        className="max-w-2xl text-pretty text-lg text-white/80 md:text-xl"
                    >
                        {SUBTITLE}
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        variants={fadeUp}
                        className="flex flex-wrap items-center gap-3 pt-2"
                    >
                        <Link
                            href="#movies" scroll={true}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10 active:scale-[0.98]"
                        >
                            Find a movie
                        </Link>

                        <Link
                            href="#popular" scroll={true}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10 active:scale-[0.98]"
                        >
                            Trending this week
                        </Link>
                    </motion.div>
                </div>

                {/* Right: visual weight (poster + glow) */}
                <div className="relative hidden md:block md:col-span-5 lg:col-span-5">
                    {/* Glow behind poster */}
                    <motion.div
                        aria-hidden
                        className="absolute -right-6 bottom-10 h-72 w-72 rounded-full blur-3xl"
                        initial={{opacity: 0, x: 40, y: 20}}
                        animate={{opacity: 0.55, x: 0, y: 0}}
                        transition={{duration: 1.0, delay: 0.3}}
                        style={{background: "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent)"}}
                    />

                    {/* Poster card */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.45}}
                        whileHover={{y: -6, rotate: -0.5}}
                        className="relative ml-auto mr-4 aspect-[2/3] w-64 rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur"
                        style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.45)" }}
                    >
                        <Image
                            src="/poster.jpeg"
                            alt="Featured movie poster"
                            fill
                            sizes="256px"
                            className="rounded-2xl object-cover"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                    </motion.div>
                </div>
            </div>
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                style={{ background: "radial-gradient(closest-side, rgba(168,85,247,0.35), transparent)" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.35), transparent)" }}
            />
        </section>
    );
}

export default Hero;