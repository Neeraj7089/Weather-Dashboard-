// src/components/ForecastCarousel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSun } from 'lucide-react';
import PropTypes from 'prop-types';

const ForecastCarousel = ({ data }) => {
    const getIcon = (iconName) => {
        const props = { size: 24, className: "mb-2" };
        switch (iconName) {
            case 'sun': return <Sun {...props} className="text-yellow-500" />;
            case 'cloud': return <Cloud {...props} className="text-gray-400" />;
            case 'cloud-rain': return <CloudRain {...props} className="text-blue-400" />;
            case 'cloud-sun': return <CloudSun {...props} className="text-orange-400" />;
            case 'cloud-lightning': return <CloudLightning {...props} className="text-purple-500" />;
            default: return <Sun {...props} className="text-yellow-500" />;
        }
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-1">7-Day Forecast</h3>
            <div className="flex overflow-x-auto pb-4 gap-3 snap-x scrollbar-hide">
                {data.map((day, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="snap-start min-w-[100px] bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-between hover:border-google-blue/30 transition-colors cursor-default"
                    >
                        <span className="text-sm font-medium text-gray-600 mb-2">{day.day}</span>
                        {getIcon(day.icon)}
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-lg font-bold text-gray-800">{day.high}°</span>
                            <span className="text-sm text-gray-400">{day.low}°</span>
                        </div>
                        {day.pop > 0 && (
                            <span className="text-xs font-medium text-blue-500 mt-2">{day.pop}%</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

ForecastCarousel.propTypes = {
    data: PropTypes.array.isRequired,
};

export default ForecastCarousel;
