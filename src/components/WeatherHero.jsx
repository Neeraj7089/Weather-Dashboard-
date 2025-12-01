// src/components/WeatherHero.jsx
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSun, Heart } from 'lucide-react';
import { WeatherContext } from '../context/WeatherContext';
import PropTypes from 'prop-types';

const WeatherHero = ({ data }) => {
    const { favorites, addFavorite, removeFavorite } = useContext(WeatherContext);
    const isFavorite = favorites.includes(data.city);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(data.city);
        } else {
            addFavorite(data.city);
        }
    };

    const getIcon = (iconName) => {
        const props = { size: 64, className: "text-white drop-shadow-lg" };
        switch (iconName) {
            case 'sun': return <Sun {...props} className="text-yellow-300 drop-shadow-lg" />;
            case 'cloud': return <Cloud {...props} />;
            case 'cloud-rain': return <CloudRain {...props} />;
            case 'cloud-sun': return <CloudSun {...props} />;
            case 'cloud-lightning': return <CloudLightning {...props} />;
            default: return <Sun {...props} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-google-blue to-indigo-600 p-8 text-white shadow-xl mb-6"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sun size={200} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-semibold tracking-tight">{data.city}</h2>
                        <button
                            onClick={toggleFavorite}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors"
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Heart
                                size={24}
                                className={isFavorite ? "fill-red-500 text-red-500" : "text-white/70"}
                            />
                        </button>
                    </div>
                    <p className="text-indigo-100 text-lg">{data.local_time}</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-center md:text-right">
                        <div className="text-7xl font-bold tracking-tighter mb-1">
                            {data.temp}°
                        </div>
                        <p className="text-indigo-100 font-medium text-lg capitalize">
                            {data.condition}
                        </p>
                        <p className="text-indigo-200 text-sm">
                            Feels like {data.feels_like}°
                        </p>
                    </div>
                    <div className="hidden md:block">
                        {getIcon(data.icon)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

WeatherHero.propTypes = {
    data: PropTypes.object.isRequired,
};

export default WeatherHero;
