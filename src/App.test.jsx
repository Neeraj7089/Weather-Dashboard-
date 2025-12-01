// src/App.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import App from './App';

// Mock the fetchWeatherMock service
vi.mock('./services/fetchWeatherMock', () => ({
    fetchWeatherMock: vi.fn((city) => Promise.resolve({
        current: {
            city: city,
            temp: 20,
            condition: 'Sunny',
            icon: 'sun',
            humidity: 50,
            wind_speed: 10,
            wind_unit: 'km/h',
            pressure: 1012,
            uv_index: 5,
            visibility: 10,
            sunrise: '06:00 AM',
            sunset: '08:00 PM',
            local_time: '12:00 PM',
            feels_like: 22
        },
        forecast: []
    }))
}));

describe('Weather Dashboard', () => {
    test('renders header and search bar', () => {
        render(<App />);
        expect(screen.getByText('Weather')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search city...')).toBeInTheDocument();
    });

    test('toggles units', () => {
        render(<App />);
        const toggleButton = screen.getByLabelText('Toggle units');
        expect(toggleButton).toBeInTheDocument();

        // Initial state (Metric)
        expect(screen.getByText('°C')).toHaveClass('text-google-blue');

        // Click to toggle
        fireEvent.click(toggleButton);

        // New state (Imperial)
        expect(screen.getByText('°F')).toHaveClass('text-google-blue');
    });

    test('searches for a city', async () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Search city...');

        fireEvent.change(input, { target: { value: 'London' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            expect(screen.getByText('London')).toBeInTheDocument();
        });
    });
});
