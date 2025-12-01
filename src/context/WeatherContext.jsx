// src/context/WeatherContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [units, setUnits] = useState(() => localStorage.getItem('weather_units') || 'metric');
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('weather_favorites')) || []);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        localStorage.setItem('weather_units', units);
    }, [units]);

    useEffect(() => {
        localStorage.setItem('weather_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleUnits = useCallback(() => {
        setUnits((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
    }, []);

    const addFavorite = useCallback((city) => {
        if (!favorites.includes(city)) {
            setFavorites([...favorites, city]);
        }
    }, [favorites]);

    const removeFavorite = useCallback((city) => {
        setFavorites(favorites.filter((c) => c !== city));
    }, [favorites]);

    const addRecentSearch = useCallback((city) => {
        setRecentSearches((prev) => {
            const filtered = prev.filter((c) => c !== city);
            return [city, ...filtered].slice(0, 5);
        });
    }, []);

    return (
        <WeatherContext.Provider
            value={{
                units,
                toggleUnits,
                favorites,
                addFavorite,
                removeFavorite,
                recentSearches,
                addRecentSearch,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

WeatherProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
