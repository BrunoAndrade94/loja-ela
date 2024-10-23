import type { Metadata } from "next";
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { QueryProvider } from "@/components/query-provider"

import "./globals.css";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "ELA",
  description: "Loja de roupas íntimas",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
