"use client";
import {useState} from "react";
import {useTheme} from "@/app/contextes/ThemeContext";
import {SunIcon, MoonIcon} from "@heroicons/react/24/outline";
import Image from "next/image";

const navLinks = [
    {label: "Main", href: "#"},
    {label: "About us", href: "#"},
    {label: "Contacts", href: "#"},
];

const Header = () => {
    const {theme, toggleTheme, colors} = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const renderLinks = (onClick = () => {}) =>
        navLinks.map(({label, href}) => (
            <a
                key={label}
                href={href}
                onClick={onClick}
                className="hover:text-accent transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
                {label}
            </a>
        ));

    const ThemeButton = ({mobile = false, className = ""}) => (
        <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 transition ${mobile
                ? "mt-8 border rounded-full border-white text-white hover:text-accent"
                : "md:inline-flex"} ${className}`}
            style={!mobile ? {color: colors.primary} : {}}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
            {mobile
                ? (theme === "light" ? "Dark Mode" : "Light Mode")
                : (theme === "light" ? <MoonIcon className="h-6 w-6 "/> : <SunIcon className="h-6 w-6"/>)}
        </button>
    );

    return (
        <header
            className="fixed top-0 left-0 w-full text-white shadow-md z-50"
            style={{background: "linear-gradient(135deg, rgba(155,77,255,0.6), rgba(29,53,87,0.6))"}}
        >
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <div className="relative w-32 h-8">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        fill
                        className="object-contain cursor-pointer"
                    />
                </div>


                <nav className="hidden md:flex space-x-6">{renderLinks()}</nav>

                <ThemeButton className="hidden md:inline-flex"/>

                <button
                    type="button"
                    className="md:hidden p-2 text-white"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                    aria-expanded={menuOpen}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 z-40 bg-primary bg-opacity-95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 text-2xl px-6 transition-all duration-300 md:hidden">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-5 right-5 text-white text-3xl"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>

                    {renderLinks(() => setMenuOpen(false))}
                    <ThemeButton mobile/>
                </div>
            )}
        </header>
    );
};

export default Header;
