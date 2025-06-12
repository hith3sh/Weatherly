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
    <div className="loading-container">
      <div className="loading-content">
        <ClipLoader
          color={isDarkTheme ? "#ffffff" : "#1f2937"}
          loading={true}
          size={30}
          aria-label="Loading Spinner"
        />
        <p className="loading-text">Loading weather data...</p>
      </div>
    </div>
  );
}; 