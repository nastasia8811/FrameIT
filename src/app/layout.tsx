"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./globals.css";
import ClientRootLayout from "./ClientRootLayout";

const queryClient = new QueryClient();

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <title>FrameIt</title>
        </head>
        <body>
        <QueryClientProvider client={queryClient}>
            <ClientRootLayout>
                {children}
            </ClientRootLayout>
        </QueryClientProvider>
        </body>
        </html>
    );
}
