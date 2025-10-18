"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/app/contextes/ThemeContext";


type NavLink = { label: string; href: string };

const NAV_LINKS: ReadonlyArray<NavLink> = [
    { label: "Main", href: "/" },
    { label: "Popular", href: "/" },
    { label: "Contacts", href: "/" },
];

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const Header = ()=> {

    const pathname = usePathname();
    const { theme, toggleTheme, colors } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", menuOpen);
    }, [menuOpen]);


    const DesktopNav = () => (
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
                <Link
                    key={label}
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={cx(
                        "text-sm font-medium transition-transform duration-200",
                        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                        isActive(href) ? "text-white" : "text-white/80 hover:text-white"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );

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
            className={cx(
                "fixed inset-x-0 top-0 z-50 text-white",
                // Glass + gradient bg with good contrast over content
                "bg-gradient-to-br from-fuchsia-600/60 to-slate-800/60 backdrop-blur supports-[backdrop-filter]:bg-white/5",
                "shadow-md"
            )}
            role="banner"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                {/* Logo */}
                <Link href="/"
                      className="relative h-8 w-32 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                    <Image src="/logo.svg" alt="Logo" fill className="object-contain" priority/>
                    <span className="sr-only">Home</span>
                </Link>

                <DesktopNav/>

                <div className="hidden md:inline-flex">
                    <ThemeButton/>
                </div>

                {!menuOpen && (
                    <button
                        type="button"
                        className="md:hidden p-2 text-white"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        aria-expanded={menuOpen}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                )}
            </div>

            {menuOpen && (
                <div
                    id="mobile-menu"
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 text-2xl px-6
             bg-black/80 backdrop-blur-sm h-screen w-screen transition-all duration-300 md:hidden"
                    role="dialog"
                    aria-modal="true"
                >
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            className="absolute right-4 top-3 inline-flex h-10 w-10 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                            aria-label="Close menu"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        {NAV_LINKS.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                aria-current={isActive(href) ? "page" : undefined}
                                className={cx(
                                    "text-2xl font-semibold tracking-tight",
                                    isActive(href) ? "text-white" : "text-white/80 hover:text-white"
                                )}
                            >
                                {label}
                            </Link>
                        ))}

                        <ThemeButton mobile />

                </div>
            )}
        </header>
    );
}

export default Header;