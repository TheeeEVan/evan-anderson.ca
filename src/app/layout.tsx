import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./css/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evan Anderson"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-clip`}
      >
        {children}
        {
        <div className="fixed bottom-0 w-full bg-black text-white text-center py-1" style={{ zIndex: 1000 }}>
          This site is currently being built and is not yet complete. Feel free to explore, but please note that some info may be missing or incomplete.
        </div>
        }
      </body>
    </html>
  );
}
