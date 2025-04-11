'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="cursor-pointer"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="m500:size-4 stroke-main-foreground hidden size-6 dark:inline" />
      <Moon className="m500:size-4 stroke-main-foreground inline size-6 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}