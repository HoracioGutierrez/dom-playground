'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="m500:w-9 bg-main w-[50px] p-0 h-full border-l-4 cursor-pointer border-border"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="m500:size-4 stroke-main-foreground hidden size-6 dark:inline" />
      <Moon className="m500:size-4 stroke-main-foreground inline size-6 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}