'use client';

import { ClipLoader } from 'react-spinners';
import { useState, useEffect } from 'react';

export const LoadingSpinner = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Get current theme after component mounts
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDarkTheme(theme === 'dark');
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col items-center">
        <ClipLoader
          color={isDarkTheme ? '#ffffff' : '#1f2937'}
          loading={true}
          size={30}
          aria-label="Loading Spinner"
        />
        <p className="mt-4 text-base font-medium text-slate-700 dark:text-slate-200">Loading weather data...</p>
      </div>
    </div>
  );
};
