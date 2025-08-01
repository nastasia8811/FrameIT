"use client";
import React from "react";

const navLinks = [
    { label: "Main", href: "#" },
    { label: "About us", href: "#" },
    { label: "Contacts", href: "#" },
];

const Footer = () => {
    return (
        <footer
            className="bottom-0 left-0 w-full backdrop-blur-sm text-white shadow-md z-50"
            style={{
                background: 'linear-gradient(135deg, rgba(155,77,255,0.6), rgba(29,53,87,0.6))',
            }}
        >
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <img src="logo.svg" alt="Logo" className="h-8 cursor-pointer" />

                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hover:text-accent transition"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
