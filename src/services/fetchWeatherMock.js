// src/services/fetchWeatherMock.js
// Mock API to simulate fetching weather data with realistic shapes and delay.

export const fetchWeatherMock = async (city, units = 'metric') => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const isMetric = units === 'metric';
    const tempUnit = isMetric ? 'C' : 'F';
    const speedUnit = isMetric ? 'km/h' : 'mph';

    // Generate deterministic-ish random data based on city name length
    const seed = city.length;
    const baseTemp = 15 + (seed % 15); // 15-30 degrees base

    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy'];
    const condition = conditions[seed % conditions.length];

    const getIcon = (cond) => {
        switch (cond) {
            case 'Sunny': return 'sun';
            case 'Cloudy': return 'cloud';
            case 'Rainy': return 'cloud-rain';
            case 'Partly Cloudy': return 'cloud-sun';
            case 'Stormy': return 'cloud-lightning';
            default: return 'sun';
        }
    };

    const current = {
        city: city.charAt(0).toUpperCase() + city.slice(1),
        country: 'US', // Mock country
        temp: Math.round(isMetric ? baseTemp : (baseTemp * 9 / 5) + 32),
        feels_like: Math.round(isMetric ? baseTemp + 2 : ((baseTemp + 2) * 9 / 5) + 32),
        condition: condition,
        icon: getIcon(condition),
        humidity: 40 + (seed % 40),
        wind_speed: 10 + (seed % 20),
        wind_unit: speedUnit,
        pressure: 1010 + (seed % 20),
        uv_index: 5,
        visibility: 10,
        sunrise: '06:30 AM',
        sunset: '07:45 PM',
        local_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const forecast = Array.from({ length: 7 }).map((_, i) => {
        const dayDate = new Date();
        dayDate.setDate(dayDate.getDate() + i + 1);
        const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
        const dayCondition = conditions[(seed + i) % conditions.length];
        const dayTempHigh = baseTemp + (i % 5) - 2;
        const dayTempLow = dayTempHigh - 8;

        return {
            day: dayName,
            date: dayDate.toLocaleDateString(),
            condition: dayCondition,
            icon: getIcon(dayCondition),
            high: Math.round(isMetric ? dayTempHigh : (dayTempHigh * 9 / 5) + 32),
            low: Math.round(isMetric ? dayTempLow : (dayTempLow * 9 / 5) + 32),
            pop: (seed + i * 10) % 100, // Probability of Precipitation
        };
    });

    return { current, forecast };
};
