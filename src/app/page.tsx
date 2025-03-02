"use client";

import React from "react";
import { useTheme } from "@/app/contextes/ThemeContext"
import Header from "@/app/components/Header"
import Hero from "@/app/components/Hero"

const App = () => {
    const { colors } = useTheme();

    return (
        <section
            className="p-4 md:p-8 lg:p-12 xl:p-16"
            style={{
                background: colors.background,
                color: colors.text,
                minHeight: "100vh",
                padding: "22px",

            }}
        >
            <Header />
            <main>
                <Hero />
            </main>

        </section>
    );
};

export default App;
