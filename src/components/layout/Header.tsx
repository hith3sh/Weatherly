import React, { useState, useEffect, useRef } from 'react';
import { searchCities } from '../../lib/weatherApi';

interface HeaderProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  onTemperatureUnitChange: (unit: 'C' | 'F') => void;
  temperatureUnit: 'C' | 'F';
  onThemeChange: (theme: 'light' | 'dark') => void;
  currentTheme: 'light' | 'dark';
}

interface CityOption {
  name: string;
  country: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  isLoading,
  onTemperatureUnitChange,
  temperatureUnit,
  onThemeChange,
  currentTheme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CityOption[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search cities when query changes
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchCities(searchQuery);
          setSearchResults(results.slice(0, 3)); // Limit to 3 results
          setShowResults(true);
        } catch (error) {
          console.error('Error searching cities:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleSearchSubmit = (city: string) => {
    onSearch(city);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleCitySelect = (city: CityOption) => {
    handleSearchSubmit(`${city.name}, ${city.country}`);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    onThemeChange(newTheme);
  };

  return (
    <div className="relative z-30 flex flex-col md:flex-row md:items-center md:justify-between mb-6 px-4 py-3">
      {/* Left Spacer */}
      <div className="w-1/3 hidden lg:block" />
      {/* Right side controls (on mobile, goes above search bar) */}
      <div className="flex items-center space-x-2 lg:space-x-3 mb-3 md:mb-0 md:order-2 self-end md:self-auto">
        {/* Temperature Unit Toggle */}
        <div className="bg-slate-100 dark:bg-slate-700 rounded-full p-1 shadow-sm border border-slate-200 dark:border-slate-600">
          <div className="flex">
            <button
              onClick={() => onTemperatureUnitChange('C')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                temperatureUnit === 'C'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onTemperatureUnitChange('F')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                temperatureUnit === 'F'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
        >
          {currentTheme === 'light' ? (
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>

        {/* Mobile Menu Button (for smaller screens) */}
        <div className="lg:hidden">
          <button
            className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-md mx-0 md:mx-4 relative md:order-1 w-full" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city..."
            className="w-full px-4 py-2 pl-10 pr-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            ) : (
              <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            {searchResults.map((city, index) => (
              <button
                key={index}
                onClick={() => handleCitySelect(city)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  {city.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {city.country}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 