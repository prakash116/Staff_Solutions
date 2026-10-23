"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Light theme" : "Dark theme"}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-control border border-border bg-surface text-foreground",
        "transition-[background-color,border-color,transform] duration-200 ease-out-expo hover:border-border-strong hover:bg-surface-hover active:scale-95",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        size={18}
        className={cn("absolute transition-[opacity,transform] duration-300 ease-out-expo", isDark ? "scale-50 opacity-0 -rotate-90" : "scale-100 opacity-100 rotate-0")}
      />
      <Moon
        aria-hidden="true"
        size={18}
        className={cn("absolute transition-[opacity,transform] duration-300 ease-out-expo", isDark ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 rotate-90")}
      />
    </button>
  );
}
