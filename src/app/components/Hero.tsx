"use client"
import {useTheme} from "@/app/contextes/ThemeContext";
import React from "react";


const Hero = () => {
    const { colors } = useTheme();
    return (
        <section className="fixed top-0 left-0 w-full bg-primary text-white shadow-md" style={{ marginTop: "100px" }}>
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" style={{ color: colors.primary }}>Hello, Hero!</h1>
            </div>
        </section>
    );
};

export default Hero;

