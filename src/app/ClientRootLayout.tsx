"use client";

import {ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {UserProvider} from "@/context/UserContext";
import {ThemeProvider} from "@/app/contextes/ThemeContext";

interface ClientRootLayoutProps {
    children: ReactNode;
}

const ClientRootLayout = ({children}: ClientRootLayoutProps) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>
    );
};

export default ClientRootLayout;