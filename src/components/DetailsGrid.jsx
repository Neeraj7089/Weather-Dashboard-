// src/components/DetailsGrid.jsx
import React from 'react';
import { Droplets, Wind, Gauge, Sun, Eye, Umbrella } from 'lucide-react';
import PropTypes from 'prop-types';

const DetailCard = ({ icon: Icon, label, value, subValue }) => (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm font-medium">
            <Icon size={18} />
            {label}
        </div>
        <div className="text-xl font-semibold text-gray-800">{value}</div>
        {subValue && <div className="text-sm text-gray-400 mt-1">{subValue}</div>}
    </div>
);

const DetailsGrid = ({ data }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <DetailCard
                icon={Droplets}
                label="Humidity"
                value={`${data.humidity}%`}
                subValue={`Dew Point: ${data.temp - 2}°`}
            />
            <DetailCard
                icon={Wind}
                label="Wind"
                value={`${data.wind_speed} ${data.wind_unit}`}
                subValue="Direction: NW"
            />
            <DetailCard
                icon={Gauge}
                label="Pressure"
                value={`${data.pressure} hPa`}
            />
            <DetailCard
                icon={Sun}
                label="UV Index"
                value={data.uv_index}
                subValue="Moderate"
            />
            <DetailCard
                icon={Eye}
                label="Visibility"
                value={`${data.visibility} km`}
            />
            <DetailCard
                icon={Umbrella}
                label="Sunrise"
                value={data.sunrise}
                subValue={`Sunset: ${data.sunset}`}
            />
        </div>
    );
};

DetailsGrid.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DetailsGrid;
