"use client"

import {useTheme} from "@/app/contextes/ThemeContext";
import React from "react";

const Header = () => {
    const { theme, toggleTheme, colors } = useTheme();
    return (
        <header className="fixed top-0 left-0 w-full bg-primary text-white shadow-md" style={{position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1000 }}>
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <h1 className="text-2xl font-bold" style={{  cursor: "pointer"}} >Логотип</h1>
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-accent transition" style={{  cursor: "pointer"}}>Главная</a>
                    <a href="#" className="hover:text-accent transition" style={{  cursor: "pointer"}}>О нас</a>
                    <a href="#" className="hover:text-accent transition" style={{  cursor: "pointer"}}>Контакты</a>
                </nav>
                <button
                    style={{
                        backgroundColor: colors.buttonBackground,
                        color: colors.buttonText,
                        padding: "10px 20px",
                        border: "1px solid colors.border",
                        cursor: "pointer",
                        borderRadius: "18px",
                    }}
                    onClick={toggleTheme}
                >
                    jhldkhlks {theme} kfhdsh
                </button>
                <button className="md:hidden p-2">☰</button>
            </div>
        </header>
    );
};

export default Header;

