// src/components/Header.jsx
import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { CloudSun, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
    const { units, toggleUnits } = useContext(WeatherContext);

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-google-blue rounded-full text-white">
                    <CloudSun size={24} />
                </div>
                <h1 className="text-xl font-medium text-gray-800 hidden sm:block">Weather</h1>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleUnits}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                    aria-label="Toggle units"
                >
                    <span className={units === 'metric' ? 'text-google-blue font-bold' : 'text-gray-500'}>°C</span>
                    <span className="text-gray-300">|</span>
                    <span className={units === 'imperial' ? 'text-google-blue font-bold' : 'text-gray-500'}>°F</span>
                </button>

                <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu size={24} className="text-gray-600" />
                </button>
            </div>
        </header>
    );
};

export default Header;
