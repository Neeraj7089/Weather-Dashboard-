import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import { fetchCurrentWeather, fetchForecast, fetchCurrentWeatherByCoords, fetchForecastByCoords } from '../services/weatherService';

const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
    const [activeTab, setActiveTab] = useState('today');

    const handleSearch = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const current = await fetchCurrentWeather(city);
            const forecast = await fetchForecast(city);
            setWeatherData(current);
            setForecastData(forecast);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLocationSearch = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const current = await fetchCurrentWeatherByCoords(latitude, longitude);
                    const forecast = await fetchForecastByCoords(latitude, longitude);
                    setWeatherData(current);
                    setForecastData(forecast);
                } catch (err) {
                    setError('Failed to fetch weather data for your location.');
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError('Unable to retrieve your location.');
                setLoading(false);
            }
        );
    };

    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    };

    return (
        <div className="weather-dashboard">
            <div className="dashboard-header">
                <div className="header-title">
                    <h1>Weather Dashboard</h1>
                </div>
                <button className="unit-toggle" onClick={toggleUnit}>
                    Switch to {unit === 'metric' ? '°F' : '°C'}
                </button>
            </div>

            <SearchBar onSearch={handleSearch} onLocationSearch={handleLocationSearch} />

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {weatherData && forecastData && (
                <>
                    <div className="tabs-container">
                        <button
                            className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
                            onClick={() => setActiveTab('today')}
                        >
                            Today
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'hourly' ? 'active' : ''}`}
                            onClick={() => setActiveTab('hourly')}
                        >
                            Hourly
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
                            onClick={() => setActiveTab('daily')}
                        >
                            10-Day
                        </button>
                    </div>

                    <div className="content-area">
                        {activeTab === 'today' && (
                            <CurrentWeather data={weatherData} unit={unit} />
                        )}

                        {activeTab === 'hourly' && (
                            <Forecast data={forecastData} unit={unit} type="hourly" />
                        )}

                        {activeTab === 'daily' && (
                            <Forecast data={forecastData} unit={unit} type="daily" />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherDashboard;
