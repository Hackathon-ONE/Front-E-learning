"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "./ui/Button";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      aria-label="Alternar tema"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-surface shadow hover:bg-primary transition"
    >
      {currentTheme === "dark" ? (
        <Sun data-testid="sun-icon" className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon data-testid="moon-icon" className="w-6 h-6 text-gray-800" />
      )}
    </Button>
  );
}