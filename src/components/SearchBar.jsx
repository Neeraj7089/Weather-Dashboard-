// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { WeatherContext } from '../context/WeatherContext';
import PropTypes from 'prop-types';

const MOCK_CITIES = [
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
    'Berlin', 'Mumbai', 'Toronto', 'Dubai', 'Singapore',
    'San Francisco', 'Los Angeles', 'Chicago', 'Miami'
];

const SearchBar = ({ onSearch, onLocationSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const { recentSearches } = useContext(WeatherContext);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length > 1) {
            const filtered = MOCK_CITIES.filter(city =>
                city.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        setSelectedIndex(-1);
    }, [query]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSelect(suggestions[selectedIndex]);
            } else if (query) {
                handleSelect(query);
            }
        }
    };

    const handleSelect = (city) => {
        console.log('SearchBar: handleSelect called with', city);
        setQuery(city);
        onSearch(city);
        setShowSuggestions(false);
        setQuery('');
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto mb-6">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-google-blue transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue transition-all text-gray-800"
                    placeholder="Search city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length > 1 && setShowSuggestions(true)}
                    aria-label="Search city"
                />
                <button
                    onClick={onLocationSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-google-blue transition-colors"
                    title="Use my location"
                >
                    <Navigation className="h-5 w-5" />
                </button>
            </div>

            {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {suggestions.length > 0 ? (
                        <ul>
                            {suggestions.map((city, index) => (
                                <li
                                    key={city}
                                    onClick={() => handleSelect(city)}
                                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${index === selectedIndex ? 'bg-gray-50 text-google-blue' : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                >
                                    <MapPin size={16} className={index === selectedIndex ? 'text-google-blue' : 'text-gray-400'} />
                                    {city}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            )}
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onLocationSearch: PropTypes.func,
};

export default SearchBar;
