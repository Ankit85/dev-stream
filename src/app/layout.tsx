import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "@/app/header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev stream",
  description: "Share what you are building with other devs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <NextTopLoader />
          <Header />
          <div className="container mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
