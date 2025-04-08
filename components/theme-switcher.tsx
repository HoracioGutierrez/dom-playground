'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import * as React from 'react';
import { T } from "gt-next";


export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <T id="components.theme_switcher.0">
      <button
        className="m500:w-9 bg-main w-[50px] p-0 h-full border-l-4 border-border cursor-pointer"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>

        <Sun className="m500:size-4 stroke-main-foreground hidden size-6 dark:inline" />
        <Moon className="m500:size-4 stroke-main-foreground inline size-6 dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </button>
    </T>
  );
}