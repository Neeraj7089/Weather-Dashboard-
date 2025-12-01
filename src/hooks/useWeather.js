// src/hooks/useWeather.js
import { useState, useEffect, useContext, useCallback } from 'react';
import { fetchWeatherMock } from '../services/fetchWeatherMock';
import { WeatherContext } from '../context/WeatherContext';

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const useWeather = () => {
    const { units, addRecentSearch } = useContext(WeatherContext);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = useCallback(async (city) => {
        console.log('useWeather: fetchWeather called with', city);
        if (!city) return;

        setLoading(true);
        setError(null);

        // Check cache
        const cacheKey = `weather_${city}_${units}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                console.log('useWeather: Using cached data for', city);
                setWeatherData(data);
                setLoading(false);
                addRecentSearch(city);
                return;
            }
        }

        try {
            console.log('useWeather: Calling fetchWeatherMock');
            const data = await fetchWeatherMock(city, units);
            console.log('useWeather: Received data', data);
            setWeatherData(data);

            // Save to cache
            sessionStorage.setItem(cacheKey, JSON.stringify({
                data,
                timestamp: Date.now(),
            }));

            addRecentSearch(city);
        } catch (err) {
            setError('Failed to fetch weather data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [units, addRecentSearch]);

    return { weatherData, loading, error, fetchWeather };
};
