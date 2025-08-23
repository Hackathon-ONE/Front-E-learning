import "./globals.css";
import { Ubuntu, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

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
    <html lang="es" className={`${ubuntu.variable} ${inter.variable}`} suppressHydrationWarning={true}>
      <body className="bg-background text-foreground font-body">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}