import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import ReactQueryProvider from "@/components/providers/react-quary-providrer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product NFT",
  description: "personalized NFT for product",
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
        {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
