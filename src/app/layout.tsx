import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import ClientRootLayout from "./ClientRootLayout";

export const metadata: Metadata = {
    title: "FrameIt",
    description: "Discover and browse popular movies",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body>
        <ClientRootLayout>
            {children}
        </ClientRootLayout>
        </body>
        </html>
    );
}