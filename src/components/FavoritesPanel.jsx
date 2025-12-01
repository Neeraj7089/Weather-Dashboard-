// src/components/FavoritesPanel.jsx
import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Heart, X } from 'lucide-react';
import PropTypes from 'prop-types';

const FavoritesPanel = ({ onSelect, onClose, isOpen }) => {
    const { favorites, removeFavorite } = useContext(WeatherContext);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-100">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Heart size={18} className="text-red-500 fill-red-500" />
                    Favorites
                </h3>
                <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <X size={20} className="text-gray-500" />
                </button>
            </div>

            <div className="p-4 overflow-y-auto h-full pb-20">
                {favorites.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">
                        <p>No favorites yet.</p>
                        <p className="text-sm mt-2">Click the heart icon on the weather card to save a city.</p>
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {favorites.map((city) => (
                            <li key={city} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                                <button
                                    onClick={() => { onSelect(city); onClose(); }}
                                    className="flex-1 text-left font-medium text-gray-700 hover:text-google-blue"
                                >
                                    {city}
                                </button>
                                <button
                                    onClick={() => removeFavorite(city)}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-all"
                                    aria-label="Remove"
                                >
                                    <X size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

FavoritesPanel.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default FavoritesPanel;
