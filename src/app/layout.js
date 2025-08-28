import "./globals.css";
import { Ubuntu, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./Providers"; 

const ubuntu = Ubuntu({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "E-Learning Platform",
  description: "Aprende y enseña en línea con facilidad 🚀",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${ubuntu.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground font-body">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}