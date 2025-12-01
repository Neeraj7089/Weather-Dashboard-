// src/App.jsx
import React, { useState, useEffect } from 'react';
import { WeatherProvider } from './context/WeatherContext';
import { useWeather } from './hooks/useWeather';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherHero from './components/WeatherHero';
import DetailsGrid from './components/DetailsGrid';
import ForecastCarousel from './components/ForecastCarousel';
import FavoritesPanel from './components/FavoritesPanel';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ErrorBanner from './components/ErrorBanner';

const WeatherContent = () => {
  const { weatherData, loading, error, fetchWeather } = useWeather();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Initial fetch
  useEffect(() => {
    fetchWeather('New York');
  }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header onMenuClick={() => setIsFavoritesOpen(true)} />

      <FavoritesPanel
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelect={(city) => fetchWeather(city)}
      />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <SearchBar onSearch={fetchWeather} />

        {loading && <Loader />}

        {error && <ErrorBanner message={error} />}

        {!loading && !error && weatherData && (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <WeatherHero data={weatherData.current} />
                <ForecastCarousel data={weatherData.forecast} />
              </div>

              {/* Sidebar / Details */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 px-1">Current Details</h3>
                <DetailsGrid data={weatherData.current} />

                {/* Quick Tip / Extra Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h4 className="font-semibold text-google-blue mb-2">Weather Tip</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {weatherData.current.condition.includes('Rain')
                      ? "Don't forget your umbrella today! Roads might be slippery."
                      : "Great day for outdoor activities! Don't forget sunscreen."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <WeatherProvider>
      <WeatherContent />
    </WeatherProvider>
  );
};

export default App;
