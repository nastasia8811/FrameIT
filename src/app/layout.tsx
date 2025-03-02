"use client";

import "./globals.css";
import ClientRootLayout from "./ClientRootLayout";
import React from "react";

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>WEB3</title>
      </head>
      <body>
      <ClientRootLayout>{children}</ClientRootLayout>
      </body>
      </html>
  );
}
