// src/components/Loader.jsx
import React from 'react';

const Loader = () => (
    <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-google-blue/20 border-t-google-blue rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading weather data...</p>
    </div>
);

export default Loader;
