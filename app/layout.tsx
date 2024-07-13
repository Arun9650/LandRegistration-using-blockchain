import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import ReactQueryProvider from "@/components/providers/react-quary-provider";
import NavBar from "@/components/ui/navbar";
import { Provider } from "jotai";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import SkeletonComponent from "@/components/skeleton";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product NFT",
  description: "personalized NFT for product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Provider>
            <NavBar />
            <Suspense
              fallback={
                <main className="flex w-full min-h-screen bg-[#f2f2f2] items-center justify-between p-24 pt-5">
                  <div>
                    <SkeletonComponent />
                  </div>
                </main>
              }
            >
              {children}
            </Suspense>
            <Toaster />
          </Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
