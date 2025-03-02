"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/context/UserContext";
import {ThemeProvider} from "@/app/contextes/ThemeContext";


interface ClientRootLayoutProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
