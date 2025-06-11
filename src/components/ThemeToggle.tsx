'use client';

import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

export const ThemeToggle = ({ onThemeChange }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    onThemeChange?.(initialTheme);
  }, [onThemeChange]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    onThemeChange?.(newTheme);
  };

  return (
    <button
      className="themeToggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="toggleTrack">
        <div className={`toggleThumb ${theme === 'dark' ? 'dark' : 'light'}`}>
          {theme === 'light' ? '🌙' : '☀️'}
        </div>
      </div>
    </button>
  );
}; 