import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const weatherApi = axios.create({
    baseURL: BASE_URL,
});

export const fetchCurrentWeather = async (city) => {
    try {
        const response = await weatherApi.get('/weather', {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchForecast = async (city) => {
    try {
        const response = await weatherApi.get('/forecast', {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCurrentWeatherByCoords = async (lat, lon) => {
    try {
        const response = await weatherApi.get('/weather', {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchForecastByCoords = async (lat, lon) => {
    try {
        const response = await weatherApi.get('/forecast', {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
